import type { Server } from "hyper-express";

export const apiRoutes = (server: Server) => {
  // Serve the test page
  server.get("/", (req, res) => {
    res.sendFile(__dirname + "/../../_test/test-client.html");
  });

  server.get("/health", (_req, res) => {
    return res.json({
      status: "ok",
      instance: process.env.FLY_MACHINE_ID,
    });
  });
};
