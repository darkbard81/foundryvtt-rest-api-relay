import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { log } from "../middleware/logger";
import { ClientManager } from "../core/ClientManager";
import { Client } from "../core/Client"; // Import Client type
import axios from 'axios';
import { PassThrough } from 'stream';
import { JSDOM } from 'jsdom';
import { User } from '../models/user';
import { authMiddleware, trackApiUsage } from '../middleware/auth';
import { requestForwarderMiddleware } from '../middleware/requestForwarder';
import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { healthCheck } from '../routes/health';
import { getRedisClient } from '../config/redis';
import { returnHtmlTemplate } from "../config/htmlResponseTemplate";
import { getHeadlessClientId, registerHeadlessSession } from "../workers/headlessSessions";
import * as puppeteer from 'puppeteer';

export const browserSessions = new Map<string, puppeteer.Browser>();
export const apiKeyToSession = new Map<string, { sessionId: string, clientId: string, lastActivity: number }>();
const pendingHeadlessSessionsRequests = new Map<string, string>();

// Store temporary handshake tokens
interface PendingHandshake {
  apiKey: string;
  foundryUrl: string;
  worldName?: string;
  username: string;
  publicKey: string;    // To send to client
  privateKey: string;   // To keep on server for decryption
  nonce: string;
  expires: number;
}

const pendingHandshakes = new Map<string, PendingHandshake>();

const INSTANCE_ID = process.env.INSTANCE_ID || 'default';

const HEADLESS_SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

function cleanupInactiveSessions() {
  const now = Date.now();
  
  for (const [apiKey, session] of apiKeyToSession.entries()) {
    if (now - session.lastActivity > HEADLESS_SESSION_TIMEOUT) {
      log.info(`Closing inactive headless session ${session.sessionId} for API key ${apiKey.substring(0, 8)}... (inactive for ${Math.round((now - session.lastActivity) / 60000)} minutes)`);
      
      try {
        // Close the browser if it exists
        if (browserSessions.has(session.sessionId)) {
          const browser = browserSessions.get(session.sessionId);
          browser?.close().catch(err => log.error(`Error closing browser: ${err}`));
          browserSessions.delete(session.sessionId);
        }
        
        // Clean up the session mapping
        apiKeyToSession.delete(apiKey);
      } catch (error) {
        log.error(`Error during inactive session cleanup: ${error}`);
      }
    }
  }
}

// Start the session cleanup interval when the module is loaded
setInterval(cleanupInactiveSessions, 60000); // Check every minute

// Add this helper function at the top of your file
function safeResponse(res: Response, statusCode: number, data: any): void {
  if (!res.headersSent) {
    res.status(statusCode).json(data);
  } else {
    log.warn("Attempted to send response after headers sent", { data });
  }
}

