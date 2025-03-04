import { log } from "../middleware/logger";
import { WebSocket } from "ws";
import { ClientManager } from "./ClientManager";

export class Client {
  private ws: WebSocket;
  private id: string;
  private token: string;
  private lastSeen: number;
  private connected: boolean;

  constructor(ws: WebSocket, id: string, token: string) {
    this.ws = ws;
    this.id = id;
    this.token = token;
    this.lastSeen = Date.now();
    this.connected = true;
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

  private handleMessage(data: Buffer): void {
    try {
      const message = JSON.parse(data.toString());
      this.updateLastSeen();
  
      switch (message.type) {
        case "ping":
          this.send({ type: "pong" });
          break;
        default:
          ClientManager.handleIncomingMessage(this.id, message);
          this.broadcast(message);
      }
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

  public getToken(): string {
    return this.token;
  }

  public updateLastSeen(): void {
    this.lastSeen = Date.now();
  }

  public getLastSeen(): number {
    return this.lastSeen;
  }

  public isAlive(): boolean {
    return this.connected && 
           this.ws.readyState === WebSocket.OPEN && 
           Date.now() - this.lastSeen < 60000;
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
