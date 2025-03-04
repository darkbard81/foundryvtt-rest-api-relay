import express from "express";
import path from "path";
import { log } from "../middleware/logger";
import { ActorDataStore } from "../core/ActorDataStore"; 
import { ClientManager } from "../core/ClientManager";
import { Client } from "../core/Client"; // Import Client type

export const apiRoutes = (app: express.Application): void => {
  // Setup handlers for storing search results and entity data from WebSocket
  setupMessageHandlers();
  
  // Create a router instead of using app directly
  const router = express.Router();

  // Define routes on the router
  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../_test/test-client.html"));
  });

  router.get("/health", (req, res) => {
    return res.json({
      status: "ok",
      instance: process.env.FLY_MACHINE_ID,
    });
  });

  router.get("/browse", (req, res) => {
    res.sendFile(path.join(__dirname, "../../_test/test-client.html"));
  });

  router.get("/api/status", (req, res) => {
    res.json({ 
      status: "ok",
      version: "1.0.0",
      websocket: "/relay"
    });
  });

  // Get all connected clients
  router.get("/clients", (req, res) => {
    const token = req.query.token as string;
    const clients = ClientManager.getConnectedClients(token);
    
    return res.json({
      total: clients.length,
      clients
    });
  });
  
  // Search endpoint that relays to Foundry's Quick Insert
  router.get("/search", async (req, res) => {
    const query = req.query.query as string;
    const filter = req.query.filter as string;
    const clientId = req.query.clientId as string;
    
    if (!query) {
      return res.status(400).json({ 
        error: "Query parameter is required",
        howToUse: "Add ?query=yourSearchTerm to your request"
      });
    }
    
    if (!clientId) {
      return res.status(400).json({ 
        error: "Client ID is required to identify the Foundry instance",
        howToUse: "Add &clientId=yourClientId to your request",
        tip: "Get a list of available client IDs at /clients"
      });
    }
    
    // Find a connected client with this ID
    const client = ClientManager.getClient(clientId);
    if (!client) {
      return res.status(404).json({ 
        error: "No connected Foundry instance found with this client ID",
        availableClients: ClientManager.getConnectedClients().map(c => c.id),
        tip: "Get a list of available client IDs at /clients"
      });
    }
    
    try {
      // Generate a unique requestId for this search
      const requestId = `search_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      // Store the response object in a request map
      pendingRequests.set(requestId, { 
        res,
        type: 'search',
        clientId,
        timestamp: Date.now() 
      });
      
      // Clear any previous cached results for this client
      ActorDataStore.clearSearchResults(clientId);
      
      // Send request to Foundry for search
      const sent = client.send({
        type: "perform-search",
        query,
        filter: filter || null,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        return res.status(500).json({ 
          error: "Failed to send search request to Foundry client",
          suggestion: "The client may be disconnecting or experiencing issues"  
        });
      }
      
      // Set timeout for request
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          res.status(408).json({ 
            error: "Search request timed out", 
            tip: "The Foundry client might be busy or still building its index."
          });
        }
      }, 10000); // 10 seconds timeout
      
    } catch (error) {
      log.error(`Error processing search request: ${error}`);
      return res.status(500).json({ error: "Failed to process search request" });
    }
  });

  // Get entity by UUID
  router.get("/get/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    const clientId = req.query.clientId as string;
    const noCache = req.query.noCache === 'true';
    
    if (!uuid) {
      return res.status(400).json({ error: "UUID parameter is required" });
    }
    
    if (!clientId) {
      return res.status(400).json({ 
        error: "Client ID is required to identify the Foundry instance",
        howToUse: "Add &clientId=yourClientId to your request",
        tip: "Get a list of available client IDs at /clients"
      });
    }
    
    // Find a connected client with this ID
    const client = ClientManager.getClient(clientId);
    if (!client) {
      // Get a list of available clients to help the user
      const availableClients = ClientManager.getConnectedClients();
      
      return res.status(404).json({ 
        error: "No connected Foundry instance found with this client ID",
        availableClientIds: availableClients.map(c => c.id),
        tip: "Get a list of available client IDs at /clients"
      });
    }
    
    try {
      // Check if we already have cached entity and should use it
      if (!noCache) {
        const cachedEntity = ActorDataStore.getEntity(uuid);
        if (cachedEntity) {
          return res.json(cachedEntity);
        }
      }
      
      // Generate a unique requestId for this entity request
      const requestId = `entity_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      // Store the response object in a request map
      pendingRequests.set(requestId, { 
        res,
        type: 'entity',
        uuid,
        timestamp: Date.now() 
      });
      
      // If noCache is true, clear any existing cached entity
      if (noCache) {
        ActorDataStore.clearEntityCache(uuid);
      }
      
      // Send request to Foundry for entity data
      const sent = client.send({
        type: "get-entity",
        uuid,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        return res.status(500).json({ 
          error: "Failed to send entity request to Foundry client",
          suggestion: "The client may be disconnecting or experiencing issues"  
        });
      }
      
      // Set timeout for request
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          res.status(408).json({ 
            error: "Entity request timed out", 
            tip: "The Foundry client might be busy or the UUID might not exist."
          });
        }
      }, 10000); // 10 seconds timeout
    } catch (error) {
      log.error(`Error processing entity request: ${error}`);
      return res.status(500).json({ error: "Failed to process entity request" });
    }
  });
  
  // Mount the router
  app.use("/", router);
};

// Track pending requests
interface PendingRequest {
  res: express.Response;
  type: 'search' | 'entity';
  clientId?: string;
  uuid?: string;
  timestamp: number;
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
        // Store results in ActorDataStore for reference
        ActorDataStore.storeSearchResults(pending.clientId, data.results);
        
        // Send response
        pending.res.json({
          query: data.query || "",
          filter: data.filter,
          totalResults: data.results.length,
          results: data.results
        });
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
    
    // Store results in case they're for a request we haven't processed yet
    if (data.results && client) {
      ActorDataStore.storeSearchResults(client.getId(), data.results);
    }
  });
  
  // Handler for entity data
  ClientManager.onMessageType("entity-data", (client: Client, data: any) => {
    log.info(`Received entity data for requestId: ${data.requestId}, uuid: ${data.uuid}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'entity' && data.data) {
        // Store entity in ActorDataStore
        ActorDataStore.storeEntity(data.uuid, data.data);
        
        // Send response
        pending.res.json(data.data);
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
    
    // Store entity in case it's for a request we haven't processed yet
    if (data.uuid && data.data) {
      ActorDataStore.storeEntity(data.uuid, data.data);
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
