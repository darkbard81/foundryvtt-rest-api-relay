// src/core/ClientManager.ts
import { Websocket } from "hyper-express";
import { log } from "../middleware/logger";
import { Client } from "./Client";

export class ClientManager {
  private static tokenGroups: Map<string, Set<Client>> = new Map();
  private static clients: Map<string, Client> = new Map();

  static addClient(ws: Websocket, id: string, token: string): void {
    if (this.clients.has(id)) {
      const existingClient = this.clients.get(id)!;
      if (existingClient.isAlive()) {
        log.warn("Client connection rejected - ID already in use", {
          clientId: id,
        });
        ws.close();
        return;
      } else {
        // If existing client is dead, remove it first
        this.removeClient(id);
      }
    }

    const client = new Client(ws, id);
    this.clients.set(id, client);

    if (!this.tokenGroups.has(token)) {
      this.tokenGroups.set(token, new Set());
    }
    this.tokenGroups.get(token)!.add(client);

    log.info("Client connected", { clientId: id, token });
  }

  static removeClient(id: string): void {
    const client = this.clients.get(id);
    if (client) {
      for (const [token, group] of this.tokenGroups) {
        if (group.has(client)) {
          group.delete(client);
          if (group.size === 0) {
            this.tokenGroups.delete(token);
            log.debug("Token group removed", { token });
          }
          break;
        }
      }
      this.clients.delete(id);
      log.info("Client removed", { clientId: id });
    }
  }

  static getClient(id: string): Client | undefined {
    return this.clients.get(id);
  }

  static broadcastToGroup(senderId: string, message: unknown): void {
    const senderClient = this.clients.get(senderId);
    if (!senderClient) return;

    for (const [token, group] of this.tokenGroups) {
      if (group.has(senderClient)) {
        group.forEach((client) => {
          if (client.getId() !== senderId && client.isAlive()) {
            client.send(message);
          }
        });
        break;
      }
    }
  }

  static cleanupInactiveClients(): void {
    this.clients.forEach((client, id) => {
      if (!client.isAlive()) {
        log.info("Removing inactive client", { clientId: id });
        this.removeClient(id);
      }
    });
  }
}
