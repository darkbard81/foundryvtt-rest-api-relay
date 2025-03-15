import { Request, Response } from 'express';
import { getRedisClient } from '../config/redis';

export async function healthCheck(req: Request, res: Response): Promise<void> {
  try {
    // Check Redis connection
    const redis = getRedisClient();
    if (redis) {
        await redis.ping();
    }
    
    // All checks passed
    res.json({
      status: "ok",
      instance: process.env.FLY_ALLOC_ID || 'local',
      redis: "connected"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      instance: process.env.FLY_ALLOC_ID || 'local',
      redis: "disconnected",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}