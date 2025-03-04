// src/routes/websocket.ts
import { WebSocketServer, WebSocket } from "ws";
import { log } from "../middleware/logger";
import { ClientManager } from "../core/ClientManager";

export const wsRoutes = (wss: WebSocketServer): void => {
  wss.on("connection", (ws, req) => {
    // Parse URL parameters
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const id = url.searchParams.get("id");
    const token = url.searchParams.get("token");

    if (!id || !token) {
      log.warn("Rejecting WebSocket connection: missing id or token");
      ws.close(1008, "Missing client ID or token");
      return;
    }

    // Register client
    const client = ClientManager.addClient(ws, id, token);
    if (!client) return; // Connection already rejected

    // Handle disconnection
    ws.on("close", () => {
      ClientManager.removeClient(id);
    });

    // Handle errors
    ws.on("error", (error) => {
      log.error(`WebSocket error for client ${id}: ${error}`);
      ClientManager.removeClient(id);
    });
  });

  // Set up periodic cleanup
  setInterval(() => {
    ClientManager.cleanupInactiveClients();
  }, 30000);
};

// Export the ClientManager for usage in API routes
export { ClientManager };
