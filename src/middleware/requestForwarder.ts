import { Request, Response, NextFunction } from 'express';
import { log } from '../middleware/logger';
import { ClientManager } from '../core/ClientManager';
import fetch from 'node-fetch';

const INSTANCE_ID = process.env.FLY_ALLOC_ID || 'local';
const FLY_INTERNAL_PORT = process.env.PORT || '3010';

export async function requestForwarderMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  // Skip for non-API requests
  if (!req.path.startsWith('/clients') && 
      !req.path.startsWith('/get/') && 
      !req.path.startsWith('/search') && 
      !req.path.startsWith('/entity/') && 
      !req.path.startsWith('/sheet/') &&
      !req.path.startsWith('/rolls') &&
      !req.path.startsWith('/lastroll') &&
      !req.path.startsWith('/roll') &&
      !req.path.startsWith('/structure') &&
      !req.path.startsWith('/contents/')) {
    return next();
  }
  
  try {
    const apiKey = req.header('x-api-key');
    const clientId = req.query.clientId as string;
    
    // Skip if no API key or client ID
    if (!apiKey || !clientId) {
      return next();
    }
    
    // Check if client exists on this instance
    const localClient = await ClientManager.getClient(clientId);
    
    if (localClient) {
      // If client is on this instance, proceed normally
      return next();
    }
    
    // If client is not on this instance, check Redis for the correct instance
    const instanceId = await ClientManager.getInstanceForApiKey(apiKey);
    
    if (!instanceId || instanceId === INSTANCE_ID) {
      // If this is the correct instance or no instance found, proceed normally
      return next();
    }
    
    // This request needs to be forwarded to another instance
    log.info(`Forwarding request for API key ${apiKey} to instance ${instanceId}`);
    
    // Build the internal Fly.io address
    const targetUrl = `http://${instanceId}.vm.fly-local.internal:${FLY_INTERNAL_PORT}${req.originalUrl}`;
    
    // Create safe headers object
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (value && typeof value === 'string') {
        headers[key] = value;
      }
    }
    
    // Add extra headers
    headers['x-forwarded-from'] = INSTANCE_ID;
    headers['x-original-host'] = req.headers.host as string || '';
    
    // Forward the request
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' && req.body ? 
            JSON.stringify(req.body) : undefined
    });
    
    if (!response.ok) {
      log.error(`Error forwarding request to ${targetUrl}: ${response.status} ${response.statusText}`);
    }
    
    // Copy status and headers from the forwarded response
    res.status(response.status);
    
    // Handle response headers safely
    for (const [key, value] of Object.entries(response.headers.raw())) {
      if (key.toLowerCase() !== 'transfer-encoding') { // Skip problematic headers
        res.setHeader(key, value);
      }
    }
    
    // Stream the response body
    const responseBody = await response.text();
    res.send(responseBody);
    
  } catch (error) {
    log.error(`Error in request forwarder: ${error}`);
    next();
  }
}