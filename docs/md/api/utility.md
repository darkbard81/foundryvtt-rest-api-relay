---
tag: utility
---

# utility

### POST /select

Select token(s) Selects one or more tokens in the Foundry VTT client.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| uuids | array |  | body | Array of UUIDs to select |
| name | string |  | body | Name of the token(s) to select |
| data | object |  | body | Data to match for selection (e.g., "data.attributes.hp.value": 20) |
| overwrite | boolean |  | body | Whether to overwrite existing selection |
| all | boolean |  | body | Whether to select all tokens on the canvas |

#### Returns

**object** - The selected token(s)

#### Example Request

```http
POST /select
Content-Type: application/json

{
  "uuids": [
    "example"
  ],
  "name": "example-value"
}
```

---

### GET /selected

Get selected token(s) Retrieves the currently selected token(s) in the Foundry VTT client.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |

#### Returns

**object** - The selected token(s)

#### Example Request

```http
GET /selected

```

---

### POST /execute-js

Execute JavaScript Executes a JavaScript script in the Foundry VTT client.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| script | string |  | body | JavaScript script to execute |

#### Returns

**object** - The result of the executed script

#### Example Request

```http
POST /execute-js
Content-Type: application/json

{
  "script": "example-value"
}
```

---

