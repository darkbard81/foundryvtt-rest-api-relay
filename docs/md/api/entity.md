---
tag: entity
---

# entity

### GET /entity/get

Get entity details This endpoint retrieves the details of a specific entity.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| uuid | string |  | query | UUID of the entity to retrieve (optional if selected is true) |
| selected | boolean |  | query | Whether to get the selected entity |
| actor | boolean |  | query | Return the actor of specified entity |

#### Returns

**object** - Entity details object containing requested information

#### Example Request

```http
GET /entity/get

```

---

### POST /entity/create

Create a new entity This endpoint creates a new entity in the Foundry world.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| entityType | string | ✓ | body | Document type of entity to create (e.g., Actor, Item, Macro) |
| data | object | ✓ | body | Data for the new entity |
| folder | string |  | body | Optional folder UUID to place the new entity in |

#### Returns

**object** - Result of the entity creation operation

#### Example Request

```http
POST /entity/create
Content-Type: application/json

{
  "entityType": "example-value",
  "data": {
    "key": "value"
  },
  "folder": "example-value"
}
```

---

### PUT /entity/update

Update an existing entity This endpoint updates an existing entity in the Foundry world.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| data | object | ✓ | body | Data to update the entity with |
| uuid | string |  | query | UUID of the entity to update (optional if selected is true) |
| selected | boolean |  | query | Whether to update the selected entity |
| actor | boolean |  | query | Update the actor of specified entity |

#### Returns

**object** - Result of the entity update operation

#### Example Request

```http
PUT /entity/update
Content-Type: application/json

{
  "data": {
    "key": "value"
  }
}
```

---

### DELETE /entity/delete

Delete an entity This endpoint deletes an entity from the Foundry world.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| uuid | string |  | query | UUID of the entity to delete (optional if selected is true) |
| selected | boolean |  | query | Whether to delete the selected entity |

#### Returns

**object** - Result of the entity deletion operation

#### Example Request

```http
DELETE /entity/delete
Content-Type: application/json


```

---

### POST /entity/give

Give an item to an entity This endpoint gives an item to a specified entity. Optionally, removes the item from the giver.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | body, query | Client ID for the Foundry world |
| fromUuid | string |  | body | UUID of the entity giving the item |
| toUuid | string |  | body | UUID of the entity receiving the item |
| selected | boolean |  | body | Whether to give to the selected token's actor |
| itemUuid | string |  | body | UUID of the item to give (optional if itemName provided) |
| itemName | string |  | body | Name of the item to give (search with Quick Insert if UUID not provided) |
| quantity | number |  | body | Quantity of the item to give (negative values decrease quantity to 0) |

#### Returns

**object** - Result of the item giving operation

#### Example Request

```http
POST /entity/give
Content-Type: application/json

{
  "clientId": "example-value",
  "fromUuid": "example-value",
  "toUuid": "example-value"
}
```

---

### POST /remove

Remove an item from an entity This endpoint removes an item from a specified entity.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | body, query | Client ID for the Foundry world |
| actorUuid | string |  | body | UUID of the actor to remove the item from (optional if selected is true) |
| selected | boolean |  | body | Whether to remove from the selected token's actor |
| itemUuid | string |  | body | UUID of the item to remove |
| itemName | string |  | body | Name of the item to remove (search with Quick Insert if UUID not provided) |
| quantity | number |  | body | Quantity of the item to remove |

#### Example Request

```http
POST /remove
Content-Type: application/json

{
  "clientId": "example-value",
  "actorUuid": "example-value",
  "selected": true
}
```

---

### POST /entity/decrease

Decrease an attribute This endpoint decreases an attribute of a specified entity.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| attribute | string | ✓ | body | The attribute data path to decrease (e.g., "system.attributes.hp.value") |
| amount | number | ✓ | body | The amount to decrease the attribute by |
| uuid | string |  | query | UUID of the entity to decrease the attribute for (optional if selected is true) |
| selected | boolean |  | query | Whether to decrease the attribute for the selected entity |

#### Returns

**object** - Result of the attribute decrease operation

#### Example Request

```http
POST /entity/decrease
Content-Type: application/json

{
  "attribute": "example-value",
  "amount": 123
}
```

---

### POST /entity/increase

Increase an attribute This endpoint increases an attribute of a specified entity.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| attribute | string | ✓ | body | The attribute data path to increase (e.g., "system.attributes.hp.value") |
| amount | number | ✓ | body | The amount to increase the attribute by |
| uuid | string |  | query | UUID of the entity to increase the attribute for (optional if selected is true) |
| selected | boolean |  | query | Whether to increase the attribute for the selected entity |

#### Returns

**object** - Result of the attribute increase operation

#### Example Request

```http
POST /entity/increase
Content-Type: application/json

{
  "attribute": "example-value",
  "amount": 123
}
```

---

### POST /entity/kill

Kill an entity Marks an entity as killed in the combat tracker, gives it the "dead" status, and sets its health to 0 in the Foundry world.

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| clientId | string | ✓ | query | Client ID for the Foundry world |
| uuid | string |  | query | UUID of the entity to kill (optional if selected is true) |
| selected | boolean |  | query | Whether to kill the selected entity |

#### Returns

**object** - Result of the entity kill operation

#### Example Request

```http
POST /entity/kill
Content-Type: application/json


```

---

