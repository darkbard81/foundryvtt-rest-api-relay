// src/database/memoryStore.ts
import { log } from '../middleware/logger';
import crypto from 'crypto';

export class MemoryStore {
  private users = new Map();
  private apiKeys = new Map();
  private globalOptions = { define: {} };
  
  // These are just stubs to make User.init() work using local memory
  define() {
    return { sync: () => Promise.resolve() };
  }
  
  async authenticate() {
    log.info('Memory store initialized');
    return true;
  }
  
  async sync() {
    return true;
  }
  
  getUser(apiKey: string) {
    const email = this.apiKeys.get(apiKey);
    return email ? this.users.get(email) : null;
  }
  
  incrementUserRequests(apiKey: string) {
    const email = this.apiKeys.get(apiKey);
    if (email) {
      const user = this.users.get(email);
      user.requestsThisMonth += 1;
      return true;
    }
    return false;
  }
}