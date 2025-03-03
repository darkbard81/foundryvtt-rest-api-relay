// src/core/ActorDataStore.ts
import { log } from "../middleware/logger";

export class ActorDataStore {
  private static worldData: Map<string, Map<string, Map<string, any>>> = new Map();
  private static worldBackups: Map<string, string[]> = new Map();
  
  static set(worldId: string, actorId: string, data: any, backup = "latest"): void {
    log.info(`Storing actor data for world ${worldId}, actor ${actorId}, backup ${backup}`);
    
    // Initialize world data if needed
    if (!this.worldData.has(worldId)) {
      this.worldData.set(worldId, new Map());
      this.worldBackups.set(worldId, []);
    }
    
    // Initialize backup data if needed
    if (!this.worldData.get(worldId)!.has(backup)) {
      this.worldData.get(worldId)!.set(backup, new Map());
      
      // Add to backups list if it's not "latest" and not already there
      if (backup !== "latest" && !this.worldBackups.get(worldId)!.includes(backup)) {
        this.worldBackups.get(worldId)!.push(backup);
        // Sort backups by name (timestamp) descending
        this.worldBackups.get(worldId)!.sort((a, b) => b.localeCompare(a));
      }
    }
    
    // Store actor data
    this.worldData.get(worldId)!.get(backup)!.set(actorId, data);
  }
  
  static get(worldId: string, actorId: string, backup = "latest"): any {
    return this.worldData.get(worldId)?.get(backup)?.get(actorId);
  }
  
  static getBackups(worldId: string): string[] {
    return this.worldBackups.get(worldId) || [];
  }
  
  static getWorldActors(worldId: string, backup = "latest"): any[] {
    const actors = [];
    const actorsMap = this.worldData.get(worldId)?.get(backup);
    
    if (actorsMap) {
      for (const [actorId, data] of actorsMap.entries()) {
        actors.push({
          id: actorId,
          name: data.name,
          type: data.type,
          img: data.img,
          system: data.system?.type || data.type
        });
      }
    }
    
    return actors;
  }
}