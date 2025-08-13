---
id: foundry-module
title: Foundry VTT Module Setup
sidebar_position: 3
---

# Foundry VTT Module Setup

The Foundry VTT REST API module is the counterpart to the relay server, running inside your Foundry VTT world. It connects to the relay and makes your world's data available through the API.

## Installation

1.  Open the Foundry VTT setup screen.
2.  Navigate to the "Add-on Modules" tab.
3.  Click "Install Module".
4.  In the "Manifest URL" field, paste the following link:
    ```
    https://github.com/ThreeHats/foundryvtt-rest-api/releases/latest/download/module.json
    ```
5.  Click "Install".

Once installed, don't forget to enable the module within your desired world.

## Configuration

After enabling the module in your world, go to the module settings to configure it:

-   **WebSocket Relay URL**: The address of your relay server.
    -   For the public relay server, use: `wss://foundryvtt-rest-api-relay.fly.dev/`
    -   For a local Docker installation, use: `ws://localhost:3010`
-   **API Key**: Your unique API key obtained from the relay server. See the [Authentication](./authentication) guide for details on how to get your key.
-   **Log Level**: Controls the verbosity of module logs for debugging.
-   **Ping Interval (seconds)**: How often the module sends a ping to the relay server to keep the connection alive (default: `30`).
-   **Max Reconnect Attempts**: The number of times the module will try to reconnect if the connection is lost (default: `20`).
-   **Reconnect Base Delay (ms)**: The initial delay before the first reconnect attempt. The delay increases exponentially with each attempt (default: `1000`).

Once configured with the correct Relay URL and API Key, the module will connect to the relay server, and you'll be ready to make API calls.
