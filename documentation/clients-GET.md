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
  "total": 1,
  "clients": [
    {
      "id": "foundry-DKL4ZKK80lUZFgSJ",
      "instanceId": "0801e45b10dd68",
      "lastSeen": 1743293759503,
      "connectedSince": 1743293759503
    }
  ]
}
```


