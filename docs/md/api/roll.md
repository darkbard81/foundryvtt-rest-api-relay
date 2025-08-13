---
tag: roll
---

# roll

### GET /rolls

Get recent rolls Retrieves a list of up to 20 recent rolls made in the Foundry world.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| limit | number |  | query | Optional limit on the number of rolls to return (default is 20) |

#### Returns

**object** - An array of recent rolls with details

#### Example Request

```http
GET /rolls

```

---

### GET /lastroll

Get the last roll Retrieves the most recent roll made in the Foundry world.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |

#### Returns

**object** - The most recent roll with details

#### Example Request

```http
GET /lastroll

```

---

### POST /roll

Make a roll Executes a roll with the specified formula

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| formula | string | ✓ | body | The roll formula to evaluate (e.g., "1d20 + 5") |
| flavor | string |  | body | Optional flavor text for the roll |
| createChatMessage | boolean |  | body | Whether to create a chat message for the roll |
| speaker | string |  | body | The speaker for the roll |
| whisper | array |  | body | Users to whisper the roll result to |

#### Returns

**object** - Result of the roll operation

#### Example Request

```http
POST /roll
Content-Type: application/json

{
  "formula": "example-value",
  "flavor": "example-value",
  "createChatMessage": true
}
```

---

