import { ClientManager } from '../../core/ClientManager';
import { Router, Request, Response, NextFunction } from 'express';
import express from 'express';
import path from "path";
import fs from "fs/promises";
import multer from "multer";
import { PassThrough } from 'stream';
import { requestForwarderMiddleware } from '../../middleware/requestForwarder';
import { authMiddleware, trackApiUsage } from '../../middleware/auth';
import { createApiRoute } from '../route-helpers';
import { log, pendingRequests, safeResponse } from '../shared';

const upload = multer({ dest: "uploads/" });

// Define a safe directory for uploads
const SAFE_UPLOAD_DIR = path.resolve("uploads");

export const utilityRouter = Router();

const commonMiddleware = [requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json()];


export function validateScript(script: string): boolean {
  // Disallow dangerous patterns
  const forbiddenPatterns = [
    /localStorage/,
    /sessionStorage/,
    /document\.cookie/,
    /eval\(/,
    /new Worker\(/,
    /new SharedWorker\(/,
    /__proto__/,
    /atob\(/,
    /btoa\(/,
    /crypto\./,
    /Intl\./,
    /postMessage\(/,
    /XMLHttpRequest/,
    /importScripts\(/,
    /apiKey/,
    /privateKey/,
    /password/,
  ];
  return !forbiddenPatterns.some((pattern) => pattern.test(script));
}

// Middleware to handle `application/javascript` content type
async function handleJavaScriptFile(req: Request, res: Response, next: NextFunction) {
  if (req.is("application/javascript")) {
    try {
      // Generate a safe file path
      const tempFileName = `script_${Date.now()}.js`;
      const tempFilePath = path.join(SAFE_UPLOAD_DIR, tempFileName);

      // Ensure the resolved path is within the safe directory
      if (!tempFilePath.startsWith(SAFE_UPLOAD_DIR)) {
        throw new Error("Invalid file path");
      }

      function validateFileExtension(filePath: string): boolean {
        const allowedExtensions = [".js"];
        const ext = path.extname(filePath).toLowerCase();
        return allowedExtensions.includes(ext);
      }

      if (!validateFileExtension(tempFilePath)) {
        throw new Error("Invalid file extension");
      }

      const chunks: Buffer[] = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", async () => {
        const fileBuffer = Buffer.concat(chunks);
        await fs.writeFile(tempFilePath, fileBuffer);
        req.file = { 
          path: tempFilePath, 
          fieldname: "file", 
          originalname: "script.js", 
          encoding: "7bit", 
          mimetype: "application/javascript", 
          size: fileBuffer.length, 
          destination: "uploads/", 
          filename: path.basename(tempFilePath),
          stream: new PassThrough().end(fileBuffer),
          buffer: fileBuffer
        }; // Simulate multer's `req.file`
        next();
      });
    } catch (error) {
      log.error(`Error handling JavaScript file upload: ${error}`);
      safeResponse(res, 500, { error: "Failed to process JavaScript file" });
    }
  } else {
    next();
  }
}

// Select token(s)
utilityRouter.post("/select", ...commonMiddleware, createApiRoute({
  type: 'select',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ],
  optionalParams: [
    { name: 'uuids', from: 'body', type: 'array' },
    { name: 'name', from: 'body', type: 'string' },
    { name: 'data', from: 'body', type: 'object' },
    { name: 'overwrite', from: 'body', type: 'boolean' },
    { name: 'all', from: 'body', type: 'boolean' }
  ],
  validateParams: (params) => {
    if (!params.uuids?.length && !params.name && !params.data) {
      return {
        error: "Either uuids array, name, or data is required",
        howToUse: "Provide uuids, name, or data parameters"
      };
    }
    return null;
  }
}));

// Return selected token(s)
utilityRouter.get("/selected", ...commonMiddleware, createApiRoute({
  type: 'selected',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ]
}));

// Execute JavaScript in Foundry VTT
utilityRouter.post("/execute-js", ...commonMiddleware, upload.single("scriptFile"), handleJavaScriptFile, createApiRoute({
  type: 'execute-js',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ],
  optionalParams: [
    { name: 'script', from: 'body', type: 'string' }
  ],
  validateParams: (params, req) => {
    if (!params.script && !req.file) {
      return {
        error: "A JavaScript script or scriptFile is required"
      };
    }
    if (params.script && !validateScript(params.script)) {
      log.warn(`Request for ${params.clientId} contains forbidden patterns`);
      return {
        error: "Script contains forbidden patterns"
      };
    }
    return null;
  },
  buildPayload: async (params, req) => {
    let script = params.script;
    
    // Handle file upload if present
    if (req.file) {
      const filePath = req.file.path;
      script = await fs.readFile(filePath, "utf-8");
      await fs.unlink(filePath); // Clean up uploaded file
    }

    return {
      script
    };
  }
}));