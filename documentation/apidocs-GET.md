## **GET** /api/docs

Returns the API documentation

### Request

#### Request URL

```
$baseUrl/api/docs
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |

### Response

#### Status: 200 OK

```json
{
  "version": "1.0.0",
  "baseUrl": "http://foundryvtt-rest-api-relay.fly.dev",
  "authentication": {
    "required": true,
    "headerName": "x-api-key",
    "description": "API key must be included in the x-api-key header for all endpoints except /api/status"
  },
  "endpoints": [
    {
      "method": "GET",
      "path": "/clients",
      "description": "Returns connected client Foundry Worlds",
      "requiredParameters": [],
      "optionalParameters": [],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ],
      "responseExample": {
        "total": 2,
        "clients": [
          {
            "id": "foundry-id-1",
            "lastSeen": 1741132430381,
            "connectedSince": 1741132430381
          },
          {
            "id": "foundry-id-2",
            "lastSeen": 1741132381381,
            "connectedSince": 1741132381381
          }
        ]
      }
    },
    {
      "method": "GET",
      "path": "/search",
      "description": "Searches Foundry VTT entities using QuickInsert",
      "requiredParameters": [
        {
          "name": "query",
          "type": "string",
          "description": "Search term",
          "location": "query"
        },
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "filter",
          "type": "string",
          "description": "Filter results by type",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "GET",
      "path": "/get",
      "description": "Returns JSON data for the specified entity",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "uuid",
          "type": "string",
          "description": "The UUID of the entity to retrieve",
          "location": "query"
        },
        {
          "name": "selected",
          "type": "string",
          "description": "If 'true', returns all selected entities",
          "location": "query"
        },
        {
          "name": "actor",
          "type": "string",
          "description": "If 'true' and selected is 'true', returns the currently selected actors",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "GET",
      "path": "/structure",
      "description": "Returns the folder structure and compendiums in Foundry",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "GET",
      "path": "/contents/:path",
      "description": "Returns the contents of a folder or compendium",
      "requiredParameters": [
        {
          "name": "path",
          "type": "string",
          "description": "Path to the folder or compendium",
          "location": "path"
        },
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/create",
      "description": "Creates a new entity in Foundry with the given JSON",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        },
        {
          "name": "type",
          "type": "string",
          "description": "Entity type (Actor, Item, etc.)",
          "location": "body"
        },
        {
          "name": "data",
          "type": "object",
          "description": "Entity data",
          "location": "body"
        }
      ],
      "optionalParameters": [
        {
          "name": "folder",
          "type": "string",
          "description": "Folder ID to place the entity in",
          "location": "body"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        },
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": "Must be JSON"
        }
      ]
    },
    {
      "method": "PUT",
      "path": "/update",
      "description": "Updates an entity with the given JSON props",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        },
        {
          "name": "data",
          "type": "object",
          "description": "Entity data",
          "location": "body"
        }
      ],
      "optionalParameters": [
        {
          "name": "uuid",
          "type": "string",
          "description": "UUID of the entity to update",
          "location": "query"
        },
        {
          "name": "selected",
          "type": "string",
          "description": "If 'true', updates all selected entities",
          "location": "query"
        },
        {
          "name": "actor",
          "type": "string",
          "description": "If 'true' and selected is 'true', updates the currently selected actors",
          "location": "query"
        }
      ],
      "requestPayload": "JSON object containing the properties to update",
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        },
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": "Must be JSON"
        }
      ]
    },
    {
      "method": "DELETE",
      "path": "/delete",
      "description": "Deletes the specified entity",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "uuid",
          "type": "string",
          "description": "UUID of the entity to delete",
          "location": "query"
        },
        {
          "name": "selected",
          "type": "string",
          "description": "If 'true', deletes all selected entities",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "GET",
      "path": "/rolls",
      "description": "Returns up to the last 20 dice rolls",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "limit",
          "type": "number",
          "description": "Maximum number of rolls to return",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "GET",
      "path": "/lastroll",
      "description": "Returns the last roll made",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/roll",
      "description": "Makes a new roll in Foundry",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "formula",
          "type": "string",
          "description": "Dice roll formula (e.g. '2d6+3') - required if itemUuid is not provided",
          "location": "body"
        },
        {
          "name": "itemUuid",
          "type": "string",
          "description": "UUID of item to roll - required if formula is not provided",
          "location": "body"
        },
        {
          "name": "flavor",
          "type": "string",
          "description": "Text to display with the roll",
          "location": "body"
        },
        {
          "name": "createChatMessage",
          "type": "boolean",
          "description": "Whether to create a chat message",
          "location": "body"
        },
        {
          "name": "speaker",
          "type": "string",
          "description": "Speaker token/actor UUID for the chat message",
          "location": "body"
        },
        {
          "name": "target",
          "type": "string",
          "description": "Target token/actor UUID for the roll",
          "location": "body"
        },
        {
          "name": "whisper",
          "type": "array",
          "description": "Array of user IDs to whisper the roll to",
          "location": "body"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        },
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": "Must be JSON"
        }
      ]
    },
    {
      "method": "GET",
      "path": "/sheet",
      "description": "Returns raw HTML (or a string in a JSON response) for an entity",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "uuid",
          "type": "string",
          "description": "UUID of the entity to get the sheet for",
          "location": "query"
        },
        {
          "name": "selected",
          "type": "string",
          "description": "If 'true', returns the sheet for all selected entity",
          "location": "query"
        },
        {
          "name": "actor",
          "type": "string",
          "description": "If 'true' and selected is 'true', returns the sheet for the currently selected actor",
          "location": "query"
        },
        {
          "name": "format",
          "type": "string",
          "description": "Response format, 'html' or 'json'",
          "location": "query"
        },
        {
          "name": "scale",
          "type": "number",
          "description": "Scale factor for the sheet",
          "location": "query"
        },
        {
          "name": "tab",
          "type": "number",
          "description": "Index of the tab to activate",
          "location": "query"
        },
        {
          "name": "darkMode",
          "type": "boolean",
          "description": "Whether to use dark mode",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "GET",
      "path": "/macros",
      "description": "Returns all macros available in Foundry",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/macro/:uuid/execute",
      "description": "Executes a macro by UUID",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        },
        {
          "name": "uuid",
          "type": "string",
          "description": "UUID of the macro to execute",
          "location": "path"
        }
      ],
      "optionalParameters": [
        {
          "name": "args",
          "type": "object",
          "description": "Arguments to pass to the macro",
          "location": "body"
        }
      ],
      "requestPayload": "JSON object containing the arguments to pass to the macro",
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "GET",
      "path": "/encounters",
      "description": "Returns all active encounters in the world",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/start-encounter",
      "description": "Starts a new encounter with optional tokens",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "tokens",
          "type": "array",
          "description": "Array of token UUIDs to add to the encounter",
          "location": "body"
        },
        {
          "name": "startWithSelected",
          "type": "boolean",
          "description": "Whether to start with selected tokens",
          "location": "body"
        },
        {
          "name": "startWithPlayers",
          "type": "boolean",
          "description": "Whether to start with player tokens",
          "location": "body"
        },
        {
          "name": "rollNPC",
          "type": "boolean",
          "description": "Whether to roll initiative for NPC tokens",
          "location": "body"
        },
        {
          "name": "rollAll",
          "type": "boolean",
          "description": "Whether to roll initiative for all tokens",
          "location": "body"
        },
        {
          "name": "name",
          "type": "string",
          "description": "Name for the encounter",
          "location": "body"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        },
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": "Must be JSON"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/next-turn",
      "description": "Advances to the next turn in an encounter",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "encounter",
          "type": "string",
          "description": "ID of the encounter to advance (uses active encounter if not specified)",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/next-round",
      "description": "Advances to the next round in an encounter",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "encounter",
          "type": "string",
          "description": "ID of the encounter to advance (uses active encounter if not specified)",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/last-turn",
      "description": "Goes back to the previous turn in an encounter",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "encounter",
          "type": "string",
          "description": "ID of the encounter to rewind (uses active encounter if not specified)",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/last-round",
      "description": "Goes back to the previous round in an encounter",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "encounter",
          "type": "string",
          "description": "ID of the encounter to rewind (uses active encounter if not specified)",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/end-encounter",
      "description": "Ends a specific encounter",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "encounter",
          "type": "string",
          "description": "ID of the encounter to end",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/add-to-encounter",
      "description": "Add entities to an encounter",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "encounter",
          "type": "string",
          "description": "ID of the encounter to add to",
          "location": "query"
        },
        {
          "name": "uuids",
          "type": "array",
          "description": "Array of entity UUIDs to add",
          "location": "body"
        },
        {
          "name": "selected",
          "type": "boolean",
          "description": "Whether to add selected tokens",
          "location": "body"
        },
        {
          "name": "rollInitiative",
          "type": "boolean",
          "description": "Whether to roll initiative for all entities",
          "location": "body"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        },
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": "Must be JSON"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/remove-from-encounter",
      "description": "Remove entities from an encounter",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "encounter",
          "type": "string",
          "description": "ID of the encounter to remove from",
          "location": "query"
        },
        {
          "name": "uuids",
          "type": "array",
          "description": "Array of entity UUIDs to remove",
          "location": "body"
        },
        {
          "name": "selected",
          "type": "boolean",
          "description": "Whether to remove selected tokens",
          "location": "body"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        },
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": "Must be JSON"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/kill",
      "description": "Mark an entity as defeated",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "uuid",
          "type": "string",
          "description": "UUID of the entity to mark as defeated",
          "location": "query"
        },
        {
          "name": "selected",
          "type": "string",
          "description": "If 'true' mark all selected tokens as defeated",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/decrease",
      "description": "Decrease an attribute value on an entity",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        },
        {
          "name": "attribute",
          "type": "string",
          "description": "Attribute path (e.g. 'system.attributes.hp.value')",
          "location": "query"
        },
        {
          "name": "amount",
          "type": "number",
          "description": "Amount to decrease",
          "location": "query"
        }
      ],
      "optionalParameters": [
        {
          "name": "uuid",
          "type": "string",
          "description": "UUID of the entity",
          "location": "query"
        },
        {
          "name": "selected",
          "type": "string",
          "description": "If 'true' decrease all selected tokens",
          "location": "query"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/increase",
      "description": "Increase an attribute value on an entity",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        },
        {
          "name": "attribute",
          "type": "string",
          "description": "Attribute path (e.g. 'system.attributes.hp.value')",
          "location": "body"
        },
        {
          "name": "amount",
          "type": "number",
          "description": "Amount to increase",
          "location": "body"
        }
      ],
      "optionalParameters": [
        {
          "name": "uuid",
          "type": "string",
          "description": "UUID of the entity",
          "location": "body"
        },
        {
          "name": "selected",
          "type": "string",
          "description": "If 'true' increase all selected tokens",
          "location": "body"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API key"
        }
      ]
    },
    {
      "method": "POST",
      "path": "/give",
      "description": "Transfer an item from one actor to another",
      "requiredParameters": [
        {
          "name": "clientId",
          "type": "string",
          "description": "Auth token to connect to specific Foundry world",
          "location": "query"
        },
        {
          "name": "itemUuid",
          "type": "string",
          "description": "UUID of the item to transfer",
          "location": "body"
        }
      ],
      "optionalParameters": [
        {
          "name": "fromUuid",
          "type": "string",
          "description": "UUID of the source actor",
          "location": "body"
        },
        {
          "name": "toUuid",
          "type": "string",
          "description": "UUID of the target actor",
          "location": "body"
        },
        {
          "name": "selected",
          "type": "boolean",
          "description": "If true, transfer to selected actor",
          "location": "body"
        },
        {
          "name": "quantity",
          "type": "number",
          "description": "Amount of the item to transfer",
          "location": "body"
        }
      ],
      "requestHeaders": [
        {
          "key": "x-api-key",
          "value": "{{apiKey}}",
          "description": "Your API Key"
        },
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": "Must be JSON"
        }
      ]
    },
    {
      "method": "GET",
      "path": "/api/status",
      "description": "Returns the API status and version",
      "requiredParameters": [],
      "optionalParameters": [],
      "requestHeaders": [],
      "authentication": false
    },
    {
      "method": "GET",
      "path": "/api/docs",
      "description": "Returns this API documentation",
      "requiredParameters": [],
      "optionalParameters": [],
      "requestHeaders": [],
      "authentication": false
    }
  ]
}
```


