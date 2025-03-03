import express from "express";
import path from "path";

export const apiRoutes = (app: express.Application): void => {
  // Create a router instead of using app directly
  const router = express.Router();

  // Define routes on the router
  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../_test/test-client.html"));
  });

  router.get("/health", (req, res) => {
    return res.json({
      status: "ok",
      instance: process.env.FLY_MACHINE_ID,
    });
  });

  router.get("/browse", (req, res) => {
    res.sendFile(path.join(__dirname, "../templates/actor-browser.html"));
  });

  router.get("/api/status", (req, res) => {
    res.json({ status: "ok" });
  });
  
  // Mount the router on the app
  app.use(router);
};
