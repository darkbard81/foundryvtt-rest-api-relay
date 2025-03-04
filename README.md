# Foundry REST API
This project consists of two main components:

- [Relay Server](https://github.com/JustAnotherIdea/foundryvtt-rest-api-relay): A WebSocket server that facilitates communication between Foundry VTT and external applications.
- [Foundry Module](https://github.com/JustAnotherIdea/foundryvtt-rest-api): A Foundry VTT module that connects to the relay server and provides access to Foundry data through a REST API.

## Foundry REST API Relay Server
The server provides WebSocket connectivity and a REST API to access Foundry VTT data remotely.

### Features
- WebSocket relay to connect Foundry clients with external applications
- REST API endpoints for searching Foundry content and retrieving entity data
- Client management for tracking Foundry connections
- Data storage and search results

### Installation
```
### Install dependencies
pnpm install

### Run in development mode
PORT=3010 pnpm dev

### Build for production
pnpm build

### Start production server
pnpm start
```

## API Endpoints
- GET /clients - List all connected Foundry clients
- GET /clients?token=yourToken - List connected Foundry clients with a specific token
- GET /search?query=term&filter=filter&clientId=id - Search for entities using Foundry's [QuickInsert](https://foundryvtt.com/packages/quick-insert)
    - query: any string to search for
    - filter (optional): document type as string ("actor"), or filter properties object (comma-separated list of key-value pairs) with any of:
        - documentType: type of document (e.g., "Actor", "Item")
        - folder: folder location of the entity
        - id: unique identifier of the entity
        - name: name of the entity
        - package: package identifier the entity belongs to
        - packageName: human-readable package name
        - subType: sub-type of the entity
        - uuid: universal unique identifier
        - icon: icon path for the entity
        - journalLink: linked journal reference
        - tagline: short description or tagline
        - formattedMatch: formatted search match result
        - resultType: constructor name of the result type (EntitySearchItem/CompendiumSearchItem/EmbeddedEntitySearchItem)
    - clientId: ID of the Foundry client to query
- GET /get/:uuid?clientId=id - Get entity data by UUID
- WebSocket endpoint at /relay for Foundry clients

### Example
localhost:3010/search?query=aboleth&filter=resultType:CompendiumSearchItem,package:dnd5e.items&clientId=foundry-LZw0ywlj1iYpkUSR

## Foundry REST API Module
A Foundry VTT module that connects to the relay server and provides access to Foundry data.

### Features
- WebSocket connection to relay server
- Integration with Foundry's QuickInsert for powerful search capabilities
- Entity retrieval by UUID
- Configurable WebSocket relay URL and token

### Installation
1. Install the module through the Foundry VTT module installer or through the latest manifest link [https://github.com/JustAnotherIdea/foundryvtt-rest-api/releases/latest/download/module.json](https://github.com/JustAnotherIdea/foundryvtt-rest-api/releases/latest/download/module.json)
2. Configure the WebSocket relay URL in module settings
3. Set your relay token (defaults to your world ID)

### Configuration
After installing the module, go to the module settings to configure:

- WebSocket Relay URL - URL for the WebSocket relay server (default: ws://localhost:3010)
- WebSocket Relay Token - Token for grouping users together (default: your world ID)

### Technical Details
#### Server Architecture
- Express.js - HTTP server framework
- WebSocket - For real-time communication
- Data Store - In-memory storage for entities and search results
- Client Manager - Handles client connections and message routing

#### Module Architecture
- Built with TypeScript for Foundry VTT
- Integrates with Foundry's QuickInsert for powerful search capabilities
- Provides WebSocket relay functionality for external applications

#### Testing
- The project includes a simple HTML test client at test-client.html that can be used to test the WebSocket relay functionality.
