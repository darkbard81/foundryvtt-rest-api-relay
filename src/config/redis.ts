import Redis, { RedisOptions } from 'ioredis';
import { log } from '../middleware/logger';

// Use direct URL approach to avoid DNS resolution issues
const FLY_INTERNAL_REDIS = process.env.REDIS_URL || 'redis://localhost:6379';

export const REDIS_URL = FLY_INTERNAL_REDIS;
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
      // Key changes for Upstash Redis in Fly.io:
      const options: RedisOptions = {
        connectTimeout: 10000,
        maxRetriesPerRequest: 2,
        retryStrategy: (times) => {
          if (times > 3) {
            redisEnabled = false;
            return null; // Stop retrying
          }
          return Math.min(times * 500, 2000); // Progressive backoff
        },
        // Try IPv6 instead of IPv4 (critical fix for many cloud environments)
        family: 6,
        // For TLS connections
        tls: REDIS_URL.includes('tls://') || REDIS_URL.includes('upstash.io') ? {
          rejectUnauthorized: false
        } : undefined
      };

      log.info(`Attempting Redis connection to ${REDIS_URL.replace(/redis:\/\/.*?@/, 'redis://[hidden]@')}...`);
      redisClient = new Redis(REDIS_URL, options);
      
      redisClient.on('connect', () => {
        log.info('Redis client connected successfully');
      });
      
      redisClient.on('error', (err: RedisError) => {
        if (redisClient) {
          if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
            log.error(`Redis connection issue: ${err.message}. Disabling Redis for this session.`);
            redisEnabled = false;
            
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