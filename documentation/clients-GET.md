## **GET** /clients

Returns connected client Foundry Worlds

### Request

#### Request URL

```
$baseUrl/clients
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

### Response

#### Status: 200 OK

```json
{
  "total": 2,
  "clients": [
    {
      "id": "foundry-LZw0ywlj1iYpkUSR",
      "lastSeen": 1741132430381,
      "connectedSince": 1741132430381
    },
    {
      "id": "foundry-rQLkX9c1U2Tzkyh8",
      "lastSeen": 1741132381381,
      "connectedSince": 1741132381381
    }
  ]
}
```


