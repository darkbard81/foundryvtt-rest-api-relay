---
tag: sheet
---

# sheet

### GET /sheet

Get actor sheet HTML This endpoint retrieves the HTML for an actor sheet based on the provided UUID or selected actor. Only works on Foundry version 12.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | The ID of the Foundry client to connect to |
| uuid | string |  | query | The UUID of the actor to get the sheet for |
| selected | boolean |  | query | Whether to get the sheet for the selected actor |
| actor | boolean |  | query | Whether this is an actor sheet (true) or item sheet (false) |
| format | string |  | query | The format to return the sheet in (html, json) |
| scale | number |  | query | The initial scale of the sheet |
| tab | number |  | query | The active tab index to open |
| darkMode | boolean |  | query | Whether to use dark mode for the sheet |

#### Returns

**object** - The sheet HTML or data depending on format requested

#### Example Request

```http
GET /sheet

```

---

