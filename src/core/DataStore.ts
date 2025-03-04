import { log } from "../middleware/logger";

export class DataStore {
  private static worldData: Map<string, Map<string, any>> = new Map();
  private static searchResults: Map<string, { results: any[], timestamp: number, ttl: number }> = new Map();
  private static entityCache: Map<string, { data: any, timestamp: number, ttl: number }> = new Map();
  
  static set(worldId: string, id: string, data: any): void {
    log.info(`Storing entity data for world ${worldId}, entity ${id}`);
    
    // Initialize world data if needed
    if (!this.worldData.has(worldId)) {
      this.worldData.set(worldId, new Map());
    }
    
    // Store data
    this.worldData.get(worldId)!.set(id, data);
  }
  
  static get(worldId: string, id: string): any {
    return this.worldData.get(worldId)?.get(id);
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