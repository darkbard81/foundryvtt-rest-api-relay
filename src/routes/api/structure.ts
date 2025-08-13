import { Router } from 'express';
import { requestForwarderMiddleware } from '../../middleware/requestForwarder';
import { authMiddleware, trackApiUsage } from '../../middleware/auth';
import { createApiRoute } from '../route-helpers';
export const structureRouter = Router();
const commonMiddleware = [requestForwarderMiddleware, authMiddleware, trackApiUsage];

/**
 * Get the structure of the Foundry world
 * 
 * Retrieves the folder and compendium structure for the specified Foundry world.
 * 
 * @route GET /structure
 * @query {string} clientId - Client ID for the Foundry world
 * @query {boolean} [includeEntityData=false] - Whether to include full entity data or just UUIDs and names
 * @query {string} [path] - Read structure from a specific folder or compendium (null = root)
 * @query {boolean} [recursive=false] - Read down the folder tree, building complete structure
 * @query {number} [recursiveDepth=5] - How far to read down the folder tree
 * @query {string|string[]} [types] - Types to return (Scene/Actor/Item/JournalEntry/RollTable/Cards/Macro/Playlist), can be comma-separated or JSON array
 * @returns {object} The folder and compendium structure
 */
structureRouter.get("/structure", ...commonMiddleware, createApiRoute({
    type: 'structure',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' } // Client ID for the Foundry world
    ],
    optionalParams: [
        { name: 'includeEntityData', from: 'query', type: 'boolean' },
        { name: 'path', from: 'query', type: 'string' },
        { name: 'recursive', from: 'query', type: 'boolean' },
        { name: 'recursiveDepth', from: 'query', type: 'number' },
        { name: 'types', from: 'query', type: 'string' } // Handle as string, parse as needed
    ],
    buildPayload: (params) => {
        // Handle types parameter - can be comma-separated string or JSON array
        if (params.types && typeof params.types === 'string') {
            try {
                // Try to parse as JSON first
                params.types = JSON.parse(params.types);
            } catch {
                // If not JSON, split by comma
                params.types = params.types.split(',').map((t: string) => t.trim());
            }
        }
        return params;
    }
}));

/**
 * This route is deprecated - use /structure with the path query parameter instead
 * 
 * @route GET /contents/:path
 * @returns {object} Error message directing to use /structure endpoint
 */
structureRouter.get("/contents/:path", (req, res) => {
    res.status(400).json({
        error: "This endpoint is deprecated",
        message: "Please use GET /structure with the 'path' query parameter instead",
        example: `/structure?clientId=${req.query.clientId}&path=${req.params.path}`
    });
});

/**
 * Get a specific folder by name
 * 
 * @route GET /get-folder
 * @returns {object} The folder information and its contents
 */
structureRouter.get("/get-folder", ...commonMiddleware, createApiRoute({
    type: 'get-folder',
    requiredParams: [
        { name: 'clientId', from: ['body', 'query'], type: 'string' }, // Client ID for the Foundry world
        { name: 'name', from: ['body', 'query'], type: 'string' } // Name of the folder to retrieve
    ]
}));

/**
 * Create a new folder
 * 
 * @route POST /create-folder
 * @returns {object} The created folder information
 */
structureRouter.post("/create-folder", ...commonMiddleware, createApiRoute({
    type: 'create-folder',
    requiredParams: [
        { name: 'clientId', from: ['body', 'query'], type: 'string' }, // Client ID for the Foundry world
        { name: 'name', from: ['body', 'query'], type: 'string' }, // Name of the new folder
        { name: 'folderType', from: ['body', 'query'], type: 'string' } // Type of folder (Scene, Actor, Item, JournalEntry, RollTable, Cards, Macro, Playlist)
    ],
    optionalParams: [
        { name: 'parentFolderId', from: ['body', 'query'], type: 'string' } // ID of the parent folder (optional for root level)
    ]
}));

/**
 * Delete a folder
 * 
 * @route DELETE /delete-folder
 * @returns {object} Confirmation of deletion
 */
structureRouter.delete("/delete-folder", ...commonMiddleware, createApiRoute({
    type: 'delete-folder',
    requiredParams: [
        { name: 'clientId', from: ['body', 'query'], type: 'string' }, // Client ID for the Foundry world
        { name: 'folderId', from: ['body', 'query'], type: 'string' } // ID of the folder to delete
    ],
    optionalParams: [
        { name: 'deleteAll', from: ['body', 'query'], type: 'boolean' } // Whether to delete all entities in the folder
    ]
}));