export const apiRoutes = (app: express.Application): void => {
  // Setup handlers for storing search results and entity data from WebSocket
  setupMessageHandlers();
  
  // Create a router instead of using app directly
  const router = express.Router();

  // Define routes on the router
  router.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../_test/test-client.html"));
  });

  router.get("/health", healthCheck);

  router.get("/api/status", (req: Request, res: Response) => {
    res.json({ 
      status: "ok",
      version: "1.0.0",
      websocket: "/relay"
    });
  });

  // User registration
  router.post('/register', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      console.log(`Registration attempt for: ${email}`);
      
      if (!email || !password) {
        console.log('Missing email or password');
        safeResponse(res, 400, { error: 'Email and password are required' });
        return;
      }
      
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        console.log(`User already exists: ${email}`);
        safeResponse(res, 409, { error: 'User already exists' });
        return;
      }
      
      console.log('Creating new user...');
      // Create a new user
      const user = await User.create({
        email,
        password, // Will be hashed by the beforeCreate hook
        apiKey: crypto.randomBytes(16).toString('hex'), // Explicitly generate an API key
        requestsThisMonth: 0
      });
      
      console.log(`User created: ${user.getDataValue('email')}`);
      
      // Return the user (exclude password)
      safeResponse(res, 201, {
        id: user.getDataValue('id'),
        email: user.getDataValue('email'),
        apiKey: user.getDataValue('apiKey'),
        createdAt: user.getDataValue('createdAt'),
        subscriptionStatus: user.getDataValue('subscriptionStatus') || 'free'
      });
      return;
    } catch (error) {
      console.error('Registration error:', error);
      safeResponse(res, 500, { error: 'Registration failed' });
      return;
    }
  });

  // Get all connected clients
  router.get("/clients", authMiddleware, async (req: Request, res: Response) => {
    try {
      const apiKey = req.header('x-api-key') || '';
      const redis = getRedisClient();
      
      // Array to store all client details
      let allClients: any[] = [];
      
      if (redis) {
        // Step 1: Get all client IDs from Redis for this API key
        const clientIds = await redis.smembers(`apikey:${apiKey}:clients`);
        
        if (clientIds.length > 0) {
          // Step 2: For each client ID, get details from Redis
          const clientDetailsPromises = clientIds.map(async (clientId) => {
            try {
              // Get the instance this client is connected to
              const instanceId = await redis.get(`client:${clientId}:instance`);
              
              if (!instanceId) return null;
              
              // Get the last seen timestamp if stored
              const lastSeen = await redis.get(`client:${clientId}:lastSeen`) || Date.now();
              const connectedSince = await redis.get(`client:${clientId}:connectedSince`) || lastSeen;
              
              // Return client details including its instance
              return {
                id: clientId,
                instanceId,
                lastSeen: parseInt(lastSeen.toString()),
                connectedSince: parseInt(connectedSince.toString())
              };
            } catch (err) {
              log.error(`Error getting details for client ${clientId}: ${err}`);
              return null;
            }
          });
          
          // Resolve all promises and filter out nulls
          const clientDetails = (await Promise.all(clientDetailsPromises)).filter(client => client !== null);
          allClients = clientDetails;
        }
      } else {
        // Fallback to local clients if Redis isn't available
        const localClientIds = await ClientManager.getConnectedClients(apiKey);
        
        // Use Promise.all to wait for all getClient calls to complete
        allClients = await Promise.all(localClientIds.map(async (id) => {
          const client = await ClientManager.getClient(id);
          return {
            id,
            instanceId: INSTANCE_ID,
            lastSeen: client?.getLastSeen() || Date.now(),
            connectedSince: client?.getLastSeen() || Date.now()
          };
        }));
      }
      
      // Send combined response
      safeResponse(res, 200, {
        total: allClients.length,
        clients: allClients
      });
    } catch (error) {
      log.error(`Error aggregating clients: ${error}`);
      safeResponse(res, 500, { error: "Failed to retrieve clients" });
    }
  });
  
  // Search endpoint that relays to Foundry's Quick Insert
  router.get("/search", requestForwarderMiddleware, authMiddleware, trackApiUsage, async (req: Request, res: Response) => {
    const query = req.query.query as string;
    const filter = req.query.filter as string;
    const clientId = req.query.clientId as string;
    
    if (!query) {
      safeResponse(res, 400, { 
        error: "Query parameter is required",
        howToUse: "Add ?query=yourSearchTerm to your request"
      });
      return;
    }
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required to identify the Foundry instance",
        howToUse: "Add &clientId=yourClientId to your request",
        tip: "Get a list of available client IDs at /clients"
      });
      return;
    }
    
    // Find a connected client with this ID - now with await
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID",
        tip: "Get a list of available client IDs at /clients"
      });
      return;
    }
    
    try {
      // Generate a unique requestId for this search
      const requestId = `search_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      // Store the response object in a request map
      pendingRequests.set(requestId, { 
        res,
        type: 'search',
        clientId,
        query: query,
        filter: filter,
        timestamp: Date.now() 
      });
      
      // Send request to Foundry for search
      const sent = client.send({
        type: "perform-search",
        query,
        filter: filter || null,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send search request to Foundry client",
          suggestion: "The client may be disconnecting or experiencing issues"  
        });
        return;
      }
      
      // Set timeout for request
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { 
            error: "Search request timed out", 
            tip: "The Foundry client might be busy or still building its index."
          });
        }
      }, 10000); // 10 seconds timeout
      
    } catch (error) {
      log.error(`Error processing search request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process search request" });
      return;
    }
  });

  // Get entities
  router.get("/get", requestForwarderMiddleware, authMiddleware, trackApiUsage, async (req: Request, res: Response) => {
    const uuid = req.query.uuid as string;
    const selected = req.query.selected === 'true';
    const actor = req.query.actor === 'true';
    const clientId = req.query.clientId as string;
    
    if (!uuid && !selected) {
      safeResponse(res, 400, { error: "UUID or selected parameter is required" });
      return;
    }
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required to identify the Foundry instance",
        howToUse: "Add &clientId=yourClientId to your request",
        tip: "Get a list of available client IDs at /clients"
      });
      return;
    }
    
    // Find a connected client with this ID
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID",
        tip: "Get a list of available client IDs at /clients"
      });
      return;
    }
    
    try {
      // Generate a unique requestId for this entity request
      const requestId = `entity_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      // Store the response object in a request map
      pendingRequests.set(requestId, { 
        res,
        type: 'entity',
        clientId,
        timestamp: Date.now() 
      });
      
      // Send request to Foundry for entity data
      const sent = client.send({
        type: "get-entity",
        uuid,
        selected,
        actor,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send entity request to Foundry client",
          suggestion: "The client may be disconnecting or experiencing issues"  
        });
        return;
      }
      
      // Set timeout for request
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { 
            error: "Entity request timed out", 
            tip: "The Foundry client might be busy or the UUID might not exist."
          });
        }
      }, 10000); // 10 seconds timeout
    } catch (error) {
      log.error(`Error processing entity request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process entity request" });
      return;
    }
  });

  // Get all folders and compendiums
  router.get("/structure", requestForwarderMiddleware, authMiddleware, trackApiUsage, async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
			return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID"
      });
			return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `structure_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'structure',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "get-structure",
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send structure request to Foundry client"
        });
			  return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing structure request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process structure request" });
      return;
    }
  });

  // Get all entity UUIDs in a folder or compendium
  router.get("/contents/:path", requestForwarderMiddleware, authMiddleware, trackApiUsage, async (req: Request, res: Response) => {
    const path = req.params.path;
    const clientId = req.query.clientId as string;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
			return;
    }
    
    if (!path) {
      safeResponse(res, 400, { error: "Path parameter is required" });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID"
      });
			return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `contents_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'contents',
        clientId,
        path,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "get-contents",
        path,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send contents request to Foundry client"
        });
			return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing contents request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process contents request" });
      return;
    }
  });

  // Create a new entity
  router.post("/create", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const { type, folder, data } = req.body;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request" 
      });
			return;
    }
    
    if (!type || !data) {
      safeResponse(res, 400, { 
        error: "Request body must include 'type' and 'data' fields",
        example: { type: "Actor", folder: "Folder ID or null", data: { name: "Entity Name", /* other data */ } }
      });
			return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID"
      });
			return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `create_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'create',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "create-entity",
        entityType: type,
        folder: folder || null,
        data: data,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send create request to Foundry client"
        });
			  return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing create entity request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process create entity request" });
      return;
    }
  });

  // Update an entities
  router.put("/update", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const uuid = req.query.uuid as string;
    const selected = req.query.selected === 'true';
    const actor = req.query.actor === 'true';
    const clientId = req.query.clientId as string;
    const updateData = req.body;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
			return;
    }
    
    if (!uuid && !selected) {
      safeResponse(res, 400, { error: "UUID or selected parameter is required" });
      return;
    }
    
    if (!updateData || Object.keys(updateData).length === 0) {
      safeResponse(res, 400, { error: "Update data is required in request body" });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID"
      });
			return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `update_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'update',
        clientId,
        uuid,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "update-entity",
        uuid,
        selected,
        actor,
        updateData,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send update request to Foundry client"
        });
			return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing update entity request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process update entity request" });
      return;
    }
  });

  // Delete entities
  router.delete("/delete", requestForwarderMiddleware, authMiddleware, trackApiUsage, async (req: Request, res: Response) => {
    const uuid = req.query.uuid as string;
    const selected = req.query.selected === 'true';
    const clientId = req.query.clientId as string;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
			return;
    }
    
    if (!uuid && !selected) {
      safeResponse(res, 400, { error: "UUID or selected parameter is required" });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID"
      });
			return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `delete_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'delete',
        clientId,
        uuid,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "delete-entity",
        uuid,
        selected,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send delete request to Foundry client"
        });
			  return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing delete entity request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process delete entity request" });
      return;
    }
  });

  // Get recent rolls
  router.get("/rolls", requestForwarderMiddleware, authMiddleware, trackApiUsage, async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const limit = parseInt(req.query.limit as string) || 20;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
			return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID"
      });
			return;
    }
    
    try {
      // Request from Foundry client
      const requestId = `rolls_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'rolls',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "get-rolls",
        limit,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send rolls request to Foundry client" 
        });
			  return;
      }
      
      // Set timeout for request
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 404, { 
            error: "No roll data available",
            message: "Request timed out"
          });
        }
      }, 5000);
      
    } catch (error) {
      log.error(`Error processing rolls request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process rolls request" });
      return;
    }
  });

  // Get last roll
  router.get("/lastroll", requestForwarderMiddleware, authMiddleware, trackApiUsage, async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
			return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID"
      });
			return;
    }
    
    try {
      // Request from Foundry client
      const requestId = `lastroll_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'lastroll',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "get-last-roll",
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send last roll request to Foundry client" 
        });
			  return;
      }
      
      // Set timeout for request
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 404, { 
            error: "No roll data available",
            message: "No dice have been rolled yet or request timed out"
          });
        }
      }, 5000);
      
    } catch (error) {
      log.error(`Error processing last roll request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process last roll request" });
      return;
    }
  });

  // Create a new roll
  router.post("/roll", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const { formula, flavor, createChatMessage, whisper, itemUuid, speaker, target } = req.body;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    // Require either formula or itemUuid
    if (!formula && !itemUuid) {
      safeResponse(res, 400, { 
        error: "Either roll formula or itemUuid is required",
        example: { 
          formula: "2d6+3", 
          flavor: "Attack roll", 
          createChatMessage: true 
        },
        altExample: {
          itemUuid: "Scene.If9IwEwsCxjEqlNk.Token.ZnkW99xVqJLLEKJq.Actor.qrSmgi9HEQ7tHCqd.Item.sgauK8Lyt8qxsxOH",
          target: "Scene.If9IwEwsCxjEqlNk.Token.YQjYrJBqFdqbcbvZ"
        }
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID"
      });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `roll_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'roll',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "perform-roll",
        formula,
        itemUuid,
        flavor,
        createChatMessage,
        speaker,
        target,
        whisper,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send roll request to Foundry client"
        });
        return;
      }
      
      // Set timeout for request
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 5000);
      
    } catch (error) {
      log.error(`Error processing roll request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process roll request" });
      return;
    }
  });

  // Get actor sheet HTML
  router.get("/sheet", requestForwarderMiddleware, authMiddleware, trackApiUsage, async (req: Request, res: Response) => {
    const uuid = req.query.uuid as string;
    const selected = req.query.selected === 'true';
    const actor = req.query.actor === 'true';
    const clientId = req.query.clientId as string;
    const format = req.query.format as string || 'html';
    const initialScale = parseFloat(req.query.scale as string) || null;
    const activeTab = req.query.tab ? (isNaN(Number(req.query.tab)) ? null : Number(req.query.tab)) : null;
    const darkMode = req.query.darkMode === 'true';
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required to identify the Foundry instance"
      });
			return;
    }

    if (!uuid && !selected) {
      safeResponse(res, 400, { error: "UUID or selected parameter is required" });
      return;
    }
    
    // Find a connected client with this ID
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID"
      });
			return;
    }
    
    try {
      // Generate a unique requestId for this request
      const requestId = `actor_sheet_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      // Store the response object in a request map
      pendingRequests.set(requestId, { 
        res,
        type: 'actor-sheet',
        uuid,
        clientId,
        format,
        initialScale,
        activeTab,
        darkMode,
        timestamp: Date.now() 
      });
      
      // Send request to Foundry for actor sheet HTML
      const sent = client.send({
        type: "get-sheet-html",
        uuid,
        selected,
        actor,
        requestId,
        initialScale,
        activeTab,
        darkMode
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send actor sheet request to Foundry client",
          suggestion: "The client may be disconnecting or experiencing issues"  
        });
        return;
      }
      
      // Set timeout for request
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { 
            error: "Actor sheet request timed out", 
            tip: "The Foundry client might be busy or the actor UUID might not exist."
          });
        }
      }, 10000); // 10 seconds timeout
      
    } catch (error) {
      log.error(`Error processing actor sheet request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process actor sheet request" });
      return;
    }
  });

  // Get macros
  router.get("/macros", requestForwarderMiddleware, authMiddleware, trackApiUsage, async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }

    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID"
      });
      return;
    }

    try {
      // Generate a unique requestId
      const requestId = `macros_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'macros',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "get-macros",
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send macros request to Foundry client"
        });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { 
            error: "Request timed out", 
            tip: "The Foundry client might be busy or the macro retrieval took too long."
          });
        }
      }, 10000); // Longer timeout for macros that might take time to retrieve
    } catch (error) {
      log.error(`Error processing macros request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process macros request" });
      return;
    }
  });

  // Execute a macro by UUID
  router.post("/macro/:uuid/execute", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const uuid = req.params.uuid;
    const clientId = req.query.clientId as string;
    const args = req.body || {};
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    if (!uuid) {
      safeResponse(res, 400, { 
        error: "UUID parameter is required",
        example: "/macro/Macro.abcdef12345/execute"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { 
        error: "Invalid client ID"
      });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `macro_exec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'macro-execute',
        clientId,
        uuid,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "execute-macro",
        uuid,
        args,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { 
          error: "Failed to send macro execution request to Foundry client"
        });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { 
            error: "Request timed out", 
            tip: "The Foundry client might be busy or the macro execution took too long."
          });
        }
      }, 15000); // Longer timeout for macros that might take time to execute
    } catch (error) {
      log.error(`Error processing macro execution request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process macro execution request" });
      return;
    }
  });

  // Get all active encounters
  router.get("/encounters", requestForwarderMiddleware, authMiddleware, trackApiUsage, async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `encounters_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'encounters',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "get-encounters",
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send encounters request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing encounters request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process encounters request" });
    }
  });

  // Update the start-encounter endpoint to include the new options
  router.post("/start-encounter", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const tokenUuids = req.body.tokens || [];
    const startWithSelected = req.body.startWithSelected === true;
    const startWithPlayers = req.body.startWithPlayers === true;
    const rollNPC = req.body.rollNPC === true;
    const rollAll = req.body.rollAll === true;
    const name = req.body.name || "";
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `start_encounter_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'start-encounter',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "start-encounter",
        tokenUuids,
        startWithSelected,
        startWithPlayers,
        rollNPC,
        rollAll,
        name,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send start encounter request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing start encounter request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process start encounter request" });
    }
  });

  // Next turn in encounter
  router.post("/next-turn", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const encounterId = req.query.encounter as string || req.body.encounter;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `next_turn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'next-turn',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "encounter-next-turn",
        encounterId,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send next turn request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing next turn request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process next turn request" });
    }
  });

  // Next round in encounter
  router.post("/next-round", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const encounterId = req.query.encounter as string || req.body.encounter;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `next_round_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'next-round',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "encounter-next-round",
        encounterId,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send next round request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing next round request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process next round request" });
    }
  });

  // Previous turn in encounter
  router.post("/last-turn", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const encounterId = req.query.encounter as string || req.body.encounter;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `last_turn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'last-turn',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "encounter-previous-turn",
        encounterId,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send previous turn request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing previous turn request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process previous turn request" });
    }
  });

  // Previous round in encounter
  router.post("/last-round", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const encounterId = req.query.encounter as string || req.body.encounter;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `last_round_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'last-round',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "encounter-previous-round",
        encounterId,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send previous round request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing previous round request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process previous round request" });
    }
  });

  // End an encounter
  router.post("/end-encounter", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const encounterId = req.query.encounter as string || req.body.encounter;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `end_encounter_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'end-encounter',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "end-encounter",
        encounterId: encounterId || null,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send end encounter request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing end encounter request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process end encounter request" });
    }
  });

  // Add to encounter
  router.post("/add-to-encounter", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const encounterId = req.query.encounter as string || req.body.encounter;
    const selected = req.body.selected === true;
    const uuids = Array.isArray(req.body.uuids) ? req.body.uuids : [];
    const rollInitiative = req.body.rollInitiative === true;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    if (!uuids.length && !selected) {
      safeResponse(res, 400, {
        error: "Either uuids array or selected=true is required"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `add_encounter_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'add-to-encounter',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "add-to-encounter",
        encounterId,
        selected,
        uuids,
        rollInitiative,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send add-to-encounter request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing add-to-encounter request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process add-to-encounter request" });
    }
  });

  // Remove from encounter
  router.post("/remove-from-encounter", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const encounterId = req.query.encounter as string || req.body.encounter;
    const selected = req.body.selected === true;
    const uuids = Array.isArray(req.body.uuids) ? req.body.uuids : [];
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    if (!uuids.length && !selected) {
      safeResponse(res, 400, {
        error: "Either uuids array or selected=true is required"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `remove_encounter_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'remove-from-encounter',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "remove-from-encounter",
        encounterId,
        selected,
        uuids,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send remove-from-encounter request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing remove-from-encounter request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process remove-from-encounter request" });
    }
  });

  // Kill (mark as defeated)
  router.post("/kill", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const uuid = req.query.uuid as string;
    const selected = req.query.selected === 'true';
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    if (!uuid && !selected) {
      safeResponse(res, 400, {
        error: "UUID or selected is required"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `kill_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'kill',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "kill-entity",
        uuid,
        selected,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send kill request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing kill request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process kill request" });
    }
  });

  // Decrease attribute
  router.post("/decrease", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const uuid = req.query.uuid as string;
    const selected = req.query.selected === 'true';
    const attribute = req.body.attribute as string;
    const amount =req.body.amount as number;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    if ((!uuid && !selected) || !attribute || isNaN(amount)) {
      safeResponse(res, 400, {
        error: "UUID or selected, attribute path, and amount are required",
        howToUse: "Provide uuid or selected, attribute, and amount parameters"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `decrease_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'decrease',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "decrease-attribute",
        uuid,
        selected,
        attribute,
        amount,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send decrease request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing decrease request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process decrease request" });
    }
  });

  // Increase attribute
  router.post("/increase", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const uuid = req.query.uuid as string;
    const selected = req.query.selected === 'true';
    const attribute = req.body.attribute as string;
    const amount =req.body.amount as number;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    if ((!uuid && !selected) || !attribute || isNaN(amount)) {
      safeResponse(res, 400, {
        error: "UUID or selected, attribute path, and amount are required",
        howToUse: "Provide uuid or selected, attribute, and amount parameters"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `increase_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'increase',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "increase-attribute",
        uuid,
        selected,
        attribute,
        amount,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send increase request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing increase request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process increase request" });
    }
  });

  // Add this to the router after the other endpoints
  router.post("/give", requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json(), async (req: Request, res: Response) => {
    const clientId = req.query.clientId as string;
    const fromUuid = req.body.fromUuid as string;
    const toUuid = req.body.toUuid as string;
    const selected = req.body.selected;
    const itemUuid = req.body.itemUuid as string;
    const quantity = req.body.quantity as number || 1;
    
    if (!clientId) {
      safeResponse(res, 400, { 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
      return;
    }
    
    if ((!toUuid && !selected) || !itemUuid) {
      safeResponse(res, 400, {
        error: "toUuid or selected, and itemUuid are required",
        howToUse: "Provide toUuid (target actor) or selected = true, and itemUuid parameters"
      });
      return;
    }
    
    const client = await ClientManager.getClient(clientId);
    if (!client) {
      safeResponse(res, 404, { error: "Invalid client ID" });
      return;
    }
    
    try {
      // Generate a unique requestId
      const requestId = `give_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      pendingRequests.set(requestId, { 
        res,
        type: 'give',
        clientId,
        timestamp: Date.now() 
      });
      
      const sent = client.send({
        type: "give-item",
        fromUuid,
        selected,
        toUuid,
        itemUuid,
        quantity,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        safeResponse(res, 500, { error: "Failed to send give item request to Foundry client" });
        return;
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          safeResponse(res, 408, { error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing give item request: ${error}`);
      safeResponse(res, 500, { error: "Failed to process give item request" });
    }
  });
  
  // Proxy asset requests to Foundry
  router.get('/proxy-asset/:path(*)', requestForwarderMiddleware, async (req: Request, res: Response) => {
    try {
      // Get the Foundry URL from the client metadata or use default
      const clientId = req.query.clientId as string;
      let foundryBaseUrl = 'http://localhost:30000'; // Default Foundry URL
      
      // If we have client info, use its URL
      if (clientId) {
        const client = await ClientManager.getClient(clientId);
        if (client && 'metadata' in client && client.metadata && (client.metadata as any).origin) {
          foundryBaseUrl = (client.metadata as any).origin;
        }
      }
      
      const assetPath = req.params.path;
      const assetUrl = `${foundryBaseUrl}/${assetPath}`;
      
      log.debug(`Proxying asset request to: ${assetUrl}`);
      
      // Check if it's a Font Awesome file - redirect to CDN if so
      if (assetPath.includes('/webfonts/fa-') || assetPath.includes('/fonts/fontawesome/') || 
          assetPath.includes('/fonts/fa-')) {
        
        // Extract the filename
        const filename = assetPath.split('/').pop() || '';
        
        // Redirect to CDN
        const cdnUrl = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/webfonts/${filename}`;
        log.debug(`Redirecting Font Awesome asset to CDN: ${cdnUrl}`);
        res.redirect(cdnUrl);
			  return;
      }
      
      // Check for texture files - use GitHub raw content as fallback
      if (assetPath.includes('texture1.webp') || assetPath.includes('texture2.webp') || 
          assetPath.includes('parchment.jpg')) {
        log.debug(`Serving texture file from GitHub fallback`);
        res.redirect('https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/parchment.jpg');
			  return;
      }
      
      if (assetPath.includes('ac-badge')) {
        res.redirect('https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/ac-badge.webp');
			  return;
      }
      
      if (assetPath.includes('cr-badge')) {
        res.redirect('https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/cr-badge.webp');
			  return;
      }
      
      // Try to make the request to Foundry
      try {
        const response = await axios({
          method: 'get',
          url: assetUrl,
          responseType: 'stream',
          timeout: 5000
        });
        
        // Copy headers
        Object.keys(response.headers).forEach(header => {
          res.setHeader(header, response.headers[header]);
        });
        
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        // Stream the response
        response.data.pipe(res);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        log.warn(`Failed to proxy asset from ${assetUrl}: ${errorMessage}`);
        
        // For image files, try to provide a fallback
        const ext = assetPath.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext || '')) {
          // For images, send a transparent 1x1 pixel as fallback
          log.debug(`Sending fallback transparent image for: ${assetPath}`);
          res.setHeader('Content-Type', 'image/png');
          res.send(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64'));
        } else {
          res.status(404).send('Asset not found');
        }
      }
    } catch (error) {
      log.error(`Error in proxy asset handler: ${error}`);
      res.status(404).send('Asset not found');
    }
  });

  // Step 1: Client requests a handshake token
  router.post('/session-handshake', authMiddleware, async (req: Request, res: Response) => {
    try {
      const apiKey = req.header('x-api-key') as string;
      const foundryUrl = req.header('x-foundry-url') as string;
      const worldName = req.header('x-world-name') as string;
      const username = req.header('x-username') as string;
      
      if (!foundryUrl || !username) {
        res.status(400).json({ error: "Missing required parameters" });
        return;
      }

      // Generate an RSA key pair for this handshake
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem'
        }
      });
      
      // Generate a random handshake token that will be valid for 5 minutes
      const handshakeToken = crypto.randomBytes(32).toString('hex');
      const expires = Date.now() + (5 * 60 * 1000); // 5 minutes
      
      const nonce = crypto.randomBytes(16).toString('hex');
      const instanceId = process.env.FLY_ALLOC_ID || 'local';
    
      // Store handshake in Redis instead of local memory
      const redis = getRedisClient();
      if (redis) {
        // Store all handshake data in Redis with an expiry
        await redis.hset(`handshake:${handshakeToken}`, {
          apiKey,
          foundryUrl,
          worldName: worldName || '',
          username,
          publicKey,
          privateKey,
          nonce,
          expires: expires.toString(),
          instanceId
        });
        
        // Set expiry for 5 minutes
        await redis.expire(`handshake:${handshakeToken}`, 300);
        
        log.info(`Created handshake token ${handshakeToken.substring(0, 8)}... for ${foundryUrl} in Redis`);
      } else {
        // Fallback to local storage if Redis is unavailable
        pendingHandshakes.set(handshakeToken, {
          apiKey,
          foundryUrl,
          worldName,
          username,
          publicKey,
          privateKey,
          nonce,
          expires
        });
      
        // Set cleanup timeout for local storage
        setTimeout(() => {
          pendingHandshakes.delete(handshakeToken);
          log.debug(`Handshake token ${handshakeToken.substring(0, 8)}... expired and removed from local storage`);
        }, 5 * 60 * 1000);
        
        log.info(`Created handshake token ${handshakeToken.substring(0, 8)}... for ${foundryUrl} in local storage`);
      }
      
      // Return the token and public key to the client
      res.status(200).json({
        token: handshakeToken,
        publicKey: publicKey,
        nonce,
        expires
      });
      return;
    } catch (error) {
      log.error(`Error creating handshake: ${error}`);
      res.status(500).json({ error: 'Failed to create handshake' });
      return;
    }
  });

  // Start headless Foundry session
  router.post("/start-session", requestForwarderMiddleware, authMiddleware, express.json(), async (req: Request, res: Response) => {
    try {
      const { handshakeToken, encryptedPassword } = req.body;
      const apiKey = req.header('x-api-key') as string;
    
      // Get handshake data from Redis or local storage
      let handshake: any = null;
      let fromRedis = false;
      
      const redis = getRedisClient();
      if (redis) {
        // Try to get handshake from Redis
        const handshakeExists = await redis.exists(`handshake:${handshakeToken}`);
        
        if (handshakeExists) {
          const handshakeData = await redis.hgetall(`handshake:${handshakeToken}`);
          
          // Check if this instance should handle the request
          const handshakeInstanceId = handshakeData.instanceId;
          const currentInstanceId = process.env.FLY_ALLOC_ID || 'local';
          
          if (handshakeInstanceId !== currentInstanceId) {
            // This should be handled by a different instance
            log.info(`Handshake ${handshakeToken.substring(0, 8)}... belongs to instance ${handshakeInstanceId}, current instance is ${currentInstanceId}`);
            
            // Store the client's request in Redis for the correct instance to pick up
            await redis.hset(`pending_session:${handshakeToken}`, {
              apiKey,
              encryptedPassword: encryptedPassword,
              timestamp: Date.now().toString()
            });
            
            // Set expiry for 5 minutes
            await redis.expire(`pending_session:${handshakeToken}`, 300);
            
            // Wait for the other instance to process the request and return the result
            log.info(`Waiting for instance ${handshakeInstanceId} to process headless session request`);
            
            // Set a timeout for waiting
            const maxWaitTime = 60000; // 1 minute timeout
            const startTime = Date.now();
            
            // Poll Redis for the result
            const checkInterval = setInterval(async () => {
              try {
              // Check if the result has been posted back
              const resultKey = `session_result:${handshakeToken}`;
              const hasResult = await redis.exists(resultKey);
              
              if (hasResult) {
                // Get the result data
                const resultData = await redis.get(resultKey);
                await redis.del(resultKey); // Clean up the result
                clearInterval(checkInterval);
                
                // Parse and return the actual response - handle null case with default response
                const result = JSON.parse(resultData || '{"statusCode":200, "data":{"message":"Session started on another instance"}}');
                return safeResponse(res, result.statusCode || 200, result.data || {
                message: "Session started on another instance"
                });
              } else if (Date.now() - startTime > maxWaitTime) {
                // Timeout reached
                clearInterval(checkInterval);
                await redis.del(`pending_session:${handshakeToken}`);
                return safeResponse(res, 408, {
                error: "Timeout waiting for session to be processed by other instance",
                handshakeInstance: handshakeInstanceId
                });
              }
              } catch (err) {
              log.error(`Error polling for session result: ${err}`);
              clearInterval(checkInterval);
              return safeResponse(res, 500, {
                error: "Error while waiting for session to be processed"
              });
              }
            }, 2000); // Check every 2 seconds
          }
          
          // Parse numeric fields
          handshakeData.expires = handshakeData.expires;
          
          handshake = handshakeData;
          fromRedis = true;
        }
      }
      
      // If not found in Redis, try local storage
      if (!handshake && pendingHandshakes.has(handshakeToken)) {
        handshake = pendingHandshakes.get(handshakeToken);
      }
      
      // Verify handshake token exists
      if (!handshake) {
        return safeResponse(res, 401, { error: 'Invalid or expired handshake token' });
      }
      
      // Verify API key matches
      if (handshake.apiKey !== apiKey) {
        // Clean up
        if (fromRedis && redis) {
          await redis.del(`handshake:${handshakeToken}`);
        } else {
          pendingHandshakes.delete(handshakeToken);
        }
        
        return safeResponse(res, 401, { error: 'Unauthorized' });
      }
      
      // Verify token is not expired
      if (handshake.expires < Date.now()) {
        // Clean up
        if (fromRedis && redis) {
          await redis.del(`handshake:${handshakeToken}`);
        } else {
          pendingHandshakes.delete(handshakeToken);
        }
        
        return safeResponse(res, 401, { error: 'Handshake token expired' });
      }
      
      // Decrypt the password and nonce using the handshake's private key
      let password;
      let nonce;
      try {
        const buffer = Buffer.from(encryptedPassword, 'base64');
        const decryptedData = crypto.privateDecrypt(
          {
        key: handshake.privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
          },
          buffer
        ).toString('utf8');

        // Parse the decrypted data as JSON which should contain password and nonce
        const parsedData = JSON.parse(decryptedData);
        password = parsedData.password;
        nonce = parsedData.nonce;
        
        // Verify the nonce matches
        if (!nonce || nonce !== handshake.nonce) {
          if (fromRedis && redis) {
            await redis.del(`handshake:${handshakeToken}`);
          } else {
            pendingHandshakes.delete(handshakeToken);
          }
          res.status(401).json({ error: 'Invalid nonce' });
          return;
        }
      } catch (error) {
        log.error(`Failed to decrypt data: ${error}`);
        if (fromRedis && redis) {
          await redis.del(`handshake:${handshakeToken}`);
        } else {
          pendingHandshakes.delete(handshakeToken);
        }
        res.status(400).json({ error: 'Invalid encrypted data' });
        return;
      }
      
      // Remove the handshake token immediately after use
      const { foundryUrl, worldName, username } = handshake;
      // Remove the handshake token from pending handshakes
      if (fromRedis && redis) {
        await redis.del(`handshake:${handshakeToken}`);
      } else {
        pendingHandshakes.delete(handshakeToken);
      }

      // Launch Puppeteer and connect to Foundry
    try {
      log.info(`Starting headless Foundry session for URL: ${foundryUrl}`);
      
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null
      });

      const page = await browser.newPage();
      
      // Enable better logging
      page.on('console', msg => log.debug(`Browser console: ${msg.text()}`));
      page.on('pageerror', error => log.error(`Browser page error: ${error.message}`));
      page.on('requestfailed', request => log.error(`Request failed: ${request.url()}`));

      // Navigate to Foundry
      log.debug(`Navigating to Foundry URL: ${foundryUrl}`);
      await page.goto(foundryUrl, { waitUntil: 'networkidle0', timeout: 180000 });
      
      // Debug: Log current URL
      log.debug(`Current page URL: ${page.url()}`);

      // First, check if there are any overlays or tours to dismiss
      log.debug("Checking for overlays or tours to dismiss");
      try {
        // Look for various types of overlays and dismiss them
        const selectors = [
          '.tour-overlay', '.tour', '.tour-fadeout',
          'a.step-button[data-action="exit"]', 'button.tour-exit'
        ];
        
        for (const selector of selectors) {
          const elements = await page.$$(selector);
          if (elements.length > 0) {
            log.debug(`Found ${elements.length} ${selector} elements, attempting to dismiss`);
            await page.click(selector).catch(e => log.debug(`Couldn't click ${selector}: ${e.message}`));
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for a second
          }
        }
      } catch (e) {
        log.info(`Overlay handling: ${(e as Error).message}`);
      }

      // Handle world selection
      if (worldName) {
        log.info(`Looking for world: ${worldName}`);
        
        try {
          // Wait for world list to load
          await page.waitForSelector('li.package.world', { timeout: 10000 })
            .catch(() => {
              log.info('Could not find world list, checking page content');
              return page.content().then(html => {
                log.info(`Page HTML preview: ${html.substring(0, 1000)}...`);
              });
            });
          
          // Try to find and click on the world using multiple strategies
          log.info('Attempting to find and launch the world');
          
          // Strategy 1: Try to find the play button directly associated with the world name
          const worldLaunched = await page.evaluate((worldName) => {
            console.log(`Looking for world: ${worldName}`);
            // Find all world titles
            const titles = Array.from(document.querySelectorAll('h3.package-title'));
            console.log(`Found ${titles.length} world titles`);
            
            for (const title of titles) {
              if (title.textContent && title.textContent.trim() === worldName) {
                console.log(`Found matching world: ${worldName}`);
                // Find the parent li element
                const worldLi = title.closest('li.package.world');
                if (worldLi) {
                  console.log('Found parent li element');
                  // Find and click the play button
                  const playButton = worldLi.querySelector('a.control.play');
                  if (playButton) {
                    console.log('Found play button, clicking');
                    (playButton as HTMLElement).click();
                    return true;
                  } else {
                    console.log('Play button not found');
                  }
                }
              }
            }
            return false;
          }, worldName);

          await new Promise(resolve => setTimeout(resolve, 2000)); // Give time for action to complete
          
          if (worldLaunched) {
            log.info('World launch button clicked successfully');
          } else {
            log.info('Failed to find/click world launch button');
            
            // Strategy 2: Try using a more direct selector
            try {
              log.info('Trying alternative launch approach');
              
              // Look for all world elements and try to find a match by text content
              const worlds = await page.$$('li.package.world');
              log.info(`Found ${worlds.length} world elements`);
              
              let launched = false;
              for (const worldElement of worlds) {
                const title = await worldElement.$eval('h3.package-title', el => el.textContent?.trim())
                  .catch(() => null);
                  
                log.info(`Found world with title: ${title}`);
                
                if (title === worldName) {
                  log.info('Found matching world, looking for play button');
                  const playButton = await worldElement.$('a.control.play');
                  if (playButton) {
                    log.info('Clicking play button');
                    await playButton.click();
                    launched = true;
                    break;
                  }
                }
              }
              
              if (!launched) {
                log.info('Failed to launch world using alternative approach');
              }
            } catch (error) {
              log.info(`Error in alternative launch approach: ${(error as Error).message}`);
            }
          }
          
          // Wait and check if we have navigated to a login page
          log.info('Waiting to see if we reached the login page...');
          await new Promise(resolve => setTimeout(resolve, 6000));
          
          // info: Log current URL again
          log.info(`Current URL after world selection: ${page.url()}`);
          
          // Check if we're on a login page by looking for various login elements
          const loginElements = ['select[name="userid"]', 'input[name="userid"]', 'input[name="password"]'];
          let loginFormFound = false;
          
          for (const selector of loginElements) {
            const element = await page.$(selector);
            if (element) {
              log.info(`Found login element: ${selector}`);
              loginFormFound = true;
              break;
            }
          }
          
          if (!loginFormFound) {
            // If we don't see login elements, check the HTML to see what page we're on
            const html = await page.content();
            log.info(`Page HTML after world selection (preview): ${html.substring(0, 500)}...`);
            throw new Error('Login form not found after world selection');
          }
          
        } catch (error) {
          await browser.close();
          const errorMessage = error instanceof Error ? error.message : String(error);
          pendingHeadlessSessionsRequests.delete(apiKey);
          return safeResponse(res, 404, { error: `Failed to find or launch world: ${worldName}`, details: errorMessage });
        }
      }

      // Handle the login process
      log.debug('Attempting to log in...');
      
      // Handle username input (could be select or input)
      let userId = username; // Default
      const hasUserSelect = await page.$('select[name="userid"]')
        .then(element => !!element)
        .catch(() => false);
      
      if (hasUserSelect) {
        log.debug('Found username dropdown, selecting user');
        
        // Get all available users from dropdown
        const options = await page.$$eval('select[name="userid"] option', options => 
          options.map(opt => ({ value: opt.value, text: opt.textContent?.trim() }))
        );
        
        log.debug(`Available users: ${JSON.stringify(options)}`);
        
        // Find matching username
        const matchingOption = options.find(opt => opt.text === username);
        if (matchingOption) {
          log.info(`Selected user ${username} with value ${matchingOption.value}`);
          await page.select('select[name="userid"]', matchingOption.value);
          userId = matchingOption.value; // Use the value attribute as userId
        } else {
          throw new Error(`Username "${username}" not found in dropdown`);
        }
      } else {
        // Use text input for username
        log.debug('Using username input field');
        await page.type('input[name="userid"]', username);
      }
      
      // Enter password
      await page.type('input[name="password"]', password);
      
      // Submit form
      log.info('Submitting login form');
      await page.click('button[type="submit"]')
        .catch(() => page.evaluate(() => {
          (document.querySelector('form') as HTMLFormElement)?.submit();
        }));
      
      // Wait for the game to load
      log.info('Waiting for game to load...');
      await page.waitForSelector('#ui-left, #sidebar, .vtt, #game', { timeout: 30000 })
        .catch(async (error) => {
          log.error(`Error waiting for game selectors: ${error.message}`);
          throw error;
        });
      
      // Create a unique session ID and store it
      const sessionId = crypto.randomUUID();
      browserSessions.set(sessionId, browser);
      
      // Register this session in Redis for cross-instance support
      await registerHeadlessSession(sessionId, userId, apiKey);
      
      // The expected client ID will be in format "foundry-{userId}"
      const expectedClientId = `foundry-${userId}`;
      log.info(`Waiting for Foundry client connection with ID: ${expectedClientId}`);
      
      // Create a promise that resolves when the client connects or rejects on timeout
      const clientConnectionPromise = new Promise<string>((resolve, reject) => {
        // Initial check for existing client
        const checkExistingClient = async () => {
          const client = await ClientManager.getClient(expectedClientId);
          if (client && client.getApiKey() === apiKey) {
        return expectedClientId;
          } else if (client) {
        // If the client ID matches but the API key doesn't, log a warning
        log.warn(`Client ID ${expectedClientId} found but API key mismatch`);
        return 'invalid';
          }
          return null;
        };
        
        // Set up polling for client connection with reduced verbosity
        let logCounter = 0;
        const checkInterval = setInterval(async () => {
          try {
        const clientId = await checkExistingClient();
        if (clientId) {
          // Only log the connection once
          if (clientId === 'invalid') {
            // close the browser session
            await browser.close();
            browserSessions.delete(sessionId);
            clearInterval(checkInterval);
            clearTimeout(timeoutId);
            reject(new Error(`Unauthorized client connection attempt`));
            return;
          }
          log.info(`Client connected successfully: ${clientId}`);
          clearInterval(checkInterval);
          clearTimeout(timeoutId);
          resolve(clientId);
        } else {
          // Log less frequently to reduce noise
          if (++logCounter % 10 === 0) {
            log.debug(`Waiting for client connection: ${expectedClientId} (${logCounter} checks)`);
          }
        }
          } catch (error) {
        log.error(`Error checking for client: ${error}`);
          }
        }, 2000);
        
        // Set timeout for client connection
        const timeoutId = setTimeout(() => {
          clearInterval(checkInterval);
          reject(new Error(`Timeout waiting for client connection: ${expectedClientId}`));
        }, 300000); // Wait up to 5 minutes for the client to connect
      });
      
      try {
        // Wait for client connection
        const connectedClientId = await clientConnectionPromise;
        
        // Store the session in our API key mapping
        apiKeyToSession.set(apiKey, { 
          sessionId, 
          clientId: connectedClientId,
          lastActivity: Date.now()
        });
        
        // Return success with the session ID and client ID
        pendingHeadlessSessionsRequests.delete(apiKey);
        return safeResponse(res, 200, {
          success: true,
          message: "Foundry session started successfully",
          sessionId,
          clientId: connectedClientId
        });
      } catch (error) {
        // Close the browser if client connection times out
        await browser.close();
        browserSessions.delete(sessionId);
        
        const errorMessage = error instanceof Error ? error.message : String(error);
        pendingHeadlessSessionsRequests.delete(apiKey);
        return safeResponse(res, 408, { 
          error: "Client connection timeout", 
          details: errorMessage,
          message: "Foundry client failed to connect to the API within the timeout period"
        });
      }
        } catch (error) {
      log.error(`Error starting headless Foundry session: ${error}`);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return safeResponse(res, 500, { error: "Failed to start headless Foundry session", details: errorMessage });
    }
  } catch (error) {
      log.error(`Error in start-session handler: ${error}`);
      return safeResponse(res, 500, { error: "Internal server error" });
    }
  });

  // Stop headless Foundry session
  router.delete("/end-session", requestForwarderMiddleware, authMiddleware, async (req: Request, res: Response) => {
    try {
      const sessionId = req.query.sessionId as string;
      const apiKey = req.header('x-api-key') as string;
      
      if (!sessionId) {
        return safeResponse(res, 400, { error: "Session ID is required" });
      }
      
      // Check if we have this session locally
      const browser = browserSessions.get(sessionId);
      let sessionClosed = false;
      
      // Try to close browser if we have it locally
      if (browser) {
        try {
          await browser.close();
          browserSessions.delete(sessionId);
          sessionClosed = true;
          log.info(`Closed browser for session ${sessionId} locally`);
        } catch (error) {
          log.error(`Failed to close browser: ${error}`);
        }
      }
      
      // Clean up session data in Redis regardless
      try {
        const redis = getRedisClient();
        if (redis) {
          // Get session data to find associated client
          const sessionData = await redis.hgetall(`headless_session:${sessionId}`);
          
          if (sessionData && sessionData.apiKey === apiKey) {
            // Delete all session-related keys
            if (sessionData.clientId) {
              await redis.del(`headless_client:${sessionData.clientId}`);
            }
            await redis.del(`headless_apikey:${apiKey}`);
            await redis.del(`headless_session:${sessionId}`);
            
            log.info(`Cleaned up Redis data for session ${sessionId}`);
            return safeResponse(res, 200, { 
              success: true, 
              message: sessionClosed ? "Foundry session terminated" : "Foundry session data cleaned up" 
            });
          } else {
            return safeResponse(res, 403, { error: "Not authorized to terminate this session" });
          }
        }
      } catch (error) {
        log.error(`Error cleaning up Redis session data: ${error}`);
      }
      
      // If we got here with sessionClosed true, we closed the browser but failed Redis cleanup
      if (sessionClosed) {
        return safeResponse(res, 200, { success: true, message: "Foundry session terminated (partial cleanup)" });
      }
      
      return safeResponse(res, 404, { error: "Session not found" });
    } catch (error) {
      log.error(`Error in end-session handler: ${error}`);
      return safeResponse(res, 500, { error: "Internal server error" });
    }
  });
  
  // Get all active headless Foundry sessions
  router.get("/session", requestForwarderMiddleware, authMiddleware, async (req: Request, res: Response) => {
    try {
      const apiKey = req.header('x-api-key') as string;
      const redis = getRedisClient();
      let sessions: any[] = [];
      
      // Try to get session data from Redis first
      if (redis) {
        // Check if this API key has a headless session in Redis
        const sessionId = await redis.get(`headless_session:${apiKey}`);
        
        if (sessionId) {
          // Get full session details
          const sessionData = await redis.hgetall(`headless_session:${sessionId}`);
          
          if (sessionData) {
            // Parse timestamps
            const lastActivity = parseInt(sessionData.lastActivity || '0');
            
            sessions.push({
              id: sessionId,
              clientId: sessionData.clientId || '',
              lastActivity: lastActivity,
              idleMinutes: Math.round((Date.now() - lastActivity) / 60000),
              instanceId: sessionData.instanceId || 'unknown'
            });
          }
        }
      } else {
        // Fall back to local storage if Redis is not available
        const userSession = apiKeyToSession.get(apiKey);
        
        if (userSession) {
          sessions.push({
            id: userSession.sessionId,
            clientId: userSession.clientId,
            lastActivity: userSession.lastActivity,
            idleMinutes: Math.round((Date.now() - userSession.lastActivity) / 60000),
            instanceId: process.env.FLY_ALLOC_ID || 'local'
          });
        }
      }
      
      safeResponse(res, 200, { 
        activeSessions: sessions
      });
    } catch (error) {
      log.error(`Error retrieving headless sessions: ${error}`);
      safeResponse(res, 500, { error: "Failed to retrieve session data" });
    }
  });

  // API Documentation endpoint - returns all available endpoints with their documentation
  router.get("/api/docs", async (req: Request, res: Response) => {
    // Build comprehensive documentation object with all endpoints
    const apiDocs = {
      version: "1.0.0",
      baseUrl: `${req.protocol}://${req.get('host')}`,
      authentication: {
        required: true,
        headerName: "x-api-key",
        description: "API key must be included in the x-api-key header for all endpoints except /api/status"
      },
      endpoints: [
        {
          method: "GET",
          path: "/clients",
          description: "Returns connected client Foundry Worlds",
          requiredParameters: [],
          optionalParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ],
          responseExample: {
            total: 2,
            clients: [
              {
                id: "foundry-id-1",
                lastSeen: 1741132430381,
                connectedSince: 1741132430381
              },
              {
                id: "foundry-id-2",
                lastSeen: 1741132381381,
                connectedSince: 1741132381381
              }
            ]
          }
        },
        {
          method: "GET",
          path: "/search",
          description: "Searches Foundry VTT entities using QuickInsert",
          requiredParameters: [
            { name: "query", type: "string", description: "Search term", location: "query" },
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "filter", type: "string", description: "Filter results by type", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "GET",
          path: "/get",
          description: "Returns JSON data for the specified entity",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "uuid", type: "string", description: "The UUID of the entity to retrieve", location: "query" },
            { name: "selected", type: "string", description: "If 'true', returns all selected entities", location: "query" },
            { name: "actor", type: "string", description: "If 'true' and selected is 'true', returns the currently selected actors", location: "query" },
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "GET",
          path: "/structure",
          description: "Returns the folder structure and compendiums in Foundry",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "GET",
          path: "/contents/:path",
          description: "Returns the contents of a folder or compendium",
          requiredParameters: [
            { name: "path", type: "string", description: "Path to the folder or compendium", location: "path" },
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/create",
          description: "Creates a new entity in Foundry with the given JSON",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "type", type: "string", description: "Entity type (Actor, Item, etc.)", location: "body" },
            { name: "data", type: "object", description: "Entity data", location: "body" }
          ],
          optionalParameters: [
            { name: "folder", type: "string", description: "Folder ID to place the entity in", location: "body" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" },
            { key: "Content-Type", value: "application/json", description: "Must be JSON" }
          ]
        },
        {
          method: "PUT",
          path: "/update",
          description: "Updates an entity with the given JSON props",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "data", type: "object", description: "Entity data", location: "body" }
          ],
          optionalParameters: [
            { name: "uuid", type: "string", description: "UUID of the entity to update", location: "query" },
            { name: "selected", type: "string", description: "If 'true', updates all selected entities", location: "query" },
            { name: "actor", type: "string", description: "If 'true' and selected is 'true', updates the currently selected actors", location: "query" }
          ],
          requestPayload: "JSON object containing the properties to update",
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" },
            { key: "Content-Type", value: "application/json", description: "Must be JSON" }
          ]
        },
        {
          method: "DELETE",
          path: "/delete",
          description: "Deletes the specified entity",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "uuid", type: "string", description: "UUID of the entity to delete", location: "query" },
            { name: "selected", type: "string", description: "If 'true', deletes all selected entities", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "GET",
          path: "/rolls",
          description: "Returns up to the last 20 dice rolls",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "limit", type: "number", description: "Maximum number of rolls to return", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "GET",
          path: "/lastroll",
          description: "Returns the last roll made",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/roll",
          description: "Makes a new roll in Foundry",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "formula", type: "string", description: "Dice roll formula (e.g. '2d6+3') - required if itemUuid is not provided", location: "body" },
            { name: "itemUuid", type: "string", description: "UUID of item to roll - required if formula is not provided", location: "body" },
            { name: "flavor", type: "string", description: "Text to display with the roll", location: "body" },
            { name: "createChatMessage", type: "boolean", description: "Whether to create a chat message", location: "body" },
            { name: "speaker", type: "string", description: "Speaker token/actor UUID for the chat message", location: "body" },
            { name: "target", type: "string", description: "Target token/actor UUID for the roll", location: "body" },
            { name: "whisper", type: "array", description: "Array of user IDs to whisper the roll to", location: "body" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" },
            { key: "Content-Type", value: "application/json", description: "Must be JSON" }
          ]
        },
        {
          method: "GET",
          path: "/sheet",
          description: "Returns raw HTML (or a string in a JSON response) for an entity",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "uuid", type: "string", description: "UUID of the entity to get the sheet for", location: "query" },
            { name: "selected", type: "string", description: "If 'true', returns the sheet for all selected entity", location: "query" },
            { name: "actor", type: "string", description: "If 'true' and selected is 'true', returns the sheet for the currently selected actor", location: "query" },
            { name: "format", type: "string", description: "Response format, 'html' or 'json'", location: "query" },
            { name: "scale", type: "number", description: "Scale factor for the sheet", location: "query" },
            { name: "tab", type: "number", description: "Index of the tab to activate", location: "query" },
            { name: "darkMode", type: "boolean", description: "Whether to use dark mode", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "GET",
          path: "/macros",
          description: "Returns all macros available in Foundry",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/macro/:uuid/execute",
          description: "Executes a macro by UUID",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "uuid", type: "string", description: "UUID of the macro to execute", location: "path" }
          ],
          optionalParameters: [
            { name: "args", type: "object", description: "Arguments to pass to the macro", location: "body" }
          ],
          requestPayload: "JSON object containing the arguments to pass to the macro",
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "GET",
          path: "/encounters",
          description: "Returns all active encounters in the world",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/start-encounter",
          description: "Starts a new encounter with optional tokens",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "tokens", type: "array", description: "Array of token UUIDs to add to the encounter", location: "body" },
            { name: "startWithSelected", type: "boolean", description: "Whether to start with selected tokens", location: "body" },
            { name: "startWithPlayers", type: "boolean", description: "Whether to start with player tokens", location: "body" },
            { name: "rollNPC", type: "boolean", description: "Whether to roll initiative for NPC tokens", location: "body" },
            { name: "rollAll", type: "boolean", description: "Whether to roll initiative for all tokens", location: "body" },
            { name: "name", type: "string", description: "Name for the encounter", location: "body" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" },
            { key: "Content-Type", value: "application/json", description: "Must be JSON" }
          ]
        },
        {
          method: "POST",
          path: "/next-turn",
          description: "Advances to the next turn in an encounter",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "encounter", type: "string", description: "ID of the encounter to advance (uses active encounter if not specified)", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/next-round",
          description: "Advances to the next round in an encounter",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "encounter", type: "string", description: "ID of the encounter to advance (uses active encounter if not specified)", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/last-turn",
          description: "Goes back to the previous turn in an encounter",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "encounter", type: "string", description: "ID of the encounter to rewind (uses active encounter if not specified)", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/last-round",
          description: "Goes back to the previous round in an encounter",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "encounter", type: "string", description: "ID of the encounter to rewind (uses active encounter if not specified)", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/end-encounter",
          description: "Ends a specific encounter",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
          ],
          optionalParameters: [
            { name: "encounter", type: "string", description: "ID of the encounter to end", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/add-to-encounter",
          description: "Add entities to an encounter",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "encounter", type: "string", description: "ID of the encounter to add to", location: "query" },
            { name: "uuids", type: "array", description: "Array of entity UUIDs to add", location: "body" },
            { name: "selected", type: "boolean", description: "Whether to add selected tokens", location: "body" },
            { name: "rollInitiative", type: "boolean", description: "Whether to roll initiative for all entities", location: "body" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" },
            { key: "Content-Type", value: "application/json", description: "Must be JSON" }
          ]
        },
        {
          method: "POST",
          path: "/remove-from-encounter",
          description: "Remove entities from an encounter",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "encounter", type: "string", description: "ID of the encounter to remove from", location: "query" },
            { name: "uuids", type: "array", description: "Array of entity UUIDs to remove", location: "body" },
            { name: "selected", type: "boolean", description: "Whether to remove selected tokens", location: "body" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" },
            { key: "Content-Type", value: "application/json", description: "Must be JSON" }
          ]
        },
        {
          method: "POST",
          path: "/kill",
          description: "Mark an entity as defeated",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "uuid", type: "string", description: "UUID of the entity to mark as defeated", location: "query" },
            { name: "selected", type: "string", description: "If 'true' mark all selected tokens as defeated", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/decrease",
          description: "Decrease an attribute value on an entity",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "attribute", type: "string", description: "Attribute path (e.g. 'system.attributes.hp.value')", location: "body" },
            { name: "amount", type: "number", description: "Amount to decrease", location: "body" }
          ],
          optionalParameters: [
            { name: "uuid", type: "string", description: "UUID of the entity", location: "query" },
            { name: "selected", type: "string", description: "If 'true' decrease all selected tokens", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/increase",
          description: "Increase an attribute value on an entity",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "attribute", type: "string", description: "Attribute path (e.g. 'system.attributes.hp.value')", location: "body" },
            { name: "amount", type: "number", description: "Amount to increase", location: "body" }
          ],
          optionalParameters: [
            { name: "uuid", type: "string", description: "UUID of the entity", location: "query" },
            { name: "selected", type: "string", description: "If 'true' increase all selected tokens", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "POST",
          path: "/give",
          description: "Transfer an item from one actor to another",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "itemUuid", type: "string", description: "UUID of the item to transfer", location: "body" }
          ],
          optionalParameters: [
            { name: "fromUuid", type: "string", description: "UUID of the source actor", location: "body" },
            { name: "toUuid", type: "string", description: "UUID of the target actor", location: "body" },
            { name: "selected", type: "boolean", description: "If true, transfer to selected actor", location: "body" },
            { name: "quantity", type: "number", description: "Amount of the item to transfer", location: "body" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API Key" },
            { key: "Content-Type", value: "application/json", description: "Must be JSON" }
          ]
        },
        {
          method: "POST",
          path: "/start-headless-foundry",
          description: "Starts a headless Foundry VTT session and logs in",
          requiredParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" },
            { key: "x-foundry-url", value: "https://your-foundry-server.com", description: "URL to the Foundry VTT server" },
            { key: "x-username", value: "username", description: "Username to log in with" },
            { key: "x-password", value: "password", description: "Password to log in with" }
          ],
          optionalParameters: [
            { key: "x-world-name", value: "World Name", description: "Name of the world to join (if URL doesn't go directly to login)" }
          ]
        },
        {
          method: "GET",
          path: "/headless-foundry",
          description: "Lists all active headless Foundry sessions",
          requiredParameters: [],
          optionalParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "DELETE",
          path: "/headless-foundry/:sessionId",
          description: "Terminates a headless Foundry session",
          requiredParameters: [
            { name: "sessionId", type: "string", description: "ID of the session to terminate", location: "path" }
          ],
          optionalParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "GET",
          path: "/api/status",
          description: "Returns the API status and version",
          requiredParameters: [],
          optionalParameters: [],
          requestHeaders: [],
          authentication: false
        },
        {
          method: "GET",
          path: "/api/docs",
          description: "Returns this API documentation",
          requiredParameters: [],
          optionalParameters: [],
          requestHeaders: [],
          authentication: false
        }
      ]
    };

    safeResponse(res, 200, apiDocs);
  });

  // Mount the router
  app.use("/", router);
};

