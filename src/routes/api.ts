import express, { Request, Response, NextFunction } from "express";
import path from "path";
// import { log } from "../middleware/logger";
import { ClientManager } from "../core/ClientManager";
import { Client } from "../core/Client"; // Import Client type
import axios from 'axios';
import { PassThrough } from 'stream';
import { JSDOM } from 'jsdom';
import { User } from '../models/user';
import { authMiddleware, trackApiUsage } from '../middleware/auth';
import { requestForwarderMiddleware } from '../middleware/requestForwarder';
import { log, pendingRequests, PENDING_REQUEST_TYPES, safeResponse } from './shared';
import { dnd5eRouter } from './api/dnd5e';
import { createApiRoute } from './route-helpers';
import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { healthCheck } from '../routes/health';
import { getRedisClient } from '../config/redis';
import { returnHtmlTemplate } from "../config/htmlResponseTemplate";
import { getHeadlessClientId, registerHeadlessSession } from "../workers/headlessSessions";
import * as puppeteer from 'puppeteer';
import multer from "multer";
import fs from "fs/promises";
import { searchRouter } from './api/search';
import { entityRouter } from './api/entity';
import { rollRouter } from './api/roll';
import { utilityRouter } from './api/utility';
import { fileSystemRouter } from './api/fileSystem';
import { sessionRouter } from './api/session';
import { encounterRouter } from './api/encounter';
import { sheetRouter } from './api/sheet';
import { macroRouter } from './api/macro';
import { structureRouter } from './api/structure';

const upload = multer({ dest: "uploads/" });

// Define a safe directory for uploads
const SAFE_UPLOAD_DIR = path.resolve("uploads");

// Middleware to handle `application/javascript` content type
async function handleJavaScriptFile(req: Request, res: Response, next: NextFunction) {
  if (req.is("application/javascript")) {
    try {
      // Generate a safe file path
      const tempFileName = `script_${Date.now()}.js`;
      const tempFilePath = path.join(SAFE_UPLOAD_DIR, tempFileName);

      // Ensure the resolved path is within the safe directory
      if (!tempFilePath.startsWith(SAFE_UPLOAD_DIR)) {
        throw new Error("Invalid file path");
      }

      function validateFileExtension(filePath: string): boolean {
        const allowedExtensions = [".js"];
        const ext = path.extname(filePath).toLowerCase();
        return allowedExtensions.includes(ext);
      }

      if (!validateFileExtension(tempFilePath)) {
        throw new Error("Invalid file extension");
      }

      const chunks: Buffer[] = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", async () => {
        const fileBuffer = Buffer.concat(chunks);
        await fs.writeFile(tempFilePath, fileBuffer);
        req.file = { 
          path: tempFilePath, 
          fieldname: "file", 
          originalname: "script.js", 
          encoding: "7bit", 
          mimetype: "application/javascript", 
          size: fileBuffer.length, 
          destination: "uploads/", 
          filename: path.basename(tempFilePath),
          stream: new PassThrough().end(fileBuffer),
          buffer: fileBuffer
        }; // Simulate multer's `req.file`
        next();
      });
    } catch (error) {
      log.error(`Error handling JavaScript file upload: ${error}`);
      safeResponse(res, 500, { error: "Failed to process JavaScript file" });
    }
  } else {
    next();
  }
}

