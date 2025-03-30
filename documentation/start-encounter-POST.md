## **POST** /start-encounter

## Starts an encouter

### Request

#### Request URL

```
$baseUrl/start-encounter?clientId=$clientId
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
  "startWithSelected": true,
  "startWithPlayers": true,
  "rollNPC": true,
  "rollAll": true,
  "name": "BATTLE",
  "tokens": [
    "uuid"
  ]
}
```

### Response

#### Status: 201 Created

```json
{
  "requestId": "start_encounter_1743294526347_v6ig54y",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "encounterId": "DS63gdIoWNFgslNg",
  "encounter": {
    "id": "DS63gdIoWNFgslNg",
    "round": 1,
    "turn": 1,
    "combatants": [
      {
        "id": "hwqLFvGQmhfyGuPZ",
        "name": "test",
        "tokenUuid": "Scene.3XgC4FuTLW9nUMfR.Token.dl7cg9JodXXkzZoW",
        "actorUuid": "Actor.GShFabyjOXQ4XOdi",
        "img": "icons/svg/mystery-man.svg",
        "initiative": 8.1,
        "hidden": false,
        "defeated": false
      },
      {
        "id": "vAu2lQubDPZgofNd",
        "name": "Ape",
        "tokenUuid": "Scene.3XgC4FuTLW9nUMfR.Token.0T1QJqObyA5dlTg2",
        "actorUuid": "Scene.3XgC4FuTLW9nUMfR.Token.0T1QJqObyA5dlTg2.Actor.MoqzrjLjj5mlMARQ",
        "img": "systems/dnd5e/tokens/beast/Ape.webp",
        "initiative": 20.2,
        "hidden": false,
        "defeated": false
      }
    ]
  }
}
```


