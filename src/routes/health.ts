import { Request, Response } from 'express';
import { checkRedisHealth } from '../config/redis';

export const healthCheck = async (req: Request, res: Response): Promise<void> => {
  const redisStatus = checkRedisHealth();
  
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    instance: process.env.FLY_ALLOC_ID || 'local',
    redis: {
      status: redisStatus.healthy ? 'connected' : 'disconnected',
      error: redisStatus.error
    },
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB'
    }
  };
  
  res.json(healthData);
};