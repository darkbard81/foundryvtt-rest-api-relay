---
id: first-api-call
title: Your First API Call
sidebar_position: 6
---

# Your First API Call

Once you have the relay server running and the Foundry VTT module installed and configured, you're ready to make your first API call.

This guide will walk you through retrieving a list of connected Foundry VTT worlds (clients).

## Prerequisites

1.  **Relay Server is running.** (See [Installation](./installation))
2.  **Foundry VTT is running** with a world loaded.
3.  **The `foundryvtt-rest-api` module is installed and enabled** in your Foundry world.
4.  The module is **configured with the correct relay server URL and your API key**. (See [Foundry Module Setup](./foundry-module))

When the module connects successfully, you should see a log message in the Foundry VTT console (F12).

## Finding Connected Clients

The `/api/v1/clients` endpoint returns a list of all Foundry VTT instances currently connected to the relay server.

### Request

This is a `GET` request and does not require any parameters in the body or query string. You only need to provide your API key in the header.

**Endpoint:** `GET /api/v1/clients`

**Header:**
- `x-api-key`: Your API Key

### Example using `curl`

Replace `YOUR_API_KEY_HERE` with the key you obtained from the relay server's web interface.

```bash
curl -X GET http://localhost:3010/api/v1/clients \
  -H "x-api-key: YOUR_API_KEY_HERE"
```

### Expected Response

If successful, you will receive a JSON response with a `clients` array. Each object in the array represents a connected Foundry VTT world.

```json
{
  "clients": [
    {
      "clientId": "aBcDeFgHiJkLmNoP",
      "world": "your-world-name",
      "system": "dnd5e",
      "status": "connected",
      "lastSeen": "2023-10-27T10:00:00.000Z"
    }
  ]
}
```

### Using the `clientId`

The `clientId` is crucial. You will need to include it as a parameter in most other API calls to specify which connected world you want to interact with.

For example, to get a list of actors from this world, you would make a request to `/api/v1/actors` and include `clientId=aBcDeFgHiJkLmNoP` as a query parameter.

Congratulations! You've made your first successful API call. You can now explore the other endpoints in the [API Reference](/api).
