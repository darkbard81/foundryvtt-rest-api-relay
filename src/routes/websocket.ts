import express from "express";
import * as WebSocket from "ws";
import { log } from "../middleware/logger";
import { ClientManager } from "../core/ClientManager";
import { parse } from "url";

export const wsRoutes = (app: express.Application, wss: WebSocket.Server): void => {
  wss.on("connection", (ws: WebSocket, req: express.Request) => {
    const { query } = parse(req.url || "", true);
    const { instance, id, token } = query;

    // Handle Fly.io instance routing if needed
    if (instance && process.env.FLY_MACHINE_ID !== instance) {
      log.debug("Received connection for different instance", {
        currentInstance: process.env.FLY_MACHINE_ID,
        targetInstance: instance,
      });
      ws.close(1008, `Redirect to instance=${instance}`);
      return;
    }

    // Validate required parameters
    if (!id || !token) {
      ws.close(1008, "Missing required parameters: id and token");
      return;
    }

    // Add client to manager
    ClientManager.addClient(ws, id as string, token as string);
    
    ws.on("message", (message: WebSocket.Data) => {
      // Handle WebSocket messages
      // Implementation depends on your application logic
    });
    
    ws.on("close", () => {
      // Client will be removed by the cleanup process
    });
  });

  // Set up cleanup interval
  setInterval(() => {
    ClientManager.cleanupInactiveClients();
  }, 30000);
};
