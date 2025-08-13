/**
 * Main entry point for the FoundryVTT REST API Relay Server.
 * 
 * This server provides WebSocket connectivity and a REST API to access Foundry VTT data remotely.
 * It facilitates communication between Foundry VTT clients and external applications through
 * WebSocket relays and HTTP endpoints.
 * 
 * @author ThreeHats
 * @since 1.8.1
 */

import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { corsMiddleware } from "./middleware/cors";
import { log } from "./utils/logger";
import { wsRoutes } from "./routes/websocket";
import { apiRoutes, browserSessions } from "./routes/api";
import authRoutes from "./routes/auth";
import { config } from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { sequelize } from "./sequelize";
import stripeRouter from './routes/stripe';
import webhookRouter from './routes/webhook';
import { initRedis, closeRedis } from './config/redis';
import { scheduleHeadlessSessionsCheck } from './workers/headlessSessions';
import { redisSessionMiddleware } from './middleware/redisSession';
import { startHealthMonitoring, logSystemHealth, getSystemHealth } from './utils/healthCheck';
import { setupCronJobs } from './cron';
import { migrateDailyRequestTracking } from './migrations/addDailyRequestTracking';

config();

/**
 * Express application instance
 * @public
 */
const app = express();

/**
 * HTTP server instance that wraps the Express app
 * @public
 */
const httpServer = createServer(app);
// Disable timeouts to keep WebSocket connections open may want to sent a long timeout in the future instead
httpServer.setTimeout(0);
httpServer.keepAliveTimeout = 0;
httpServer.headersTimeout = 0;

// Setup CORS
app.use(corsMiddleware());

app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// Special handling for /upload endpoint to preserve raw body for binary uploads
app.use('/upload', (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  
  if (!contentType.includes('application/json')) {
    express.raw({ 
      type: '*/*', 
      limit: '250mb' 
    })(req, res, next);
  } else {
    // For JSON requests to /upload, use the regular JSON parser
    express.json({ 
      limit: '250mb' 
    })(req, res, next);
  }
});

// Parse JSON bodies for all other routes
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

// Serve Docusaurus documentation from /docs route
const docsPath = path.resolve(__dirname, "../docs/build");
try {
  // Check if docs build directory exists
  if (fs.existsSync(docsPath)) {
    app.use("/docs", express.static(docsPath, { 
      index: 'index.html',
      fallthrough: false 
    }));

    // Handle SPA routing for docs - serve index.html for any unmatched doc routes
    app.get('/docs/*', (req, res) => {
      res.sendFile(path.join(docsPath, 'index.html'));
    });
  } else {
    log.warn('Documentation build directory not found, docs will not be available');
    app.get('/docs*', (req, res) => {
      res.status(404).json({ error: 'Documentation not available' });
    });
  }
} catch (error) {
  log.error('Error setting up documentation routes:', { error: error instanceof Error ? error.message : String(error) });
  app.get('/docs*', (req, res) => {
    res.status(500).json({ error: 'Documentation setup failed' });
  });
}

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

/**
 * Server port number, defaults to 3010 if not specified in environment
 */
const port = process.env.PORT ? parseInt(process.env.PORT) : 3010;

/**
 * Initializes all server services in the correct order.
 * 
 * This function performs the following initialization steps:
 * 1. Synchronizes the database connection
 * 2. Initializes Redis if configured
 * 3. Sets up cron jobs for scheduled tasks
 * 4. Starts health monitoring
 * 5. Starts the HTTP and WebSocket servers
 * 
 * @throws {Error} Exits the process if initialization fails
 * @returns {Promise<void>} Resolves when all services are successfully initialized
 */
async function initializeServices() {  try {
    // First initialize database
    await sequelize.sync();
    
    // Run migration to add daily request tracking columns
    await migrateDailyRequestTracking();
    
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
