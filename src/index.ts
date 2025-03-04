import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { corsMiddleware } from "./middleware/cors";
import { log } from "./middleware/logger";
import { wsRoutes } from "./routes/websocket";
import { apiRoutes } from "./routes/api";
import { config } from "dotenv";
import * as path from "path";

config();

// Create Express server
const app = express();
const httpServer = createServer(app);

// Setup CORS
app.use(corsMiddleware());

// Parse JSON bodies
app.use(express.json());

// Serve static files from public directory
app.use("/static", express.static(path.join(__dirname, "../public")));

// Create WebSocket server
const wss = new WebSocketServer({ server: httpServer });

// Setup WebSocket routes
wsRoutes(wss);

// Setup API routes
apiRoutes(app);

// Add default static image for tokens
app.get("/default-token.png", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/default-token.png"));
});

// Endpoint for API root
app.get("/", (req, res) => {
  res.json({
    name: "Foundry REST API Relay",
    version: "1.0.1",
    description: "API server for accessing Foundry VTT data remotely. Find client with /clients. Use clientId for all other requests.",
    endpoints: {
      "/clients": "List all connected Foundry clients",
      "/clients?token=yourToken": "List connected Foundry clients with a specific token",
      "/search?query=term": "Search for entities using Foundry's QuickInsert",
      "/get/:uuid?": "Get entity data by UUID",
      "/structure?": "Get all folders and compendiums",
      "/contents/:path?": "Get all entity UUIDs in a folder or compendium",
      "/entity [POST]": "Create a new entity",
      "/entity/:uuid [PUT]": "Update an entity by UUID",
      "/entity/:uuid [DELETE]": "Delete an entity by UUID",
      "/rolls?limit=20": "List up to the last 20 dice rolls",
      "/lastRoll": "Get the last dice roll",
      "/roll [POST]": "Roll dice using Foundry's Roll class",
      "/actor-sheet": "Get the Actor sheet html",
      "/relay": "WebSocket endpoint for Foundry clients"
    }
  });
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3010;

// Start HTTP server
httpServer.listen(port, () => {
  log.info(`Server running on port ${port}`);
});

// Handle graceful shutdown
const shutdown = (): void => {
  log.info("Shutting down server...");
  httpServer.close(() => {
    log.info("Server closed successfully");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
