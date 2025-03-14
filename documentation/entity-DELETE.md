## **DELETE** /entity

## Deletes an entity from Foundry

### Request

#### Request URL

```
$baseUrl/entity/:uuid?clientId=$clientId
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
{}
```

### Response

#### Status: 200 OK

```json
{
  "requestId": "delete_1741128863204_waoz8h8",
  "clientId": "foundry-rQLkX9c1U2Tzkyh8",
  "uuid": "Actor.bGTFSQJZCIYycF7W",
  "message": "Entity successfully deleted"
}
```