function validateScript(script: string): boolean {
  // Disallow dangerous patterns
  const forbiddenPatterns = [
    /localStorage/,
    /sessionStorage/,
    /document\.cookie/,
    /eval\(/,
    /new Worker\(/,
    /new SharedWorker\(/,
    /__proto__/,
    /atob\(/,
    /btoa\(/,
    /crypto\./,
    /Intl\./,
    /postMessage\(/,
    /XMLHttpRequest/,
    /importScripts\(/,
    /apiKey/,
    /privateKey/,
    /password/,
  ];
  return !forbiddenPatterns.some((pattern) => pattern.test(script));
}

export const browserSessions = new Map<string, puppeteer.Browser>();
export const apiKeyToSession = new Map<string, { sessionId: string, clientId: string, lastActivity: number }>();

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
      version: "1.8.1",
      websocket: "/relay"
    });
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
        const clientIds = await redis.sMembers(`apikey:${apiKey}:clients`);
        
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
      
      // Handle The Forge specific assets
      if (assetPath.includes('forgevtt-module.css') || assetPath.includes('forge-vtt.com')) {
        log.debug(`Skipping The Forge asset: ${assetPath}`);
        // Return an empty CSS file for Forge assets to prevent errors
        if (assetPath.endsWith('.css')) {
          res.type('text/css').send('/* Placeholder for The Forge CSS */');
          return;
        } else if (assetPath.endsWith('.js')) {
          res.type('application/javascript').send('// Placeholder for The Forge JS');
          return;
        } else {
          // Return a transparent 1x1 pixel for images
          res.type('image/png').send(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64'));
          return;
        }
      }
      
      // Check for texture files - use GitHub raw content as fallback
      if (assetPath.includes('texture1.webp') || assetPath.includes('texture2.webp') || 
          assetPath.includes('parchment.jpg')) {
        log.debug(`Serving texture file from GitHub fallback`);
        res.redirect('https://raw.githubusercontent.com/foundryvtt/dnd5e/master/ui/parchment.jpg');
        return;
      }
      
      // Additional asset fallbacks...
      
      // Try to make the request to Foundry with better error handling
      try {
        const response = await axios({
          method: 'get',
          url: assetUrl,
          responseType: 'stream',
          timeout: 30000, // Increased timeout to 30s
          maxRedirects: 5,
          validateStatus: (status) => status < 500 // Only treat 500+ errors as errors
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
        log.error(`Request failed: ${assetUrl}`);
        
        // For CSS files, return an empty CSS file
        if (assetPath.endsWith('.css')) {
          res.type('text/css').send('/* CSS not available */');
        } else if (assetPath.endsWith('.js')) {
          res.type('application/javascript').send('// JavaScript not available');
        } else {
          // Return a transparent 1x1 pixel for images and other files
          res.type('image/png').send(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64'));
        }
      }
    } catch (error) {
      log.error(`Error in proxy asset handler: ${error}`);
      res.status(404).send('Asset not found');
    }
  });

  // API Documentation endpoint - returns all available endpoints with their documentation
  router.get("/api/docs", async (req: Request, res: Response) => {
    // Build comprehensive documentation object with all endpoints
    const apiDocs = {
      version: "1.8.1",
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
          description: "Give an item to an actor",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "itemUuid", type: "string", description: "UUID of the item to transfer", location: "body" },
            { name: "itemName", type: "string", description: "Name of the item to transfer (if itemUuid is not provided)", location: "body" },
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
          path: "/remove",
          description: "Remove an item from an actor",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "itemUuid", type: "string", description: "UUID of the item to remove", location: "body" },
            { name: "itemName", type: "string", description: "Name of the item to remove (if itemUuid is not provided)", location: "body" },
            { name: "actorUuid", type: "string", description: "UUID of the actor to remove the item from", location: "body" },
            { name: "selected", type: "boolean", description: "If true, remove from selected actor", location: "body" },
            { name: "quantity", type: "number", description: "Amount of the item to remove", location: "body" }
          ],
        },
        {
          method: "POST",
          path: "/select",
          description: "Selects entities in Foundry",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "uuids", type: "array", description: "UUID of the entities to select", location: "body" },
            { name: "name", type: "string", description: "Name of the entities to select", location: "body" },
            { name: "data", type: "object", description: "Data to select entities by (ex. actor.system.attributes.hp.value)", location: "body" },
            { name: "all", type: "boolean", description: "Whether to select all entities on the scene", location: "body" },
            { name: "overwrite", type: "boolean", description: "Whether to overwrite existing selections", location: "body" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API Key" },
            { key: "Content-Type", value: "application/json", description: "Must be JSON" }
          ]
        },
        {
          method: "GET",
          path: "/selected",
          description: "Returns the currently selected entities in Foundry",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API Key" },
            { key: "Content-Type", value: "application/json", description: "Must be JSON" }
          ]
        },
        {
          method: "POST",
          path: "/execute-js",
          description: "Executes JavaScript in Foundry VTT",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "script", type: "string", description: "JavaScript code to execute. Excape quotes and backslashes. No comments.", location: "body" },
            { name: "scriptFile", type: "file", description: "JavaScript file to execute", location: "body" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API Key" },
          ]
        },
        {
          method: "GET",
          path: "/file-system",
          description: "Lists the folder and file structure from the Foundry server",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" }
          ],
          optionalParameters: [
            { name: "path", type: "string", description: "Directory path to list (defaults to root)", location: "query" },
            { name: "source", type: "string", description: "Source to browse (data, public, s3, etc.)", location: "query" },
            { name: "recursive", type: "boolean", description: "Whether to recursively list subdirectories", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API Key" }
          ]
        },
        {
          method: "POST",
          path: "/upload",
          description: "Uploads a file to the Foundry server",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "path", type: "string", description: "Directory path to upload to", location: "query" },
            { name: "filename", type: "string", description: "Name of the file to create", location: "query" }
          ],
          optionalParameters: [
            { name: "file", type: "file", description: "File to upload", location: "body" },
            { name: "fileData", type: "string", description: "Base64-encoded file data", location: "body" },
            { name: "source", type: "string", description: "Source to upload to (data, s3, etc.)", location: "query" },
            { name: "overwrite", type: "boolean", description: "Whether to overwrite existing files", location: "query" },
            { name: "mimeType", type: "string", description: "MIME type of the file", location: "query" }
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API Key" },
            { key: "Content-Type", value: "application/json", description: "Must be JSON" }
          ]
        },
        {
          method: "GET",
          path: "/download",
          description: "Downloads a file from the Foundry server",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "path", type: "string", description: "Path to the file to download", location: "query" }
          ],
          optionalParameters: [
            { name: "source", type: "string", description: "Source to download from (data, public, s3, etc.)", location: "query" },
            { name: "format", type: "string", description: "Format to download the file in (e.g. 'json', 'raw'). Defaults to raw.", location: "query" },
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API Key" }
          ]
        },
        {
          method: "POST",
          path: "/session-handshake",
          description: "Creates an ecryption key and returns a handshake token for use in starting a headless session",
          requiredParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" },
            { key: "x-foundry-url", value: "https://your-foundry-server.com", description: "URL to the Foundry VTT server" },
            { key: "x-username", value: "username", description: "Username to log in with" }
          ],
          optionalParameters: [
            { key: "x-world-name", value: "World Name", description: "Name of the world to join (if URL doesn't go directly to login)", location: "header" }
          ]
        },
        {
          method: "POST",
          path: "/start-session",
          description: "Starts a headless Foundry VTT session and logs in",
          requiredParameters: [
            { name: "handshakeToken", type: "string", description: "Token received from the session-handshake endpoint", location: "body" },
            { name: "encryptedPassword", type: "string", description: "Encrypted data for the Foundry login", location: "body" },
          ],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ],
          optionalParameters: []
        },
        {
          method: "GET",
          path: "/session",
          description: "Lists all active headless Foundry sessions",
          requiredParameters: [],
          optionalParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "DELETE",
          path: "/end-session",
          description: "Terminates a headless Foundry session",
          requiredParameters: [
            { name: "sessionId", type: "string", description: "ID of the session to terminate", location: "query" }
          ],
          optionalParameters: [],
          requestHeaders: [
            { key: "x-api-key", value: "{{apiKey}}", description: "Your API key" }
          ]
        },
        {
          method: "GET",
          path: "/dnd5e/get-actor-details",
          description: "Returns detailed information about a D&D 5e actor",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "actorUuid", type: "string", description: "UUID of the actor to get details for", location: "query" },
            { name: "details", type: "array", description: "List of details to retrieve", location: "query" }
          ],
        },
        {
          method: "POST",
          path: "/dnd5e/modify-experience",
          description: "Modifies the experience points of a D&D 5e actor",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "actorUuid", type: "string", description: "UUID of the actor to modify experience for", location: "body" },
            { name: "amount", type: "number", description: "Amount of experience to add (positive) or subtract (negative)", location: "body" }
          ],
        },
        {
          method: "POST",
          path: "/dnd5e/use-ability",
          description: "Uses an ability for a D&D 5e actor",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "actorUuid", type: "string", description: "UUID of the actor to use the ability for", location: "body" }
          ],
          optionalParameters: [
            { name: "abilityName", type: "string", description: "Ability to use", location: "body" },
            { name: "abilityUuid", type: "string", description: "UUID of the ability to use", location: "body" },
            { name: "targetName", type: "string", description: "Name of the target actor or token (optional)", location: "body" },
            { name: "targetUuid", type: "string", description: "UUID of the target actor or token (optional)", location: "body" }
          ]
        },
        {
          method: "POST",
          path: "/dnd5e/use-feature",
          description: "Uses an feature for a D&D 5e actor",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "actorUuid", type: "string", description: "UUID of the actor to use the ability for", location: "body" }
          ],
          optionalParameters: [
            { name: "abilityName", type: "string", description: "Ability to use", location: "body" },
            { name: "abilityUuid", type: "string", description: "UUID of the ability to use", location: "body" },
            { name: "targetName", type: "string", description: "Name of the target actor or token (optional)", location: "body" },
            { name: "targetUuid", type: "string", description: "UUID of the target actor or token (optional)", location: "body" }
          ]
        },
        {
          method: "POST",
          path: "/dnd5e/use-item",
          description: "Uses an item for a D&D 5e actor",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "actorUuid", type: "string", description: "UUID of the actor to use the ability for", location: "body" }
          ],
          optionalParameters: [
            { name: "abilityName", type: "string", description: "Ability to use", location: "body" },
            { name: "abilityUuid", type: "string", description: "UUID of the ability to use", location: "body" },
            { name: "targetName", type: "string", description: "Name of the target actor or token (optional)", location: "body" },
            { name: "targetUuid", type: "string", description: "UUID of the target actor or token (optional)", location: "body" }
          ]
        },
        {
          method: "POST",
          path: "/dnd5e/use-spell",
          description: "Uses an spell for a D&D 5e actor",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "actorUuid", type: "string", description: "UUID of the actor to use the ability for", location: "body" }
          ],
          optionalParameters: [
            { name: "abilityName", type: "string", description: "Ability to use", location: "body" },
            { name: "abilityUuid", type: "string", description: "UUID of the ability to use", location: "body" },
            { name: "targetName", type: "string", description: "Name of the target actor or token (optional)", location: "body" },
            { name: "targetUuid", type: "string", description: "UUID of the target actor or token (optional)", location: "body" }
          ]
        },
        {
          method: "POST",
          path: "/dnd5e/modify-item-charges",
          description: "Modifies the charges of a D&D 5e item",
          requiredParameters: [
            { name: "clientId", type: "string", description: "Auth token to connect to specific Foundry world", location: "query" },
            { name: "actorUuid", type: "string", description: "UUID of the actor to modify item charges for", location: "body" },
            { name: "itemUuid", type: "string", description: "UUID of the item to modify", location: "body" },
            { name: "amount", type: "number", description: "Amount of charges to add (positive) or subtract (negative)", location: "body" }
          ],
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
  app.use('/', searchRouter);
  app.use('/', entityRouter);
  app.use('/', rollRouter);
  app.use('/', utilityRouter);
  app.use('/', fileSystemRouter);
  app.use('/', sessionRouter);
  app.use('/', encounterRouter);
  app.use('/', sheetRouter);
  app.use('/', macroRouter);
  app.use('/', structureRouter);
  app.use('/dnd5e', dnd5eRouter);
};

