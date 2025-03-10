// src/core/ClientManager.ts
import { WebSocket } from "ws";
import { log } from "../middleware/logger";
import { Client } from "./Client";
import { WSCloseCodes } from "../lib/constants";

type MessageHandler = (client: Client, message: any) => void;

export class ClientManager {
  private static clients: Map<string, Client> = new Map();
  private static tokenGroups: Map<string, Set<string>> = new Map();
  private static messageHandlers: Map<string, MessageHandler> = new Map();

  /**
   * Add a new client to the manager
   */
  static addClient(ws: WebSocket, id: string, token: string): Client | null {
    // Check if client already exists and is connected
    if (this.clients.has(id)) {
      const existingClient = this.clients.get(id)!;
      if (existingClient.isAlive()) {
        log.warn(`Client connection rejected - ID already in use: ${id}`);
        ws.close(WSCloseCodes.DuplicateConnection, "ID already in use");
        return null;
      }
      // Remove stale client
      this.removeClient(id);
    }

    // Create new client
    const client = new Client(ws, id, token);
    this.clients.set(id, client);

    // Add to token group
    if (!this.tokenGroups.has(token)) {
      this.tokenGroups.set(token, new Set());
    }
    this.tokenGroups.get(token)!.add(id);

    log.info(`Client connected: ${id} (token: ${token})`);
    return client;
  }

  /**
   * Remove a client from the manager
   */
  static removeClient(id: string): void {
    const client = this.clients.get(id);
    if (client) {
      // Remove from token group
      const token = client.getApiKey();
      if (this.tokenGroups.has(token)) {
        this.tokenGroups.get(token)!.delete(id);
        // Clean up empty groups
        if (this.tokenGroups.get(token)!.size === 0) {
          this.tokenGroups.delete(token);
        }
      }
      
      // Disconnect client
      client.disconnect();
      
      // Remove client
      this.clients.delete(id);
      log.info(`Client removed: ${id}`);
    }
  }

  /**
   * Get a client by ID
   */
  static getClient(id: string): Client | undefined {
    return this.clients.get(id);
  }

  /**
   * Update client's last seen timestamp
   */
  static updateClientLastSeen(id: string): void {
    const client = this.clients.get(id);
    if (client) {
      client.updateLastSeen();
    }
  }

  /**
   * Broadcast a message to all clients in the same token group
   */
  static broadcastToGroup(senderId: string, message: any): void {
    const sender = this.clients.get(senderId);
    if (!sender) return;

    const token = sender.getApiKey();
    const groupClients = this.tokenGroups.get(token);
    
    if (groupClients) {
      for (const clientId of groupClients) {
        if (clientId !== senderId) {
          const client = this.clients.get(clientId);
          if (client && client.isAlive()) {
            client.send(message);
          }
        }
      }
    }
  }

  /**
   * Register a handler for a specific message type
   */
  static onMessageType(type: string, handler: MessageHandler): void {
    this.messageHandlers.set(type, handler);
  }

  /**
   * Process an incoming message
   */
  static handleIncomingMessage(clientId: string, message: any): void {
    const client = this.clients.get(clientId);
    if (!client) return;

    // Update last seen timestamp
    client.updateLastSeen();

    // Handle ping messages specially
    if (message.type === "ping") {
      client.send({ type: "pong" });
      return;
    }
    
    // Handle other message types with registered handlers
    if (message.type && this.messageHandlers.has(message.type)) {
      this.messageHandlers.get(message.type)!(client, message);
      return;
    }

    // Broadcast other messages
    this.broadcastToGroup(clientId, message);
  }

  /**
   * Clean up inactive clients
   */
  static cleanupInactiveClients(): void {
    for (const [id, client] of this.clients.entries()) {
      if (!client.isAlive()) {
        log.info(`Removing inactive client: ${id}`);
        this.removeClient(id);
      }
    }
  }

  /**
   * Get information about connected clients
   */
  static getConnectedClients(apiKey?: string): { id: string, lastSeen: number, connectedSince: number }[] {
    const clients = [];
    
    for (const [id, client] of this.clients.entries()) {
      // Filter by apiKey if specified
      if (apiKey && client.getApiKey() !== apiKey) {
        continue;
      }
      
      // Only include active clients
      if (client.isAlive()) {
        const lastSeen = client.getLastSeen();
        clients.push({
          id: id,
          lastSeen: lastSeen,
          connectedSince: lastSeen
        });
      }
    }
    
    return clients;
  }
}

export class WebSocketManager {
  // other properties...
  private messageHandlers: Map<string, (data: any) => void> = new Map();

  // other methods...
  
  onMessageType(type: string, handler: (data: any) => void): void {
    this.messageHandlers.set(type, handler);
  }

  private onMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      
      if (data.type && this.messageHandlers.has(data.type)) {
        this.messageHandlers.get(data.type)!(data);
      }
    } catch (error) {
      console.error(`Error processing message:`, error);
    }
  }
}
