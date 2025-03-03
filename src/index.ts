import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { corsMiddleware } from "./middleware/cors";
import { log } from "./middleware/logger";
import { wsRoutes } from "./routes/websocket";
import { actorRoutes } from "./routes/actors";
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

// Setup Actor routes
actorRoutes(app);

// Setup API routes
apiRoutes(app);

// Add browser interface route for actor browser
app.get("/browse", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/templates/actor-browser.html"));
});

// Add default static image for tokens
app.get("/default-token.png", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/default-token.png"));
});

// Endpoint for API root
app.get("/", (req, res) => {
  res.json({
    name: "Foundry Actor Relay",
    version: "1.0.0",
    endpoints: [
      "/actors",
      "/api",
      "/browse",
      "/relay (WebSocket)"
    ]
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
