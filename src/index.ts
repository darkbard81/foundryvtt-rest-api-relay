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
import { initRedis, closeRedis } from './config/redis';
import { scheduleHeadlessSessionsCheck } from './workers/headlessSessions';
import { redisSessionMiddleware } from './middleware/redisSession';
import { startHealthMonitoring, logSystemHealth, getSystemHealth } from './utils/healthCheck';
import { setupCronJobs } from './cron';

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

// Add Redis session middleware
app.use(redisSessionMiddleware);

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

// Add health endpoint
app.get('/api/health', (req, res) => {
  const health = getSystemHealth();
  res.status(health.healthy ? 200 : 503).json(health);
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3010;

// Initialize services sequentially
async function initializeServices() {  try {
    // First initialize database
    await sequelize.sync();
    
    if (process.env.REDIS_URL && process.env.REDIS_URL.length > 0) {
      // Then initialize Redis
      const redisInitialized = await initRedis();
      if (!redisInitialized) {
        log.warn('Redis initialization failed - continuing with local storage only');
      }
    }
    
    // Set up cron jobs
    setupCronJobs();
    log.info('Cron jobs initialized');
    
    // Start health monitoring
    logSystemHealth(); // Log initial health
    startHealthMonitoring(60000); // Check every minute
    
    // Start the server
    httpServer.listen(port, () => {
      log.info(`Server running at http://localhost:${port}`);
      log.info(`WebSocket server ready at ws://localhost:${port}/relay`);
    });
    
  } catch (error) {
    log.error(`Error initializing services: ${error}`);
    process.exit(1);
  }
}

// Schedule the headless sessions worker
scheduleHeadlessSessionsCheck();

// Note: Cron jobs are already initialized in initServices()

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  log.info('SIGTERM received, shutting down gracefully');
  await closeRedis();
  process.exit(0);
});

process.on('SIGINT', async () => {
  log.info('SIGINT received, shutting down gracefully');
  await closeRedis();
  process.exit(0);
});

// Initialize services and start server
initializeServices().catch(err => {
  log.error(`Failed to initialize services: ${err}`);
  process.exit(1);
});
