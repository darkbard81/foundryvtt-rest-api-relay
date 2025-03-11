import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { ClientManager } from '../core/ClientManager';
import { sequelize } from '../sequelize';
import { log } from './logger';

// Flag to check if we're using memory store
const isMemoryStore = process.env.DB_TYPE === 'memory';

// Free tier request limit per month
const FREE_TIER_LIMIT = parseInt(process.env.FREE_API_REQUESTS_LIMIT || '100');

declare global {
  namespace Express {
    interface Request {
      user: any;
      subscriptionStatus?: string;
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
      requestsThisMonth: 0,
      subscriptionStatus: 'active'  // Always active in dev mode
    };
    next();
    return;
  }
  
  // Normal authentication flow for production
  const apiKey = req.headers['x-api-key'] as string;
  const clientId = req.query.clientId as string;
  
  if (!apiKey) {
    res.status(401).json({ error: 'API key is required' });
    return;
  }
  
  try {
    // Find all users with the matching API key
    const users = await User.findAll({ where: { apiKey } });
    const client = ClientManager.getClient(clientId);
    
    if (users.length === 0) {
      res.status(401).json({ error: 'Invalid API key' });
      return;
    }
    
    if (clientId && client?.getApiKey() !== apiKey) {
      log.warn(`Client ID ${clientId} does not match API key ${apiKey}`);
      res.status(404).json({ error: 'Invalid client ID' });
      return;
    }
    
    const user = users[0];
    req.user = user;
    req.subscriptionStatus = user.subscriptionStatus || 'free';
    
    next();
  } catch (error) {
    log.error(`Auth error: ${error}`);
    res.status(500).json({ error: 'Authentication error' });
  }
};

export const trackApiUsage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Skip usage tracking in memory store mode
  if (isMemoryStore) {
    return next();
  }
  
  // Normal API usage tracking
  try {
    const apiKey = req.headers['x-api-key'] as string;
    
    if (apiKey) {
      // Use the User.findOne method that works with both sequelize and memory store
      const user = await User.findOne({ where: { apiKey } });
      
      if (user) {
        // If the user has an active subscription, allow unlimited usage
        if (user.subscriptionStatus === 'active') {
          return next();
        }
        
        // Check if free tier user has exceeded their monthly limit
        if (user.requestsThisMonth >= FREE_TIER_LIMIT) {
          res.status(429).json({
            error: 'Monthly API request limit reached',
            limit: FREE_TIER_LIMIT,
            message: 'Please upgrade to a paid subscription for unlimited API access',
            upgradeUrl: '/api/subscriptions/create-checkout-session'
          });
          return;
        }
        
        // Increment requests this month for free tier users
        if ('requestsThisMonth' in user) {
          user.requestsThisMonth += 1;
          // Save using proper method based on storage type
          if ('save' in user && typeof user.save === 'function') {
            await user.save();
          }
        }
      } else {
        log.warn(`API key not found: ${apiKey}`);
        res.status(401).json({ error: 'Invalid API key' });
        return;
      }
    } else {
      log.warn('API key is required for usage tracking');
      res.status(401).json({ error: 'API key is required' });
      return;
    }
    
    next();
  } catch (error) {
    log.error(`Error tracking API usage: ${error}`);
    next(); // Continue even if tracking fails
  }
};