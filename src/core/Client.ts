import { log } from "../middleware/logger";
import { Websocket } from "hyper-express";
import { ClientManager } from "./ClientManager";

export class Client {
  private ws: Websocket;
  private id: string;
  private lastPing: number;
  private connected: boolean;

  constructor(ws: Websocket, id: string) {
    this.ws = ws;
    this.id = id;
    this.lastPing = Date.now();
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
      this.lastPing = Date.now();

      switch (message.type) {
        case "ping":
          this.send({ type: "pong" });
          break;
        default:
          // Process message based on its type
          ClientManager.handleIncomingMessage(this, message);
          this.broadcast(message); // Still broadcast to others
      }
    } catch (error) {
      log.error("Error handling message", { error, clientId: this.id });
    }
  }

  private handleClose(): void {
    log.info("Client disconnected", { clientId: this.id });
    ClientManager.removeClient(this.id);
  }

  public send(data: unknown): void {
    if (this.connected) {
      try {
        this.ws.send(JSON.stringify(data));
      } catch (error) {
        log.error("Error sending message", { error, clientId: this.id });
        this.connected = false;
      }
    }
  }

  private broadcast(message: unknown): void {
    ClientManager.broadcastToGroup(this.id, message);
  }

  public getId(): string {
    return this.id;
  }

  public isAlive(): boolean {
    return this.connected && Date.now() - this.lastPing < 70000;
  }
}
