import { Request, Response, NextFunction } from 'express';
import { log } from './logger';
import { getRedisClient } from '../config/redis';
import fetch from 'node-fetch';

// Constants
const INSTANCE_ID = process.env.FLY_ALLOC_ID || 'local';
const FLY_INTERNAL_PORT = process.env.FLY_INTERNAL_PORT || '3010';
const APP_NAME = process.env.APP_NAME || 'foundryvtt-rest-api-relay';

export async function requestForwarderMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Skip health checks and static assets
    if (req.path === '/health' || req.path.startsWith('/static') || req.path === '/') {
      return next();
    }
    
    // Get the API key from the header
    const apiKey = req.header('x-api-key');
    if (!apiKey) {
      return next(); // No API key, continue
    }

    const redis = getRedisClient();
    if (!redis) {
      return next(); // No Redis, handle locally
    }

    // Check if we can find which instance serves the client
    let targetInstanceId: string | null = null;
    const clientId = req.query.clientId as string;
    
    if (clientId) {
      try {
        // Check if this client exists on another instance
        const clientInstance = await redis.get(`client:${clientId}:instance`);
        if (clientInstance && clientInstance !== INSTANCE_ID) {
          targetInstanceId = clientInstance;
          log.info(`Client ${clientId} is connected to instance ${targetInstanceId}, not this instance ${INSTANCE_ID}`);
        }
      } catch (error) {
        log.error(`Error checking client instance: ${error}`);
      }
    }

    // If no target found with client ID, check for API key mapping
    if (!targetInstanceId) {
      try {
        const instanceId = await redis.get(`apikey:${apiKey}:instance`);
        if (instanceId && instanceId !== INSTANCE_ID) {
          targetInstanceId = instanceId;
          log.info(`Forwarding request for API key ${apiKey} to instance ${targetInstanceId}`);
        }
      } catch (error) {
        log.error(`Error checking API key instance: ${error}`);
      }
    }

    // If no target instance is found, process locally
    if (!targetInstanceId) {
      return next();
    }

    // Forward the request to the target instance
    const targetUrl = `http://${targetInstanceId}.vm.${APP_NAME}.internal:${FLY_INTERNAL_PORT}${req.originalUrl}`;
    log.info(`Forwarding to proxy: ${targetUrl}`);

    // Create safe headers object, removing host to avoid conflicts
    const headers: Record<string, string> = {};
    Object.entries(req.headers).forEach(([key, value]) => {
      if (key.toLowerCase() !== 'host' && typeof value === 'string') {
        headers[key] = value;
      } else if (key.toLowerCase() !== 'host' && Array.isArray(value)) {
        headers[key] = value[0] || '';
      }
    });
    
    // Set up timeout with AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Shorter timeout (10s)
    
    // Forward the request
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Copy response headers but filter out problematic ones
    Object.entries(response.headers.raw()).forEach(([key, values]) => {
      if (Array.isArray(values) && !['connection', 'content-length', 'transfer-encoding'].includes(key.toLowerCase())) {
        res.setHeader(key, values);
      }
    });
    
    // Send response
    const text = await response.text();
    res.status(response.status).send(text);
    
  } catch (error) {
    log.error(`Error in request forwarder: ${error}`);
    
    // Fall back to local handling instead of returning an error
    // This allows the API to still work even if forwarding fails
    next();
  }
}