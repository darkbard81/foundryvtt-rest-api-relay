import { compressors, Server } from "hyper-express";
import { log } from "../middleware/logger";
import { ClientManager } from "../core/ClientManager";

interface RelayContext {
  id: string;
  token: string;
  connectedAt: number;
}

export const wsRoutes = (server: Server) => {
  server.upgrade("/relay", (req, res) => {
    const instance = req.query.instance;
    const id = req.query.id;
    const token = req.query.token;

    if (instance && process.env.FLY_MACHINE_ID !== instance) {
      res.setHeader("fly-replay", `instance=${instance}`);
      log.debug("Redirecting WebSocket to correct instance", {
        currentInstance: process.env.FLY_MACHINE_ID,
        targetInstance: instance,
      });
    }

    if (!id || !token) {
      return res.status(400).json({
        error: "Missing required parameters: id and token",
      });
    }

    res.upgrade({
      id,
      token,
      connectedAt: Date.now(),
    });
  });

  server.ws<RelayContext>(
    "/relay",
    {
      message_type: "Buffer",
      max_payload_length: 128 * 1024,
      max_backpressure: 2 * 1024 * 1024,
      compression: compressors.DEDICATED_COMPRESSOR_64KB,
      idle_timeout: 60,
    },
    (ws) => {
      const { id, token } = ws.context;
      ClientManager.addClient(ws, id, token);
    }
  );

  setInterval(() => {
    ClientManager.cleanupInactiveClients();
  }, 30000);

  return {};
};
