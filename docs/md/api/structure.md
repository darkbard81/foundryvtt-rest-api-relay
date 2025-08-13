---
tag: structure
---

# structure

### GET /structure

Get the structure of the Foundry world Retrieves the folder and compendium structure for the specified Foundry world.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| includeEntityData | boolean |  | query |  |
| path | string |  | query |  |
| recursive | boolean |  | query |  |
| recursiveDepth | number |  | query |  |
| types | string |  | query | Handle as string, parse as needed |

#### Returns

**object** - The folder and compendium structure

#### Example Request

```http
GET /structure

```

---

### GET /contents/:path

This route is deprecated - use /structure with the path query parameter instead

#### Returns

**object** - Error message directing to use /structure endpoint

#### Example Request

```http
GET /contents/:path

```

---

### GET /get-folder

Get a specific folder by name

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | body, query | Client ID for the Foundry world |
| name | string | ✓ | body, query | Name of the folder to retrieve |

#### Returns

**object** - The folder information and its contents

#### Example Request

```http
GET /get-folder

```

---

### POST /create-folder

Create a new folder

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | body, query | Client ID for the Foundry world |
| name | string | ✓ | body, query | Name of the new folder |
| folderType | string | ✓ | body, query | Type of folder (Scene, Actor, Item, JournalEntry, RollTable, Cards, Macro, Playlist) |
| parentFolderId | string |  | body, query | ID of the parent folder (optional for root level) |

#### Returns

**object** - The created folder information

#### Example Request

```http
POST /create-folder
Content-Type: application/json

{
  "clientId": "example-value",
  "name": "example-value",
  "folderType": "example-value",
  "parentFolderId": "example-value"
}
```

---

### DELETE /delete-folder

Delete a folder

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | body, query | Client ID for the Foundry world |
| folderId | string | ✓ | body, query | ID of the folder to delete |
| deleteAll | boolean |  | body, query | Whether to delete all entities in the folder |

#### Returns

**object** - Confirmation of deletion

#### Example Request

```http
DELETE /delete-folder
Content-Type: application/json

{
  "clientId": "example-value",
  "folderId": "example-value",
  "deleteAll": true
}
```

---

