import express, { Router } from 'express';
import { requestForwarderMiddleware } from '../../middleware/requestForwarder';
import { authMiddleware, trackApiUsage } from '../../middleware/auth';
import { createApiRoute } from '../route-helpers';

export const dnd5eRouter = Router();

const commonMiddleware = [requestForwarderMiddleware, authMiddleware, trackApiUsage, express.json()];

// Get details for a specific actor
dnd5eRouter.get("/get-actor-details", ...commonMiddleware, createApiRoute({
    type: 'get-actor-details',
    requiredParams: [
        { name: 'clientId', from: ['body', 'query'], type: 'string' },
        { name: 'actorUuid', from: ['body', 'query'], type: 'string' },
        { name: 'details', from: ['body', 'query'], type: 'array' }
    ]
}));

// Modify the charges for a specific item
dnd5eRouter.post("/modify-item-charges", ...commonMiddleware, createApiRoute({
    type: 'modify-item-charges',
    requiredParams: [
        { name: 'clientId', from: ['body', 'query'], type: 'string' },
        { name: 'actorUuid', from: ['body', 'query'], type: 'string' },
        { name: 'amount', from: ['body', 'query'], type: 'number' }
    ],
    optionalParams: [
        { name: 'itemUuid', from: ['body', 'query'], type: 'string' },
        { name: 'itemName', from: ['body', 'query'], type: 'string' }
    ]
}));

// Use an ability for an actor
dnd5eRouter.post("/use-ability", ...commonMiddleware, createApiRoute({
    type: 'use-ability',
    requiredParams: [
        { name: 'clientId', from: ['body', 'query'], type: 'string' },
        { name: 'actorUuid', from: ['body', 'query'], type: 'string' }
    ],
    optionalParams: [
        { name: 'abilityUuid', from: ['body', 'query'], type: 'string' },
        { name: 'abilityName', from: ['body', 'query'], type: 'string' },
        { name: 'targetUuid', from: ['body', 'query'], type: 'string' },
        { name: 'targetName', from: ['body', 'query'], type: 'string' }
    ]
}));

// Use a feature for an actor
dnd5eRouter.post("/use-feature", ...commonMiddleware, createApiRoute({
    type: 'use-feature',
    requiredParams: [
        { name: 'clientId', from: ['body', 'query'], type: 'string' },
        { name: 'actorUuid', from: ['body', 'query'], type: 'string' }
    ],
    optionalParams: [
        { name: 'abilityUuid', from: ['body', 'query'], type: 'string' },
        { name: 'abilityName', from: ['body', 'query'], type: 'string' },
        { name: 'targetUuid', from: ['body', 'query'], type: 'string' },
        { name: 'targetName', from: ['body', 'query'], type: 'string' }
    ]
}));

// Use a spell for an actor
dnd5eRouter.post("/use-spell", ...commonMiddleware, createApiRoute({
    type: 'use-spell',
    requiredParams: [
        { name: 'clientId', from: ['body', 'query'], type: 'string' },
        { name: 'actorUuid', from: ['body', 'query'], type: 'string' }
    ],
    optionalParams: [
        { name: 'abilityUuid', from: ['body', 'query'], type: 'string' },
        { name: 'abilityName', from: ['body', 'query'], type: 'string' },
        { name: 'targetUuid', from: ['body', 'query'], type: 'string' },
        { name: 'targetName', from: ['body', 'query'], type: 'string' }
    ]
}));

// Use an item for an actor
dnd5eRouter.post("/use-item", ...commonMiddleware, createApiRoute({
    type: 'use-item',
    requiredParams: [
        { name: 'clientId', from: ['body', 'query'], type: 'string' },
        { name: 'actorUuid', from: ['body', 'query'], type: 'string' }
    ],
    optionalParams: [
        { name: 'abilityUuid', from: ['body', 'query'], type: 'string' },
        { name: 'abilityName', from: ['body', 'query'], type: 'string' },
        { name: 'targetUuid', from: ['body', 'query'], type: 'string' },
        { name: 'targetName', from: ['body', 'query'], type: 'string' }
    ]
}));

// Modify a resource for an actor (e.g., spell slots, health)
dnd5eRouter.post("/modify-resource", ...commonMiddleware, createApiRoute({
    type: 'modify-resource',
    requiredParams: [
        { name: 'clientId', from: ['body', 'query'], type: 'string' },
        { name: 'actorUuid', from: ['body', 'query'], type: 'string' },
        { name: 'resourceName', from: ['body', 'query'], type: 'string' },
        { name: 'amount', from: ['body', 'query'], type: 'number' }
    ]
}));