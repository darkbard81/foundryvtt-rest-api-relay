import HyperExpress from "hyper-express";
import { corsMiddleware } from "./middleware/cors";
import { log } from "./middleware/logger";
import { wsRoutes } from "./routes/websocket";
import { apiRoutes } from "./routes/api";
import { config } from "dotenv";
config();

const server = new HyperExpress.Server();
server.use("/", corsMiddleware());

// Clerk Auth Middleware placeholder
const auth = async (req: Request, res: Response, next: () => void) => {
  return next();
};

// Setup WebSocket routes
wsRoutes(server);

// Setup API routes
apiRoutes(server);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

server
  .listen(port)
  .then(() => {
    log.info(`Server running on port ${port}`);
  })
  .catch((error) => {
    log.error("Failed to start server", { error: error.message });
    process.exit(1);
  });

// Handle graceful shutdown
const shutdown = () => {
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
