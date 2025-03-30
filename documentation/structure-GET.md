## **GET** /structure

## Returns the folders and compendiums in the world

### Request

#### Request URL

```
$baseUrl/structure?clientId=$clientId
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
  "requestId": "structure_1743293780301_jurkno6",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "folders": [
    {
      "id": "2BCAtht8pqqXfSoa",
      "name": "Active Auras",
      "type": "Compendium",
      "path": "Folder.2BCAtht8pqqXfSoa",
      "sorting": 100000
    },
    {
      "id": "HO6y5oavKc0CbBm1",
      "name": "Actor",
      "type": "Compendium",
      "path": "Folder.HO6y5oavKc0CbBm1",
      "sorting": 0
    },
    {
      "id": "wG8UiQ2b3hiBwTJI",
      "name": "Adventure",
      "type": "Compendium",
      "path": "Folder.wG8UiQ2b3hiBwTJI",
      "sorting": 0
    },
    {
      "id": "N4OlhVZTos8x2B2L",
      "name": "BRT - Better RollTables",
      "type": "Compendium",
      "path": "Folder.N4OlhVZTos8x2B2L",
      "sorting": 500000
    },
    {
      "id": "YGPgEiZn6HR3ad6y",
      "name": "Baileywiki Content",
      "type": "Compendium",
      "path": "Folder.YGPgEiZn6HR3ad6y",
      "sorting": 100000
    },
    {
      "id": "Y7o8yFriFAILXLRY",
      "name": "Boss Loot Automation Premium",
      "type": "Compendium",
      "path": "Folder.Y7o8yFriFAILXLRY",
      "sorting": 200000
    },
    {
      "id": "EeElDLXkQQo2SSlt",
      "name": "Boss Loot FX Macros Premium",
      "type": "Compendium",
      "path": "Folder.EeElDLXkQQo2SSlt",
      "sorting": 100000
    },
    {
      "id": "6LTq6M1ewxk1brNR",
      "name": "Cauldron of Plentiful Resources",
      "type": "Compendium",
      "path": "Folder.6LTq6M1ewxk1brNR",
      "sorting": 100000
    },
    {
      "id": "pJ2SZifDMUZ7Nqxq",
      "name": "Character Features",
      "type": "Compendium",
      "path": "Folder.pJ2SZifDMUZ7Nqxq",
      "sorting": 200000
    },
    {
      "id": "C2QuBxU3beFuWAKw",
      "name": "Chris's Premades",
      "type": "Compendium",
      "path": "Folder.C2QuBxU3beFuWAKw",
      "sorting": 200000
    },
    {
      "id": "1OepcXprjLROV2xH",
      "name": "D&D Beyond",
      "type": "Compendium",
      "path": "Folder.1OepcXprjLROV2xH",
      "sorting": 0
    },
    {
      "id": "PIG8cIwFbXCnAA1p",
      "name": "D&D SRD Content",
      "type": "Compendium",
      "path": "Folder.PIG8cIwFbXCnAA1p",
      "sorting": 100000
    },
    {
      "id": "4NQIcE8GNqgA0a9i",
      "name": "Gambit's Premades",
      "type": "Compendium",
      "path": "Folder.4NQIcE8GNqgA0a9i",
      "sorting": 400000
    },
    {
      "id": "mAOGmBSa299P1akq",
      "name": "Internal",
      "type": "Compendium",
      "path": "Folder.mAOGmBSa299P1akq",
      "sorting": 600000
    },
    {
      "id": "iOPgmSdX5LRS6mym",
      "name": "Internal Use",
      "type": "Compendium",
      "path": "Folder.iOPgmSdX5LRS6mym",
      "sorting": 300000
    },
    {
      "id": "T65PVi1jsI1ix5k2",
      "name": "Item",
      "type": "Compendium",
      "path": "Folder.T65PVi1jsI1ix5k2",
      "sorting": 0
    },
    {
      "id": "FbKneWaJgDHJYZpX",
      "name": "Items & Spells",
      "type": "Compendium",
      "path": "Folder.FbKneWaJgDHJYZpX",
      "sorting": 300000
    },
    {
      "id": "dxTPJO46Tb5Ziesy",
      "name": "JournalEntry",
      "type": "Compendium",
      "path": "Folder.dxTPJO46Tb5Ziesy",
      "sorting": 0
    },
    {
      "id": "tNhNmMw1FXUXDiXc",
      "name": "Legend Lore",
      "type": "Compendium",
      "path": "Folder.tNhNmMw1FXUXDiXc",
      "sorting": 100000
    },
    {
      "id": "Ags3NH5C1TzqkNlA",
      "name": "Levels",
      "type": "Compendium",
      "path": "Folder.Ags3NH5C1TzqkNlA",
      "sorting": 100000
    },
    {
      "id": "GvfWca7NiWC15Cth",
      "name": "Macro",
      "type": "Compendium",
      "path": "Folder.GvfWca7NiWC15Cth",
      "sorting": 0
    },
    {
      "id": "aknjDmEMhPVFzn6q",
      "name": "Magic Items",
      "type": "Compendium",
      "path": "Folder.aknjDmEMhPVFzn6q",
      "sorting": 100000
    },
    {
      "id": "j5Y7u8rZPbVloxsa",
      "name": "Midi Item Showcase - Community",
      "type": "Compendium",
      "path": "Folder.j5Y7u8rZPbVloxsa",
      "sorting": 500000
    },
    {
      "id": "8UYt87nky1ForLvX",
      "name": "Monsters",
      "type": "Compendium",
      "path": "Folder.8UYt87nky1ForLvX",
      "sorting": 400000
    },
    {
      "id": "kSajF01RV4mTugHz",
      "name": "Playlist",
      "type": "Compendium",
      "path": "Folder.kSajF01RV4mTugHz",
      "sorting": 0
    },
    {
      "id": "XKj2VrkbtmzsSpR1",
      "name": "Potion Crafting & Gathering",
      "type": "Compendium",
      "path": "Folder.XKj2VrkbtmzsSpR1",
      "sorting": 100000
    },
    {
      "id": "eT3GGoGXhsqXOrGd",
      "name": "Prefabs",
      "type": "Compendium",
      "path": "Folder.eT3GGoGXhsqXOrGd",
      "sorting": 200000
    },
    {
      "id": "rLYtVloWq0oiW81z",
      "name": "Rest Recovery 5e",
      "type": "Compendium",
      "path": "Folder.rLYtVloWq0oiW81z",
      "sorting": 100000
    },
    {
      "id": "2wRN43DMOTccSRIs",
      "name": "RollTable",
      "type": "Compendium",
      "path": "Folder.2wRN43DMOTccSRIs",
      "sorting": 0
    },
    {
      "id": "YNPoaYH63YAaRS2A",
      "name": "Scene",
      "type": "Compendium",
      "path": "Folder.YNPoaYH63YAaRS2A",
      "sorting": 0
    },
    {
      "id": "mghIelwv9c2vYKuN",
      "name": "Scenes",
      "type": "Compendium",
      "path": "Folder.mghIelwv9c2vYKuN",
      "sorting": 300000
    },
    {
      "id": "UYl2zK0tRyDHCpGI",
      "name": "Scenes - Free",
      "type": "Compendium",
      "path": "Folder.UYl2zK0tRyDHCpGI",
      "sorting": 100000
    },
    {
      "id": "dSAKJN4UHia3zUu2",
      "name": "Utility Pieces",
      "type": "Compendium",
      "path": "Folder.dSAKJN4UHia3zUu2",
      "sorting": 400000
    },
    {
      "id": "k9e7loi6iYA3Ru7X",
      "name": "_simple_calendar_notes_directory",
      "type": "JournalEntry",
      "path": "Folder.k9e7loi6iYA3Ru7X",
      "sorting": 0
    }
  ],
  "compendiums": [
    {
      "id": "dnd5e.heroes",
      "name": "Starter Heroes",
      "path": "Compendium.dnd5e.heroes",
      "entity": "Actor",
      "packageType": "Actor",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.monsters",
      "name": "Monsters (SRD)",
      "path": "Compendium.dnd5e.monsters",
      "entity": "Actor",
      "packageType": "Actor",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.items",
      "name": "Items (SRD)",
      "path": "Compendium.dnd5e.items",
      "entity": "Item",
      "packageType": "Item",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.tradegoods",
      "name": "Trade Goods (SRD)",
      "path": "Compendium.dnd5e.tradegoods",
      "entity": "Item",
      "packageType": "Item",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.spells",
      "name": "Spells (SRD)",
      "path": "Compendium.dnd5e.spells",
      "entity": "Item",
      "packageType": "Item",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.backgrounds",
      "name": "Backgrounds (SRD)",
      "path": "Compendium.dnd5e.backgrounds",
      "entity": "Item",
      "packageType": "Item",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.classes",
      "name": "Classes (SRD)",
      "path": "Compendium.dnd5e.classes",
      "entity": "Item",
      "packageType": "Item",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.subclasses",
      "name": "Subclasses (SRD)",
      "path": "Compendium.dnd5e.subclasses",
      "entity": "Item",
      "packageType": "Item",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.classfeatures",
      "name": "Class & Subclass Features (SRD)",
      "path": "Compendium.dnd5e.classfeatures",
      "entity": "Item",
      "packageType": "Item",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.races",
      "name": "Races (SRD)",
      "path": "Compendium.dnd5e.races",
      "entity": "Item",
      "packageType": "Item",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.monsterfeatures",
      "name": "Monster Features (SRD)",
      "path": "Compendium.dnd5e.monsterfeatures",
      "entity": "Item",
      "packageType": "Item",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.rules",
      "name": "Rules (SRD)",
      "path": "Compendium.dnd5e.rules",
      "entity": "JournalEntry",
      "packageType": "JournalEntry",
      "system": "dnd5e"
    },
    {
      "id": "dnd5e.tables",
      "name": "Tables (SRD)",
      "path": "Compendium.dnd5e.tables",
      "entity": "RollTable",
      "packageType": "RollTable",
      "system": "dnd5e"
    },
    {
      "id": "JB2A_DnD5e.jb2a-sequencer",
      "name": "JB2A Sequencer Macros",
      "path": "Compendium.JB2A_DnD5e.jb2a-sequencer",
      "entity": "Macro",
      "packageType": "Macro"
    },
    {
      "id": "JB2A_DnD5e.jb2a-actors",
      "name": "JB2A DnD5e Actors",
      "path": "Compendium.JB2A_DnD5e.jb2a-actors",
      "entity": "Actor",
      "packageType": "Actor",
      "system": "dnd5e"
    }
  ]
}
```


