## **POST** /decrease

## Decrease an attribute

### Request

#### Request URL

```
$baseUrl/decrease?clientId=$clientId&selected=true
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
  "requestId": "decrease_1743294758439_ilel8c0",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "uuid": "Actor.GShFabyjOXQ4XOdi",
  "attribute": "system.attributes.hp.value",
  "success": true,
  "newValue": 64,
  "oldValue": 76
}
```


