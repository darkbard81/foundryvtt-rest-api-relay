import { Router } from 'express';
import express from 'express';
import { requestForwarderMiddleware } from '../../middleware/requestForwarder';
import { authMiddleware, trackApiUsage } from '../../middleware/auth';
import { createApiRoute } from '../route-helpers';
export const encounterRouter = Router();
const commonMiddleware = [requestForwarderMiddleware, authMiddleware, trackApiUsage];

// Get all active encounters
encounterRouter.get("/encounters", ...commonMiddleware, createApiRoute({
  type: 'encounters',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ]
}));

// Start encounter
encounterRouter.post("/start-encounter", ...commonMiddleware, express.json(), createApiRoute({
  type: 'start-encounter',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ],
  optionalParams: [
    { name: 'tokens', from: 'body', type: 'array' },
    { name: 'startWithSelected', from: 'body', type: 'boolean' },
    { name: 'startWithPlayers', from: 'body', type: 'boolean' },
    { name: 'rollNPC', from: 'body', type: 'boolean' },
    { name: 'rollAll', from: 'body', type: 'boolean' },
    { name: 'name', from: 'body', type: 'string' }
  ]
}));

// Next turn in encounter
encounterRouter.post("/next-turn", ...commonMiddleware, express.json(), createApiRoute({
  type: 'next-turn',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ],
  optionalParams: [
    { name: 'encounter', from: ['query', 'body'], type: 'string' }
  ]
}));

// Next round in encounter
encounterRouter.post("/next-round", ...commonMiddleware, express.json(), createApiRoute({
  type: 'next-round',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ],
  optionalParams: [
    { name: 'encounter', from: ['query', 'body'], type: 'string' }
  ]
}));

// Previous turn in encounter
encounterRouter.post("/last-turn", ...commonMiddleware, express.json(), createApiRoute({
  type: 'last-turn',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ],
  optionalParams: [
    { name: 'encounter', from: ['query', 'body'], type: 'string' }
  ]
}));

// Previous round in encounter
encounterRouter.post("/last-round", ...commonMiddleware, express.json(), createApiRoute({
  type: 'last-round',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ],
  optionalParams: [
    { name: 'encounter', from: ['query', 'body'], type: 'string' }
  ]
}));

// End an encounter
encounterRouter.post("/end-encounter", ...commonMiddleware, express.json(), createApiRoute({
  type: 'end-encounter',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ],
  optionalParams: [
    { name: 'encounter', from: ['query', 'body'], type: 'string' }
  ]
}));

// Add to encounter
encounterRouter.post("/add-to-encounter", ...commonMiddleware, express.json(), createApiRoute({
  type: 'add-to-encounter',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ],
  optionalParams: [
    { name: 'encounter', from: ['query', 'body'], type: 'string' },
    { name: 'selected', from: 'body', type: 'boolean' },
    { name: 'uuids', from: 'body', type: 'array' },
    { name: 'rollInitiative', from: 'body', type: 'boolean' }
  ]
}));

// Remove from encounter
encounterRouter.post("/remove-from-encounter", ...commonMiddleware, express.json(), createApiRoute({
  type: 'remove-from-encounter',
  requiredParams: [
    { name: 'clientId', from: 'query', type: 'string' }
  ],
  optionalParams: [
    { name: 'encounter', from: ['query', 'body'], type: 'string' },
    { name: 'selected', from: 'body', type: 'boolean' },
    { name: 'uuids', from: 'body', type: 'array' }
  ]
}));