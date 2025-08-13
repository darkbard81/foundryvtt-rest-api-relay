---
tag: encounter
---

# encounter

### GET /encounters

Get all active encounters Retrieves a list of all currently active encounters in the Foundry world.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |

#### Returns

**object** - An array of active encounters with details

#### Example Request

```http
GET /encounters

```

---

### POST /start-encounter

Start a new encounter Initiates a new encounter in the Foundry world.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| tokens | array |  | body | Array of token UUIDs to include in the encounter |
| startWithSelected | boolean |  | body | Whether to start with selected tokens |
| startWithPlayers | boolean |  | body | Whether to start with players |
| rollNPC | boolean |  | body | Whether to roll for NPCs |
| rollAll | boolean |  | body | Whether to roll for all tokens |
| name | string |  | body | The name of the encounter (unused) |

#### Returns

**object** - Details of the started encounter

#### Example Request

```http
POST /start-encounter
Content-Type: application/json

{
  "tokens": [
    "example"
  ],
  "startWithSelected": true
}
```

---

### POST /next-turn

Advance to the next turn in the encounter Moves the encounter to the next turn.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| encounter | string |  | query, body | The ID of the encounter to advance (optional, defaults to current encounter) |

#### Returns

**object** - Details of the next turn

#### Example Request

```http
POST /next-turn
Content-Type: application/json

{
  "encounter": "example-value"
}
```

---

### POST /next-round

Advance to the next round in the encounter Moves the encounter to the next round.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| encounter | string |  | query, body | The ID of the encounter to advance (optional, defaults to current encounter) |

#### Returns

**object** - Details of the next round

#### Example Request

```http
POST /next-round
Content-Type: application/json

{
  "encounter": "example-value"
}
```

---

### POST /last-turn

Advance to the last turn in the encounter Moves the encounter to the last turn.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| encounter | string |  | query, body | The ID of the encounter to advance (optional, defaults to current encounter) |

#### Returns

**object** - Details of the last turn

#### Example Request

```http
POST /last-turn
Content-Type: application/json

{
  "encounter": "example-value"
}
```

---

### POST /last-round

Advance to the last round in the encounter Moves the encounter to the last round.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| encounter | string |  | query, body | The ID of the encounter to advance (optional, defaults to current encounter) |

#### Returns

**object** - Details of the last round

#### Example Request

```http
POST /last-round
Content-Type: application/json

{
  "encounter": "example-value"
}
```

---

### POST /end-encounter

End an encounter Ends the current encounter in the Foundry world.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| encounter | string |  | query, body | The ID of the encounter to end (optional, defaults to current encounter) |

#### Returns

**object** - Details of the ended encounter

#### Example Request

```http
POST /end-encounter
Content-Type: application/json

{
  "encounter": "example-value"
}
```

---

### POST /add-to-encounter

Add tokens to an encounter Adds selected tokens or specified UUIDs to the current encounter.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| encounter | string |  | query, body | The ID of the encounter to add tokens to (optional, defaults to current encounter) |
| selected | boolean |  | body | Whether to add selected tokens (optional, defaults to false) |
| uuids | array |  | body | The UUIDs of the tokens to add (optional, defaults to empty array) |
| rollInitiative | boolean |  | body | Whether to roll initiative for the added tokens (optional, defaults to false) |

#### Returns

**object** - Details of the updated encounter

#### Example Request

```http
POST /add-to-encounter
Content-Type: application/json

{
  "encounter": "example-value",
  "selected": true
}
```

---

### POST /remove-from-encounter

Remove tokens from an encounter Removes selected tokens or specified UUIDs from the current encounter.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| encounter | string |  | query, body | The ID of the encounter to remove tokens from (optional, defaults to current encounter) |
| selected | boolean |  | body | Whether to remove selected tokens (optional, defaults to false) |
| uuids | array |  | body | The UUIDs of the tokens to remove (optional, defaults to empty array) |

#### Returns

**object** - Details of the updated encounter

#### Example Request

```http
POST /remove-from-encounter
Content-Type: application/json

{
  "encounter": "example-value",
  "selected": true
}
```

---

