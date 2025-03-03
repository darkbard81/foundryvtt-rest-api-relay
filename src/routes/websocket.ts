import { WebSocketServer, WebSocket } from "ws";
import { log } from "../middleware/logger";
import { ActorDataStore } from "../core/ActorDataStore";

type Client = {
  id: string;
  token: string;
  ws: WebSocket;
  lastSeen: number;
};

class ClientManager {
  private static clients: Map<string, Client> = new Map();
  private static tokenGroups: Map<string, Set<string>> = new Map();

  static addClient(ws: WebSocket, id: string, token: string): void {
    // Check if client already exists and is connected
    if (this.clients.has(id)) {
      const existingClient = this.clients.get(id)!;
      if (this.isClientActive(existingClient)) {
        log.warn(`Client connection rejected - ID already in use: ${id}`);
        ws.close(1008, "ID already in use");
        return;
      }
      // Remove stale client
      this.removeClient(id);
    }

    // Create new client
    const client: Client = {
      id,
      token,
      ws,
      lastSeen: Date.now()
    };
    
    this.clients.set(id, client);

    // Add to token group
    if (!this.tokenGroups.has(token)) {
      this.tokenGroups.set(token, new Set());
    }
    this.tokenGroups.get(token)!.add(id);

    log.info(`Client connected: ${id} (token: ${token})`);
  }

  static removeClient(id: string): void {
    const client = this.clients.get(id);
    if (client) {
      // Remove from token group
      if (this.tokenGroups.has(client.token)) {
        this.tokenGroups.get(client.token)!.delete(id);
        // Clean up empty groups
        if (this.tokenGroups.get(client.token)!.size === 0) {
          this.tokenGroups.delete(client.token);
        }
      }
      
      // Remove client
      this.clients.delete(id);
      log.info(`Client removed: ${id}`);
    }
  }

  static getClient(id: string): Client | undefined {
    return this.clients.get(id);
  }

  static isClientActive(client: Client): boolean {
    return client.ws.readyState === WebSocket.OPEN && 
           (Date.now() - client.lastSeen < 60000);
  }

  static updateClientLastSeen(id: string): void {
    const client = this.clients.get(id);
    if (client) {
      client.lastSeen = Date.now();
    }
  }

  static broadcastToGroup(senderId: string, message: any): void {
    const sender = this.clients.get(senderId);
    if (!sender) return;

    const token = sender.token;
    const groupClients = this.tokenGroups.get(token);
    
    if (groupClients) {
      for (const clientId of groupClients) {
        if (clientId !== senderId) {
          const client = this.clients.get(clientId);
          if (client && client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(JSON.stringify(message));
          }
        }
      }
    }
  }

  static cleanupInactiveClients(): void {
    const now = Date.now();
    for (const [id, client] of this.clients.entries()) {
      if (client.ws.readyState !== WebSocket.OPEN || now - client.lastSeen > 60000) {
        log.info(`Removing inactive client: ${id}`);
        this.removeClient(id);
      }
    }
  }
}

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
    ClientManager.addClient(ws, id, token);

    // Handle messages
    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        ClientManager.updateClientLastSeen(id);

        // Handle specific message types
        if (message.type === "ping") {
          ws.send(JSON.stringify({ type: "pong" }));
          return;
        }
        
        if (message.type === "actor-data") {
          handleActorData(id, message);
        }

        // Broadcast message to other clients in the group
        ClientManager.broadcastToGroup(id, message);
      } catch (error) {
        log.error(`Error processing WebSocket message: ${error}`);
      }
    });

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

// Handle actor data messages
function handleActorData(clientId: string, message: any): void {
  if (!message.worldId || !message.actorId || !message.data) {
    log.warn(`Invalid actor data message from ${clientId}`);
    return;
  }

  const backup = message.backup || "latest";
  
  log.info(`Received actor data from ${clientId} for ${message.worldId}/${message.actorId}`);
  
  // Store actor data
  ActorDataStore.set(message.worldId, message.actorId, message.data, backup);
  
  // Acknowledge receipt
  const client = ClientManager.getClient(clientId);
  if (client) {
    try {
      client.ws.send(JSON.stringify({
        type: "actor-data-ack",
        actorId: message.actorId,
        success: true
      }));
    } catch (error) {
      log.error(`Error sending acknowledgment to ${clientId}: ${error}`);
    }
  }
}
