## **POST** /remove-from-encounter

## Remove from encounter

### Request

#### Request URL

```
$baseUrl/remove-from-encounter?clientId=$clientId
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
  "uuids": [
    "uuid"
  ]
}
```

### Response

#### Status: 200 OK

```json
{
  "requestId": "remove_encounter_1743294687140_2gsfuyc",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "encounterId": "DS63gdIoWNFgslNg",
  "removed": [
    "Scene.3XgC4FuTLW9nUMfR.Token.WlzltpZlMQhFPwuL"
  ],
  "failed": []
}
```


