import { Request, Response } from 'express';
import { getRedisClient, isRedisEnabled } from '../config/redis';

// Import REDIS_URL from the config
import { REDIS_URL } from '../config/redis';

export async function healthCheck(req: Request, res: Response): Promise<void> {
  try {
    // Check Redis connection if enabled
    let redisStatus = "disabled";
    let redisDetails = {};
    
    if (isRedisEnabled()) {
      try {
        const redis = getRedisClient();
        if (redis) {
          // Actually test the connection with a ping
          await redis.ping();
          redisStatus = "connected";
          redisDetails = {
            url: REDIS_URL.replace(/redis:\/\/.*?@/, 'redis://[hidden]@'), // Hide password
            fly_redis: !!process.env.FLY_REDIS_FOUNDRY_REST_API_REDIS_URL,
            internal: REDIS_URL.includes('.internal:')
          };
        } else {
          redisStatus = "not configured";
        }
      } catch (error) {
        redisStatus = "error: " + (error instanceof Error ? error.message : String(error));
      }
    }
    
    // All checks passed
    res.json({
      status: "ok",
      instance: process.env.FLY_ALLOC_ID || 'local',
      redis: redisStatus,
      redis_details: redisDetails,
      env: {
        has_fly_redis_url: !!process.env.FLY_REDIS_FOUNDRY_REST_API_REDIS_URL,
        has_redis_url: !!process.env.REDIS_URL,
        enable_redis: process.env.ENABLE_REDIS
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      instance: process.env.FLY_ALLOC_ID || 'local',
      redis: "unknown",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}