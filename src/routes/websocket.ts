// src/routes/websocket.ts
import { WebSocketServer, WebSocket } from "ws";
import { log } from "../middleware/logger";
import { ClientManager } from "../core/ClientManager";
import { validateHeadlessSession } from "../workers/headlessSessions";

export const wsRoutes = (wss: WebSocketServer): void => {
  wss.on("connection", async (ws, req) => {
    try {
      // Parse URL parameters
      const url = new URL(req.url || "", `http://${req.headers.host}`);
      const id = url.searchParams.get("id");
      const token = url.searchParams.get("token");

      if (!id || !token) {
        log.warn("Rejecting WebSocket connection: missing id or token");
        ws.close(1008, "Missing client ID or token");
        return;
      }

      // Validate headless session before accepting the connection
      const isValid = await validateHeadlessSession(id, token);
      if (!isValid) {
        log.warn(`Rejecting invalid headless client: ${id}`);
        ws.close(1008, "Invalid headless session");
        return;
      }

      // Register client
      const client = await ClientManager.addClient(ws, id, token);
      if (!client) return; // Connection already rejected

      // Add protocol-level ping/pong to keep the TCP connection active
      const pingInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.ping(Buffer.from("keepalive"));
          log.debug(`Sent WebSocket protocol ping to ${id}`);
        }
      }, 20000); // Every 20 seconds

      // Handle disconnection
      ws.on("close", () => {
        clearInterval(pingInterval);
        ClientManager.removeClient(id);
      });

      // Handle pong responses to update client activity
      ws.on("pong", () => {
        // Update the client's last seen timestamp
        client.updateLastSeen();
      });

      // Handle errors
      ws.on("error", (error) => {
        clearInterval(pingInterval);
        log.error(`WebSocket error for client ${id}: ${error}`);
        ClientManager.removeClient(id);
      });
    } catch (error) {
      log.error(`WebSocket connection error: ${error}`);
      try {
        ws.close(1011, "Server error");
      } catch (e) {
        // Ignore errors closing socket
      }
    }
  });

  // Set up periodic cleanup
  setInterval(() => {
    ClientManager.cleanupInactiveClients();
  }, 15000);
};

// Export the ClientManager for usage in API routes
export { ClientManager };
