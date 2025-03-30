## **GET** /macros

## Returns all available macros

### Request

#### Request URL

```
$baseUrl/macros?clientId=$clientId
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
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "total": 9,
  "macros": [
    {
      "uuid": "Macro.0CGprxvDAbZYi1Tw",
      "id": "0CGprxvDAbZYi1Tw",
      "name": "DAE: Create Sample DAEConditionalEffects",
      "type": "script",
      "author": "Gamemaster",
      "command": "itemData = await foundry.utils.fetchJsonWithTimeout('modules/dae/data/DAEConditionalEffects.json');\n        CONFIG.Item.documentClass.create([itemData]);",
      "img": "icons/svg/dice-target.svg",
      "scope": "global",
      "canExecute": true
    },
    {
      "uuid": "Macro.1XRDtSa9zeaAXUur",
      "id": "1XRDtSa9zeaAXUur",
      "name": "DAE: Clear Scene DAE Passive Effects",
      "type": "script",
      "author": "Gamemaster",
      "command": "await game.modules.get(\"dae\").api.removeScenePassiveEffects()",
      "img": "icons/svg/dice-target.svg",
      "scope": "global",
      "canExecute": true
    },
    {
      "uuid": "Macro.3J25ndtGjJkXrXpF",
      "id": "3J25ndtGjJkXrXpF",
      "name": "DAE: Clear All Compendium DAE Passive Effects",
      "type": "script",
      "author": "Gamemaster",
      "command": "await game.modules.get(\"dae\").api.removeCompendiaPassiveEffects()",
      "img": "icons/svg/dice-target.svg",
      "scope": "global",
      "canExecute": true
    },
    {
      "uuid": "Macro.5OBDnmezKUk19kRo",
      "id": "5OBDnmezKUk19kRo",
      "name": "DAE: Clear All Scenes DAE Passive Effects",
      "type": "script",
      "author": "Gamemaster",
      "command": "await game.modules.get(\"dae\").api.removeAllScenesPassiveEffects()",
      "img": "icons/svg/dice-target.svg",
      "scope": "global",
      "canExecute": true
    },
    {
      "uuid": "Macro.ANstLvHAYE9a0J4v",
      "id": "ANstLvHAYE9a0J4v",
      "name": "DAE: Clear All Actors DAE Passive Effects",
      "type": "script",
      "author": "Gamemaster",
      "command": "await game.modules.get(\"dae\").api.removeActorsPassiveEffects()",
      "img": "icons/svg/dice-target.svg",
      "scope": "global",
      "canExecute": true
    },
    {
      "uuid": "Macro.LcjW81QuMMqAYpNW",
      "id": "LcjW81QuMMqAYpNW",
      "name": "reload",
      "type": "script",
      "author": "Gamemaster",
      "command": "window.location.reload();",
      "img": "icons/svg/dice-target.svg",
      "scope": "global",
      "canExecute": true
    },
    {
      "uuid": "Macro.UPIq0u6VRvChqfjH",
      "id": "UPIq0u6VRvChqfjH",
      "name": "MidiQOL.exportTroubleShooterData",
      "type": "script",
      "author": "Gamemaster",
      "command": "MidiQOL.TroubleShooter.exportTroubleShooterData()",
      "img": "icons/svg/dice-target.svg",
      "scope": "global",
      "canExecute": true
    },
    {
      "uuid": "Macro.Z71q9zQKm2iqnU0y",
      "id": "Z71q9zQKm2iqnU0y",
      "name": "MidiQOL.GMShowPlayerDamageCards",
      "type": "script",
      "author": "Gamemaster",
      "command": "const matches = document.querySelectorAll(\".midi-qol-player-damage-card\");\n\tmatches.forEach(element => {\n\tlet target = element.parentElement.parentElement.parentElement;\n\ttarget.style.display = \"inherit\";\n\t})",
      "img": "icons/svg/dice-target.svg",
      "scope": "global",
      "canExecute": true
    },
    {
      "uuid": "Macro.cEXfrT6GCHTm6T5n",
      "id": "cEXfrT6GCHTm6T5n",
      "name": "MidiQOL.showTroubleShooter",
      "type": "script",
      "author": "Gamemaster",
      "command": "new MidiQOL.TroubleShooter().render(true)",
      "img": "icons/svg/dice-target.svg",
      "scope": "global",
      "canExecute": true
    }
  ]
}
```


