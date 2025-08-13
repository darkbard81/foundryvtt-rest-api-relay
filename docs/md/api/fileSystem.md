---
tag: fileSystem
---

# fileSystem

### GET /file-system

Get file system structure

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| path | string |  | query | The path to retrieve (relative to source) |
| source | string |  | query | The source directory to use (data, systems, modules, etc.) |
| recursive | boolean |  | query | Whether to recursively list all subdirectories |

#### Returns

**object** - File system structure with files and directories

#### Example Request

```http
GET /file-system

```

---

### POST /upload

Upload a file to Foundry's file system (handles both base64 and binary data)

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| path | string | ✓ | query/body | The directory path to upload to |
| filename | string | ✓ | query/body | The filename to save as |
| source | string |  | query/body | The source directory to use (data, systems, modules, etc.) |
| mimeType | string |  | query/body | The MIME type of the file |
| overwrite | boolean |  | query/body | Whether to overwrite an existing file |
| fileData | string |  | body | Base64 encoded file data (if sending as JSON) 250MB limit |

#### Returns

**object** - Result of the file upload operation

#### Example Request

```http
POST /upload
Content-Type: application/json


```

---

### GET /download

Download a file from Foundry's file system

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| path | string | ✓ | query | The full path to the file to download |
| source | string |  | query | The source directory to use (data, systems, modules, etc.) |
| format | string |  | query | The format to return the file in (binary, base64) |

#### Returns

**binary|object** - File contents in the requested format

#### Example Request

```http
GET /download

```

---

