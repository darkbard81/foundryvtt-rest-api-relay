---
id: intro
title: Getting Started
sidebar_position: 1
---

# Getting Started with FoundryVTT REST API Relay

Welcome to the documentation for the FoundryVTT REST API Relay. This project allows you to interact with your Foundry Virtual Tabletop instance through a RESTful API, opening up possibilities for integrations, automations, and external tools.

This documentation will guide you through setting up the relay server, configuring the Foundry VTT module, and making your first API calls.

## How It Works

The project consists of two main parts:

1.  **The Relay Server:** A Node.js application that you can host yourself (or use the public one). It acts as a bridge, managing connections from your Foundry VTT instance and exposing a secure REST API.
2.  **The Foundry VTT Module:** A module you install in your Foundry VTT setup. It connects to the relay server via WebSockets, authenticates, and then listens for API commands to execute within your world.

## Navigation

-   **[Installation](./installation):** Step-by-step guide to get the relay server running.
-   **[Foundry Module Setup](./foundry-module):** How to install and configure the module in Foundry VTT.
-   **[Authentication](./authentication):** How to get and use your API key.
-   **[Your First API Call](./first-api-call):** A simple tutorial to verify your setup is working.
-   **[API Reference](/api):** Detailed documentation for all available API endpoints.
