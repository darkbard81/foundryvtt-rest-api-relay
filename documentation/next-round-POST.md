## **POST** /next-round

## Move forward 1 round

### Request

#### Request URL

```
$baseUrl/next-round?clientId=$clientId
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
  "requestId": "next_round_1743294600065_ozmybck",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "encounterId": "DS63gdIoWNFgslNg",
  "action": "nextRound",
  "currentTurn": 0,
  "currentRound": 3,
  "actorTurn": "Scene.3XgC4FuTLW9nUMfR.Token.0T1QJqObyA5dlTg2.Actor.MoqzrjLjj5mlMARQ",
  "tokenTurn": "Scene.3XgC4FuTLW9nUMfR.Token.0T1QJqObyA5dlTg2",
  "encounter": {
    "id": "DS63gdIoWNFgslNg",
    "round": 3,
    "turn": 0
  }
}
```


