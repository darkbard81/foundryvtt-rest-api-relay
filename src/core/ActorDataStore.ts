// src/core/ActorDataStore.ts
import { log } from "../middleware/logger";

export class ActorDataStore {
  private static worldData: Map<string, Map<string, Map<string, any>>> = new Map();
  private static worldBackups: Map<string, string[]> = new Map();
  private static searchResults: Map<string, { results: any[], timestamp: number, ttl: number }> = new Map();
  private static entityCache: Map<string, { data: any, timestamp: number, ttl: number }> = new Map();
  
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

  // Store search results sent from Foundry
  static storeSearchResults(clientId: string, results: any[]): void {
    // Store results with TTL (time to live)
    this.searchResults.set(clientId, {
      results,
      timestamp: Date.now(),
      ttl: 300000 // 5 minutes
    });
    
    // Clean up old search results periodically
    this.cleanSearchResults();
  }

  // Get search results for a client
  static getSearchResults(clientId: string): any[] | null {
    if (!this.searchResults.has(clientId)) {
      return null;
    }
    
    const entry = this.searchResults.get(clientId)!;
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.searchResults.delete(clientId);
      return null;
    }
    
    return entry.results;
  }

  // Store entity by UUID
  static storeEntity(uuid: string, data: any): void {
    if (!this.entityCache) {
      this.entityCache = new Map();
    }
    
    this.entityCache.set(uuid, {
      data,
      timestamp: Date.now(),
      ttl: 300000 // 5 minutes
    });
  }

  // Get entity by UUID
  static getEntity(uuid: string): any | null {
    if (!this.entityCache || !this.entityCache.has(uuid)) {
      return null;
    }
    
    const entry = this.entityCache.get(uuid)!;
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.entityCache.delete(uuid);
      return null;
    }
    
    return entry.data;
  }

  // Clear search results for a client
  static clearSearchResults(clientId: string): void {
    this.searchResults.delete(clientId);
  }

  // Clear entity cache for a UUID
  static clearEntityCache(uuid: string): void {
    if (this.entityCache) {
      this.entityCache.delete(uuid);
    }
  }

  // Clean up old search results and entities
  private static cleanSearchResults(): void {
    const now = Date.now();
    for (const [clientId, entry] of this.searchResults.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.searchResults.delete(clientId);
      }
    }
    
    if (this.entityCache) {
      for (const [uuid, entry] of this.entityCache.entries()) {
        if (now - entry.timestamp > entry.ttl) {
          this.entityCache.delete(uuid);
        }
      }
    }
  }
}