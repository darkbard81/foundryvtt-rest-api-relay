## **POST** /next-turn

## Move forward 1 turn

### Request

#### Request URL

```
$baseUrl/next-turn?clientId=$clientId
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
  "requestId": "next_turn_1743294587886_va0jr2w",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "encounterId": "DS63gdIoWNFgslNg",
  "action": "nextTurn",
  "currentTurn": 0,
  "currentRound": 2,
  "actorTurn": "Scene.3XgC4FuTLW9nUMfR.Token.0T1QJqObyA5dlTg2.Actor.MoqzrjLjj5mlMARQ",
  "tokenTurn": "Scene.3XgC4FuTLW9nUMfR.Token.0T1QJqObyA5dlTg2",
  "encounter": {
    "id": "DS63gdIoWNFgslNg",
    "round": 2,
    "turn": 0
  }
}
```


