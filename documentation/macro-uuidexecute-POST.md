## **POST** /macro/:uuid/execute

## Executes a macro

### Request

#### Request URL

```
$baseUrl/macro/:uuid/execute?clientId=$clientId
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
  "targetName": "Goblin",
  "damage": 100000,
  "effect": "poison"
}
```

### Response

#### Status: 200 OK

```json
{
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "uuid": "Macro.HNiIKSzL1ypIjLw2",
  "success": true,
  "result": {
    "success": true,
    "damageDealt": 100000,
    "target": "Goblin"
  }
}
```


### Example macro

```javascript
// Example macro that uses parameters
function myMacro(args) {
  const targetName = args.targetName || "Target";
  const damage = args.damage || 0;
  const effect = args.effect || "none";
  
  // Use the parameters
  console.log(`Attacking ${targetName} for ${damage} ${effect} damage`);
  
  // Return a value (can be any data type)
  return {
    success: true,
    damageDealt: damage,
    target: targetName
  };
}

// Don't forget to return the result of your function
return myMacro(args);
```


