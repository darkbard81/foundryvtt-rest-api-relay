import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { corsMiddleware } from "./middleware/cors";
import { log } from "./middleware/logger";
import { wsRoutes } from "./routes/websocket";
import { apiRoutes, browserSessions } from "./routes/api";
import authRoutes from "./routes/auth";
import { config } from "dotenv";
import * as path from "path";
import { sequelize } from "./sequelize";
import stripeRouter from './routes/stripe';
import webhookRouter from './routes/webhook';
import { closeRedis } from './config/redis';
import { initRedis } from './config/redis';
import { scheduleHeadlessSessionsCheck } from './workers/headlessSessions';

config();

// Create Express server
const app = express();
const httpServer = createServer(app);
// Disable timeouts to keep WebSocket connections open may want to sent a long timeout in the future instead
httpServer.setTimeout(0);
httpServer.keepAliveTimeout = 0;
httpServer.headersTimeout = 0;

// Setup CORS
app.use(corsMiddleware());

app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// Parse JSON bodies
app.use(express.json());

// Add global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  log.error('Unhandled error:', err);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Internal server error' });
  }
  // Don't call next with error to prevent Express from handling it again
});

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
app.use('/api/subscriptions', stripeRouter);
app.use('/api/webhooks', webhookRouter);

// Add default static image for tokens
app.get("/default-token.png", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/default-token.png"));
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3010;

// Sync database and start HTTP server
sequelize.sync().then(async () => {
  // Initialize Redis before starting the server
  await initRedis();

  // Schedule the headless sessions worker
  scheduleHeadlessSessionsCheck();
  
  // First bind to the public interface
  httpServer.listen(port, "0.0.0.0", () => {
    log.info(`Server running on public interface on port ${port}`);
    
    // Only attempt to bind to private network in Fly.io environment
    if (process.env.FLY_ALLOC_ID) {
      // Then bind to the private 6PN interface for VM-to-VM communication
      const privateServer = createServer(app);
      privateServer.listen(port, "fly-local-6pn", () => {
        log.info(`Server running on private 6PN interface (fly-local-6pn) on port ${port}`);
      });
    } else {
      log.info(`Skipping private network binding when running locally`);
    }
  });
});

// Handle graceful shutdown
const shutdown = async (): Promise<void> => {
  log.info("Shutting down server...");
  
  // Close Redis connections
  await closeRedis();
  
  // Close all browser sessions
  log.info(`Closing ${browserSessions.size} headless browser sessions...`);
  let closedCount = 0;
  for (const browser of browserSessions.values()) {
    try {
      await browser.close();
      closedCount++;
    } catch (error) {
      log.error(`Error closing browser: ${error}`);
    }
  }
  log.info(`Successfully closed ${closedCount} browser sessions.`);
  
  httpServer.close(() => {
    log.info("Server closed successfully");
    process.exit(0);
  });
  
  // Force exit after 5 seconds if server doesn't close gracefully
  setTimeout(() => {
    log.warn("Forcing server shutdown after timeout");
    process.exit(1);
  }, 5000);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
