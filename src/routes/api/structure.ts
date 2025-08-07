import { Router } from 'express';
import { requestForwarderMiddleware } from '../../middleware/requestForwarder';
import { authMiddleware, trackApiUsage } from '../../middleware/auth';
import { createApiRoute } from '../route-helpers';
export const structureRouter = Router();
const commonMiddleware = [requestForwarderMiddleware, authMiddleware, trackApiUsage];

// Get all folders and compendiums
structureRouter.get("/structure", ...commonMiddleware, createApiRoute({
    type: 'structure',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' }
    ]
}));

// Get all entity UUIDs in a folder or compendium
structureRouter.get("/contents/:path", ...commonMiddleware, createApiRoute({
    type: 'contents',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' },
        { name: 'path', from: 'params', type: 'string' }
    ]
}));