## **POST** /upload

### Request

#### Request URL

```
$baseUrl/upload?clientId=$clientId&path=/&filename=test300.png&overwrite=true
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} |   |
| Query String Parameter | path | / |   |
| Query String Parameter | filename | test300.png |   |
| Query String Parameter | mimeType | image/png |   |
| Query String Parameter | overwrite | true |   |

#### Request Payload

```json
{}
```

### Response

#### Status: 201 Created

```json
{
  "clientId": "foundry-rQLkX9c1U2Tzkyh8",
  "requestId": "upload_file_1747509574038_7kmuktr",
  "success": true,
  "path": "test300.png",
  "message": "File uploaded successfully"
}
```


