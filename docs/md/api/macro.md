---
tag: macro
---

# macro

### GET /macros

Get all macros Retrieves a list of all macros available in the Foundry world.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |

#### Returns

**object** - An array of macros with details

#### Example Request

```http
GET /macros

```

---

### POST /macro/:uuid/execute

Execute a macro by UUID Executes a specific macro in the Foundry world by its UUID.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| uuid | string | ✓ | params | UUID of the macro to execute |
| args | object |  | body | Optional arguments to pass to the macro execution |

#### Returns

**object** - Result of the macro execution

#### Example Request

```http
POST /macro/:uuid/execute
Content-Type: application/json

{
  "args": {
    "key": "value"
  }
}
```

---

