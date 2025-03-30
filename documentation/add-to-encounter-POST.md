## **POST** /add-to-encounter

## Add to encounter

### Request

#### Request URL

```
$baseUrl/add-to-encounter?clientId=$clientId
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
{
  "selected": true,
  "rollInitiative": true,
  "uuids": [
    "uuid"
  ]
}
```

### Response

#### Status: 200 OK

```json
{
  "requestId": "add_encounter_1743294669123_2kuhqa4",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "encounterId": "DS63gdIoWNFgslNg",
  "added": [
    "Scene.3XgC4FuTLW9nUMfR.Token.WlzltpZlMQhFPwuL"
  ],
  "failed": []
}
```


