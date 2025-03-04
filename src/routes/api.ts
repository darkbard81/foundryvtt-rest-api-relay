import express from "express";
import path from "path";
import { log } from "../middleware/logger";
import { ActorDataStore } from "../core/ActorDataStore"; 
// Import the ClientManager from websocket.ts
import { ClientManager } from "../routes/websocket";

export const apiRoutes = (app: express.Application): void => {
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
    res.sendFile(path.join(__dirname, "../templates/actor-browser.html"));
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
      
      // Clear any previous cached results for this client
      ActorDataStore.clearSearchResults(clientId);
      
      // Send request to Foundry for search
      client.ws.send(JSON.stringify({
        type: "perform-search",
        query,
        filter: filter || null,
        requestId
      }));
      
      // Wait for results with timeout
      let attempts = 0;
      const maxAttempts = 20; // Increase attempts to give more time for indexing
      const waitTime = 500; // 500ms per attempt
      
      const waitForResults = async () => {
        while (attempts < maxAttempts) {
          attempts++;
          const results = ActorDataStore.getSearchResults(clientId);
          if (results) {
            // Add additional info to the response to help with debugging
            return res.json({
              query: query,
              filter: filter || null, 
              totalResults: results.length,
              results: results
            });
          }
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        return res.status(408).json({ 
          error: "Search request timed out", 
          tip: "The Foundry client might be busy or still building its index."
        });
      };
      
      await waitForResults();
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
      
      // If noCache is true, clear any existing cached entity
      if (noCache) {
        ActorDataStore.clearEntityCache(uuid);
      }
      
      // Send request to Foundry for entity data
      client.ws.send(JSON.stringify({
        type: "get-entity",
        uuid,
        requestId
      }));
      
      // Wait for results with timeout
      let attempts = 0;
      const maxAttempts = 20; // More attempts for complex entities
      const waitTime = 500; // 500ms per attempt
      
      const waitForEntity = async () => {
        while (attempts < maxAttempts) {
          attempts++;
          const entity = ActorDataStore.getEntity(uuid);
          if (entity) {
            return res.json(entity);
          }
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        return res.status(408).json({ 
          error: "Entity request timed out", 
          tip: "The Foundry client might be busy or the UUID might not exist."
        });
      };
      
      await waitForEntity();
    } catch (error) {
      log.error(`Error processing entity request: ${error}`);
      return res.status(500).json({ error: "Failed to process entity request" });
    }
  });
  
  // Mount the router without prefix
  app.use("/", router);
};
