import { log } from "../utils/logger";
import { WebSocket } from "ws";
import { ClientManager } from "./ClientManager";

export class Client {
  private ws: WebSocket;
  private id: string;
  private apiKey: string;
  private lastSeen: number;
  private connectedSince: number; // Add this
  private connected: boolean;
  private worldId: string | null;
  private worldTitle: string | null;
  private foundryVersion: string | null;
  private systemId: string | null;
  private systemTitle: string | null;
  private systemVersion: string | null;
  private customName: string | null;

  constructor(
    ws: WebSocket, 
    id: string, 
    apiKey: string, 
    worldId: string | null, 
    worldTitle: string | null,
    foundryVersion: string | null = null,
    systemId: string | null = null,
    systemTitle: string | null = null,
    systemVersion: string | null = null,
    customName: string | null = null
  ) {
    this.ws = ws;
    this.id = id;
    this.apiKey = apiKey;
    this.lastSeen = Date.now();
    this.connectedSince = Date.now(); // Add this
    this.connected = true;
    this.worldId = worldId;
    this.worldTitle = worldTitle;
    this.foundryVersion = foundryVersion;
    this.systemId = systemId;
    this.systemTitle = systemTitle;
    this.systemVersion = systemVersion;
    this.customName = customName;
    this.setupHandlers();
  }

  private setupHandlers(): void {
    this.ws.on("message", (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        log.info(`Received message from client ${this.id}: ${message.type}`);
        this.handleMessage(data);
      } catch (error) {
        log.error(`Error processing WebSocket message: ${error}`);
      }
    });

    this.ws.on("close", () => {
      this.connected = false;
      this.handleClose();
    });
  }

  private ping(): void {
    if (this.isAlive()) {
      try {
        this.ws.send(JSON.stringify({ type: "ping" }));
      } catch (err) {
        // Connection might be dead
        this.connected = false;
      }
    }
  }

  private handleMessage(data: Buffer): void {
    try {
      const message = JSON.parse(data.toString());
      this.updateLastSeen();

      // Handle ping messages directly without broadcasting
      if (message.type === "ping") {
        this.send({ type: "pong" });
        return;
      }
      
      // For all other messages 
      ClientManager.handleIncomingMessage(this.id, message);
      
    } catch (error) {
      log.error("Error handling message", { error, clientId: this.id });
    }
  }

  private handleClose(): void {
    log.info("Client disconnected", { clientId: this.id });
    ClientManager.removeClient(this.id);
  }

  public send(data: unknown): boolean {
    if (!this.isAlive()) return false;
    
    try {
      this.ws.send(typeof data === 'string' ? data : JSON.stringify(data));
      return true;
    } catch (error) {
      log.error("Error sending message", { error, clientId: this.id });
      this.connected = false;
      return false;
    }
  }

  private broadcast(message: unknown): void {
    ClientManager.broadcastToGroup(this.id, message);
  }

  public getId(): string {
    return this.id;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public getWorldId(): string | null {
    return this.worldId;
  }

  public getWorldTitle(): string | null {
    return this.worldTitle;
  }

  public getFoundryVersion(): string | null {
    return this.foundryVersion;
  }

  public getSystemId(): string | null {
    return this.systemId;
  }

  public getSystemTitle(): string | null {
    return this.systemTitle;
  }

  public getSystemVersion(): string | null {
    return this.systemVersion;
  }

  public getCustomName(): string | null {
    return this.customName;
  }

  public updateLastSeen(): void {
    this.lastSeen = Date.now();
  }

  public getLastSeen(): number {
    return this.lastSeen;
  }

  public isAlive(): boolean {
    // Only check if the WebSocket connection is still open
    // This relies on the WebSocket protocol-level ping/pong mechanism to verify connection health
    // As long as the client is responding to protocol pings, we consider it alive
    return (this.connected && this.ws.readyState === WebSocket.OPEN);
  }

  public disconnect(): void {
    if (this.connected && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.close();
      } catch (error) {
        log.error("Error closing WebSocket", { error, clientId: this.id });
      }
    }
    this.connected = false;
  }

  public markDisconnected(): void {
    this.connected = false;
  }
}
