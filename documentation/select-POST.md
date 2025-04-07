## **POST** /select

**Selects entities in Foundry**

### Request

#### Request URL

```
$baseUrl/select?clientId=$clientId
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
  "uuids": [
    "Scene.ckW0qDbFoWblqQiP.Token.cklVpiD7jUgjuAfs"
  ],
  "name": "ape",
  "data": {
    "actor.system.attributes.hp.value": 10,
    "name": "Aboleth"
  },
  "overwrite": true
}
```

### Response

#### Status: 200 OK

```json
{
  "clientId": "foundry-rQLkX9c1U2Tzkyh8",
  "success": true,
  "count": 7,
  "message": "7 entities selected"
}
```


