import { Router } from 'express';
import express from 'express';
import { requestForwarderMiddleware } from '../../middleware/requestForwarder';
import { authMiddleware, trackApiUsage } from '../../middleware/auth';
import { createApiRoute } from '../route-helpers';

export const rollRouter = Router();

const commonMiddleware = [requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json()];

// Get recent rolls
rollRouter.get("/rolls", ...commonMiddleware, createApiRoute({
    type: 'rolls',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' }
    ],
    optionalParams: [
        { name: 'limit', from: 'query', type: 'number' }
    ]
}));

// Get last roll
rollRouter.get("/lastroll", ...commonMiddleware, createApiRoute({
    type: 'last-roll',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' }
    ]
}));

// Create a new roll
rollRouter.post("/roll", ...commonMiddleware, createApiRoute({
    type: 'roll',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' },
        { name: 'formula', from: 'body', type: 'string' }
    ],
    optionalParams: [
        { name: 'flavor', from: 'body', type: 'string' },
        { name: 'createChatMessage', from: 'body', type: 'boolean' },
        { name: 'speaker', from: 'body', type: 'string' },
        { name: 'target', from: 'body', type: 'string' },
        { name: 'whisper', from: 'body', type: 'array' }
    ]
}));