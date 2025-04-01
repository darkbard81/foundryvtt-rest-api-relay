## **DELETE** /end-session

Ends a headless Foundry session.

### Request

#### Request URL

```
$baseUrl/end-session?sessionId=id
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | sessionId | id | The session to end |

#### Request Payload

```json
{}
```

### Response

#### Status: 200 OK

```json
{
  "success": true,
  "message": "Foundry session terminated"
}
```


