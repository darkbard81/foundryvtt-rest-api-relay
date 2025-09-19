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

// Parse JSON bodies for all other routes with 250MB limit
app.use(express.json({ limit: '250mb' }));

// Add Redis session middleware
app.use(redisSessionMiddleware);

// Add global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  log.error('Unhandled error:', err);
  if (!res.headersSent) {
    // Handle JSON parsing errors
    if (err.type === 'entity.parse.failed' || err instanceof SyntaxError || 
        (err.message && err.message.includes('JSON'))) {
      return res.status(400).json({ 
        error: 'Invalid JSON format',
        message: 'The request body contains malformed JSON. Please check your JSON syntax.',
        details: err.message
      });
    }
    
    // Handle payload too large errors
    if (err.type === 'entity.too.large') {
      return res.status(413).json({ 
        error: 'Request entity too large',
        message: 'The request body is too large. Please reduce the size of your request.'
      });
    }
    
    // Default error response
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files from public directory
app.use("/static", express.static(path.join(__dirname, "../public")));
app.use("/static/css", express.static(path.join(__dirname, "../public/css")));
app.use("/static/js", express.static(path.join(__dirname, "../public/js")));

// Redirect trailing slashes in docs routes to clean URLs
app.use('/docs', (req, res, next) => {
  if (req.path !== '/' && req.path.endsWith('/')) {
    const cleanPath = req.path.slice(0, -1);
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    return res.redirect(301, `/docs${cleanPath}${queryString}`);
  }
  next();
});

// Serve Docusaurus documentation from /docs route
const docsPath = path.resolve(__dirname, "../docs/build");
try {
  // Check if docs build directory exists
  if (fs.existsSync(docsPath)) {
    app.use("/docs", express.static(docsPath, { 
      index: 'index.html',
      fallthrough: true
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
  try {
    const health = getSystemHealth();
    res.status(200).json(health);
  } catch (error) {
    // Always return 200 during startup
    log.warn('Health check error during startup:', { error: error instanceof Error ? error.message : String(error) });
    res.status(200).json({ 
      healthy: true,
      status: 'starting',
      timestamp: Date.now(),
      instanceId: process.env.FLY_ALLOC_ID || 'local',
      message: 'Service initializing'
    });
  }
});

/**
 * Server port number, defaults to 3010 if not specified in environment
 */
const port = process.env.PORT ? parseInt(process.env.PORT) : 3010;

/**
 * Initializes all server services in the correct order.
 * 
 * This function performs the following initialization steps:
 * 1. Starts the HTTP and WebSocket servers first
 * 2. Synchronizes the database connection in background
 * 3. Initializes Redis if configured in background
 * 4. Sets up cron jobs for scheduled tasks in background
 * 5. Starts health monitoring in background
 * 
 * @throws {Error} Exits the process if server startup fails
 * @returns {Promise<void>} Resolves when server is started
 */
async function initializeServices() {
  try {
    httpServer.listen(port, () => {
      log.info(`Server running at http://localhost:${port}`);
      log.info(`WebSocket server ready at ws://localhost:${port}/relay`);
    });
    
    // Do heavy initialization in background after server is running
    setImmediate(async () => {
      try {
        log.info('Starting background initialization...');
        
        // First initialize database
        await sequelize.sync();
        log.info('Database synced');
        
        // Run migration to add daily request tracking columns
        await migrateDailyRequestTracking();
        log.info('Database migrations completed');
        
        if (process.env.REDIS_URL && process.env.REDIS_URL.length > 0) {
          // Then initialize Redis
          const redisInitialized = await initRedis();
          if (!redisInitialized) {
            log.warn('Redis initialization failed - continuing with local storage only');
          } else {
            log.info('Redis initialized successfully');
          }
        }
        
        // Set up cron jobs
        setupCronJobs();
        log.info('Cron jobs initialized');
        
        // Start health monitoring
        logSystemHealth(); // Log initial health
        startHealthMonitoring(60000); // Check every minute
        log.info('Health monitoring started');
        
        log.info('All background services initialized successfully');
      } catch (error) {
        log.error(`Error during background initialization: ${error}`);
        // Don't exit in production - let the server continue running
        if (process.env.NODE_ENV !== 'production') {
          process.exit(1);
        }
      }
    });
    
  } catch (error) {
    log.error(`Error starting server: ${error}`);
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
