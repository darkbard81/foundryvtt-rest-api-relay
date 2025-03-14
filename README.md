# Foundry REST API
This project consists of two main components:

- [Relay Server](https://github.com/ThreeHats/foundryvtt-rest-api-relay): A WebSocket server that facilitates communication between Foundry VTT and external applications.
- [Foundry Module](https://github.com/ThreeHats/foundryvtt-rest-api): A Foundry VTT module that connects to the relay server and provides access to Foundry data through a REST API.

## Foundry REST API Relay Server
The server provides WebSocket connectivity and a REST API to access Foundry VTT data remotely.

### Features
- [Documentation](https://github.com/ThreeHats/foundryvtt-rest-api/wiki)
- WebSocket relay to connect Foundry clients with external applications
- REST API endpoints for searching Foundry content and retrieving entity data
- Client management for tracking Foundry connections
- Data storage and search results
- [Roadmap](https://github.com/users/ThreeHats/projects/7)

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

## Foundry REST API Module
A Foundry VTT module that connects to the relay server and provides access to Foundry data.

### Features
- WebSocket connection to relay server
- Integration with Foundry's QuickInsert for powerful search capabilities
- Entity retrieval by UUID
- Configurable WebSocket relay URL and token

### Installation
1. Install the module with the latest manifest link [https://github.com/ThreeHats/foundryvtt-rest-api/releases/latest/download/module.json]([https://github.com/ThreeHats/foundryvtt-rest-api/releases/latest/download/module.json](https://github.com/ThreeHats/foundryvtt-rest-api/releases/latest/download/module.json))
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
