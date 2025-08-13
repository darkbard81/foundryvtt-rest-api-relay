import express, { Response } from 'express';
import { log } from '../utils/logger';

// Extracted from api.ts
function sanitizeResponse(response: any): any {
    if (response === null || response === undefined) {
      return response;
    }
    
    if (typeof response !== 'object') {
      return response;
    }
    
    // Custom deep clone and key removal
    function removeSensitiveKeys(obj: any): any {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }
      
      if (Array.isArray(obj)) {
        return obj.map(item => removeSensitiveKeys(item));
      }
      
      const newObj: any = {};
      for (const key in obj) {
        if (key !== 'privateKey' && key !== 'apiKey' && key !== 'password') {
          newObj[key] = removeSensitiveKeys(obj[key]);
        }
      }
      return newObj;
    }
    
    return removeSensitiveKeys(response);
}
  
export function safeResponse(res: Response, statusCode: number, data: any): void {
    if (res.headersSent) {
      log.warn(`Headers already sent for request. Cannot send response:`, data);
      return;
    }
    const sanitizedData = sanitizeResponse(data);
    res.status(statusCode).json(sanitizedData);
}

export const PENDING_REQUEST_TYPES = [
    'search', 'entity', 'structure', 'contents', 'create', 'update', 'delete',
    'rolls', 'last-roll', 'roll', 'get-sheet', 'macro-execute', 'macros',
    'encounters', 'start-encounter', 'next-turn', 'next-round', 'last-turn', 'last-round',
    'end-encounter', 'add-to-encounter', 'remove-from-encounter', 'kill', 'decrease', 'increase', 'give', 'remove', 'execute-js',
    'select', 'selected', 'file-system', 'upload-file', 'download-file',
    'get-actor-details', 'modify-item-charges', 'use-ability', 'use-feature', 'use-spell', 'use-item', 'modify-experience', 'add-item', 'remove-item',
    'get-folder', 'create-folder', 'delete-folder'
] as const;
  
export type PendingRequestType = typeof PENDING_REQUEST_TYPES[number];

export interface PendingRequest {
    res: express.Response;
    type: PendingRequestType;
    clientId?: string;
    uuid?: string;
    path?: string;
    query?: string;
    filter?: string;
    timestamp: number;
    format?: string;
    initialScale?: number | null;
    activeTab?: number | null;
    darkMode?: boolean;
}

export const pendingRequests = new Map<string, PendingRequest>(); 