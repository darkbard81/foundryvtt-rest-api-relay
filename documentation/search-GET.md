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
  "requestId": "search_1741132149626_86nesi7",
  "clientId": "foundry-rQLkX9c1U2Tzkyh8",
  "query": "stu",
  "filter": "documentType:item,subType:equipment,package:Compendium.dnd5e.items",
  "totalResults": 9,
  "results": [
    {
      "documentType": "Item",
      "id": "TIV3B1vbrVHIhQAm",
      "name": "Studded Leather Armor",
      "package": "dnd5e.items",
      "packageName": "Items (SRD)",
      "subType": "equipment",
      "uuid": "Compendium.dnd5e.items.TIV3B1vbrVHIhQAm",
      "icon": "<i class=\"fas fa-suitcase entity-icon\"></i>",
      "journalLink": "@UUID[Compendium.dnd5e.items.TIV3B1vbrVHIhQAm]{Studded Leather Armor}",
      "tagline": "Items (SRD)",
      "formattedMatch": "<strong>Stu</strong>dded Leather Armor",
      "resultType": "CompendiumSearchItem"
    },
    {
      "documentType": "Item",
      "id": "00BggOkChWztQx6R",
      "name": "Studded Leather Armor +3",
      "package": "dnd5e.items",
      "packageName": "Items (SRD)",
      "subType": "equipment",
      "uuid": "Compendium.dnd5e.items.00BggOkChWztQx6R",
      "icon": "<i class=\"fas fa-suitcase entity-icon\"></i>",
      "journalLink": "@UUID[Compendium.dnd5e.items.00BggOkChWztQx6R]{Studded Leather Armor +3}",
      "tagline": "Items (SRD)",
      "formattedMatch": "<strong>Stu</strong>dded Leather Armor +3",
      "resultType": "CompendiumSearchItem"
    },
    {
      "documentType": "Item",
      "id": "STxsp9Ao3pS2T4gt",
      "name": "Studded Leather Armor +1",
      "package": "dnd5e.items",
      "packageName": "Items (SRD)",
      "subType": "equipment",
      "uuid": "Compendium.dnd5e.items.STxsp9Ao3pS2T4gt",
      "icon": "<i class=\"fas fa-suitcase entity-icon\"></i>",
      "journalLink": "@UUID[Compendium.dnd5e.items.STxsp9Ao3pS2T4gt]{Studded Leather Armor +1}",
      "tagline": "Items (SRD)",
      "formattedMatch": "<strong>Stu</strong>dded Leather Armor +1",
      "resultType": "CompendiumSearchItem"
    },
    {
      "documentType": "Item",
      "id": "FZixEM5voQkH84xP",
      "name": "Studded Leather Armor +2",
      "package": "dnd5e.items",
      "packageName": "Items (SRD)",
      "subType": "equipment",
      "uuid": "Compendium.dnd5e.items.FZixEM5voQkH84xP",
      "icon": "<i class=\"fas fa-suitcase entity-icon\"></i>",
      "journalLink": "@UUID[Compendium.dnd5e.items.FZixEM5voQkH84xP]{Studded Leather Armor +2}",
      "tagline": "Items (SRD)",
      "formattedMatch": "<strong>Stu</strong>dded Leather Armor +2",
      "resultType": "CompendiumSearchItem"
    },
    {
      "documentType": "Item",
      "id": "SypSoinJkES0o5FB",
      "name": "Glamoured Studded Leather",
      "package": "dnd5e.items",
      "packageName": "Items (SRD)",
      "subType": "equipment",
      "uuid": "Compendium.dnd5e.items.SypSoinJkES0o5FB",
      "icon": "<i class=\"fas fa-suitcase entity-icon\"></i>",
      "journalLink": "@UUID[Compendium.dnd5e.items.SypSoinJkES0o5FB]{Glamoured Studded Leather}",
      "tagline": "Items (SRD)",
      "formattedMatch": "Glamoured <strong>Stu</strong>dded Leather",
      "resultType": "CompendiumSearchItem"
    },
    {
      "documentType": "Item",
      "id": "W1kDsFekjroIywuz",
      "name": "Studded Leather Armor of Resistance",
      "package": "dnd5e.items",
      "packageName": "Items (SRD)",
      "subType": "equipment",
      "uuid": "Compendium.dnd5e.items.W1kDsFekjroIywuz",
      "icon": "<i class=\"fas fa-suitcase entity-icon\"></i>",
      "journalLink": "@UUID[Compendium.dnd5e.items.W1kDsFekjroIywuz]{Studded Leather Armor of Resistance}",
      "tagline": "Items (SRD)",
      "formattedMatch": "<strong>Stu</strong>dded Leather Armor of Resistance",
      "resultType": "CompendiumSearchItem"
    },
    {
      "documentType": "Item",
      "id": "8PI1EL8xHLq4tXKr",
      "name": "Ring of Spell Turning",
      "package": "dnd5e.items",
      "packageName": "Items (SRD)",
      "subType": "equipment",
      "uuid": "Compendium.dnd5e.items.8PI1EL8xHLq4tXKr",
      "icon": "<i class=\"fas fa-suitcase entity-icon\"></i>",
      "journalLink": "@UUID[Compendium.dnd5e.items.8PI1EL8xHLq4tXKr]{Ring of Spell Turning}",
      "tagline": "Items (SRD)",
      "formattedMatch": "Ring of <strong>S</strong>pell <strong>Tu</strong>rning",
      "resultType": "CompendiumSearchItem"
    },
    {
      "documentType": "Item",
      "id": "ug9bTGmTTEN7JwmP",
      "name": "Costume Clothes",
      "package": "dnd5e.items",
      "packageName": "Items (SRD)",
      "subType": "equipment",
      "uuid": "Compendium.dnd5e.items.ug9bTGmTTEN7JwmP",
      "icon": "<i class=\"fas fa-suitcase entity-icon\"></i>",
      "journalLink": "@UUID[Compendium.dnd5e.items.ug9bTGmTTEN7JwmP]{Costume Clothes}",
      "tagline": "Items (SRD)",
      "formattedMatch": "Co<strong>stu</strong>me Clothes",
      "resultType": "CompendiumSearchItem"
    },
    {
      "documentType": "Item",
      "id": "E2h6sEe6FU2tnU96",
      "name": "Costume Clothes",
      "package": "dnd5e.items",
      "packageName": "Items (SRD)",
      "subType": "equipment",
      "uuid": "Compendium.dnd5e.items.E2h6sEe6FU2tnU96",
      "icon": "<i class=\"fas fa-suitcase entity-icon\"></i>",
      "journalLink": "@UUID[Compendium.dnd5e.items.E2h6sEe6FU2tnU96]{Costume Clothes}",
      "tagline": "Items (SRD)",
      "formattedMatch": "Co<strong>stu</strong>me Clothes",
      "resultType": "CompendiumSearchItem"
    }
  ]
}
```


