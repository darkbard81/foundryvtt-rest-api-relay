import { Request, Response } from 'express';
import { getRedisClient, isRedisEnabled } from '../config/redis';

export async function healthCheck(req: Request, res: Response): Promise<void> {
  try {
    // Check Redis connection if enabled
    let redisStatus = "disabled";
    
    if (isRedisEnabled()) {
      try {
        const redis = getRedisClient();
        if (redis) {
          // Actually test the connection with a ping
          await redis.ping();
          redisStatus = "connected";
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
      redis: redisStatus
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