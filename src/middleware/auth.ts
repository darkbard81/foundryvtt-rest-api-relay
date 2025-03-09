import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { sequelize } from '../sequelize';
import { log } from './logger';

// Flag to check if we're using memory store
const isMemoryStore = process.env.DB_TYPE === 'memory';

declare global {
  namespace Express {
    interface Request {
      user?: any;  // Changed from User type to any
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // If using memory store in local dev, bypass authentication
  if (isMemoryStore) {
    // For local development with memory store, bypass auth
    log.info('Using memory store - bypassing API key authentication');
    
    // Create a plain object instead of using User.build()
    req.user = { 
      id: 1, 
      email: 'admin@example.com', 
      apiKey: 'local-dev', 
      requestsThisMonth: 0 
    };
    next();
    return;
  }
  
  // Normal authentication flow for production
  const apiKey = req.headers['x-api-key'] as string;
  
  if (!apiKey) {
    res.status(401).json({ error: 'API key is required' });
    return;
  }
  
  try {
    // Handle Postgres database
    const user = await User.findOne({ where: { apiKey } });
    if (!user) {
      res.status(401).json({ error: 'Invalid API key' });
      return;
    }
    
    req.user = user;
    next();
  } catch (error) {
    log.error(`Auth error: ${error}`);
    res.status(500).json({ error: 'Authentication error' });
  }
};
