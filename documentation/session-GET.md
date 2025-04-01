## **GET** /session

Gets the currently active headless Foundry session.

### Request

#### Request URL

```
$baseUrl/session
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

### Response

#### Status: 200 OK

```json
{
  "activeSessions": [
    {
      "id": "baec8e88-567d-45ec-9ab5-88107dd6ceb4",
      "clientId": "foundry-DKL4ZKK80lUZFgSJ",
      "lastActivity": 1743521258626,
      "idleMinutes": 0
    }
  ]
}
```


