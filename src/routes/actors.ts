import * as fs from "fs";
import * as path from "path";
import * as Handlebars from "handlebars";
import express from "express";
import { ActorDataStore } from "../core/ActorDataStore";

// Path to Foundry data directory - configure this via env variable or hardcode for now
const FOUNDRY_DATA_PATH = process.env.FOUNDRY_DATA_PATH || "C:/Users/Noah/AppData/Local/FoundryVTT/Data/data";

// Change type from HyperExpress Server to Express Application
export const actorRoutes = (app: express.Application): void => {
  app.get("/actors", (req, res) => {
    return res.json({
      message: "Actor API endpoints",
      endpoints: [
        {
          path: "/actors/backups?world={worldId}",
          description: "Get list of available actor backups"
        },
        {
          path: "/actors/latest?world={worldId}",
          description: "Get the index of actors in the latest backup"
        },
        {
          path: "/actors/{actorId}?world={worldId}&backup={backupName}",
          description: "Get JSON data for a specific actor"
        },
        {
          path: "/actors/{actorId}/sheet?world={worldId}&backup={backupName}",
          description: "Display HTML sheet for a specific actor"
        }
      ]
    });
  });

  // Get the list of all actor backups
  app.get("/actors/backups", (req, res) => {
    const worldId = req.query.world as string;
    if (!worldId) {
      return res.status(400).json({ error: "World ID is required" });
    }
    
    try {
      const backups = ActorDataStore.getBackups(worldId);
      return res.json({ backups });
    } catch (error) {
      console.error("Error reading backups:", error);
      return res.status(500).json({ error: "Failed to retrieve backups" });
    }
  });

  // Get the latest backup index
  app.get("/actors/latest", (req, res) => {
    const worldId = req.query.world as string;
    if (!worldId) {
      return res.status(400).json({ error: "World ID is required" });
    }
    
    try {
      const actors = ActorDataStore.getWorldActors(worldId);
      return res.json(actors);
    } catch (error) {
      console.error("Error reading latest actor data:", error);
      return res.status(500).json({ error: "Failed to retrieve latest actor data" });
    }
  });

  // Get a specific actor by ID
  app.get("/actors/:id", (req, res) => {
    const worldId = req.query.world as string;
    const actorId = req.params.id;
    const backup = req.query.backup as string || "latest";
    
    if (!worldId) {
      return res.status(400).json({ error: "World ID is required" });
    }
    
    try {
      const actorData = ActorDataStore.get(worldId, actorId, backup);
      if (!actorData) {
        return res.status(404).json({ error: "Actor not found" });
      }
      
      return res.json(actorData);
    } catch (error) {
      console.error("Error reading actor data:", error);
      return res.status(404).json({ error: "Actor not found" });
    }
  });

  // Render actor sheet HTML
  app.get("/actors/:id/sheet", (req, res) => {
    const worldId = req.query.world as string;
    const actorId = req.params.id;
    const backup = req.query.backup as string || "latest";
    
    if (!worldId) {
      return res.status(400).json({ error: "World ID is required" });
    }
    
    try {
      const actorData = ActorDataStore.get(worldId, actorId, backup);
      if (!actorData) {
        return res.status(404).json({ error: "Actor not found" });
      }
      
      const html = renderActorSheet(actorData);
      
      res.header("Content-Type", "text/html");
      return res.send(html);
    } catch (error) {
      console.error("Error rendering actor sheet:", error);
      return res.status(404).json({ error: "Actor not found" });
    }
  });
};

// The renderActorSheet function can remain the same
function renderActorSheet(actorData: any): string {
  try {
    // Register helper functions for handlebars
    Handlebars.registerHelper('eq', function(a, b) {
      return a === b;
    });
    
    // Add JSON helper
    Handlebars.registerHelper('json', function(context) {
      return JSON.stringify(context, null, 2);
    });

    // Determine system type
    const isD5e = actorData.system?.type === "character" || 
                  actorData.system?.abilities?.str !== undefined;
    
    // Load the appropriate template
    const templatePath = path.join(__dirname, '../templates/actorSheet.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    
    // Compile the template
    const template = Handlebars.compile(templateSource);
    
    // Create the context with helpers for the template
    const context = {
      actor: actorData,
      isDnd5e: isD5e,
      system: actorData.system
    };
    
    // Render the template
    return template(context);
  } catch (error) {
    console.error("Error rendering actor sheet:", error);
    return `
      <html>
        <head><title>Error rendering sheet</title></head>
        <body>
          <h1>Error rendering actor sheet</h1>
          <p>There was an error rendering the character sheet. Please see server logs.</p>
          <pre>${(error as Error).message}</pre>
        </body>
      </html>
    `;
  }
}