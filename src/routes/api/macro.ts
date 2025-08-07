import { Router } from 'express';import express from 'express';
import { requestForwarderMiddleware } from '../../middleware/requestForwarder';
import { authMiddleware, trackApiUsage } from '../../middleware/auth';
import { createApiRoute } from '../route-helpers'
export const macroRouter = Router();
const commonMiddleware = [requestForwarderMiddleware, authMiddleware, trackApiUsage];


// Get macros
macroRouter.get("/macros", ...commonMiddleware, createApiRoute({
    type: 'macros',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' }
    ]
}));

// Execute a macro by UUID
macroRouter.post("/macro/:uuid/execute", ...commonMiddleware, createApiRoute({
    type: 'macro-execute',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' },
        { name: 'uuid', from: 'params', type: 'string' }
    ],
    optionalParams: [
        { name: 'args', from: 'body', type: 'object' }
    ]
}));