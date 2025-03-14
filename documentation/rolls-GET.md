## **GET** /rolls

## Returns up to the last 20 rolls

### Request

#### Request URL

```
$baseUrl/rolls?clientId=$clientId&limit=20
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} | Auth token to connect to specific Foundry world |
| Query String Parameter | limit | 20 | (Optional) Max number of rolls to return. Max 20. Default 20. |

### Response

#### Status: 200 OK

```json
{
  "clientId": "foundry-rQLkX9c1U2Tzkyh8",
  "rolls": [
    {
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
    },
    {
      "id": "oz89N3si3Djfj2Wk",
      "messageId": "oz89N3si3Djfj2Wk",
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
      "rollTotal": 14,
      "formula": "1d20 + 10",
      "isCritical": false,
      "isFumble": false,
      "dice": [
        {
          "faces": 20,
          "results": [
            {
              "result": 4,
              "active": true
            }
          ]
        }
      ],
      "timestamp": 1741128428519
    },
    {
      "id": "Sfttez1ZI9vD27J4",
      "messageId": "Sfttez1ZI9vD27J4",
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
      "rollTotal": 14,
      "formula": "1d20",
      "isCritical": false,
      "isFumble": false,
      "dice": [
        {
          "faces": 20,
          "results": [
            {
              "result": 14,
              "active": true
            }
          ]
        }
      ],
      "timestamp": 1741128423501
    }
  ]
}
```


