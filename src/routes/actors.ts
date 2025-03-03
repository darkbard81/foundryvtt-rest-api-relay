import * as fs from "fs";
import * as path from "path";
import * as Handlebars from "handlebars";
import { Server, Request, Response } from "hyper-express";

// Path to Foundry data directory - configure this via env variable or hardcode for now
const FOUNDRY_DATA_PATH = process.env.FOUNDRY_DATA_PATH || "C:/Users/Noah/AppData/Local/FoundryVTT/Data/data";

// Change type from express.Application to HyperExpress Server
export const actorRoutes = (server: Server): void => {
  server.get("/actors", (req: Request, res: Response) => {
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
  server.get("/actors/backups", (req: Request, res: Response) => {
    const worldId = req.query.world;
    if (!worldId) {
      return res.status(400).json({ error: "World ID is required" });
    }
    
    const basePath = path.join(FOUNDRY_DATA_PATH, "external", worldId as string, "actors");
    
    try {
      const folders = fs.readdirSync(basePath);
      const backups = folders.filter(folder => 
        folder !== "latest" && 
        fs.statSync(path.join(basePath, folder)).isDirectory()
      );
      
      return res.json({ backups });
    } catch (error) {
      console.error("Error reading backups:", error);
      return res.status(500).json({ error: "Failed to retrieve backups" });
    }
  });

  // Get the latest backup index
  server.get("/actors/latest", (req: Request, res: Response) => {
    const worldId = req.query.world;
    if (!worldId) {
      return res.status(400).json({ error: "World ID is required" });
    }
    
    const basePath = path.join(FOUNDRY_DATA_PATH, "external", worldId as string, "actors");
    const latestPath = path.join(basePath, "latest");
    
    try {
      const indexPath = path.join(latestPath, "index.json");
      const indexData = fs.readFileSync(indexPath, "utf8");
      return res.json(JSON.parse(indexData));
    } catch (error) {
      console.error("Error reading latest actor data:", error);
      return res.status(500).json({ error: "Failed to retrieve latest actor data" });
    }
  });

  // Get a specific actor by ID
  server.get("/actors/:id", (req: Request, res: Response) => {
    const worldId = req.query.world;
    const actorId = req.params.id;
    const backup = req.query.backup || "latest";
    
    if (!worldId) {
      return res.status(400).json({ error: "World ID is required" });
    }
    
    try {
      const actorPath = path.join(FOUNDRY_DATA_PATH, "external", worldId as string, "actors", backup as string, `${actorId}.json`);
      const actorData = fs.readFileSync(actorPath, "utf8");
      return res.json(JSON.parse(actorData));
    } catch (error) {
      console.error("Error reading actor data:", error);
      return res.status(404).json({ error: "Actor not found" });
    }
  });

  // Render actor sheet HTML
  server.get("/actors/:id/sheet", (req: Request, res: Response) => {
    const worldId = req.query.world;
    const actorId = req.params.id;
    const backup = req.query.backup || "latest";
    
    if (!worldId) {
      return res.status(400).json({ error: "World ID is required" });
    }
    
    try {
      const actorPath = path.join(FOUNDRY_DATA_PATH, "external", worldId as string, "actors", backup as string, `${actorId}.json`);
      const actorData = fs.readFileSync(actorPath, "utf8");
      
      // Load sheet template and render with actor data
      const html = renderActorSheet(JSON.parse(actorData));
      
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