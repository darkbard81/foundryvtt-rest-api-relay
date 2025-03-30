## **DELETE** /delete

## Deletes an entity from Foundry

### Request

#### Request URL

```
$baseUrl/delete?clientId=$clientId&selected=true
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} |   |
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
  "requestId": "delete_1743294354234_ac5bh0y",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "message": "Successfully deleted"
}
```


