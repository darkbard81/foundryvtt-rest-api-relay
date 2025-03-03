import express, { Request, Response, NextFunction } from "express";
import { corsMiddleware } from "./middleware/cors";
import { log } from "./middleware/logger";
import { wsRoutes } from "./routes/websocket";
import { apiRoutes } from "./routes/api";
import { config } from "dotenv";
import { actorRoutes } from "./routes/actors";
import * as path from "path";
import * as http from "http";
import * as WebSocket from "ws";  // If you're using WebSockets

config();

const app = express();
const server = http.createServer(app);

// Setup CORS
app.use(corsMiddleware());

// Parse JSON bodies
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// Properly typed auth middleware
const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Authentication logic would go here
  next();
};

// Define router function types for better type checking
type RouterFunction = (app: express.Application) => void;

// Initialize WebSocket server if needed
const wss = new WebSocket.Server({ server });

// Setup WebSocket routes
wsRoutes(app, wss);

// Setup API routes
apiRoutes(app);

// Setup Actor routes
actorRoutes(app);

// Add browser interface route for actor browser
app.get("/browse", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../src/templates/actor-browser.html"));
});

// Add default static image for tokens
app.get("/default-token.png", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/default-token.png"));
});

// Add this route to serve static files
app.get('/static/*', (req, res) => {
  const filePath = path.join(__dirname, '../public', req.path.replace('/static/', ''));
  res.sendFile(filePath);
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

server.listen(port, () => {
  log.info(`Server running on port ${port}`);
}).on('error', (error) => {
  log.error("Failed to start server", { error: error.message });
  process.exit(1);
});

// Handle graceful shutdown
const shutdown = (): void => {
  log.info("Shutting down server...");
  Promise.resolve(server.close())
    .then(() => {
      log.info("Server closed successfully");
      process.exit(0);
    })
    .catch((error) => {
      log.error("Error during server shutdown", { error: error.message });
      process.exit(1);
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
