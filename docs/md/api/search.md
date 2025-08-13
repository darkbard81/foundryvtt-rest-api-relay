---
tag: search
---

# search

### GET /search

Search entities This endpoint allows searching for entities in the Foundry world based on a query string. Requires Quick Insert module to be installed and enabled.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| query | string | ✓ | query | Search query string |
| filter | string |  | query | Filter to apply (simple: filter="Actor", property-based: filter="key:value,key2:value2") |

#### Returns

**object** - Search results containing matching entities

#### Example Request

```http
GET /search

```

---

