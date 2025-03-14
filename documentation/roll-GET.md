## **GET** /roll

## Returns the last roll made

### Request

#### Request URL

```
$baseUrl/lastroll?clientId=$clientId
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} | Auth token to connect to specific Foundry world |

### Response

#### Status: 200 OK

```json
{
  "clientId": "foundry-rQLkX9c1U2Tzkyh8",
  "roll": {
    "id": "L4hyBLlPb7tvEbDy",
    "messageId": "L4hyBLlPb7tvEbDy",
    "user": {
      "id": "rQLkX9c1U2Tzkyh8",
      "name": "Gamemaster"
    },
    "speaker": {
      "scene": "OS0HCAmQwLhwZp5B",
      "actor": null,
      "token": null,
      "alias": "Gamemaster"
    },
    "flavor": "",
    "rollTotal": 12,
    "formula": "2d12",
    "isCritical": false,
    "isFumble": false,
    "dice": [
      {
        "faces": 12,
        "results": [
          {
            "result": 9,
            "active": true
          },
          {
            "result": 3,
            "active": true
          }
        ]
      }
    ],
    "timestamp": 1741128440641
  }
}
```


