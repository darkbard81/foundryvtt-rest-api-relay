## **GET** /selected

**Returns the currently selected entities**

### Request

#### Request URL

```
$baseUrl/search?clientId=$clientId&query=searchTerm&filter=filters
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} | Auth token to connect to specific Foundry world |
| Query String Parameter | query | searchTerm | Search string |
| Query String Parameter | filter | filters |   |

### Response

#### Status: 200 OK

```json
{
  "clientId": "foundry-rQLkX9c1U2Tzkyh8",
  "success": true,
  "selected": [
    {
      "tokenUuid": "Scene.ckW0qDbFoWblqQiP.Token.cklVpiD7jUgjuAfs",
      "actorUuid": "Scene.ckW0qDbFoWblqQiP.Token.cklVpiD7jUgjuAfs.Actor.OiOs87TOV3inyAhp"
    },
    {
      "tokenUuid": "Scene.ckW0qDbFoWblqQiP.Token.nVviJXoxi0rdlPMz",
      "actorUuid": "Scene.ckW0qDbFoWblqQiP.Token.nVviJXoxi0rdlPMz.Actor.LY5ybkqYtrM2mPMh"
    },
    {
      "tokenUuid": "Scene.ckW0qDbFoWblqQiP.Token.QFiq9x1kh92I5hrX",
      "actorUuid": "Scene.ckW0qDbFoWblqQiP.Token.QFiq9x1kh92I5hrX.Actor.LY5ybkqYtrM2mPMh"
    },
    {
      "tokenUuid": "Scene.ckW0qDbFoWblqQiP.Token.wG6TE81oJLnd4tHs",
      "actorUuid": "Scene.ckW0qDbFoWblqQiP.Token.wG6TE81oJLnd4tHs.Actor.LY5ybkqYtrM2mPMh"
    },
    {
      "tokenUuid": "Scene.ckW0qDbFoWblqQiP.Token.JfeWlE6rgEAjJn1N",
      "actorUuid": "Scene.ckW0qDbFoWblqQiP.Token.JfeWlE6rgEAjJn1N.Actor.LY5ybkqYtrM2mPMh"
    },
    {
      "tokenUuid": "Scene.ckW0qDbFoWblqQiP.Token.RppLJtLVZ0o00sEp",
      "actorUuid": "Scene.ckW0qDbFoWblqQiP.Token.RppLJtLVZ0o00sEp.Actor.LY5ybkqYtrM2mPMh"
    },
    {
      "tokenUuid": "Scene.ckW0qDbFoWblqQiP.Token.1N3GhNs5AA0MCY24",
      "actorUuid": "Scene.ckW0qDbFoWblqQiP.Token.1N3GhNs5AA0MCY24.Actor.edXVLYeFa9PetKnF"
    }
  ]
}
```