const REQUEST_TYPES_WITH_SPECIAL_RESPONSE_HANDLERS = [
  'actor-sheet', 'download-file'
] as const;

// Setup WebSocket message handlers to route responses back to API requests
function setupMessageHandlers() {
  
  for (const type of PENDING_REQUEST_TYPES) {
    if (REQUEST_TYPES_WITH_SPECIAL_RESPONSE_HANDLERS.includes(type as (typeof REQUEST_TYPES_WITH_SPECIAL_RESPONSE_HANDLERS)[number])) {
      continue;
    }

    ClientManager.onMessageType(`${type}-result`, (client: Client, data: any) => {
      log.info(`Received ${type} response for requestId: ${data.requestId}`);

      if (data.requestId && pendingRequests.has(data.requestId)) {
        const pending = pendingRequests.get(data.requestId)!;
        const response: Record<string, any> = { requestId: data.requestId, clientId: pending.clientId };
        for (const [key, value] of Object.entries(data)) {
          if (key !== 'requestId') {
            response[key] = value;
          }
        }
        if (response.error) {
          safeResponse(pending.res, 400, response);
        } else {
          safeResponse(pending.res, 200, response);
        }
        pendingRequests.delete(data.requestId);
        return;
      }
    });
  }

  // Handler for actor sheet HTML response
  ClientManager.onMessageType("actor-sheet-result", (client: Client, data: any) => {
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
        if (pending.type === 'actor-sheet' && (!pending.uuid || pending.uuid === responseUuid)) {
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
              const fullHtml = returnHtmlTemplate(responseUuid, html, css, gameSystemId, darkModeEnabled, includeInteractiveJS, activeTabIndex ?? 0, initialScale ?? 0, pending);
              
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

  // Handler for file download result
  ClientManager.onMessageType("download-file-result", (client: Client, data: any) => {
    log.info(`Received file download result for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const request = pendingRequests.get(data.requestId)!;
      pendingRequests.delete(data.requestId);
      
      if (data.error) {
        safeResponse(request.res, 500, { 
          clientId: client.getId(),
          requestId: data.requestId,
          error: data.error
        });
        return;
      }
      
      // Check if the client wants raw binary data or JSON response
      const format = request.format || 'binary'; // Default to binary format
      
      if (format === 'binary' || format === 'raw') {
        // Extract the base64 data and send as binary
        const base64Data = data.fileData.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Set the appropriate content type
        request.res.setHeader('Content-Type', data.mimeType || 'application/octet-stream');
        request.res.setHeader('Content-Disposition', `attachment; filename="${data.filename}"`);
        request.res.setHeader('Content-Length', buffer.length);
        
        // Send the binary data
        request.res.status(200).end(buffer);
      } else {
        // Send JSON response with the file data
        safeResponse(request.res, 200, {
          clientId: client.getId(),
          requestId: data.requestId,
          success: true,
          path: data.path,
          filename: data.filename,
          mimeType: data.mimeType,
          fileData: data.fileData,
          size: Buffer.from(data.fileData.split(',')[1], 'base64').length
        });
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
