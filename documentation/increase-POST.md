## **POST** /increase

## Increase an attribute

### Request

#### Request URL

```
$baseUrl/increase?clientId=$clientId&uuid=uuid
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} | Auth token to connect to specific Foundry world |
| Query String Parameter | uuid | uuid |   |
| Query String Parameter | selected | true |   |

#### Request Payload

```json
{
  "attribute": "system.attributes.hp.value",
  "amount": 12
}
```

### Response

#### Status: 200 OK

```json
{
  "requestId": "increase_1743294775731_ds835gv",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "uuid": "Actor.GShFabyjOXQ4XOdi",
  "attribute": "system.attributes.hp.value",
  "success": true,
  "newValue": 76,
  "oldValue": 64
}
```


