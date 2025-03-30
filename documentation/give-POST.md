## **POST** /give

## Give an item to an actor

- Item uuid required
    
- Selected actor or actor uuid
    
- Optionally take from another actor
    
- Optionally specify quantity

### Request

#### Request URL

```
$baseUrl/give?clientId=$clientId
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} | Auth token to connect to specific Foundry world |

#### Request Payload

```json
{
  "fromUuid": "uuid",
  "toUuid": "uuid",
  "selected": true,
  "itemUuid": "uuid",
  "quantity": 12
}
```

### Response

#### Status: 200 OK

```json
{
  "requestId": "give_1743294793448_bap7feb",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "toUuid": "Actor.GShFabyjOXQ4XOdi",
  "itemUuid": "Compendium.dnd5e.items.Item.6OIw31CDF6mAwFnd",
  "success": true,
  "message": "Item successfully transferred"
}
```


