import Redis from 'ioredis';
import { log } from '../middleware/logger';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const ENABLE_REDIS = process.env.ENABLE_REDIS !== 'false';

// Create Redis client singleton
let redisClient: Redis | null = null;
let redisEnabled = ENABLE_REDIS;
let connectionAttempted = false;

// Define a Redis error interface to include the code property
interface RedisError extends Error {
  code?: string;
}

export function getRedisClient(): Redis | null {
  if (!redisEnabled || (connectionAttempted && !redisClient)) {
    return null;
  }
  
  if (!redisClient) {
    connectionAttempted = true;
    try {
      // Improved connection options
      const options = {
        maxRetriesPerRequest: 1,
        connectTimeout: 5000, // 5 second connection timeout
        retryStrategy: (times: number) => {
          if (times > 1) {
            redisEnabled = false;
            return null; // Stop retrying
          }
          return 1000; // Retry once after 1 second
        },
        // DNS lookup options to improve reliability
        family: 4, // Force IPv4
        tls: process.env.REDIS_URL?.includes('tls://') ? {
          rejectUnauthorized: false
        } : undefined
      };
      
      redisClient = new Redis(REDIS_URL, options);
      
      redisClient.on('connect', () => {
        log.info('Redis client connected');
      });
      
      redisClient.on('error', (err: RedisError) => {
        if (redisClient) {
          if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
            log.error(`Redis connection issue: ${err.message}. Disabling Redis for this session.`);
            redisEnabled = false;
            
            // Close and nullify the client to prevent further attempts
            try {
              redisClient.disconnect(false);
            } catch (e) {
              // Ignore disconnect errors
            }
            redisClient = null;
          } else {
            log.error(`Redis error: ${err}`);
          }
        }
      });
    } catch (error) {
      log.error(`Failed to connect to Redis: ${error}`);
      redisEnabled = false;
      redisClient = null;
      return null;
    }
  }
  
  return redisClient;
}

export function isRedisEnabled(): boolean {
  return redisEnabled && redisClient !== null;
}

// Close Redis connection on app shutdown with better error handling
export function closeRedis(): Promise<void> {
  if (redisClient) {
    try {
      return redisClient.quit().then(() => {
        log.info('Redis connection closed properly');
        redisClient = null;
      }).catch((err) => {
        log.error(`Error during Redis quit: ${err}`);
        redisClient = null;
        return Promise.resolve();
      });
    } catch (err) {
      log.error(`Error attempting to close Redis: ${err}`);
      redisClient = null;
      return Promise.resolve();
    }
  }
  return Promise.resolve();
}