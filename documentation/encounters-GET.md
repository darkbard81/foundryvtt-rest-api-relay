## **GET** /encounters

## Returns all encounters

### Request

#### Request URL

```
$baseUrl/encounters?clientId=$clientId
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} | Auth token to connect to specific Foundry world |

### Response

#### Status: 200 OK

```json
{
  "requestId": "encounters_1743294567992_460lhbf",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "encounters": [
    {
      "id": "DS63gdIoWNFgslNg",
      "round": 1,
      "turn": 1,
      "current": true,
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
  ]
}
```


