// src/core/ClientManager.ts
import { WebSocket } from "ws";
import { log } from "../middleware/logger";
import { Client } from "./Client";
import { WSCloseCodes } from "../lib/constants";
import { getRedisClient } from "../config/redis";

type MessageHandler = (client: Client, message: any) => void;

const INSTANCE_ID = process.env.FLY_ALLOC_ID || 'local';
const CLIENT_EXPIRY = 60 * 60; // 1 hour expiry for Redis keys

export class ClientManager {
  private static clients: Map<string, Client> = new Map();
  private static tokenGroups: Map<string, Set<string>> = new Map();
  private static messageHandlers: Map<string, MessageHandler> = new Map();

  /**
   * Add a new client to the manager
   */
  static async addClient(ws: WebSocket, id: string, token: string): Promise<Client | null> {
    // Check if client already exists
    if (this.clients.has(id)) {
      log.warn(`Client ${id} already exists, rejecting connection`);
      ws.close(WSCloseCodes.DuplicateConnection, "Client ID already connected");
      return null;
    }

    // Create new client
    const client = new Client(ws, id, token);
    this.clients.set(id, client);

    // Add client to token group
    if (!this.tokenGroups.has(token)) {
      this.tokenGroups.set(token, new Set());
    }
    this.tokenGroups.get(token)?.add(id);
    
    // Store clientId->instanceId mapping in Redis
    try {
      const redis = getRedisClient();
      
      if (redis) {
        // Store the client's API key -> instance ID mapping
        await redis.set(`client:${token}:instance`, INSTANCE_ID, 'EX', CLIENT_EXPIRY);
        
        // Also store the client ID -> instance ID mapping
        await redis.set(`client:id:${id}:instance`, INSTANCE_ID, 'EX', CLIENT_EXPIRY);
        
        // Store client ID -> API key mapping for lookup
        await redis.set(`client:id:${id}:token`, token, 'EX', CLIENT_EXPIRY);
        
        // Add client ID to the list of clients for this token
        await redis.sadd(`token:${token}:clients`, id);
        await redis.expire(`token:${token}:clients`, CLIENT_EXPIRY);
        
        log.info(`Client ${id} registered in Redis with token ${token}`);
      }
    } catch (error) {
      log.error(`Failed to register client in Redis: ${error}`);
      // Continue even if Redis fails - local operation will still work
    }

    log.info(`Client ${id} connected with token ${token}`);
    return client;
  }

  /**
   * Remove a client from the manager
   */
  static async removeClient(id: string): Promise<void> {
    const client = this.clients.get(id);
    if (client) {
      const token = client.getApiKey();
      
      // Clean up local state
      this.clients.delete(id);
      this.tokenGroups.get(token)?.delete(id);
      if (this.tokenGroups.get(token)?.size === 0) {
        this.tokenGroups.delete(token);
      }
      
      // Clean up Redis state
      try {
        const redis = getRedisClient();
        if (redis) {
          await redis.del(`client:id:${id}:instance`);
          await redis.del(`client:id:${id}:token`);
          await redis.srem(`token:${token}:clients`, id);
          
          // If this was the last client for this token, remove instance mapping
          const remainingClients = await redis.scard(`token:${token}:clients`);
          if (remainingClients === 0) {
            await redis.del(`client:${token}:instance`);
            await redis.del(`token:${token}:clients`);
          }
        }
      } catch (error) {
        log.error(`Failed to clean up client in Redis: ${error}`);
        // Continue even if Redis fails
      }
      
      log.info(`Client ${id} disconnected`);
    }
  }

  /**
   * Get a client by ID
   */
  static async getClient(id: string): Promise<Client | null> {
    // First check local clients
    const client = this.clients.get(id);
    if (client) {
      return client;
    }
    
    // If not found locally, check if this client should be on a different instance
    try {
      const redis = getRedisClient();
      if (redis) {
        const instanceId = await redis.get(`client:id:${id}:instance`);
        
        if (instanceId && instanceId !== INSTANCE_ID) {
          // This client exists but is connected to a different instance
          log.info(`Client ${id} is connected to instance ${instanceId}, not to this instance ${INSTANCE_ID}`);
          return null;
        }
      }
    } catch (error) {
      log.error(`Error checking Redis for client: ${error}`);
    }
    
    return null;
  }

  /**
   * Get the instance ID for a client by ID
   */
  static async getClientInstance(id: string): Promise<string | null> {
    try {
      const redis = getRedisClient();
      if (redis) {
        return await redis.get(`client:id:${id}:instance`);
      } else {
        return null;
      }
    } catch (error) {
      log.error(`Error getting client instance from Redis: ${error}`);
      return null;
    }
  }

  /**
   * Get the instance ID for an API token
   */
  static async getInstanceForToken(token: string): Promise<string | null> {
    try {
      const redis = getRedisClient();
      if (redis) {
        return await redis.get(`client:${token}:instance`);
      } else {
        return null;
      }
    } catch (error) {
      log.error(`Error getting instance for token from Redis: ${error}`);
      return null;
    }
  }

  /**
   * Get all connected clients for an API key
   */
  static async getConnectedClients(apiKey: string): Promise<string[]> {
    const localClients = Array.from(this.tokenGroups.get(apiKey) || [])
      .filter(id => this.clients.has(id) && this.clients.get(id)!.isAlive())
      .map(id => id); // Just return the client IDs
    
    // In a distributed setup, we'd need to query other instances
    // For now, just return local clients
    return localClients;
  }

  /**
   * Update client's last seen timestamp
   */
  static updateClientLastSeen(id: string): void {
    const client = this.clients.get(id);
    if (client) {
      client.updateLastSeen();
      
      // Also update expiry in Redis
      try {
        const redis = getRedisClient();
        if (redis) {
          const token = client.getApiKey();
          
          // Refresh expiry for all Redis keys related to this client
          redis.expire(`client:id:${id}:instance`, CLIENT_EXPIRY);
          redis.expire(`client:id:${id}:token`, CLIENT_EXPIRY);
          redis.expire(`token:${token}:clients`, CLIENT_EXPIRY);
          redis.expire(`client:${token}:instance`, CLIENT_EXPIRY);
        }
      } catch (error) {
        // Ignore Redis errors for heartbeat updates
      }
    }
  }

  /**
   * Broadcast a message to all clients in the same token group
   */
  static async broadcastToGroup(senderId: string, message: any): Promise<void> {
    const sender = this.clients.get(senderId);
    if (!sender) return;

    const token = sender.getApiKey();
    
    // Broadcast to local clients
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
    
    // In a distributed setup with pub/sub, we'd publish to a Redis channel here
    // For Fly.io private network, we'd need to implement a pub/sub system
    // This is beyond the scope of this implementation
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
  static async cleanupInactiveClients(): Promise<void> {
    const now = Date.now();
    const toRemove: string[] = [];
    
    // Check all clients
    for (const [id, client] of this.clients.entries()) {
      if (!client.isAlive() || now - client.getLastSeen() > 60000) {
        toRemove.push(id);
      }
    }
    
    // Remove inactive clients
    for (const id of toRemove) {
      log.info(`Removing inactive client ${id}`);
      await this.removeClient(id);
    }
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
