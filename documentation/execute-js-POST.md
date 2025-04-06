## **POST** /execute-js

#### Executes Javascript in Foundry

Accepts the script as a file upload, or as a raw string in the body with the key "script".

If included as a raw string in the body excape quotes and backslashes, and remove comments.

Returns the result of the code execution.

### Request

#### Request URL

```
$baseUrl/execute-js?clientId=$clientId
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} |   |

#### Request Payload

```json
{
  "script": "const settingsCopy=game.settings.get(\"foundry-rest-api\", \"wsRelayUrl\");return settingsCopy;"
}
```

### Response

#### Status: 200 OK

```json
{
  "requestId": "execute_js_1743941264472_e64i59d",
  "clientId": "foundry-rQLkX9c1U2Tzkyh8",
  "success": true,
  "result": "ws://localhost:3010/"
}
```


