## **GET** /api/status

Returns the API status

### Request

#### Request URL

```
$baseUrl/api/status
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |

### Response

#### Status: 200 OK

```json
{
  "status": "ok",
  "version": "1.0.0",
  "websocket": "/relay"
}
```


