import Redis from 'ioredis';
import { log } from '../middleware/logger';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const ENABLE_REDIS = process.env.ENABLE_REDIS !== 'false';

// Create Redis client singleton
let redisClient: Redis | null = null;
let redisEnabled = ENABLE_REDIS;
let connectionAttempted = false; // Track if we've already tried connecting

// Define a Redis error interface to include the code property
interface RedisError extends Error {
  code?: string;
}

export function getRedisClient(): Redis | null {
  // If Redis is disabled or we already tried and failed, don't try again
  if (!redisEnabled || (connectionAttempted && !redisClient)) {
    return null;
  }
  
  if (!redisClient) {
    connectionAttempted = true;
    try {
      // Set connection options to prevent excessive retrying
      const options = {
        maxRetriesPerRequest: 1,
        retryStrategy: (times: number) => {
          if (times > 1) {
            redisEnabled = false;
            return null; // Stop retrying
          }
          return 1000; // Retry once after 1 second
        }
      };
      
      redisClient = new Redis(REDIS_URL, options);
      
      redisClient.on('connect', () => {
        log.info('Redis client connected');
      });
      
      redisClient.on('error', (err: RedisError) => {
        if (redisClient) {
          if (err.code === 'ECONNREFUSED') {
            log.error(`Redis connection refused. Disabling Redis for this session.`);
            redisEnabled = false;
            
            // Close and nullify the client to prevent further attempts
            redisClient.disconnect(false);
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

// Close Redis connection on app shutdown
export function closeRedis(): Promise<void> {
  if (redisClient) {
    return redisClient.quit().then(() => {
      log.info('Redis connection closed');
      redisClient = null;
    }).catch((err) => {
      log.error(`Error closing Redis: ${err}`);
      redisClient = null;
      return Promise.resolve();
    });
  }
  return Promise.resolve();
}