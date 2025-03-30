## **POST** /roll

## Makes a new roll in Foundry

### Request

#### Request URL

```
$baseUrl/roll?clientId=$clientId
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} | Auth token to connect to specific Foundry world |

#### Request Payload

```json
{
  "formula": "10d20kl",
  "itemUuid": "uuid",
  "flavor": "Attack Roll",
  "createChatMessage": true,
  "target": "uuid",
  "speaker": "uuid",
  "whisper": [
    "uuid"
  ]
}
```

### Response

#### Status: 200 OK

```json
{
  "clientId": "foundry-rQLkX9c1U2Tzkyh8",
  "success": true,
  "roll": {
    "id": "manual_1741128675717_nk13z3fkh",
    "chatMessageCreated": true,
    "roll": {
      "formula": "2d20kl + 2d8",
      "total": 16,
      "isCritical": false,
      "isFumble": false,
      "dice": [
        {
          "faces": 20,
          "results": [
            {
              "result": 12,
              "active": true
            },
            {
              "result": 14,
              "active": false
            }
          ]
        },
        {
          "faces": 8,
          "results": [
            {
              "result": 1,
              "active": true
            },
            {
              "result": 3,
              "active": true
            }
          ]
        }
      ],
      "timestamp": 1741128675737
    }
  }
}
```


