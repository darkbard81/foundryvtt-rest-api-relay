## **GET** /get

## Returns JSON data for entity

### Request

#### Request URL

```
$baseUrl/get?clientId=$clientId&selected=true&actor=true
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} | Auth token to connect to specific Foundry world |
| Query String Parameter | uuid | uuid | Entity UUID |
| Query String Parameter | selected | true | Use selected entity |
| Query String Parameter | actor | true | Use selected entity's actor |

### Response

#### Status: 200 OK

```json
{
  "requestId": "entity_1743294065827_0m5koac",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ",
  "uuid": "Actor.GShFabyjOXQ4XOdi",
  "data": [
    {
      "name": "test",
      "type": "character",
      "_id": "GShFabyjOXQ4XOdi",
      "img": "icons/svg/mystery-man.svg",
      "system": {
        "currency": {
          "pp": 0,
          "gp": 0,
          "ep": 0,
          "sp": 0,
          "cp": 0
        },
        "abilities": {
          "str": {
            "value": 10,
            "proficient": 0,
            "max": null,
            "bonuses": {
              "check": "",
              "save": ""
            }
          },
          "dex": {
            "value": 10,
            "proficient": 0,
            "max": null,
            "bonuses": {
              "check": "",
              "save": ""
            }
          },
          "con": {
            "value": 10,
            "proficient": 0,
            "max": null,
            "bonuses": {
              "check": "",
              "save": ""
            }
          },
          "int": {
            "value": 10,
            "proficient": 0,
            "max": null,
            "bonuses": {
              "check": "",
              "save": ""
            }
          },
          "wis": {
            "value": 10,
            "proficient": 0,
            "max": null,
            "bonuses": {
              "check": "",
              "save": ""
            }
          },
          "cha": {
            "value": 10,
            "proficient": 0,
            "max": null,
            "bonuses": {
              "check": "",
              "save": ""
            }
          },
          "san": {
            "value": 10,
            "proficient": 0,
            "max": null,
            "bonuses": {
              "check": "",
              "save": ""
            }
          }
        },
        "bonuses": {
          "mwak": {
            "attack": "",
            "damage": ""
          },
          "rwak": {
            "attack": "",
            "damage": ""
          },
          "msak": {
            "attack": "",
            "damage": ""
          },
          "rsak": {
            "attack": "",
            "damage": ""
          },
          "abilities": {
            "check": "",
            "save": "",
            "skill": ""
          },
          "spell": {
            "dc": ""
          }
        },
        "skills": {
          "acr": {
            "ability": "dex",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "ani": {
            "ability": "wis",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "arc": {
            "ability": "int",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "ath": {
            "ability": "str",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "dec": {
            "ability": "cha",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "his": {
            "ability": "int",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "ins": {
            "ability": "wis",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "itm": {
            "ability": "cha",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "inv": {
            "ability": "int",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "med": {
            "ability": "wis",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "nat": {
            "ability": "int",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "prc": {
            "ability": "wis",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "prf": {
            "ability": "cha",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "per": {
            "ability": "cha",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "rel": {
            "ability": "int",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "slt": {
            "ability": "dex",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "ste": {
            "ability": "dex",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          },
          "sur": {
            "ability": "wis",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "value": 0,
            "bonuses": {
              "check": "",
              "passive": ""
            }
          }
        },
        "tools": {},
        "spells": {
          "spell1": {
            "value": 0,
            "override": null
          },
          "spell2": {
            "value": 0,
            "override": null
          },
          "spell3": {
            "value": 0,
            "override": null
          },
          "spell4": {
            "value": 0,
            "override": null
          },
          "spell5": {
            "value": 0,
            "override": null
          },
          "spell6": {
            "value": 0,
            "override": null
          },
          "spell7": {
            "value": 0,
            "override": null
          },
          "spell8": {
            "value": 0,
            "override": null
          },
          "spell9": {
            "value": 0,
            "override": null
          },
          "pact": {
            "value": 0,
            "override": null
          }
        },
        "attributes": {
          "init": {
            "ability": "",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "bonus": ""
          },
          "movement": {
            "burrow": null,
            "climb": null,
            "fly": null,
            "swim": null,
            "walk": null,
            "units": null,
            "hover": false
          },
          "attunement": {
            "max": 3
          },
          "senses": {
            "darkvision": null,
            "blindsight": null,
            "tremorsense": null,
            "truesight": null,
            "units": null,
            "special": ""
          },
          "spellcasting": "int",
          "exhaustion": 0,
          "concentration": {
            "ability": "",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "bonuses": {
              "save": ""
            },
            "limit": 1
          },
          "ac": {
            "flat": null,
            "calc": "default"
          },
          "hp": {
            "value": 76,
            "max": null,
            "temp": 0,
            "tempmax": 0,
            "bonuses": {
              "level": "",
              "overall": "100"
            }
          },
          "death": {
            "ability": "",
            "roll": {
              "min": null,
              "max": null,
              "mode": 0
            },
            "success": 0,
            "failure": 0
          },
          "inspiration": false
        },
        "details": {
          "biography": {
            "value": "",
            "public": ""
          },
          "alignment": "",
          "ideal": "",
          "bond": "",
          "flaw": "",
          "race": null,
          "background": null,
          "originalClass": "",
          "xp": {
            "value": 0
          },
          "appearance": "",
          "trait": "",
          "eyes": "",
          "height": "",
          "faith": "",
          "hair": "",
          "weight": "",
          "gender": "",
          "skin": "",
          "age": ""
        },
        "traits": {
          "size": "med",
          "di": {
            "bypasses": [],
            "value": [],
            "custom": ""
          },
          "dr": {
            "bypasses": [],
            "value": [],
            "custom": ""
          },
          "dv": {
            "bypasses": [],
            "value": [],
            "custom": ""
          },
          "dm": {
            "amount": {},
            "bypasses": []
          },
          "ci": {
            "value": [],
            "custom": ""
          },
          "languages": {
            "value": [],
            "custom": ""
          },
          "weaponProf": {
            "value": [],
            "custom": ""
          },
          "armorProf": {
            "value": [],
            "custom": ""
          }
        },
        "resources": {
          "primary": {
            "value": 0,
            "max": 0,
            "sr": false,
            "lr": false,
            "label": ""
          },
          "secondary": {
            "value": 0,
            "max": 0,
            "sr": false,
            "lr": false,
            "label": ""
          },
          "tertiary": {
            "value": 0,
            "max": 0,
            "sr": false,
            "lr": false,
            "label": ""
          }
        },
        "favorites": []
      },
      "prototypeToken": {
        "name": "test",
        "displayName": 0,
        "actorLink": true,
        "appendNumber": false,
        "prependAdjective": false,
        "width": 1,
        "height": 1,
        "texture": {
          "src": "icons/svg/mystery-man.svg",
          "anchorX": 0.5,
          "anchorY": 0.5,
          "offsetX": 0,
          "offsetY": 0,
          "fit": "contain",
          "scaleX": 1,
          "scaleY": 1,
          "rotation": 0,
          "tint": "#ffffff",
          "alphaThreshold": 0.75
        },
        "hexagonalShape": 0,
        "lockRotation": false,
        "rotation": 0,
        "alpha": 1,
        "disposition": 1,
        "displayBars": 0,
        "bar1": {
          "attribute": "attributes.hp"
        },
        "bar2": {
          "attribute": null
        },
        "light": {
          "negative": false,
          "priority": 0,
          "alpha": 0.5,
          "angle": 360,
          "bright": 0,
          "color": null,
          "coloration": 1,
          "dim": 0,
          "attenuation": 0.5,
          "luminosity": 0.5,
          "saturation": 0,
          "contrast": 0,
          "shadows": 0,
          "animation": {
            "type": null,
            "speed": 5,
            "intensity": 5,
            "reverse": false
          },
          "darkness": {
            "min": 0,
            "max": 1
          }
        },
        "sight": {
          "enabled": true,
          "range": 0,
          "angle": 360,
          "visionMode": "basic",
          "color": null,
          "attenuation": 0.1,
          "brightness": 0,
          "saturation": 0,
          "contrast": 0
        },
        "detectionModes": [],
        "occludable": {
          "radius": 0
        },
        "ring": {
          "enabled": false,
          "colors": {
            "ring": null,
            "background": null
          },
          "effects": 1,
          "subject": {
            "scale": 1,
            "texture": null
          }
        },
        "flags": {},
        "randomImg": false
      },
      "items": [
        {
          "name": "Bolt of Slaying",
          "type": "consumable",
          "img": "icons/skills/ranged/arrow-flying-broadhead-metal.webp",
          "system": {
            "description": {
              "value": "<p>A Bolt of Slaying is a magic weapon meant to slay a particular kind of creature. Some are more focused than others; for example, there are both Bolts of Dragon Slaying and Bolts of Blue Dragon Slaying. If a creature belonging to the type, race, or group associated with a bolt of slaying takes damage from the bolt, the creature must make a DC 17 Constitution saving throw, taking an extra 6d10 piercing damage on a failed save, or half as much extra damage on a successful one.</p>\n<p>Once a Bolt of Slaying deals its extra damage to a creature, it becomes a nonmagical bolt.</p>",
              "chat": ""
            },
            "source": {
              "custom": "",
              "book": "SRD 5.1",
              "page": "",
              "license": "CC-BY-4.0"
            },
            "quantity": 12,
            "weight": {
              "value": 0.075,
              "units": "lb"
            },
            "price": {
              "value": 600,
              "denomination": "gp"
            },
            "attunement": "",
            "equipped": false,
            "rarity": "veryRare",
            "identified": true,
            "activation": {
              "type": "action",
              "cost": 1,
              "condition": ""
            },
            "duration": {
              "value": "",
              "units": ""
            },
            "cover": null,
            "target": {
              "value": "",
              "width": null,
              "units": "",
              "type": "",
              "prompt": true
            },
            "range": {
              "value": null,
              "long": null,
              "units": ""
            },
            "uses": {
              "value": null,
              "max": "",
              "per": null,
              "recovery": "",
              "autoDestroy": false,
              "prompt": true
            },
            "consume": {
              "type": "",
              "target": null,
              "amount": null,
              "scale": false
            },
            "ability": "",
            "actionType": "rwak",
            "chatFlavor": "",
            "critical": {
              "threshold": null,
              "damage": ""
            },
            "damage": {
              "parts": [],
              "versatile": ""
            },
            "formula": "6d10",
            "save": {
              "ability": "con",
              "dc": 17,
              "scaling": "flat"
            },
            "type": {
              "value": "ammo",
              "subtype": "crossbowBolt"
            },
            "unidentified": {
              "description": ""
            },
            "container": null,
            "crewed": false,
            "properties": [
              "mgc"
            ],
            "attack": {
              "bonus": "",
              "flat": false
            },
            "summons": null,
            "magicalBonus": null,
            "enchantment": null,
            "attuned": false
          },
          "effects": [],
          "folder": "NdDvXSjfqlghXpQZ",
          "sort": 0,
          "ownership": {
            "default": 0,
            "DKL4ZKK80lUZFgSJ": 3
          },
          "flags": {},
          "_stats": {
            "compendiumSource": null,
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1743292167709,
            "modifiedTime": 1743292167709,
            "lastModifiedBy": "DKL4ZKK80lUZFgSJ"
          },
          "_id": "Q3CqQQLDixBKZbDD"
        },
        {
          "name": "Bolt of Slaying",
          "type": "consumable",
          "img": "icons/skills/ranged/arrow-flying-broadhead-metal.webp",
          "system": {
            "description": {
              "value": "<p>A Bolt of Slaying is a magic weapon meant to slay a particular kind of creature. Some are more focused than others; for example, there are both Bolts of Dragon Slaying and Bolts of Blue Dragon Slaying. If a creature belonging to the type, race, or group associated with a bolt of slaying takes damage from the bolt, the creature must make a DC 17 Constitution saving throw, taking an extra 6d10 piercing damage on a failed save, or half as much extra damage on a successful one.</p>\n<p>Once a Bolt of Slaying deals its extra damage to a creature, it becomes a nonmagical bolt.</p>",
              "chat": ""
            },
            "source": {
              "custom": "",
              "book": "SRD 5.1",
              "page": "",
              "license": "CC-BY-4.0"
            },
            "quantity": 12,
            "weight": {
              "value": 0.075,
              "units": "lb"
            },
            "price": {
              "value": 600,
              "denomination": "gp"
            },
            "attunement": "",
            "equipped": false,
            "rarity": "veryRare",
            "identified": true,
            "activation": {
              "type": "action",
              "cost": 1,
              "condition": ""
            },
            "duration": {
              "value": "",
              "units": ""
            },
            "cover": null,
            "target": {
              "value": "",
              "width": null,
              "units": "",
              "type": "",
              "prompt": true
            },
            "range": {
              "value": null,
              "long": null,
              "units": ""
            },
            "uses": {
              "value": null,
              "max": "",
              "per": null,
              "recovery": "",
              "autoDestroy": false,
              "prompt": true
            },
            "consume": {
              "type": "",
              "target": null,
              "amount": null,
              "scale": false
            },
            "ability": "",
            "actionType": "rwak",
            "chatFlavor": "",
            "critical": {
              "threshold": null,
              "damage": ""
            },
            "damage": {
              "parts": [],
              "versatile": ""
            },
            "formula": "6d10",
            "save": {
              "ability": "con",
              "dc": 17,
              "scaling": "flat"
            },
            "type": {
              "value": "ammo",
              "subtype": "crossbowBolt"
            },
            "unidentified": {
              "description": ""
            },
            "container": null,
            "crewed": false,
            "properties": [
              "mgc"
            ],
            "attack": {
              "bonus": "",
              "flat": false
            },
            "summons": null,
            "magicalBonus": null,
            "enchantment": null,
            "attuned": false
          },
          "effects": [],
          "folder": "NdDvXSjfqlghXpQZ",
          "sort": 0,
          "ownership": {
            "default": 0,
            "DKL4ZKK80lUZFgSJ": 3
          },
          "flags": {},
          "_stats": {
            "compendiumSource": null,
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1743292180086,
            "modifiedTime": 1743292180086,
            "lastModifiedBy": "DKL4ZKK80lUZFgSJ"
          },
          "_id": "uuNLQxto2asSXxQr"
        },
        {
          "name": "Bolt of Slaying",
          "type": "consumable",
          "img": "icons/skills/ranged/arrow-flying-broadhead-metal.webp",
          "system": {
            "description": {
              "value": "<p>A Bolt of Slaying is a magic weapon meant to slay a particular kind of creature. Some are more focused than others; for example, there are both Bolts of Dragon Slaying and Bolts of Blue Dragon Slaying. If a creature belonging to the type, race, or group associated with a bolt of slaying takes damage from the bolt, the creature must make a DC 17 Constitution saving throw, taking an extra 6d10 piercing damage on a failed save, or half as much extra damage on a successful one.</p>\n<p>Once a Bolt of Slaying deals its extra damage to a creature, it becomes a nonmagical bolt.</p>",
              "chat": ""
            },
            "source": {
              "custom": "",
              "book": "SRD 5.1",
              "page": "",
              "license": "CC-BY-4.0"
            },
            "quantity": 12,
            "weight": {
              "value": 0.075,
              "units": "lb"
            },
            "price": {
              "value": 600,
              "denomination": "gp"
            },
            "attunement": "",
            "equipped": false,
            "rarity": "veryRare",
            "identified": true,
            "activation": {
              "type": "action",
              "cost": 1,
              "condition": ""
            },
            "duration": {
              "value": "",
              "units": ""
            },
            "cover": null,
            "target": {
              "value": "",
              "width": null,
              "units": "",
              "type": "",
              "prompt": true
            },
            "range": {
              "value": null,
              "long": null,
              "units": ""
            },
            "uses": {
              "value": null,
              "max": "",
              "per": null,
              "recovery": "",
              "autoDestroy": false,
              "prompt": true
            },
            "consume": {
              "type": "",
              "target": null,
              "amount": null,
              "scale": false
            },
            "ability": "",
            "actionType": "rwak",
            "chatFlavor": "",
            "critical": {
              "threshold": null,
              "damage": ""
            },
            "damage": {
              "parts": [],
              "versatile": ""
            },
            "formula": "6d10",
            "save": {
              "ability": "con",
              "dc": 17,
              "scaling": "flat"
            },
            "type": {
              "value": "ammo",
              "subtype": "crossbowBolt"
            },
            "unidentified": {
              "description": ""
            },
            "container": null,
            "crewed": false,
            "properties": [
              "mgc"
            ],
            "attack": {
              "bonus": "",
              "flat": false
            },
            "summons": null,
            "magicalBonus": null,
            "enchantment": null,
            "attuned": false
          },
          "effects": [],
          "folder": "NdDvXSjfqlghXpQZ",
          "sort": 0,
          "ownership": {
            "default": 0,
            "DKL4ZKK80lUZFgSJ": 3
          },
          "flags": {},
          "_stats": {
            "compendiumSource": null,
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1743292306126,
            "modifiedTime": 1743292306126,
            "lastModifiedBy": "DKL4ZKK80lUZFgSJ"
          },
          "_id": "9fGlFwtrtyziDu0s"
        },
        {
          "name": "Bolt of Slaying",
          "type": "consumable",
          "img": "icons/skills/ranged/arrow-flying-broadhead-metal.webp",
          "system": {
            "description": {
              "value": "<p>A Bolt of Slaying is a magic weapon meant to slay a particular kind of creature. Some are more focused than others; for example, there are both Bolts of Dragon Slaying and Bolts of Blue Dragon Slaying. If a creature belonging to the type, race, or group associated with a bolt of slaying takes damage from the bolt, the creature must make a DC 17 Constitution saving throw, taking an extra 6d10 piercing damage on a failed save, or half as much extra damage on a successful one.</p>\n<p>Once a Bolt of Slaying deals its extra damage to a creature, it becomes a nonmagical bolt.</p>",
              "chat": ""
            },
            "source": {
              "custom": "",
              "book": "SRD 5.1",
              "page": "",
              "license": "CC-BY-4.0"
            },
            "quantity": 12,
            "weight": {
              "value": 0.075,
              "units": "lb"
            },
            "price": {
              "value": 600,
              "denomination": "gp"
            },
            "attunement": "",
            "equipped": false,
            "rarity": "veryRare",
            "identified": true,
            "activation": {
              "type": "action",
              "cost": 1,
              "condition": ""
            },
            "duration": {
              "value": "",
              "units": ""
            },
            "cover": null,
            "target": {
              "value": "",
              "width": null,
              "units": "",
              "type": "",
              "prompt": true
            },
            "range": {
              "value": null,
              "long": null,
              "units": ""
            },
            "uses": {
              "value": null,
              "max": "",
              "per": null,
              "recovery": "",
              "autoDestroy": false,
              "prompt": true
            },
            "consume": {
              "type": "",
              "target": null,
              "amount": null,
              "scale": false
            },
            "ability": "",
            "actionType": "rwak",
            "chatFlavor": "",
            "critical": {
              "threshold": null,
              "damage": ""
            },
            "damage": {
              "parts": [],
              "versatile": ""
            },
            "formula": "6d10",
            "save": {
              "ability": "con",
              "dc": 17,
              "scaling": "flat"
            },
            "type": {
              "value": "ammo",
              "subtype": "crossbowBolt"
            },
            "unidentified": {
              "description": ""
            },
            "container": null,
            "crewed": false,
            "properties": [
              "mgc"
            ],
            "attack": {
              "bonus": "",
              "flat": false
            },
            "summons": null,
            "magicalBonus": null,
            "enchantment": null,
            "attuned": false
          },
          "effects": [],
          "folder": "NdDvXSjfqlghXpQZ",
          "sort": 0,
          "ownership": {
            "default": 0,
            "DKL4ZKK80lUZFgSJ": 3
          },
          "flags": {},
          "_stats": {
            "compendiumSource": null,
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1743292313711,
            "modifiedTime": 1743292313711,
            "lastModifiedBy": "DKL4ZKK80lUZFgSJ"
          },
          "_id": "C8o4m41g6soO9W8c"
        }
      ],
      "effects": [],
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0,
        "DKL4ZKK80lUZFgSJ": 3
      },
      "flags": {
        "dnd5e": {
          "showTokenPortrait": false
        }
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "coreVersion": "12.331",
        "systemId": "dnd5e",
        "systemVersion": "3.3.1",
        "createdTime": 1743193442454,
        "modifiedTime": 1743290626577,
        "lastModifiedBy": "DKL4ZKK80lUZFgSJ"
      }
    }
  ]
}
```


