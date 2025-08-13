---
id: api-reference
title: API Reference
sidebar_label: API Reference
---

# FoundryVTT REST API Reference

This is the API reference for the FoundryVTT REST API Relay server.

## Available Endpoints

The API is divided into several resource groups:

- [DnD5e](dnd5e) - D&D 5th Edition specific endpoints
- [Encounter](encounter) - Combat encounter management
- [Entity](entity) - General entity manipulation (actors, items, etc.)
- [File System](fileSystem) - File management operations
- [Macro](macro) - Execute and manage macros
- [Roll](roll) - Perform dice rolls
- [Search](search) - Search the Foundry database
- [Session](session) - Manage headless Foundry sessions
- [Sheet](sheet) - Interact with character sheets
- [Structure](structure) - Get information about world structure
- [Utility](utility) - Miscellaneous utility endpoints

Each endpoint is documented with its path, HTTP method, required and optional parameters, and expected response format.

## Authentication

Most API endpoints require authentication with an API key. Provide your API key in the `x-api-key` header with each request.