// Track pending requests
interface PendingRequest {
  res: express.Response;
  type: 'search' | 'entity' | 'structure' | 'contents' | 'create' | 'update' | 'delete' | 
         'rolls' | 'lastroll' | 'roll' | 'actor-sheet' | 'macro-execute' | 'macros' | 
         'encounters' | 'start-encounter' | 'next-turn' | 'next-round' | 'last-turn' | 'last-round' | 
         'end-encounter' | 'add-to-encounter' | 'remove-from-encounter' | 'kill' | 'decrease' | 'increase' | 'give';
  clientId?: string;
  uuid?: string;
  path?: string;
  query?: string;
  filter?: string;
  timestamp: number;
  format?: string;
  initialScale?: number | null;
  activeTab?: number | null;
  darkMode?: boolean;
}

const pendingRequests = new Map<string, PendingRequest>();

// Setup WebSocket message handlers to route responses back to API requests
function setupMessageHandlers() {
  // Handler for search results
  ClientManager.onMessageType("search-results", (client: Client, data: any) => {
    log.info(`Received search results for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'search' && pending.clientId) {
        
        // Send response with metadata
        safeResponse(pending.res, 200, {
          requestId: data.requestId,
          clientId: pending.clientId,
          query: data.query || pending.query || "",
          filter: data.filter || pending.filter,
          totalResults: data.results.length,
          results: data.results
        });
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });
  
  // Handler for entity data
  ClientManager.onMessageType("entity-data", (client: Client, data: any) => {
    log.info(`Received entity data for requestId: ${data.requestId}, uuid: ${data.uuid}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'entity' && data.data) {
        
        // Include metadata in response wrapper
        safeResponse(pending.res, 200, {
          requestId: data.requestId,
          clientId: pending.clientId,
          uuid: data.uuid,
          data: data.data
        });
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for structure data
  ClientManager.onMessageType("structure-data", (client: Client, data: any) => {
    log.info(`Received structure data for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'structure') {
        // Send response with metadata
        safeResponse(pending.res, 200, {
          requestId: data.requestId,
          clientId: pending.clientId,
          folders: data.folders || [],
          compendiums: data.compendiums || []
        });
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for contents data
  ClientManager.onMessageType("contents-data", (client: Client, data: any) => {
    log.info(`Received contents data for requestId: ${data.requestId}, path: ${data.path}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'contents' && pending.path === data.path) {
        // Send response with metadata
        safeResponse(pending.res, 200, {
          requestId: data.requestId,
          clientId: pending.clientId,
          path: data.path,
          entities: data.entities || []
        });
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for entity creation response
  ClientManager.onMessageType("entity-created", (client: Client, data: any) => {
    log.info(`Received entity created response for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'create') {
        if (data.error) {
          safeResponse(pending.res, 400, {
            requestId: data.requestId,
            clientId: pending.clientId,
            error: data.error,
            message: data.message || "Failed to create entity"
          });
        } else {
          // Send response with the new entity data and metadata
          safeResponse(pending.res, 201, {
            requestId: data.requestId,
            clientId: pending.clientId,
            uuid: data.uuid,
            entity: data.entity
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for entity update response
  ClientManager.onMessageType("entity-updated", (client: Client, data: any) => {
    log.info(`Received entity updated response for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'update' && pending.uuid === data.uuid) {
        if (data.error) {
          safeResponse(pending.res, 400, {
            requestId: data.requestId,
            clientId: pending.clientId,
            uuid: data.uuid,
            error: data.error,
            message: data.message || "Failed to update entity"
          });
        } else {
          // Send response with the updated entity data and metadata
          safeResponse(pending.res, 200, {
            requestId: data.requestId,
            clientId: pending.clientId,
            uuid: data.uuid,
            entities: data.entity
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for entity deletion response
  ClientManager.onMessageType("entity-deleted", (client: Client, data: any) => {
    log.info(`Received entity deleted response for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'delete' && pending.uuid === data.uuid) {
        if (data.error) {
          safeResponse(pending.res, 400, {
            requestId: data.requestId,
            clientId: pending.clientId,
            uuid: data.uuid,
            error: data.error,
            message: data.message || "Failed to delete entity"
          });
        } else {
          // Send success response with metadata
          safeResponse(pending.res, 200, {
            requestId: data.requestId,
            clientId: pending.clientId,
            uuid: data.uuid,
            message: "Successfully deleted"
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for rolls data response
  ClientManager.onMessageType("rolls-data", (client: Client, data: any) => {
    log.info(`Received rolls data response for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'rolls') {
        // Send response
        safeResponse(pending.res, 200, {
          clientId: client.getId(),
          rolls: data.data || []
        });
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
      }
    }
  });

  // Handler for last roll data response
  ClientManager.onMessageType("last-roll-data", (client: Client, data: any) => {
    log.info(`Received last roll data response for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'lastroll') {
        
        // Send response
        safeResponse(pending.res, 200, {
          clientId: client.getId(),
          roll: data.data || null
        });
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
      }
    }
  });

  // Handler for roll result
  ClientManager.onMessageType("roll-result", (client: Client, data: any) => {
    log.info(`Received roll result for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'roll') {
        if (!data.success) {
          safeResponse(pending.res, 400, {
            clientId: client.getId(),
            error: data.error || "Failed to perform roll"
          });
        } else {
          
          // Send response
          safeResponse(pending.res, 200, {
            clientId: client.getId(),
            success: true,
            roll: data.data
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
      }
    }
  });

  // Handler for actor sheet HTML response
  ClientManager.onMessageType("actor-sheet-html-response", (client: Client, data: any) => {
    log.info(`Received actor sheet HTML response for requestId: ${data.requestId}`);
    
    try {
      // Extract the UUID from either data.uuid or data.data.uuid
      const responseUuid = data.uuid || (data.data && data.data.uuid);
      
      // Debug what we're receiving
      log.debug(`Actor sheet response data structure:`, {
        requestId: data.requestId,
        uuid: responseUuid,
        dataKeys: data.data ? Object.keys(data.data) : [],
        html: data.data && data.data.html ? `${data.data.html.substring(0, 100)}...` : undefined,
        cssLength: data.data && data.data.css ? data.data.css.length : 0
      });
      
      if (data.requestId && pendingRequests.has(data.requestId)) {
        const pending = pendingRequests.get(data.requestId)!;
        
        // Compare with either location
        if (pending.type === 'actor-sheet' && pending.uuid === responseUuid) {
          if (data.error || (data.data && data.data.error)) {
            const errorMsg = data.error || (data.data && data.data.error) || "Unknown error";
            safeResponse(pending.res, 404, {
              requestId: data.requestId,
              clientId: pending.clientId,
              uuid: pending.uuid,
              error: errorMsg
            });
          } else {
            // Get HTML content from either data or data.data
            let html = data.html || (data.data && data.data.html) || '';
            const css = data.css || (data.data && data.data.css) || '';
            
            // Get the system ID for use in the HTML output
            const gameSystemId = (client as any).metadata?.systemId || 'unknown';
            
            if (pending.format === 'json') {
              // Send response as JSON
              safeResponse(pending.res, 200, {
                requestId: data.requestId,
                clientId: pending.clientId,
                uuid: pending.uuid,
                html: html,
                css: css
              });
            } else {
              // Get the scale and tab parameters from the pending request
              const initialScale = pending.initialScale || null;
              // Convert activeTab to a number if it exists, or keep as null
              const activeTabIndex = pending.activeTab !== null ? Number(pending.activeTab) : null;

              // If a specific tab index is requested, pre-process the HTML to activate that tab
              if (activeTabIndex !== null && !isNaN(activeTabIndex)) {
              try {
                // Create a virtual DOM to manipulate the HTML
                const dom = new JSDOM(html);
                const document = dom.window.document;
                
                // Find all tab navigation elements
                const tabsElements = document.querySelectorAll('nav.tabs, .tabs');
                
                tabsElements.forEach(tabsElement => {
                // Find all tab items and content tabs
                const tabs = Array.from(tabsElement.querySelectorAll('.item'));
                const sheet = tabsElement.closest('.sheet');
                
                if (sheet && tabs.length > 0 && activeTabIndex < tabs.length) {
                  const tabContent = sheet.querySelectorAll('.tab');
                  
                  if (tabs.length > 0 && tabContent.length > 0) {
                  // Deactivate all tabs first
                  tabs.forEach(tab => tab.classList.remove('active'));
                  tabContent.forEach(content => content.classList.remove('active'));
                  
                  // Get the tab at the specified index
                  const targetTab = tabs[activeTabIndex];
                  
                  if (targetTab) {
                    // Get the data-tab attribute from this tab
                    const tabName = targetTab.getAttribute('data-tab');
                    
                    // Find the corresponding content tab
                    let targetContent = null;
                    for (let i = 0; i < tabContent.length; i++) {
                    if (tabContent[i].getAttribute('data-tab') === tabName) {
                      targetContent = tabContent[i];
                      break;
                    }
                    }
                    
                    // Activate both the tab and its content
                    targetTab.classList.add('active');
                    if (targetContent) {
                    targetContent.classList.add('active');
                    log.debug(`Pre-activated tab index ${activeTabIndex} with data-tab: ${tabName}`);
                    }
                  }
                  }
                }
                });
                
                // Get the modified HTML
                html = document.querySelector('body')?.innerHTML || html;
                }
              catch (error) {
                log.warn(`Failed to pre-process HTML for tab selection: ${error}`);
                // Continue with the original HTML if there was an error
              }}

              // If dark mode is requested, flag it for later use in the full HTML document
              const darkModeEnabled = pending.darkMode || false;

              // Determine if we should include interactive JavaScript
              const includeInteractiveJS = initialScale === null && activeTabIndex === null;

              // Generate the full HTML document
              const fullHtml = returnHtmlTemplate(responseUuid, html, css, gameSystemId, darkModeEnabled, includeInteractiveJS, activeTabIndex || 0, initialScale || 0, pending);
              
              pending.res.send(fullHtml);
            }
          }
          
          // Remove pending request
          pendingRequests.delete(data.requestId);
        } else {
          // Log an issue if UUID doesn't match what we expect
          log.warn(`Received actor sheet response with mismatched values: expected type=${pending.type}, uuid=${pending.uuid}, got uuid=${responseUuid}`);
        }
      } else {
        log.warn(`Received actor sheet response for unknown requestId: ${data.requestId}`);
      }
    } catch (error) {
      log.error(`Error handling actor sheet HTML response:`, { error });
      log.debug(`Response data that caused the error:`, {
        requestId: data.requestId,
        hasData: !!data.data,
        dataType: typeof data.data
      });
    }
  });

  // Handler for macros list response
  ClientManager.onMessageType("macros-list", (client: Client, data: any) => {
    log.info(`Received macros list for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'macros') {
        if (data.error) {
          safeResponse(pending.res, 400, {
            clientId: client.getId(),
            error: data.error,
            message: "Failed to retrieve macros"
          });
        } else {
          // Send response with metadata
          safeResponse(pending.res, 200, {
            clientId: client.getId(),
            total: data.macros?.length || 0,
            macros: data.macros || []
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });
  
  // Handler for macro execution result
  ClientManager.onMessageType("macro-execution-result", (client: Client, data: any) => {
    log.info(`Received macro execution result for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'macro-execute' && pending.uuid === data.uuid) {
        if (!data.success) {
          safeResponse(pending.res, 400, {
            clientId: client.getId(),
            uuid: data.uuid,
            error: data.error || "Failed to execute macro"
          });
        } else {
          // Send response with execution result
          safeResponse(pending.res, 200, {
            clientId: client.getId(),
            uuid: data.uuid,
            success: true,
            result: data.result
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for encounters list
  ClientManager.onMessageType("encounters-list", (client: Client, data: any) => {
    log.info(`Received encounters list for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'encounters') {
        // Send response with metadata
        safeResponse(pending.res, 200, {
          requestId: data.requestId,
          clientId: pending.clientId,
          encounters: data.encounters || []
        });
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for start encounter response
  ClientManager.onMessageType("encounter-started", (client: Client, data: any) => {
    log.info(`Received encounter started response for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'start-encounter') {
        if (data.error) {
          safeResponse(pending.res, 400, {
            requestId: data.requestId,
            clientId: pending.clientId,
            error: data.error,
            message: data.message || "Failed to start encounter"
          });
        } else {
          // Send response with the new encounter data
          safeResponse(pending.res, 201, {
            requestId: data.requestId,
            clientId: pending.clientId,
            encounterId: data.encounterId,
            encounter: data.encounter || {}
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for encounter navigation (next/previous turn/round)
  ClientManager.onMessageType("encounter-navigation", (client: Client, data: any) => {
    log.info(`Received encounter navigation response for requestId: ${data.requestId}, action: ${data.action}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      // Check if this is any of our navigation types
      if (['next-turn', 'next-round', 'last-turn', 'last-round'].includes(pending.type)) {
        if (data.error) {
          safeResponse(pending.res, 400, {
            requestId: data.requestId,
            clientId: pending.clientId,
            error: data.error,
            message: data.message || `Failed to perform ${pending.type}`
          });
        } else {
          // Send response with the current state
          safeResponse(pending.res, 200, {
            requestId: data.requestId,
            clientId: pending.clientId,
            encounterId: data.encounterId,
            action: data.action,
            currentTurn: data.currentTurn,
            currentRound: data.currentRound,
            actorTurn: data.actorTurn,
            tokenTurn: data.tokenTurn,
            encounter: data.encounter || {}
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for encounter ended
  ClientManager.onMessageType("encounter-ended", (client: Client, data: any) => {
    log.info(`Received encounter ended response for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'end-encounter') {
        if (data.error) {
          safeResponse(pending.res, 400, {
            requestId: data.requestId,
            clientId: pending.clientId,
            error: data.error,
            message: data.message || "Failed to end encounter"
          });
        } else {
          // Send response with metadata
          safeResponse(pending.res, 200, {
            requestId: data.requestId,
            clientId: pending.clientId,
            encounterId: data.encounterId,
            message: "Encounter successfully ended"
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for add-to-encounter result
  ClientManager.onMessageType("add-to-encounter-result", (client: Client, data: any) => {
    log.info(`Received add-to-encounter result for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'add-to-encounter') {
        if (data.error) {
          safeResponse(pending.res, 400, {
            requestId: data.requestId,
            clientId: pending.clientId,
            error: data.error,
            message: "Failed to add to encounter"
          });
        } else {
          safeResponse(pending.res, 200, {
            requestId: data.requestId,
            clientId: pending.clientId,
            encounterId: data.encounterId,
            added: data.added || [],
            failed: data.failed || []
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
      }
    }
  });

  // Handler for remove-from-encounter result
  ClientManager.onMessageType("remove-from-encounter-result", (client: Client, data: any) => {
    log.info(`Received remove-from-encounter result for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'remove-from-encounter') {
        if (data.error) {
          safeResponse(pending.res, 400, {
            requestId: data.requestId,
            clientId: pending.clientId,
            error: data.error,
            message: "Failed to remove from encounter"
          });
        } else {
          safeResponse(pending.res, 200, {
            requestId: data.requestId,
            clientId: pending.clientId,
            encounterId: data.encounterId,
            removed: data.removed || [],
            failed: data.failed || []
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
      }
    }
  });

  // Handler for kill entity result
  ClientManager.onMessageType("kill-entity-result", (client: Client, data: any) => {
    log.info(`Received kill-entity result for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'kill') {
        if (data.error) {
          safeResponse(pending.res, 400, {
            requestId: data.requestId,
            clientId: pending.clientId,
            error: data.error,
            uuid: data.uuid || "",
            success: false
          });
        } else {
          safeResponse(pending.res, 200, {
            requestId: data.requestId,
            clientId: pending.clientId,
            uuid: data.uuid,
            success: data.success,
            message: data.message || "Entity marked as defeated"
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
      }
    }
  });

  // Handler for modify attribute (increase/decrease) results
  ClientManager.onMessageType("modify-attribute-result", (client: Client, data: any) => {
    log.info(`Received modify-attribute result for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'increase' || pending.type === 'decrease') {
        if (data.error) {
          safeResponse(pending.res, 400, {
            requestId: data.requestId,
            clientId: pending.clientId,
            error: data.error,
            uuid: data.uuid || "",
            attribute: data.attribute || "",
            success: false
          });
        } else {
          safeResponse(pending.res, 200, {
            requestId: data.requestId,
            clientId: pending.clientId,
            uuid: data.uuid,
            attribute: data.attribute,
            success: data.success,
            newValue: data.newValue,
            oldValue: data.oldValue
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
      }
    }
  });

  // Handler for give item result
  ClientManager.onMessageType("give-item-result", (client: Client, data: any) => {
    log.info(`Received give-item result for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'give') {
        if (data.error) {
          safeResponse(pending.res, 400, {
            requestId: data.requestId,
            clientId: pending.clientId,
            error: data.error,
            success: false
          });
        } else {
          safeResponse(pending.res, 200, {
            requestId: data.requestId,
            clientId: pending.clientId,
            fromUuid: data.fromUuid,
            toUuid: data.toUuid,
            itemUuid: data.itemUuid,
            newItemUuid: data.newItemUuid,
            success: data.success,
            message: data.message || "Item successfully transferred"
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
      }
    }
  });

  // Clean up old pending requests periodically
  setInterval(() => {
    const now = Date.now();
    for (const [requestId, request] of pendingRequests.entries()) {
      // Remove requests older than 30 seconds
      if (now - request.timestamp > 30000) {
        log.warn(`Request ${requestId} timed out and was never completed`);
        pendingRequests.delete(requestId);
      }
    }
  }, 10000);
}
