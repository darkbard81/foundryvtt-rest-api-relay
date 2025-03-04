import express from "express";
import path from "path";
import { log } from "../middleware/logger";
import { DataStore } from "../core/DataStore"; 
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
        query: query,
        filter: filter,
        timestamp: Date.now() 
      });
      
      // Clear any previous cached results for this client
      DataStore.clearSearchResults(clientId);
      
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
        const cachedEntity = DataStore.getEntity(uuid);
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
        DataStore.clearEntityCache(uuid);
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

  // Get all folders and compendiums
  router.get("/structure", async (req, res) => {
    const clientId = req.query.clientId as string;
    
    if (!clientId) {
      return res.status(400).json({ 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
    }
    
    const client = ClientManager.getClient(clientId);
    if (!client) {
      return res.status(404).json({ 
        error: "No connected Foundry instance found with this client ID",
        availableClients: ClientManager.getConnectedClients().map(c => c.id)
      });
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
        return res.status(500).json({ 
          error: "Failed to send structure request to Foundry client"
        });
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          res.status(408).json({ error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing structure request: ${error}`);
      return res.status(500).json({ error: "Failed to process structure request" });
    }
  });

  // Get all entity UUIDs in a folder or compendium
  router.get("/contents/:path", async (req, res) => {
    const path = req.params.path;
    const clientId = req.query.clientId as string;
    
    if (!clientId) {
      return res.status(400).json({ 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
    }
    
    if (!path) {
      return res.status(400).json({ error: "Path parameter is required" });
    }
    
    const client = ClientManager.getClient(clientId);
    if (!client) {
      return res.status(404).json({ 
        error: "No connected Foundry instance found with this client ID",
        availableClients: ClientManager.getConnectedClients().map(c => c.id)
      });
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
        return res.status(500).json({ 
          error: "Failed to send contents request to Foundry client"
        });
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          res.status(408).json({ error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing contents request: ${error}`);
      return res.status(500).json({ error: "Failed to process contents request" });
    }
  });

  // Create a new entity
  router.post("/entity", express.json(), async (req, res) => {
    const clientId = req.query.clientId as string;
    const { type, folder, data } = req.body;
    
    if (!clientId) {
      return res.status(400).json({ 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request" 
      });
    }
    
    if (!type || !data) {
      return res.status(400).json({ 
        error: "Request body must include 'type' and 'data' fields",
        example: { type: "Actor", folder: "Folder ID or null", data: { name: "Entity Name", /* other data */ } }
      });
    }
    
    const client = ClientManager.getClient(clientId);
    if (!client) {
      return res.status(404).json({ 
        error: "No connected Foundry instance found with this client ID",
        availableClients: ClientManager.getConnectedClients().map(c => c.id)
      });
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
        return res.status(500).json({ 
          error: "Failed to send create request to Foundry client"
        });
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          res.status(408).json({ error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing create entity request: ${error}`);
      return res.status(500).json({ error: "Failed to process create entity request" });
    }
  });

  // Update an entity by UUID
  router.put("/entity/:uuid", express.json(), async (req, res) => {
    const uuid = req.params.uuid;
    const clientId = req.query.clientId as string;
    const updateData = req.body;
    
    if (!clientId) {
      return res.status(400).json({ 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
    }
    
    if (!uuid) {
      return res.status(400).json({ error: "UUID parameter is required" });
    }
    
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "Update data is required in request body" });
    }
    
    const client = ClientManager.getClient(clientId);
    if (!client) {
      return res.status(404).json({ 
        error: "No connected Foundry instance found with this client ID",
        availableClients: ClientManager.getConnectedClients().map(c => c.id)
      });
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
        updateData,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        return res.status(500).json({ 
          error: "Failed to send update request to Foundry client"
        });
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          res.status(408).json({ error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing update entity request: ${error}`);
      return res.status(500).json({ error: "Failed to process update entity request" });
    }
  });

  // Delete an entity by UUID
  router.delete("/entity/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    const clientId = req.query.clientId as string;
    
    if (!clientId) {
      return res.status(400).json({ 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
    }
    
    if (!uuid) {
      return res.status(400).json({ error: "UUID parameter is required" });
    }
    
    const client = ClientManager.getClient(clientId);
    if (!client) {
      return res.status(404).json({ 
        error: "No connected Foundry instance found with this client ID",
        availableClients: ClientManager.getConnectedClients().map(c => c.id)
      });
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
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        return res.status(500).json({ 
          error: "Failed to send delete request to Foundry client"
        });
      }
      
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          res.status(408).json({ error: "Request timed out" });
        }
      }, 10000);
    } catch (error) {
      log.error(`Error processing delete entity request: ${error}`);
      return res.status(500).json({ error: "Failed to process delete entity request" });
    }
  });

  // Get recent rolls
  router.get("/rolls", async (req, res) => {
    const clientId = req.query.clientId as string;
    const limit = parseInt(req.query.limit as string) || 20;
    
    if (!clientId) {
      return res.status(400).json({ 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
    }
    
    const client = ClientManager.getClient(clientId);
    if (!client) {
      return res.status(404).json({ 
        error: "No connected Foundry instance found with this client ID",
        availableClients: ClientManager.getConnectedClients().map(c => c.id)
      });
    }
    
    try {
      // Check if we have cached roll data
      const storedRolls = DataStore.get(clientId, 'recent-rolls') as any[];
      
      if (storedRolls && storedRolls.length > 0) {
        return res.json({
          clientId,
          rolls: storedRolls.slice(0, limit)
        });
      }
      
      // No cached data, request from Foundry client
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
        return res.status(500).json({ 
          error: "Failed to send rolls request to Foundry client" 
        });
      }
      
      // Set timeout for request
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          res.status(404).json({ 
            error: "No roll data available",
            message: "Request timed out"
          });
        }
      }, 5000);
      
    } catch (error) {
      log.error(`Error processing rolls request: ${error}`);
      return res.status(500).json({ error: "Failed to process rolls request" });
    }
  });

  // Get last roll
  router.get("/lastroll", async (req, res) => {
    const clientId = req.query.clientId as string;
    
    if (!clientId) {
      return res.status(400).json({ 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
    }
    
    const client = ClientManager.getClient(clientId);
    if (!client) {
      return res.status(404).json({ 
        error: "No connected Foundry instance found with this client ID",
        availableClients: ClientManager.getConnectedClients().map(c => c.id)
      });
    }
    
    try {
      // Check if we have cached roll data
      const storedRolls = DataStore.get(clientId, 'recent-rolls') as any[];
      
      if (storedRolls && storedRolls.length > 0) {
        return res.json({
          clientId,
          roll: storedRolls[0]
        });
      }
      
      // No cached data, request from Foundry client
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
        return res.status(500).json({ 
          error: "Failed to send last roll request to Foundry client" 
        });
      }
      
      // Set timeout for request
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          res.status(404).json({ 
            error: "No roll data available",
            message: "No dice have been rolled yet or request timed out"
          });
        }
      }, 5000);
      
    } catch (error) {
      log.error(`Error processing last roll request: ${error}`);
      return res.status(500).json({ error: "Failed to process last roll request" });
    }
  });

  // Create a new roll
  router.post("/roll", express.json(), async (req, res) => {
    const clientId = req.query.clientId as string;
    const { formula, flavor, createChatMessage, whisper } = req.body;
    
    if (!clientId) {
      return res.status(400).json({ 
        error: "Client ID is required",
        howToUse: "Add ?clientId=yourClientId to your request"
      });
    }
    
    if (!formula) {
      return res.status(400).json({ 
        error: "Roll formula is required",
        example: { formula: "2d6+3", flavor: "Attack roll", createChatMessage: true }
      });
    }
    
    const client = ClientManager.getClient(clientId);
    if (!client) {
      return res.status(404).json({ 
        error: "No connected Foundry instance found with this client ID",
        availableClients: ClientManager.getConnectedClients().map(c => c.id)
      });
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
        flavor,
        createChatMessage,
        whisper,
        requestId
      });

      if (!sent) {
        pendingRequests.delete(requestId);
        return res.status(500).json({ 
          error: "Failed to send roll request to Foundry client"
        });
      }
      
      // Set timeout for request
      setTimeout(() => {
        if (pendingRequests.has(requestId)) {
          pendingRequests.delete(requestId);
          res.status(408).json({ error: "Request timed out" });
        }
      }, 5000);
      
    } catch (error) {
      log.error(`Error processing roll request: ${error}`);
      return res.status(500).json({ error: "Failed to process roll request" });
    }
  });
  
  // Mount the router
  app.use("/", router);
};

