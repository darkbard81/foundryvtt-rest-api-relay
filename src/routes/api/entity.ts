import { Router } from 'express';
import express from 'express';
import { requestForwarderMiddleware } from '../../middleware/requestForwarder';
import { authMiddleware, trackApiUsage } from '../../middleware/auth';
import { createApiRoute } from '../route-helpers';
import router from '../auth';
import { log } from '../shared';
import { validateScript } from './utility';

export const entityRouter = Router();

const commonMiddleware = [requestForwarderMiddleware, authMiddleware, trackApiUsage];

// Get entities
entityRouter.get("/get", ...commonMiddleware, createApiRoute({
    type: 'entity',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' }
    ],
    optionalParams: [
        { name: 'uuid', from: 'query', type: 'string' },
        { name: 'selected', from: 'query', type: 'boolean' },
        { name: 'actor', from: 'query', type: 'boolean' }
    ]
}));

// Create a new entity
entityRouter.post("/create", ...commonMiddleware, express.json(), createApiRoute({
    type: 'create',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' },
        { name: 'entityType', from: 'body', type: 'string' },
        { name: 'data', from: 'body', type: 'object' }
    ],
    optionalParams: [
        { name: 'folder', from: 'body', type: 'string' }
    ],
    validateParams: (params) => {
        if (params.entityType === "Macro") {
            if (!validateScript(params.data.command)) {
                log.warn(`Request for ${params.clientId} contains forbidden patterns in script`);
                return {
                    error: "Script contains forbidden patterns",
                    suggestion: "Ensure the script does not access localStorage, sessionStorage, or eval()"
                };
            }
        }
        return null;
    }
}));

// Update an entity
entityRouter.put("/update", ...commonMiddleware, express.json(), createApiRoute({
    type: 'update',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' },
        { name: 'data', from: 'body', type: 'object' }
    ],
    optionalParams: [
        { name: 'uuid', from: 'query', type: 'string' },
        { name: 'selected', from: 'query', type: 'boolean' },
        { name: 'actor', from: 'query', type: 'boolean' }
    ]
}));

// Delete entities
entityRouter.delete("/delete", ...commonMiddleware, createApiRoute({
    type: 'delete',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' }
    ],
    optionalParams: [
        { name: 'uuid', from: 'query', type: 'string' },
        { name: 'selected', from: 'query', type: 'boolean' }
    ]
}));

// Give item
entityRouter.post("/give", ...commonMiddleware, express.json(), createApiRoute({
type: 'give',
requiredParams: [
    { name: 'clientId', from: ['body', 'query'], type: 'string' }
],
optionalParams: [
    { name: 'fromUuid', from: 'body', type: 'string' },
    { name: 'toUuid', from: 'body', type: 'string' },
    { name: 'selected', from: 'body', type: 'boolean' },
    { name: 'itemUuid', from: 'body', type: 'string' },
    { name: 'itemName', from: 'body', type: 'string' },
    { name: 'quantity', from: 'body', type: 'number' }
]
}));

// Remove item
entityRouter.post("/remove", ...commonMiddleware, express.json(), createApiRoute({
type: 'remove',
requiredParams: [
    { name: 'clientId', from: ['body', 'query'], type: 'string' }
],
optionalParams: [
    { name: 'actorUuid', from: 'body', type: 'string' },
    { name: 'selected', from: 'body', type: 'boolean' },
    { name: 'itemUuid', from: 'body', type: 'string' },
    { name: 'itemName', from: 'body', type: 'string' },
    { name: 'quantity', from: 'body', type: 'number' }
]
}));

// Decrease attribute
entityRouter.post("/decrease", ...commonMiddleware, express.json(), createApiRoute({
  type: 'decrease',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' },
    { name: 'attribute', from: 'body', type: 'string' },
    { name: 'amount', from: 'body', type: 'number' }
  ],
  optionalParams: [
    { name: 'uuid', from: 'query', type: 'string' },
    { name: 'selected', from: 'query', type: 'boolean' }
  ]
}));

// Increase attribute
entityRouter.post("/increase", ...commonMiddleware, express.json(), createApiRoute({
  type: 'increase',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' },
    { name: 'attribute', from: 'body', type: 'string' },
    { name: 'amount', from: 'body', type: 'number' }
  ],
  optionalParams: [
    { name: 'uuid', from: 'query', type: 'string' },
    { name: 'selected', from: 'query', type: 'boolean' }
  ]
}));

// Kill (mark as defeated)
entityRouter.post("/kill", ...commonMiddleware, express.json(), createApiRoute({
  type: 'kill',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ],
  optionalParams: [
    { name: 'uuid', from: 'query', type: 'string' },
    { name: 'selected', from: 'query', type: 'boolean' }
  ]
}));