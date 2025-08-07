import { Router } from 'express';
import { requestForwarderMiddleware } from '../../middleware/requestForwarder';
import { authMiddleware, trackApiUsage } from '../../middleware/auth';
import { createApiRoute } from '../route-helpers';

export const searchRouter = Router();

const commonMiddleware = [requestForwarderMiddleware, authMiddleware, trackApiUsage];

// Search endpoint that relays to Foundry's Quick Insert
searchRouter.get("/search", ...commonMiddleware, createApiRoute({
    type: 'search',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' },
        { name: 'query', from: 'query', type: 'string' }
    ],
    optionalParams: [
        { name: 'filter', from: 'query', type: 'string' }
    ]
}));
