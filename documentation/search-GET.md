## **GET** /search

## Searches Foundry VTT entities using QuickInsert

Filters can be a single string for filtering by type ("actor", "item", ext.), or chained together (name:bob,documentType:actor)

Available filters:

- documentType: type of document ("Actor", "Item", ext)
    
- folder: folder location of the entity (not always defined)
    
- id: unique identifier of the entity
    
- name: name of the entity
    
- package: package identifier the entity belongs to (compendiums minus "Compendium.")
    
- packageName: human-readable package name (readable name of compendium)
    
- subType: sub-type of the entity ("npc", "equipment", ext)
    
- uuid: universal unique identifier
    
- icon: icon HTML for the entity
    
- journalLink: journal link to entity
    
- tagline: same as packageName
    
- formattedMatch: HTML with **applied to matching search parts**
    
- **resultType: constructor name of the QuickInsert result type ("EntitySearchItem". "CompendiumSearchItem", "EmbeddedEntitySearchItem", ext)**

### Request

#### Request URL

```
$baseUrl/search?clientId=$clientId&query=searchTerm&filter=filters
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} | Auth token to connect to specific Foundry world |
| Query String Parameter | query | searchTerm | Search string |
| Query String Parameter | filter | filters |   |

### Response

#### Status: 200 OK

```json
{
  "requestId": "search_1743293916350_z1qzxje",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "query": "abo",
  "filter": "actor",
  "totalResults": 2,
  "results": [
    {
      "documentType": "Actor",
      "id": "shhHtE7b92PefCWB",
      "name": "Aboleth",
      "package": "dnd5e.monsters",
      "packageName": "Monsters (SRD)",
      "subType": "npc",
      "uuid": "Compendium.dnd5e.monsters.shhHtE7b92PefCWB",
      "icon": "<i class=\"fas fa-user entity-icon\"></i>",
      "journalLink": "@UUID[Compendium.dnd5e.monsters.shhHtE7b92PefCWB]{Aboleth}",
      "tagline": "Monsters (SRD)",
      "formattedMatch": "<strong>Abo</strong>leth",
      "resultType": "CompendiumSearchItem"
    },
    {
      "documentType": "Actor",
      "id": "JW8bXggOMBx1S6tF",
      "name": "Baboon",
      "package": "dnd5e.monsters",
      "packageName": "Monsters (SRD)",
      "subType": "npc",
      "uuid": "Compendium.dnd5e.monsters.JW8bXggOMBx1S6tF",
      "icon": "<i class=\"fas fa-user entity-icon\"></i>",
      "journalLink": "@UUID[Compendium.dnd5e.monsters.JW8bXggOMBx1S6tF]{Baboon}",
      "tagline": "Monsters (SRD)",
      "formattedMatch": "<strong>Babo</strong>on",
      "resultType": "CompendiumSearchItem"
    }
  ]
}
```


