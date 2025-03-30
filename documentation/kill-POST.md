## **POST** /kill

## Reduce to 0hp and mark dead and defeated

### Request

#### Request URL

```
$baseUrl/kill?clientId=$clientId&selected=true
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} | Auth token to connect to specific Foundry world |
| Query String Parameter | uuid | uuid |   |
| Query String Parameter | selected | true |   |

#### Request Payload

```json
{}
```

### Response

#### Status: 200 OK

```json
{
  "requestId": "kill_1743294714656_ifeh0if",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "uuid": "Scene.3XgC4FuTLW9nUMfR.Token.0T1QJqObyA5dlTg2",
  "success": true,
  "message": "Token marked as defeated, HP set to 0, and dead effect applied"
}
```


