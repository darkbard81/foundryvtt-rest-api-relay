## **POST** /last-turn

## Move backward 1 turn

### Request

#### Request URL

```
$baseUrl/last-turn?clientId=$clientId
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
  "requestId": "last_turn_1743294612530_czeanbn",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "encounterId": "DS63gdIoWNFgslNg",
  "action": "previousTurn",
  "currentTurn": 1,
  "currentRound": 2,
  "actorTurn": "Actor.GShFabyjOXQ4XOdi",
  "tokenTurn": "Scene.3XgC4FuTLW9nUMfR.Token.dl7cg9JodXXkzZoW",
  "encounter": {
    "id": "DS63gdIoWNFgslNg",
    "round": 2,
    "turn": 1
  }
}
```


