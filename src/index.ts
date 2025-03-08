import express, { Request, Response } from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { corsMiddleware } from "./middleware/cors";
import { log } from "./middleware/logger";
import { wsRoutes } from "./routes/websocket";
import { apiRoutes } from "./routes/api";
import authRoutes from "./routes/auth";
import { config } from "dotenv";
import * as path from "path";
import { sequelize } from "./sequelize";

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
app.use("/static/css", express.static(path.join(__dirname, "../public/css")));
app.use("/static/js", express.static(path.join(__dirname, "../public/js")));

// Serve the main HTML page at the root URL
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Create WebSocket server
const wss = new WebSocketServer({ server: httpServer });

// Setup WebSocket routes
wsRoutes(wss);

// Setup API routes
apiRoutes(app);

// Setup Auth routes
app.use("/", authRoutes);

// Add default static image for tokens
app.get("/default-token.png", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/default-token.png"));
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3010;

// Sync database and start HTTP server
sequelize.sync().then(() => {
  httpServer.listen(port, "0.0.0.0", () => {
    log.info(`Server running on port ${port}`);
  });
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
