import Redis from 'ioredis';
import { log } from '../middleware/logger';
import dns from 'dns';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const ENABLE_REDIS = process.env.ENABLE_REDIS !== 'false';

// Extract hostname for DNS pre-resolution
let redisHostname: string | null = null;
try {
  const url = new URL(REDIS_URL);
  redisHostname = url.hostname;
} catch (e) {
  // Invalid URL format, will be handled during connection attempt
}

// Create Redis client singleton
let redisClient: Redis | null = null;
let redisEnabled = ENABLE_REDIS;
let connectionAttempted = false;

// Define a Redis error interface to include the code property
interface RedisError extends Error {
  code?: string;
}

// Pre-resolve DNS to ensure host is reachable before connecting
async function preDnsResolve(): Promise<boolean> {
  if (!redisHostname || redisHostname === 'localhost' || redisHostname === '127.0.0.1') {
    return true; // No need for DNS resolution for localhost
  }
  
  return new Promise(resolve => {
    dns.lookup(redisHostname!, (err) => {
      if (err) {
        log.error(`DNS resolution failed for Redis host ${redisHostname}: ${err.message}`);
        resolve(false);
      } else {
        log.info(`Successfully resolved Redis host ${redisHostname}`);
        resolve(true);
      }
    });
  });
}

export function getRedisClient(): Redis | null {
  if (!redisEnabled || (connectionAttempted && !redisClient)) {
    return null;
  }
  
  if (!redisClient) {
    connectionAttempted = true;
    
    // Delay Redis connection attempt to allow network to initialize
    setTimeout(async () => {
      try {
        // Try to pre-resolve the DNS before connecting
        const dnsResolved = await preDnsResolve();
        if (!dnsResolved) {
          log.error(`Cannot resolve Redis hostname. Disabling Redis for this session.`);
          redisEnabled = false;
          return;
        }
        
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
        
        log.info(`Attempting Redis connection to ${redisHostname || 'localhost'}...`);
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
    }, 3000); // Wait 3 seconds before attempting connection to allow DNS to initialize
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