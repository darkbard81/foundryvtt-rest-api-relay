### How to use Foundry REST API:

- Install the [Foundry VTT Module](https://github.com/ThreeHats/foundryvtt-rest-api)
    
- Get an API key for the public relay server at [https://foundryvtt-rest-api-relay.fly.dev/](https://foundryvtt-rest-api-relay.fly.dev/) or you may Install and run the [Foundry REST Relay Server](https://github.com/ThreeHats/foundryvtt-rest-api-relay) locally
    
- Download [Postman](https://www.postman.com/downloads/) and the import the latest [API Test Collection](https://github.com/ThreeHats/foundryvtt-rest-api-relay/blob/main/Foundry%20REST%20API%20Documentation.postman_collection.json) for an easy way to start testing endpoints.
    
- Read this documentation for information about how to use each endpoint
    

---

Foundry REST API provides various API endpoints for fetching and interacting with your foundry world data through a node.js server that act as a relay.

## **Getting started guide**

To start using the Foundry REST API, you need to -

- Have an API key or have the relay server running on your local machine or at an address your foundry game can access.
    
- Have the URL of that server (and port if running locally) set as the "WebSocket Relay URL" in the settings for the Foundry REST API module.
    
- Have your API key in the module settings.
    
- Each request must have the your API key in the "x-api-key" header.
    
- Endpoints other than /clients require a clientId parameter that matches a connected world.
