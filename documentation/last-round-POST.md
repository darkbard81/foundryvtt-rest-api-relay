## **POST** /last-round

## Move backward 1 round

### Request

#### Request URL

```
$baseUrl/last-round?clientId=$clientId
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} | Auth token to connect to specific Foundry world |
| Query String Parameter | encounter | encounterId |   |

#### Request Payload

```json
{}
```

### Response

#### Status: 200 OK

```json
{
  "requestId": "last_round_1743294624520_dahdjv7",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "encounterId": "DS63gdIoWNFgslNg",
  "action": "previousRound",
  "currentTurn": 1,
  "currentRound": 1,
  "actorTurn": "Actor.GShFabyjOXQ4XOdi",
  "tokenTurn": "Scene.3XgC4FuTLW9nUMfR.Token.dl7cg9JodXXkzZoW",
  "encounter": {
    "id": "DS63gdIoWNFgslNg",
    "round": 1,
    "turn": 1
  }
}
```