// Track pending requests
interface PendingRequest {
  res: express.Response;
  type: 'search' | 'entity' | 'structure' | 'contents' | 'create' | 'update' | 'delete' | 'rolls' | 'lastroll' | 'roll';
  clientId?: string;
  uuid?: string;
  path?: string;
  query?: string;
  filter?: string;
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
        // Store results in DataStore for reference
        DataStore.storeSearchResults(pending.clientId, data.results);
        
        // Send response with metadata
        pending.res.json({
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
    
    // Store results in case they're for a request we haven't processed yet
    if (data.results && client) {
      DataStore.storeSearchResults(client.getId(), data.results);
    }
  });
  
  // Handler for entity data
  ClientManager.onMessageType("entity-data", (client: Client, data: any) => {
    log.info(`Received entity data for requestId: ${data.requestId}, uuid: ${data.uuid}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'entity' && data.data) {
        // Store entity in DataStore
        DataStore.storeEntity(data.uuid, data.data);
        
        // Include metadata in response wrapper
        pending.res.json({
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
    
    // Store entity in case it's for a request we haven't processed yet
    if (data.uuid && data.data) {
      DataStore.storeEntity(data.uuid, data.data);
    }
  });

  // Handler for structure data
  ClientManager.onMessageType("structure-data", (client: Client, data: any) => {
    log.info(`Received structure data for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'structure') {
        // Send response with metadata
        pending.res.json({
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
        pending.res.json({
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
          pending.res.status(400).json({
            requestId: data.requestId,
            clientId: pending.clientId,
            error: data.error,
            message: data.message || "Failed to create entity"
          });
        } else {
          // Send response with the new entity data and metadata
          pending.res.status(201).json({
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
          pending.res.status(400).json({
            requestId: data.requestId,
            clientId: pending.clientId,
            uuid: data.uuid,
            error: data.error,
            message: data.message || "Failed to update entity"
          });
        } else {
          // Send response with the updated entity data and metadata
          pending.res.json({
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

  // Handler for entity deletion response
  ClientManager.onMessageType("entity-deleted", (client: Client, data: any) => {
    log.info(`Received entity deleted response for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'delete' && pending.uuid === data.uuid) {
        if (data.error) {
          pending.res.status(400).json({
            requestId: data.requestId,
            clientId: pending.clientId,
            uuid: data.uuid,
            error: data.error,
            message: data.message || "Failed to delete entity"
          });
        } else {
          // Send success response with metadata
          pending.res.status(200).json({
            requestId: data.requestId,
            clientId: pending.clientId,
            uuid: data.uuid,
            message: "Entity successfully deleted"
          });
        }
        
        // Remove pending request
        pendingRequests.delete(data.requestId);
        return;
      }
    }
  });

  // Handler for roll data
  ClientManager.onMessageType("roll-data", (client: Client, data: any) => {
    log.info(`Received roll data from client: ${client.getId()}`);
    
    // Store the roll data
    const clientId = client.getId();
    let storedRolls = DataStore.get(clientId, 'recent-rolls') || [];
    
    // Check if this roll ID already exists
    const existingIndex = storedRolls.findIndex((roll: any) => roll.id === data.data.id);
    if (existingIndex !== -1) {
      // If it exists, update it instead of adding a new entry
      storedRolls[existingIndex] = data.data;
    } else {
      // Add to beginning of array
      storedRolls.unshift(data.data);
      
      // Limit array size
      if (storedRolls.length > 20) {
        storedRolls.length = 20;
      }
    }
    
    // Save back to data store
    DataStore.set(clientId, 'recent-rolls', storedRolls);
  });

  // Handler for rolls data response
  ClientManager.onMessageType("rolls-data", (client: Client, data: any) => {
    log.info(`Received rolls data response for requestId: ${data.requestId}`);
    
    if (data.requestId && pendingRequests.has(data.requestId)) {
      const pending = pendingRequests.get(data.requestId)!;
      
      if (pending.type === 'rolls') {
        // Store the rolls
        DataStore.set(client.getId(), 'recent-rolls', data.data || []);
        
        // Send response
        pending.res.json({
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
        // Update the stored rolls if we have data
        if (data.data) {
          let storedRolls = DataStore.get(client.getId(), 'recent-rolls') || [];
          
          // Add to beginning of array if not already there
          const exists = storedRolls.some((roll: any) => roll.id === data.data.id);
          if (!exists) {
            storedRolls.unshift(data.data);
            
            // Limit array size
            if (storedRolls.length > 20) {
              storedRolls.length = 20;
            }
            
            DataStore.set(client.getId(), 'recent-rolls', storedRolls);
          }
        }
        
        // Send response
        pending.res.json({
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
          pending.res.status(400).json({
            clientId: client.getId(),
            error: data.error || "Failed to perform roll"
          });
        } else {
          // If data indicates chat message was created, we don't need to update stored rolls
          // as the roll-data event will be sent separately
          if (!data.data.chatMessageCreated) {
            // Only update stored rolls if the roll wasn't created as a chat message
            // (which would trigger the createChatMessage hook)
            let storedRolls = DataStore.get(client.getId(), 'recent-rolls') || [];
            
            // Check if this roll ID already exists
            const existingIndex = storedRolls.findIndex((roll: any) => roll.id === data.data.id);
            if (existingIndex !== -1) {
              // If it exists, update it instead of adding a new entry
              storedRolls[existingIndex] = data.data;
            } else {
              // Add to beginning of array
              storedRolls.unshift(data.data);
              
              // Limit array size
              if (storedRolls.length > 20) {
                storedRolls.length = 20;
              }
            }
            
            DataStore.set(client.getId(), 'recent-rolls', storedRolls);
          }
          
          // Send response
          pending.res.json({
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
