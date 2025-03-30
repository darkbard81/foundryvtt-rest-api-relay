## **POST** /end-encounter

## End an encounter

### Request

#### Request URL

```
$baseUrl/end-encounter?clientId=$clientId
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
  "requestId": "end_encounter_1743294742084_vqvritb",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "encounterId": "DS63gdIoWNFgslNg",
  "message": "Encounter successfully ended"
}
```


