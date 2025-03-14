## **GET** /contents/:path

## Returns the contents of a folder or compendium

### Request

#### Request URL

```
$baseUrl/contents/:path?clientId=$clientId
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
  "requestId": "contents_1741128245165_ozvdn0b",
  "clientId": "foundry-rQLkX9c1U2Tzkyh8",
  "path": "Compendium.dnd5e.items",
  "entities": [
    {
      "uuid": "dnd5e.items.00BggOkChWztQx6R",
      "id": "00BggOkChWztQx6R",
      "name": "Studded Leather Armor +3",
      "img": "icons/equipment/chest/breastplate-rivited-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.07R6JFioylOCpVoL",
      "id": "07R6JFioylOCpVoL",
      "name": "Frost Brand Scimitar",
      "img": "icons/skills/melee/strike-weapon-polearm-ice-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.09i8r1UmzDSKiZ9g",
      "id": "09i8r1UmzDSKiZ9g",
      "name": "Glaive +1",
      "img": "icons/weapons/polearms/halberd-crescent-glowing.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.0E565kQUBmndJ1a2",
      "id": "0E565kQUBmndJ1a2",
      "name": "Dagger",
      "img": "icons/weapons/daggers/dagger-jeweled-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.0G5LSgbb5NTV4XC7",
      "id": "0G5LSgbb5NTV4XC7",
      "name": "Ioun Stone of Strength",
      "img": "icons/commodities/gems/gem-rough-cushion-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.0LVFLPmsu1b2vf8E",
      "id": "0LVFLPmsu1b2vf8E",
      "name": "Flail +1",
      "img": "icons/weapons/maces/flail-studded-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.0NoBBP3MMkvJlwZY",
      "id": "0NoBBP3MMkvJlwZY",
      "name": "Candle",
      "img": "icons/sundries/lights/candle-unlit-tan.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.0ZBWwjFz3nIAXMLW",
      "id": "0ZBWwjFz3nIAXMLW",
      "name": "Jug",
      "img": "icons/containers/kitchenware/jug-terracotta-orange.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.0d08g1i5WXnNrCNA",
      "id": "0d08g1i5WXnNrCNA",
      "name": "Tinker's Tools",
      "img": "icons/commodities/cloth/thread-spindle-white-needle.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.0huCWvOncUsme84v",
      "id": "0huCWvOncUsme84v",
      "name": "Paper",
      "img": "icons/sundries/documents/paper-plain-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.10ZP2Bu3vnCuYMIB",
      "id": "10ZP2Bu3vnCuYMIB",
      "name": "Longsword",
      "img": "icons/weapons/swords/greatsword-crossguard-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.14pNRT4sZy9rgvhb",
      "id": "14pNRT4sZy9rgvhb",
      "name": "Hammer",
      "img": "icons/tools/hand/hammer-cobbler-steel.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.159agyOuBHCl2WKd",
      "id": "159agyOuBHCl2WKd",
      "name": "Adamantine Half Plate Armor",
      "img": "icons/equipment/chest/breastplate-cuirass-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.18fbyArtidKzON01",
      "id": "18fbyArtidKzON01",
      "name": "Wand of Magic Detection",
      "img": "icons/weapons/staves/staff-simple-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.1FSubnBpSTDmVaYV",
      "id": "1FSubnBpSTDmVaYV",
      "name": "Tinderbox",
      "img": "icons/sundries/lights/torch-black.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.1J0dsxyKRhVXYQf5",
      "id": "1J0dsxyKRhVXYQf5",
      "name": "Ring of Invisibility",
      "img": "icons/equipment/finger/ring-faceted-silver-orange.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.1KMSpOSU0EliUBm2",
      "id": "1KMSpOSU0EliUBm2",
      "name": "Potion of Storm Giant Strength",
      "img": "icons/consumables/potions/bottle-bulb-corked-labeled-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.1L5wkmbw0fmNAr38",
      "id": "1L5wkmbw0fmNAr38",
      "name": "Waterskin",
      "img": "icons/sundries/survival/wetskin-leather-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.1Lxk6kmoRhG8qQ0u",
      "id": "1Lxk6kmoRhG8qQ0u",
      "name": "Greataxe",
      "img": "icons/weapons/axes/axe-double.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.1PMaZR6CX8fUnOZd",
      "id": "1PMaZR6CX8fUnOZd",
      "name": "Vicious Shortsword",
      "img": "icons/weapons/swords/sword-guard-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.1RwJWOAeyoideLKe",
      "id": "1RwJWOAeyoideLKe",
      "name": "Orb of Dragonkind",
      "img": "icons/commodities/gems/pearl-storm.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.1kihEfn9QppB34ee",
      "id": "1kihEfn9QppB34ee",
      "name": "Maul +2",
      "img": "icons/weapons/maces/mace-spiked-wood-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.1taRIMF9w7jpnonN",
      "id": "1taRIMF9w7jpnonN",
      "name": "Wand of Magic Missiles",
      "img": "icons/weapons/staves/staff-ornate-engraved-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.23y8FvWKf9YLcnBL",
      "id": "23y8FvWKf9YLcnBL",
      "name": "Chess Set",
      "img": "icons/sundries/gaming/chess-knight-white.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.296Zgo9RhltWShE1",
      "id": "296Zgo9RhltWShE1",
      "name": "Stone of Good Luck (Luckstone)",
      "img": "icons/commodities/gems/gem-faceted-octagon-yellow.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.29ZLE8PERtFVD3QU",
      "id": "29ZLE8PERtFVD3QU",
      "name": "Torch",
      "img": "icons/sundries/lights/torch-black.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.29e6gHwWKNLaRUoz",
      "id": "29e6gHwWKNLaRUoz",
      "name": "Rope of Climbing",
      "img": "icons/sundries/survival/rope-wrapped-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.2BYm8to5KldN8eYu",
      "id": "2BYm8to5KldN8eYu",
      "name": "Tome of Clear Thought",
      "img": "icons/sundries/books/book-backed-blue-gold.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.2CQnAvn06bncXPBt",
      "id": "2CQnAvn06bncXPBt",
      "name": "Mace +3",
      "img": "icons/weapons/maces/mace-flanged-steel-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.2Lkub0qIwucWEfp3",
      "id": "2Lkub0qIwucWEfp3",
      "name": "Nine Lives Stealer Shortsword",
      "img": "icons/weapons/swords/sword-broad-crystal-paired.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.2YNqk5zm9jDTvd7q",
      "id": "2YNqk5zm9jDTvd7q",
      "name": "Sphere of Annihilation",
      "img": "icons/magic/unholy/barrier-shield-glowing-pink.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.2YbuclKfhDL0bU4u",
      "id": "2YbuclKfhDL0bU4u",
      "name": "Chest",
      "img": "icons/containers/chest/chest-elm-steel-brown.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.2YdfjN1PIIrSHZii",
      "id": "2YdfjN1PIIrSHZii",
      "name": "War Pick",
      "img": "icons/weapons/axes/pickaxe-double-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.2cKJTN5Ki77oCrQn",
      "id": "2cKJTN5Ki77oCrQn",
      "name": "Waterskin",
      "img": "icons/sundries/survival/wetskin-leather-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.2ksm2KXCY3vBHTAx",
      "id": "2ksm2KXCY3vBHTAx",
      "name": "Robe of Useful Items",
      "img": "icons/equipment/back/mantle-collared-black.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.2mvXGvDmHHhzbT04",
      "id": "2mvXGvDmHHhzbT04",
      "name": "Horseshoes of a Zephyr",
      "img": "icons/tools/smithing/horseshoe-steel-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.2veAOEyfbDJuxR8Y",
      "id": "2veAOEyfbDJuxR8Y",
      "name": "Ring of Warmth",
      "img": "icons/equipment/finger/ring-cabochon-gold-orange.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.2wK9ImkAeG3Lzxa0",
      "id": "2wK9ImkAeG3Lzxa0",
      "name": "Scimitar +3",
      "img": "icons/weapons/swords/sword-katana.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.2wxqnjpnPmkpPCC5",
      "id": "2wxqnjpnPmkpPCC5",
      "name": "Ring of Evasion",
      "img": "icons/equipment/finger/ring-eye-silver-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.34YKlIJVVWLeBv7R",
      "id": "34YKlIJVVWLeBv7R",
      "name": "Potion of Cold Resistance",
      "img": "icons/consumables/potions/bottle-bulb-corked-labeled-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.3ALOhh6JNInIK4o7",
      "id": "3ALOhh6JNInIK4o7",
      "name": "Necklace of Fireballs",
      "img": "icons/equipment/neck/pendant-faceted-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.3FNyS6DeCBZzFbqU",
      "id": "3FNyS6DeCBZzFbqU",
      "name": "Vorpal Greatsword",
      "img": "icons/skills/melee/strike-sword-steel-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.3OXueEpvDDCVfGFA",
      "id": "3OXueEpvDDCVfGFA",
      "name": "Fine Clothes",
      "img": "icons/equipment/back/cloak-heavy-fur-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.3Q6rw9kAMf6F1SW5",
      "id": "3Q6rw9kAMf6F1SW5",
      "name": "Hand Crossbow +2",
      "img": "icons/weapons/crossbows/crossbow-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.3TWT5bv3z5zGUZCe",
      "id": "3TWT5bv3z5zGUZCe",
      "name": "Gauntlets of Ogre Power",
      "img": "icons/magic/unholy/strike-hand-glow-pink.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.3X7vdOjnCSpi40yn",
      "id": "3X7vdOjnCSpi40yn",
      "name": "Ring of Fire Resistance",
      "img": "icons/equipment/finger/ring-cabochon-gold-orange.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.3YH1o1Wa4gcdN3fh",
      "id": "3YH1o1Wa4gcdN3fh",
      "name": "Pike +3",
      "img": "icons/weapons/polearms/pike-flared-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.3YSUIp4eFo26YxJr",
      "id": "3YSUIp4eFo26YxJr",
      "name": "Ball Bearings",
      "img": "icons/commodities/gems/pearl-rock.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.3b0RvGi0TnTYpIxn",
      "id": "3b0RvGi0TnTYpIxn",
      "name": "Stick of Incense",
      "img": "icons/commodities/wood/bamboo-brown.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.3c7JXOzsv55gqJS5",
      "id": "3c7JXOzsv55gqJS5",
      "name": "Arrow",
      "img": "icons/weapons/ammunition/arrow-head-war.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.3cymOVja8jXbzrdT",
      "id": "3cymOVja8jXbzrdT",
      "name": "Longbow",
      "img": "icons/weapons/bows/longbow-leather-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.3gynWO9sN4OLGMWD",
      "id": "3gynWO9sN4OLGMWD",
      "name": "Sling",
      "img": "icons/weapons/slings/slingshot-wood.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.3h3ZU6qmQs18FfkA",
      "id": "3h3ZU6qmQs18FfkA",
      "name": "Mithral Chain Shirt",
      "img": "icons/equipment/chest/breastplate-scale-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.3nVvaHVfHsgwGlkL",
      "id": "3nVvaHVfHsgwGlkL",
      "name": "Small Knife",
      "img": "icons/weapons/daggers/knife-green.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.3rCO8MTIdPGSW6IJ",
      "id": "3rCO8MTIdPGSW6IJ",
      "name": "Dart",
      "img": "icons/weapons/ammunition/arrows-war-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.3uEyuCfnAzGkwAn5",
      "id": "3uEyuCfnAzGkwAn5",
      "name": "Sealing Wax",
      "img": "icons/sundries/lights/candle-unlit-red.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.419eNv7xp2p7Xlo5",
      "id": "419eNv7xp2p7Xlo5",
      "name": "Blanket",
      "img": "icons/sundries/survival/bedroll-pink.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.41kYCmKq0PbGVKaM",
      "id": "41kYCmKq0PbGVKaM",
      "name": "Figurine of Wondrous Power (Ivory Goat of Travail)",
      "img": "icons/commodities/bones/horn-worn-white.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.44XNWmMGnwXn7bNW",
      "id": "44XNWmMGnwXn7bNW",
      "name": "Pearl of Power",
      "img": "icons/commodities/gems/pearl-natural.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.466j8hy4AiENMHVQ",
      "id": "466j8hy4AiENMHVQ",
      "name": "Plate Armor +3",
      "img": "icons/equipment/chest/breastplate-collared-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.46ikeR4RrSim6DsN",
      "id": "46ikeR4RrSim6DsN",
      "name": "Talisman of the Sphere",
      "img": "icons/magic/unholy/orb-beam-pink.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.4932CLHvjZYxOm4g",
      "id": "4932CLHvjZYxOm4g",
      "name": "Exotic Saddle",
      "img": "icons/equipment/shoulder/pauldron-segmented-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.4MeSq8KcF7KK7emF",
      "id": "4MeSq8KcF7KK7emF",
      "name": "Vicious Light Hammer",
      "img": "icons/weapons/hammers/hammer-war-spiked.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.4MtQKPn9qMWCFjDA",
      "id": "4MtQKPn9qMWCFjDA",
      "name": "Quiver",
      "img": "icons/containers/ammunition/arrows-quiver-black.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.4ZiJsDTRA1GgcWKP",
      "id": "4ZiJsDTRA1GgcWKP",
      "name": "Potion of Stone Giant Strength",
      "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.4sR5HOah6KwVPHOb",
      "id": "4sR5HOah6KwVPHOb",
      "name": "Wand of Web",
      "img": "icons/weapons/staves/staff-simple-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.50N8zf58FR4JWR05",
      "id": "50N8zf58FR4JWR05",
      "name": "Amulet of Proof against Detection and Location",
      "img": "icons/equipment/neck/pendant-faceted-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.59pjg8FGM4GG4Fdd",
      "id": "59pjg8FGM4GG4Fdd",
      "name": "Dagger +1",
      "img": "icons/weapons/daggers/dagger-jeweled-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.5Jz5w7XJxgtlsx6K",
      "id": "5Jz5w7XJxgtlsx6K",
      "name": "Vicious Dagger",
      "img": "icons/weapons/daggers/dagger-jeweled-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.5KiRtMMSTnJmMtBr",
      "id": "5KiRtMMSTnJmMtBr",
      "name": "Crystal Ball of Telepathy",
      "img": "icons/commodities/gems/pearl-swirl-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.5Rxo4K9cgpwgW9vZ",
      "id": "5Rxo4K9cgpwgW9vZ",
      "name": "Wand of Enemy Detection",
      "img": "icons/weapons/staves/staff-simple-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.5SorTMl8NKDO9Yge",
      "id": "5SorTMl8NKDO9Yge",
      "name": "Ring of Poison Resistance",
      "img": "icons/equipment/finger/ring-faceted-gold-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.5fJn3LQ2eQG7luEO",
      "id": "5fJn3LQ2eQG7luEO",
      "name": "Chalk",
      "img": "icons/commodities/bones/bone-fragments-grey.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.5m9ErO9In8Uc5yyf",
      "id": "5m9ErO9In8Uc5yyf",
      "name": "Potion of Superior Healing",
      "img": "icons/consumables/potions/bottle-round-corked-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.5mIeX824uMklU3xq",
      "id": "5mIeX824uMklU3xq",
      "name": "Map or Scroll Case",
      "img": "icons/containers/bags/case-leather-tan.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.6067acDZGv7KNOkP",
      "id": "6067acDZGv7KNOkP",
      "name": "Elven Chain",
      "img": "icons/equipment/back/mantle-collared-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.62EaozKvcA0aSy2q",
      "id": "62EaozKvcA0aSy2q",
      "name": "Spear +3",
      "img": "icons/weapons/polearms/spear-flared-worn-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.63nb14yQRJMc4bIn",
      "id": "63nb14yQRJMc4bIn",
      "name": "Philter of Love",
      "img": "icons/consumables/potions/potion-flask-corked-labeled-pink.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.66UkbfH0PVwo4HgA",
      "id": "66UkbfH0PVwo4HgA",
      "name": "Robe of Stars",
      "img": "icons/magic/water/orb-ice-web.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.698gLyJ4JKVVMF53",
      "id": "698gLyJ4JKVVMF53",
      "name": "Padded Armor of Resistance",
      "img": "icons/equipment/chest/breastplate-quilted-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.69Dpr25pf4BjkHKb",
      "id": "69Dpr25pf4BjkHKb",
      "name": "Drum",
      "img": "icons/tools/instruments/drum-brown-red.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.6BybWxK5GcEzqcOV",
      "id": "6BybWxK5GcEzqcOV",
      "name": "Priest's Pack",
      "img": "icons/containers/bags/pack-engraved-leather-blue.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.6I5lt8KheTsAE4Zr",
      "id": "6I5lt8KheTsAE4Zr",
      "name": "Sling +1",
      "img": "icons/weapons/slings/slingshot-wood.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.6JbrdSg5YYbs9ANm",
      "id": "6JbrdSg5YYbs9ANm",
      "name": "Vicious Maul",
      "img": "icons/weapons/maces/mace-spiked-wood-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.6MDTnMG4Hcw7qZsy",
      "id": "6MDTnMG4Hcw7qZsy",
      "name": "Ioun Stone of Sustenance",
      "img": "icons/commodities/stone/geode-raw-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.6OIw31CDF6mAwFnd",
      "id": "6OIw31CDF6mAwFnd",
      "name": "Bolt of Slaying",
      "img": "icons/skills/ranged/arrow-flying-broadhead-metal.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.6OYR11aJX2dEVtOj",
      "id": "6OYR11aJX2dEVtOj",
      "name": "Entertainer's Pack",
      "img": "icons/containers/bags/pack-leather-gold-pink.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.6ai1pEde3iQX30Fr",
      "id": "6ai1pEde3iQX30Fr",
      "name": "Cubic Gate",
      "img": "icons/commodities/treasure/token-engraved-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.6eMHIQ2CGKpjTtWC",
      "id": "6eMHIQ2CGKpjTtWC",
      "name": "Scroll Case",
      "img": "icons/containers/bags/case-leather-tan.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.6n8J07mFo8xs11vS",
      "id": "6n8J07mFo8xs11vS",
      "name": "Dancing Rapier",
      "img": "icons/skills/melee/maneuver-greatsword-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.6ndqUhOySYVVQ5on",
      "id": "6ndqUhOySYVVQ5on",
      "name": "Halberd +2",
      "img": "icons/weapons/polearms/halberd-crescent-glowing.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.6pjaQzbtxQTuQ4RW",
      "id": "6pjaQzbtxQTuQ4RW",
      "name": "Rod of Absorption",
      "img": "icons/magic/fire/barrier-wall-explosion-orange.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.6rocoBx5jdzG1QQH",
      "id": "6rocoBx5jdzG1QQH",
      "name": "Healer's Kit",
      "img": "icons/containers/bags/sack-simple-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.79zrBwqEp2MCJ1Bl",
      "id": "79zrBwqEp2MCJ1Bl",
      "name": "Ball Bearings",
      "img": "icons/commodities/gems/pearl-rock.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.7FEcfqz1piPHN1tV",
      "id": "7FEcfqz1piPHN1tV",
      "name": "Ioun Stone of Greater Absorption",
      "img": "icons/commodities/stone/ore-pile-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.7FLs8qIGdOFnz9oL",
      "id": "7FLs8qIGdOFnz9oL",
      "name": "Lantern of Revealing",
      "img": "icons/sundries/lights/lantern-iron-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.7Yqbqg5EtVW16wfT",
      "id": "7Yqbqg5EtVW16wfT",
      "name": "Barrel",
      "img": "icons/containers/barrels/barrel-oak-banded-tan.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.7i4s9msZWpAw4Ynv",
      "id": "7i4s9msZWpAw4Ynv",
      "name": "Dagger of Venom",
      "img": "icons/skills/melee/strike-dagger-poison-dripping-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.7jEKkA9qbwJ3IuCb",
      "id": "7jEKkA9qbwJ3IuCb",
      "name": "Wand of Binding",
      "img": "icons/weapons/staves/staff-ornate-engraved-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.7kVZo4DLBq22406E",
      "id": "7kVZo4DLBq22406E",
      "name": "Quarterstaff +2",
      "img": "icons/weapons/staves/staff-simple-gold.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.7vqs5AqI4VCmuszx",
      "id": "7vqs5AqI4VCmuszx",
      "name": "Handy Haversack",
      "img": "icons/containers/bags/pack-simple-leather.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.7wY0389wscheFkIa",
      "id": "7wY0389wscheFkIa",
      "name": "Scimitar of Speed",
      "img": "icons/skills/melee/spear-tips-triple-orange.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.7ztvHyYJCcOOAWmR",
      "id": "7ztvHyYJCcOOAWmR",
      "name": "Censer",
      "img": "icons/containers/kitchenware/goblet-worn-clay-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.84z9mVy1mCipUWEY",
      "id": "84z9mVy1mCipUWEY",
      "name": "Breastplate +1",
      "img": "icons/equipment/chest/breastplate-collared-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.8ABk0XV76Hzq8Qul",
      "id": "8ABk0XV76Hzq8Qul",
      "name": "Amulet of the Planes",
      "img": "icons/equipment/neck/pendant-faceted-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.8CaODbNQtxHGuVjn",
      "id": "8CaODbNQtxHGuVjn",
      "name": "Figurine of Wondrous Power (Ivory Goat of Terror)",
      "img": "icons/commodities/bones/horn-curved-worn-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.8Fe9YSSe4ymQq8UM",
      "id": "8Fe9YSSe4ymQq8UM",
      "name": "Ink Pen",
      "img": "icons/tools/scribal/pen-steel-grey-brown.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.8GCEodUsTEEpBlO6",
      "id": "8GCEodUsTEEpBlO6",
      "name": "Robes",
      "img": "icons/equipment/back/mantle-collared-black.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.8KWz5DJbWUpNWniP",
      "id": "8KWz5DJbWUpNWniP",
      "name": "Explorer's Pack",
      "img": "icons/containers/bags/pack-simple-leather-fur-tan.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.8LZBOY5USLZ4ngDq",
      "id": "8LZBOY5USLZ4ngDq",
      "name": "Greatsword +2",
      "img": "icons/weapons/swords/greatsword-guard-gem-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.8MNDhKb1Q87QszOJ",
      "id": "8MNDhKb1Q87QszOJ",
      "name": "Longsword of Sharpness",
      "img": "icons/skills/wounds/bone-broken-knee-beam.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.8MPnSrvEeZhPhtTi",
      "id": "8MPnSrvEeZhPhtTi",
      "name": "Potion of Lightning Resistance",
      "img": "icons/consumables/potions/bottle-round-corked-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.8N1GqcdroUpmM9dS",
      "id": "8N1GqcdroUpmM9dS",
      "name": "Warhammer +1",
      "img": "icons/weapons/hammers/hammer-drilling-spiked.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.8NS6MSOdXtUqD7Ib",
      "id": "8NS6MSOdXtUqD7Ib",
      "name": "Carpenter's Tools",
      "img": "icons/tools/hand/saw-steel-grey.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.8PI1EL8xHLq4tXKr",
      "id": "8PI1EL8xHLq4tXKr",
      "name": "Ring of Spell Turning",
      "img": "icons/equipment/finger/ring-band-engraved-scrolls-silver.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.8RXjiddJ6VGyE7vB",
      "id": "8RXjiddJ6VGyE7vB",
      "name": "Common Clothes",
      "img": "icons/equipment/chest/shirt-collared-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.8W6ULfSqzuHh6Peg",
      "id": "8W6ULfSqzuHh6Peg",
      "name": "Longbow +3",
      "img": "icons/weapons/bows/longbow-leather-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.8d95YV1jHcxPygJ9",
      "id": "8d95YV1jHcxPygJ9",
      "name": "Rations",
      "img": "icons/consumables/meat/hock-leg-pink-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.8dfhaa1g3VDjhtm3",
      "id": "8dfhaa1g3VDjhtm3",
      "name": "Eyes of Charming",
      "img": "icons/creatures/eyes/human-single-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.8l7M3zeqrU2vkA5h",
      "id": "8l7M3zeqrU2vkA5h",
      "name": "Bit and Bridle",
      "img": "icons/environment/creatures/horse-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.8tvhh5wqG5FRh3Sf",
      "id": "8tvhh5wqG5FRh3Sf",
      "name": "Caltrops",
      "img": "icons/weapons/thrown/bomb-spiked-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.8wXB18E0oPAYFkqc",
      "id": "8wXB18E0oPAYFkqc",
      "name": "Heavy Crossbow +2",
      "img": "icons/weapons/crossbows/crossbow-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.902yxeFDwavpm6cv",
      "id": "902yxeFDwavpm6cv",
      "name": "Shortsword of Life Stealing",
      "img": "icons/creatures/claws/claw-curved-poison-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.9G9QGSPgpZDSsm37",
      "id": "9G9QGSPgpZDSsm37",
      "name": "Sledgehammer",
      "img": "icons/tools/smithing/hammer-sledge-steel-grey.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.9GSfMg0VOA2b4uFN",
      "id": "9GSfMg0VOA2b4uFN",
      "name": "Spell Scroll 1st Level",
      "img": "icons/sundries/scrolls/scroll-bound-orange-tan.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.9Ifr8fGvJ1bArzOW",
      "id": "9Ifr8fGvJ1bArzOW",
      "name": "Bag of Tricks (Grey)",
      "img": "icons/containers/bags/coinpouch-leather-grey.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.9Mdes2tKt0cqsNTw",
      "id": "9Mdes2tKt0cqsNTw",
      "name": "Nine Lives Stealer Scimitar",
      "img": "icons/weapons/swords/sword-broad-crystal-paired.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.9UvWQTY5yIgkJmmb",
      "id": "9UvWQTY5yIgkJmmb",
      "name": "Circlet of Blasting",
      "img": "icons/equipment/finger/ring-cabochon-notched-gold-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.9bWTRRDym06PzSAf",
      "id": "9bWTRRDym06PzSAf",
      "name": "Pouch",
      "img": "icons/containers/bags/coinpouch-simple-tan.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.9c0CHs90xqPw81iP",
      "id": "9c0CHs90xqPw81iP",
      "name": "Parchment",
      "img": "icons/sundries/scrolls/scroll-plain-tan.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.9cIlRtKDtDXQtElf",
      "id": "9cIlRtKDtDXQtElf",
      "name": "Ring of Spell Storing",
      "img": "icons/equipment/finger/ring-cabochon-silver-gold-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.9eyZY9tL3fXD1Mbm",
      "id": "9eyZY9tL3fXD1Mbm",
      "name": "Dust of Sneezing and Choking",
      "img": "icons/magic/water/bubbles-air-water-light.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.9jMQEm99q1ttAV1Q",
      "id": "9jMQEm99q1ttAV1Q",
      "name": "Ioun Stone of Insight",
      "img": "icons/commodities/stone/ore-pile-teal.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.9kfMsSweOBui0SC4",
      "id": "9kfMsSweOBui0SC4",
      "name": "Rod of Security",
      "img": "icons/magic/defensive/shield-barrier-glowing-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.9nxSHbqlDdngtuuz",
      "id": "9nxSHbqlDdngtuuz",
      "name": "Figurine of Wondrous Power (Onyx Dog)",
      "img": "icons/sundries/misc/pet-collar-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.9qOAoFw9dTXhJ1w0",
      "id": "9qOAoFw9dTXhJ1w0",
      "name": "Sling +2",
      "img": "icons/weapons/slings/slingshot-wood.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.9stfX2i2I1YPo8vx",
      "id": "9stfX2i2I1YPo8vx",
      "name": "Instant Fortress",
      "img": "icons/environment/settlement/watchtower-silhouette-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.9uT9SXy1Gb1jiiZX",
      "id": "9uT9SXy1Gb1jiiZX",
      "name": "Scale Mail +3",
      "img": "icons/equipment/chest/breastplate-banded-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.9v0TPDXNa9S7aNB4",
      "id": "9v0TPDXNa9S7aNB4",
      "name": "Periapt of Health",
      "img": "icons/equipment/neck/pendant-faceted-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.A2i08i8gAFscm6hZ",
      "id": "A2i08i8gAFscm6hZ",
      "name": "Longbow +1",
      "img": "icons/weapons/bows/longbow-leather-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.AChuumAYmts5uGFT",
      "id": "AChuumAYmts5uGFT",
      "name": "Vicious Sickle",
      "img": "icons/weapons/sickles/sickle-curved.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ADH0UZ8bf7Op0dgf",
      "id": "ADH0UZ8bf7Op0dgf",
      "name": "Crystal Ball of True Seeing",
      "img": "icons/commodities/gems/pearl-fire.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.AHn15T1TOuDFS0GH",
      "id": "AHn15T1TOuDFS0GH",
      "name": "Sickle +3",
      "img": "icons/weapons/sickles/sickle-curved.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Ajyq6nGwF7FtLhDQ",
      "id": "Ajyq6nGwF7FtLhDQ",
      "name": "Mace",
      "img": "icons/weapons/maces/mace-flanged-steel-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.AkyQyonZMVcvOrXU",
      "id": "AkyQyonZMVcvOrXU",
      "name": "Crowbar",
      "img": "icons/tools/hand/pickaxe-steel-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.Aq1rhgcgFnwu2T4I",
      "id": "Aq1rhgcgFnwu2T4I",
      "name": "Cloak of the Bat",
      "img": "icons/equipment/back/cloak-heavy-fur-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.AweD4kpKGM7Ilu3n",
      "id": "AweD4kpKGM7Ilu3n",
      "name": "Ring of Regeneration",
      "img": "icons/equipment/finger/ring-faceted-gold-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.BNJmdttKvIwC08Pd",
      "id": "BNJmdttKvIwC08Pd",
      "name": "Sling Bullet +2",
      "img": "icons/skills/ranged/bullets-triple-ball-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.BQw5lyopqLmf8B6u",
      "id": "BQw5lyopqLmf8B6u",
      "name": "Chain Mail Armor of Resistance",
      "img": "icons/equipment/chest/breastplate-metal-scaled-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.BeKIrNIvNHRPQ4t5",
      "id": "BeKIrNIvNHRPQ4t5",
      "name": "Staff",
      "img": "icons/weapons/staves/staff-ornate-engraved-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.BefbYlWbRYyy6R8s",
      "id": "BefbYlWbRYyy6R8s",
      "name": "Nine Lives Stealer Longsword",
      "img": "icons/weapons/swords/sword-broad-crystal-paired.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.BjyTJn9oGvURWKJR",
      "id": "BjyTJn9oGvURWKJR",
      "name": "Manual of Bodily Health",
      "img": "icons/sundries/books/book-backed-silver-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.BmWnprrj0QWQ1BL3",
      "id": "BmWnprrj0QWQ1BL3",
      "name": "Quarterstaff +3",
      "img": "icons/weapons/staves/staff-simple-gold.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.BnOCLuNWhVvzHLjl",
      "id": "BnOCLuNWhVvzHLjl",
      "name": "Torch",
      "img": "icons/sundries/lights/torch-black.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.BsyPV6eTNghT3Fho",
      "id": "BsyPV6eTNghT3Fho",
      "name": "Eyes of Minute Seeing",
      "img": "icons/magic/control/hypnosis-mesmerism-eye.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Bt7nIb37nU7Wxevx",
      "id": "Bt7nIb37nU7Wxevx",
      "name": "Book of Lore",
      "img": "icons/sundries/books/book-plain-orange.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.BwC8hZaNjO7IQc6K",
      "id": "BwC8hZaNjO7IQc6K",
      "name": "Splint Armor +3",
      "img": "icons/equipment/chest/breastplate-layered-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.C05ytVXByOG8uBAc",
      "id": "C05ytVXByOG8uBAc",
      "name": "Small Knife",
      "img": "icons/weapons/daggers/knife-green.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.C0MNXWA81ufzGlp5",
      "id": "C0MNXWA81ufzGlp5",
      "name": "Oil of Sharpness",
      "img": "icons/consumables/potions/potion-tube-corked-bat-gold-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.CAZMwFBWp9VC0ZCg",
      "id": "CAZMwFBWp9VC0ZCg",
      "name": "Potion of Water Breathing",
      "img": "icons/consumables/potions/potion-bottle-corked-labeled-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.CG0LhGQtc3KOAeE1",
      "id": "CG0LhGQtc3KOAeE1",
      "name": "Tinderbox",
      "img": "icons/sundries/lights/torch-black.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.CI58LNiwrTpmWYMp",
      "id": "CI58LNiwrTpmWYMp",
      "name": "Figurine of Wondrous Power (Bronze Griffon)",
      "img": "icons/commodities/bones/hurn-curved-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.CNVsvqfTbtcoHiEo",
      "id": "CNVsvqfTbtcoHiEo",
      "name": "Candle",
      "img": "icons/sundries/lights/candle-unlit-tan.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.CNdDj8dsXVpRVpXt",
      "id": "CNdDj8dsXVpRVpXt",
      "name": "Sack",
      "img": "icons/containers/bags/sack-cloth-orange.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.CVMGOJWTO6TCybrH",
      "id": "CVMGOJWTO6TCybrH",
      "name": "Lance +2",
      "img": "icons/weapons/ammunition/arrow-head-war-flight.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.CcTGZzQHejxEVLK1",
      "id": "CcTGZzQHejxEVLK1",
      "name": "Mithral Breastplate",
      "img": "icons/equipment/chest/breastplate-collared-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.CoUFHk5keIihsbYL",
      "id": "CoUFHk5keIihsbYL",
      "name": "Flame Tongue Rapier",
      "img": "icons/magic/fire/projectile-bolt-zigzag-orange.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Ct9LR9Ft1FG4a6Y1",
      "id": "Ct9LR9Ft1FG4a6Y1",
      "name": "Potion of Mind Reading",
      "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.CvzjhUy9ekRieR1A",
      "id": "CvzjhUy9ekRieR1A",
      "name": "Eversmoking Bottle",
      "img": "icons/commodities/tech/smoke-bomb-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.CwWbeQ6XyqFzbMYw",
      "id": "CwWbeQ6XyqFzbMYw",
      "name": "Book of Shadows",
      "img": "icons/sundries/books/book-black-grey.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.DEQkJiQdGyfmSNkV",
      "id": "DEQkJiQdGyfmSNkV",
      "name": "Helm of Teleportation",
      "img": "icons/equipment/head/helm-barbute-horned-copper.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.DM7hzgL836ZyUFB1",
      "id": "DM7hzgL836ZyUFB1",
      "name": "Spell Scroll 4th Level",
      "img": "icons/sundries/scrolls/scroll-plain-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.DMejWAc8r8YvDPP1",
      "id": "DMejWAc8r8YvDPP1",
      "name": "Halberd",
      "img": "icons/weapons/polearms/halberd-crescent-glowing.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.DNOSEAvF4Oh1DlWy",
      "id": "DNOSEAvF4Oh1DlWy",
      "name": "Tinderbox",
      "img": "icons/sundries/lights/torch-black.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.DSHi7yT6OUyDoCcu",
      "id": "DSHi7yT6OUyDoCcu",
      "name": "Bracers of Defense",
      "img": "icons/equipment/wrist/bracer-segmented-leather.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.DSWvkerPQsusbqzJ",
      "id": "DSWvkerPQsusbqzJ",
      "name": "Tinderbox",
      "img": "icons/sundries/lights/torch-black.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.DT02xK1DzxLNlVaI",
      "id": "DT02xK1DzxLNlVaI",
      "name": "Frost Brand Shortsword",
      "img": "icons/skills/melee/strike-weapon-polearm-ice-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.DVXmyetZuvxbzAwW",
      "id": "DVXmyetZuvxbzAwW",
      "name": "Bedroll",
      "img": "icons/sundries/survival/bedroll-grey.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.DWLMnODrnHn8IbAG",
      "id": "DWLMnODrnHn8IbAG",
      "name": "Javelin",
      "img": "icons/weapons/ammunition/arrows-bodkin-yellow-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.DWwBkOFuYf5VN3M2",
      "id": "DWwBkOFuYf5VN3M2",
      "name": "Periapt of Wound Closure",
      "img": "icons/equipment/neck/pendant-faceted-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.DeK9uQvNJj3JzFwe",
      "id": "DeK9uQvNJj3JzFwe",
      "name": "Carpet of Flying (4x6)",
      "img": "icons/equipment/back/cloak-hooded-pink.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.DevmObXWP9MfwE2c",
      "id": "DevmObXWP9MfwE2c",
      "name": "Adamantine Breastplate",
      "img": "icons/equipment/chest/breastplate-collared-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.DizirD7eqjh8n95A",
      "id": "DizirD7eqjh8n95A",
      "name": "Maul",
      "img": "icons/weapons/maces/mace-spiked-wood-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.DnlQkH6Bpwkd5n5Y",
      "id": "DnlQkH6Bpwkd5n5Y",
      "name": "Feather Token Anchor",
      "img": "icons/commodities/materials/feather-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.Do3qeSHtBjUsmfvz",
      "id": "Do3qeSHtBjUsmfvz",
      "name": "Rod of Alertness",
      "img": "icons/magic/defensive/illusion-evasion-echo-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.DoSvjhRARhRqWZXg",
      "id": "DoSvjhRARhRqWZXg",
      "name": "Wand of Fireballs",
      "img": "icons/weapons/staves/staff-engraved-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.DxIdfGoJEYQj8o3D",
      "id": "DxIdfGoJEYQj8o3D",
      "name": "Bag of Tricks (Rust)",
      "img": "icons/containers/bags/sack-simple-leather-tan.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.DxfCBU7uBoRNAnDm",
      "id": "DxfCBU7uBoRNAnDm",
      "name": "Bedroll",
      "img": "icons/sundries/survival/bedroll-grey.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.E2h6sEe6FU2tnU96",
      "id": "E2h6sEe6FU2tnU96",
      "name": "Costume Clothes",
      "img": "icons/equipment/back/cloak-hooded-pink.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.E7c4zpWdYgkKDHGo",
      "id": "E7c4zpWdYgkKDHGo",
      "name": "Luck Blade Scimitar",
      "img": "icons/magic/light/projectile-beam-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.E9G4jALlSA96fKAN",
      "id": "E9G4jALlSA96fKAN",
      "name": "Iron Bands of Binding",
      "img": "icons/commodities/metal/clasp-steel-braid.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.EC6ugXsfJZmjMNAj",
      "id": "EC6ugXsfJZmjMNAj",
      "name": "Rations",
      "img": "icons/consumables/meat/hock-leg-pink-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.EJFql4aNWHHJSxT9",
      "id": "EJFql4aNWHHJSxT9",
      "name": "Wand of Fear",
      "img": "icons/weapons/staves/staff-skull-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.EJVaAvNfCq6gn6VG",
      "id": "EJVaAvNfCq6gn6VG",
      "name": "Helm of Telepathy",
      "img": "icons/magic/control/control-influence-rally-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.ER75WHewYN04Zp11",
      "id": "ER75WHewYN04Zp11",
      "name": "Belt of Hill Giant Strength",
      "img": "icons/equipment/waist/belt-buckle-square-leather-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.ET8Oo5vaTZqyb7rN",
      "id": "ET8Oo5vaTZqyb7rN",
      "name": "Breastplate +2",
      "img": "icons/equipment/chest/breastplate-collared-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.EU78dSbnr91QWZ7g",
      "id": "EU78dSbnr91QWZ7g",
      "name": "Halberd +3",
      "img": "icons/weapons/polearms/halberd-crescent-glowing.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.EWdfUQriSabqDESm",
      "id": "EWdfUQriSabqDESm",
      "name": "Dart +2",
      "img": "icons/weapons/ammunition/arrows-war-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.EkTpM4Wbsrdqflzl",
      "id": "EkTpM4Wbsrdqflzl",
      "name": "Trident +2",
      "img": "icons/weapons/polearms/trident-silver-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ElLfmohtIFMagr5f",
      "id": "ElLfmohtIFMagr5f",
      "name": "Ring of Animal Influence",
      "img": "icons/equipment/finger/ring-cabochon-gold-orange.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.EveBprZPBjfZqXLt",
      "id": "EveBprZPBjfZqXLt",
      "name": "Maul +1",
      "img": "icons/weapons/maces/mace-spiked-wood-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.EwG1EtmbgR3bM68U",
      "id": "EwG1EtmbgR3bM68U",
      "name": "Lyre",
      "img": "icons/tools/instruments/lute-gold-brown.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.F0Df164Xv1gWcYt0",
      "id": "F0Df164Xv1gWcYt0",
      "name": "Warhammer",
      "img": "icons/weapons/hammers/hammer-drilling-spiked.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.F3rQcaZvElNEiudk",
      "id": "F3rQcaZvElNEiudk",
      "name": "Giant Slayer Handaxe",
      "img": "icons/weapons/axes/axe-broad-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.F65ANO66ckP8FDMa",
      "id": "F65ANO66ckP8FDMa",
      "name": "Trident",
      "img": "icons/weapons/polearms/trident-silver-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.F6GwSqjErX1u35Re",
      "id": "F6GwSqjErX1u35Re",
      "name": "Bell",
      "img": "icons/tools/instruments/bell-brass-brown.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.F6v3Q7dz1SlpLTMf",
      "id": "F6v3Q7dz1SlpLTMf",
      "name": "Staff of Thunder and Lightning",
      "img": "icons/weapons/staves/staff-ornate-engraved-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.F8QpasPjLrw2POzE",
      "id": "F8QpasPjLrw2POzE",
      "name": "Bag of Beans",
      "img": "icons/containers/bags/coinpouch-simple-leather-tan.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.FCxG64QUxsnF4Lis",
      "id": "FCxG64QUxsnF4Lis",
      "name": "Holy Avenger Greatsword",
      "img": "icons/skills/melee/weapons-crossed-swords-yellow-teal.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.FF1ktpb2YSiyv896",
      "id": "FF1ktpb2YSiyv896",
      "name": "Wooden Staff",
      "img": "icons/weapons/staves/staff-simple-spiral-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.FHUDEygUW7EWCDgA",
      "id": "FHUDEygUW7EWCDgA",
      "name": "Vicious Scimitar",
      "img": "icons/weapons/swords/sword-katana.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.FIDyR0kZnxGy7bj8",
      "id": "FIDyR0kZnxGy7bj8",
      "name": "Oil of Slipperiness",
      "img": "icons/consumables/potions/bottle-circular-corked-labeled-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.FLoBS3UnFnZTSsSx",
      "id": "FLoBS3UnFnZTSsSx",
      "name": "Chain Shirt +2",
      "img": "icons/equipment/chest/breastplate-scale-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.FZixEM5voQkH84xP",
      "id": "FZixEM5voQkH84xP",
      "name": "Studded Leather Armor +2",
      "img": "icons/equipment/chest/breastplate-rivited-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Fc6UfFNOnW80XMzi",
      "id": "Fc6UfFNOnW80XMzi",
      "name": "Antitoxin",
      "img": "icons/consumables/potions/bottle-round-corked-pink.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.FeouSUPUlUhfgeRp",
      "id": "FeouSUPUlUhfgeRp",
      "name": "Staff of Charming",
      "img": "icons/weapons/staves/staff-simple-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Fgkj11diTJJ7H3JC",
      "id": "Fgkj11diTJJ7H3JC",
      "name": "Feather Token Whip",
      "img": "icons/commodities/materials/feather-colored-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.FhtjbeBeP4q5vTyc",
      "id": "FhtjbeBeP4q5vTyc",
      "name": "Javelin +3",
      "img": "icons/weapons/ammunition/arrows-bodkin-yellow-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Fk78kNmp3OLX5EMC",
      "id": "Fk78kNmp3OLX5EMC",
      "name": "Vicious Heavy Crossbow",
      "img": "icons/weapons/crossbows/crossbow-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.FkDyLSpiynKTQZdi",
      "id": "FkDyLSpiynKTQZdi",
      "name": "Wings of Flying",
      "img": "icons/equipment/back/cloak-heavy-fur-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.FpLaviCom3XR1ckP",
      "id": "FpLaviCom3XR1ckP",
      "name": "Vicious Greatsword",
      "img": "icons/weapons/swords/greatsword-guard-gem-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.FqFmdzIBUSxFKKfi",
      "id": "FqFmdzIBUSxFKKfi",
      "name": "Fine Clothes",
      "img": "icons/equipment/back/cloak-heavy-fur-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.FvNOwWbh5FXyX4xe",
      "id": "FvNOwWbh5FXyX4xe",
      "name": "Alchemist's Fire",
      "img": "icons/consumables/potions/bottle-round-corked-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.G3cqbejJpfB91VhP",
      "id": "G3cqbejJpfB91VhP",
      "name": "Shawm",
      "img": "icons/tools/instruments/lute-gold-brown.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.G5m5gYIx9VAUWC3J",
      "id": "G5m5gYIx9VAUWC3J",
      "name": "Pan Flute",
      "img": "icons/tools/instruments/flute-simple-wood.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.G7LqGzKR5ts0WlJ9",
      "id": "G7LqGzKR5ts0WlJ9",
      "name": "Hourglass",
      "img": "icons/tools/navigation/hourglass-grey.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.G9XQPNLlDXkpVxn1",
      "id": "G9XQPNLlDXkpVxn1",
      "name": "Padded Armor +2",
      "img": "icons/equipment/chest/breastplate-quilted-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.GJv6WkD7D2J6rP6M",
      "id": "GJv6WkD7D2J6rP6M",
      "name": "Shortbow",
      "img": "icons/weapons/bows/shortbow-recurve.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.GKQSxYvS3m9qKVac",
      "id": "GKQSxYvS3m9qKVac",
      "name": "Mithral Splint Armor",
      "img": "icons/equipment/chest/breastplate-layered-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.GP2bvHlxVi30OEmo",
      "id": "GP2bvHlxVi30OEmo",
      "name": "Figurine of Wondrous Power (Marble Elephant)",
      "img": "icons/commodities/bones/horn-simple-grey.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.GcpXNc4dKUNw0Tk6",
      "id": "GcpXNc4dKUNw0Tk6",
      "name": "Wand of Paralysis",
      "img": "icons/weapons/staves/staff-ornate-engraved-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.Gflnp29aEv5Lc1ZM",
      "id": "Gflnp29aEv5Lc1ZM",
      "name": "Cook's Utensils",
      "img": "icons/tools/laboratory/bowl-mixing.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.GsuvwoekKZatfKwF",
      "id": "GsuvwoekKZatfKwF",
      "name": "Unarmed Strike",
      "img": "icons/skills/melee/unarmed-punch-fist-yellow-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.GtKV1b5uqFQqpEni",
      "id": "GtKV1b5uqFQqpEni",
      "name": "Padded Armor",
      "img": "icons/equipment/chest/breastplate-quilted-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.H6SIiRIig7OMM2Z0",
      "id": "H6SIiRIig7OMM2Z0",
      "name": "Longsword +3",
      "img": "icons/weapons/swords/greatsword-crossguard-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.H8YCd689ezlD26aT",
      "id": "H8YCd689ezlD26aT",
      "name": "Backpack",
      "img": "icons/containers/bags/pack-simple-leather.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.HF32aZSVw4P0MR4K",
      "id": "HF32aZSVw4P0MR4K",
      "name": "Chain Shirt Armor of Resistance",
      "img": "icons/equipment/chest/breastplate-scale-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.HLEhnzLbpRbYdAHo",
      "id": "HLEhnzLbpRbYdAHo",
      "name": "Elemental Gem of Water",
      "img": "icons/commodities/gems/gem-rough-cushion-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.HLhFCDGfI8EK7uV9",
      "id": "HLhFCDGfI8EK7uV9",
      "name": "Boots of Levitation",
      "img": "icons/equipment/feet/boots-collared-rounded-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.HQJ8tiyyrJJSUSyF",
      "id": "HQJ8tiyyrJJSUSyF",
      "name": "Blowgun +3",
      "img": "icons/commodities/tech/pipe-metal.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.HVpXIU0zZw0a4Fb7",
      "id": "HVpXIU0zZw0a4Fb7",
      "name": "Mithral Plate Armor",
      "img": "icons/equipment/chest/breastplate-collared-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.HY8duCwmvlXOruTG",
      "id": "HY8duCwmvlXOruTG",
      "name": "Potion of Diminution",
      "img": "icons/consumables/potions/potion-tube-corked-glowing-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.HZp69hhyNZUUCipF",
      "id": "HZp69hhyNZUUCipF",
      "name": "Glass Bottle",
      "img": "icons/consumables/potions/bottle-bulb-empty-glass.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.HZsvDPmvysQKGzGy",
      "id": "HZsvDPmvysQKGzGy",
      "name": "Steel Mirror",
      "img": "icons/sundries/survival/mirror-plain.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.HdC66U61pDOknaux",
      "id": "HdC66U61pDOknaux",
      "name": "Club +3",
      "img": "icons/weapons/clubs/club-simple-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.HeDP6dL9daVT3uj2",
      "id": "HeDP6dL9daVT3uj2",
      "name": "Spear +2",
      "img": "icons/weapons/polearms/spear-flared-worn-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.HgFNy16VK0iJgpFx",
      "id": "HgFNy16VK0iJgpFx",
      "name": "Candle",
      "img": "icons/sundries/lights/candle-unlit-tan.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.HnIERWmmra74hSCw",
      "id": "HnIERWmmra74hSCw",
      "name": "Ring of Water Elemental Command",
      "img": "icons/equipment/finger/ring-cabochon-gold-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.HnJqfKkYXIWo2sp9",
      "id": "HnJqfKkYXIWo2sp9",
      "name": "Vicious Warhammer",
      "img": "icons/weapons/hammers/hammer-drilling-spiked.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.HokQ1loVJTFxt27u",
      "id": "HokQ1loVJTFxt27u",
      "name": "Vorpal Longsword",
      "img": "icons/skills/melee/strike-sword-steel-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.HpEEfZg9PRkXnMi4",
      "id": "HpEEfZg9PRkXnMi4",
      "name": "Splint Armor +1",
      "img": "icons/equipment/chest/breastplate-layered-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.HqM7xtEgwV1l3HTZ",
      "id": "HqM7xtEgwV1l3HTZ",
      "name": "Sealing Wax",
      "img": "icons/sundries/lights/candle-unlit-red.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.I0WocDSuNpGJayPb",
      "id": "I0WocDSuNpGJayPb",
      "name": "Battleaxe",
      "img": "icons/weapons/polearms/halberd-crescent-engraved-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.I5PWgE4IF40Iv9h4",
      "id": "I5PWgE4IF40Iv9h4",
      "name": "Giant Slayer Rapier",
      "img": "icons/weapons/swords/greatsword-flamberge.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.I7cOsXsklWkzouHA",
      "id": "I7cOsXsklWkzouHA",
      "name": "Vorpal Scimitar",
      "img": "icons/skills/melee/strike-sword-steel-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.IBhDAr7WkhWPYLVn",
      "id": "IBhDAr7WkhWPYLVn",
      "name": "Disguise Kit",
      "img": "icons/equipment/back/cloak-hooded-blue.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.IGg1yAvcOyhIqzBi",
      "id": "IGg1yAvcOyhIqzBi",
      "name": "Bedroll",
      "img": "icons/sundries/survival/bedroll-grey.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.IGwDN9gtYxCrlrCr",
      "id": "IGwDN9gtYxCrlrCr",
      "name": "Elemental Gem of Earth",
      "img": "icons/commodities/gems/gem-faceted-octagon-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.IPkf0XNowClwXnjQ",
      "id": "IPkf0XNowClwXnjQ",
      "name": "Longsword +1",
      "img": "icons/weapons/swords/greatsword-crossguard-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.IY5PveXrF7VoFlWg",
      "id": "IY5PveXrF7VoFlWg",
      "name": "Arrow +3",
      "img": "icons/weapons/ammunition/arrow-head-war.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.IeM5Ha2cg0RA99q3",
      "id": "IeM5Ha2cg0RA99q3",
      "name": "Hide Armor +3",
      "img": "icons/equipment/chest/vest-cloth-tattered-tan.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Ij6x7481ch3Z0rff",
      "id": "Ij6x7481ch3Z0rff",
      "name": "String, 10 ft.",
      "img": "icons/commodities/cloth/thread-spindle-white-grey.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.Ilyv71AeobM6AvIn",
      "id": "Ilyv71AeobM6AvIn",
      "name": "Defender Scimitar",
      "img": "icons/weapons/polearms/spear-flared-silver-pink.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.IpBBqr0r7JanyVn0",
      "id": "IpBBqr0r7JanyVn0",
      "name": "Ring of Thunder Resistance",
      "img": "icons/equipment/finger/ring-faceted-silver-orange.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.IrC5LPbWNxlAQoK7",
      "id": "IrC5LPbWNxlAQoK7",
      "name": "Ring of Radiant Resistance",
      "img": "icons/equipment/finger/ring-inlay-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.ItoGjtOtDOQ2noNM",
      "id": "ItoGjtOtDOQ2noNM",
      "name": "Crystal Ball",
      "img": "icons/commodities/gems/pearl-natural.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.IuVaBrq17AqxpXc4",
      "id": "IuVaBrq17AqxpXc4",
      "name": "Wand of the War Mage +3",
      "img": "icons/weapons/staves/staff-engraved-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.J8gQdJJi5e8LmD7H",
      "id": "J8gQdJJi5e8LmD7H",
      "name": "Rope of Entanglement",
      "img": "icons/magic/nature/root-vine-thorned-coil-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.JDTO996oInbiZGHW",
      "id": "JDTO996oInbiZGHW",
      "name": "Breastplate +3",
      "img": "icons/equipment/chest/breastplate-collared-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.JFiSlgcm3uSSBM5t",
      "id": "JFiSlgcm3uSSBM5t",
      "name": "Potion of Supreme Healing",
      "img": "icons/consumables/potions/potion-flask-stopped-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.JNkjtTxYmEC7W34O",
      "id": "JNkjtTxYmEC7W34O",
      "name": "Splint Armor of Resistance",
      "img": "icons/equipment/chest/breastplate-layered-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.JRJpKZyamkpa7awv",
      "id": "JRJpKZyamkpa7awv",
      "name": "Robe of Scintillating Colors",
      "img": "icons/magic/lightning/orb-ball-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Jj4iFQQGvckx8Wsj",
      "id": "Jj4iFQQGvckx8Wsj",
      "name": "Potion of Fire Resistance",
      "img": "icons/consumables/potions/bottle-bulb-corked-glowing-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.JpwuGtFkfrGibQpP",
      "id": "JpwuGtFkfrGibQpP",
      "name": "Greatsword of Wounding",
      "img": "icons/magic/water/heart-ice-freeze.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Jvf1NWFxcjfHnMQ5",
      "id": "Jvf1NWFxcjfHnMQ5",
      "name": "Cloak of Elvenkind",
      "img": "icons/equipment/back/cloak-heavy-fur-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.JvoufrTkSDMsS9Sm",
      "id": "JvoufrTkSDMsS9Sm",
      "name": "Chain (10 feet)",
      "img": "icons/tools/fasteners/chain-steel-grey.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.JwJf6M6HCSSMgKx3",
      "id": "JwJf6M6HCSSMgKx3",
      "name": "Rations",
      "img": "icons/consumables/meat/hock-leg-pink-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.JyYwliYiWEw2g0yJ",
      "id": "JyYwliYiWEw2g0yJ",
      "name": "Ring of Feather Falling",
      "img": "icons/equipment/finger/ring-cabochon-silver-gold-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.K7h4LT03SNt2807z",
      "id": "K7h4LT03SNt2807z",
      "name": "Vicious Hand Crossbow",
      "img": "icons/weapons/crossbows/crossbow-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.KA2P6I48iOWlnboO",
      "id": "KA2P6I48iOWlnboO",
      "name": "Wand",
      "img": "icons/weapons/staves/staff-simple-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.KJYqNZgdkRwPmPMl",
      "id": "KJYqNZgdkRwPmPMl",
      "name": "Rapier of Wounding",
      "img": "icons/magic/water/heart-ice-freeze.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.KJuLguMZCThrQOEx",
      "id": "KJuLguMZCThrQOEx",
      "name": "Feed",
      "img": "icons/consumables/grains/sack-rice-open-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.KKWBLKQIWHtcpymp",
      "id": "KKWBLKQIWHtcpymp",
      "name": "Boots of Elvenkind",
      "img": "icons/equipment/feet/shoes-collared-leather-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.KhRhwADrTpol3yTx",
      "id": "KhRhwADrTpol3yTx",
      "name": "Ring Mail +3",
      "img": "icons/equipment/chest/breastplate-banded-simple-leather-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.KndVe2insuctjIaj",
      "id": "KndVe2insuctjIaj",
      "name": "Smith's Tools",
      "img": "icons/skills/trades/smithing-tongs-metal-red.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.KvIlZssYEtQ4bvSE",
      "id": "KvIlZssYEtQ4bvSE",
      "name": "Warhammer +2",
      "img": "icons/weapons/hammers/hammer-drilling-spiked.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.KyW8s4pCgPAkgTXI",
      "id": "KyW8s4pCgPAkgTXI",
      "name": "Bell",
      "img": "icons/tools/instruments/bell-brass-brown.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.L4PxYPtYca283sju",
      "id": "L4PxYPtYca283sju",
      "name": "Scimitar of Wounding",
      "img": "icons/magic/water/heart-ice-freeze.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.L887NdWEP5NqHCrQ",
      "id": "L887NdWEP5NqHCrQ",
      "name": "Potion of Greater Healing",
      "img": "icons/consumables/potions/bottle-bulb-corked-glowing-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.L9KBLub5vfb3mTDz",
      "id": "L9KBLub5vfb3mTDz",
      "name": "Ring of Fire Elemental Command",
      "img": "icons/equipment/finger/ring-inlay-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.LBQWNqX6hZOKhQ8a",
      "id": "LBQWNqX6hZOKhQ8a",
      "name": "Potion of Radiant Resistance",
      "img": "icons/consumables/potions/bottle-round-corked-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.LBajgahniRJbAgDr",
      "id": "LBajgahniRJbAgDr",
      "name": "Spellbook",
      "img": "icons/sundries/books/book-embossed-jewel-gold-purple.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.LC5LsQOPwoHQW9Mi",
      "id": "LC5LsQOPwoHQW9Mi",
      "name": "Ring of Water Walking",
      "img": "icons/equipment/finger/ring-faceted-gold-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.LDuqUcosOK8Bf76S",
      "id": "LDuqUcosOK8Bf76S",
      "name": "Adamantine Splint Armor",
      "img": "icons/equipment/chest/breastplate-layered-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.LEC1wkaAUnWzDPDD",
      "id": "LEC1wkaAUnWzDPDD",
      "name": "Javelin of Lightning",
      "img": "icons/magic/lightning/bolt-strike-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.LECtCKWa0mt0Vy1U",
      "id": "LECtCKWa0mt0Vy1U",
      "name": "Perfume",
      "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.LHaqMvrx3PfSzWMQ",
      "id": "LHaqMvrx3PfSzWMQ",
      "name": "Bag of Tricks (Tan)",
      "img": "icons/containers/bags/sack-twisted-leather-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.LZcpcR21nte4Yoe2",
      "id": "LZcpcR21nte4Yoe2",
      "name": "Handaxe +2",
      "img": "icons/weapons/axes/axe-broad-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.LdAj2ES9EzfnWcA1",
      "id": "LdAj2ES9EzfnWcA1",
      "name": "Adamantine Scale Mail",
      "img": "icons/equipment/chest/breastplate-banded-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.LiOD83I4MIZlpoQQ",
      "id": "LiOD83I4MIZlpoQQ",
      "name": "Hunting Trap",
      "img": "icons/environment/traps/trap-jaw-steel.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.LpD064ilKEeFzVI8",
      "id": "LpD064ilKEeFzVI8",
      "name": "Cloak of Displacement",
      "img": "icons/equipment/back/cloak-heavy-fur-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Lr8aRsnia8hftPAb",
      "id": "Lr8aRsnia8hftPAb",
      "name": "Dagger +2",
      "img": "icons/weapons/daggers/dagger-jeweled-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.M28HYDCueaK7J8u8",
      "id": "M28HYDCueaK7J8u8",
      "name": "Ring Mail +2",
      "img": "icons/equipment/chest/breastplate-banded-simple-leather-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.M5APnDW8bKQb7fHI",
      "id": "M5APnDW8bKQb7fHI",
      "name": "Shield of Missile Attraction",
      "img": "icons/equipment/shield/kite-decorative-steel-claws.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.M5qkJ7erLqWYUHa0",
      "id": "M5qkJ7erLqWYUHa0",
      "name": "Figurine of Wondrous Power (Obsidian Steed)",
      "img": "icons/magic/light/beam-red-orange.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.M8xM8BLK4tpUayEE",
      "id": "M8xM8BLK4tpUayEE",
      "name": "Iron Pot",
      "img": "icons/tools/laboratory/cauldron-filled-gold.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.MAwoj2suj6cvb9Ti",
      "id": "MAwoj2suj6cvb9Ti",
      "name": "Universal Solvent",
      "img": "icons/commodities/materials/liquid-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.MCMSZrhcD40oMJ9v",
      "id": "MCMSZrhcD40oMJ9v",
      "name": "Boots of Speed",
      "img": "icons/equipment/feet/boots-collared-simple-leather.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.MFd96UkSs5g9QO78",
      "id": "MFd96UkSs5g9QO78",
      "name": "Dragon Slayer Shortsword",
      "img": "icons/skills/melee/strike-axe-blood-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.MLNzQUsVUi0PEV3i",
      "id": "MLNzQUsVUi0PEV3i",
      "name": "Efficient Quiver",
      "img": "icons/containers/ammunition/arrows-quiver-black.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.MOeFq5MLAQzVQC7z",
      "id": "MOeFq5MLAQzVQC7z",
      "name": "Staff of the Python",
      "img": "icons/weapons/staves/staff-simple-spiral-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.MSO3JxK8578xSh6x",
      "id": "MSO3JxK8578xSh6x",
      "name": "Chain Shirt +1",
      "img": "icons/equipment/chest/breastplate-scale-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Minr6xegwoHFvAjG",
      "id": "Minr6xegwoHFvAjG",
      "name": "Figurine of Wondrous Power (Golden Lions)",
      "img": "icons/commodities/claws/claw-bear-brown-grey.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.Mj8fTo5VZKJJ7uMv",
      "id": "Mj8fTo5VZKJJ7uMv",
      "name": "Sling Bullet of Slaying",
      "img": "icons/skills/ranged/bullets-triple-ball-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.MnX9soPEMNsCtpv7",
      "id": "MnX9soPEMNsCtpv7",
      "name": "Hand Crossbow +1",
      "img": "icons/weapons/crossbows/crossbow-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Mt2WB1W9nDWO4d16",
      "id": "Mt2WB1W9nDWO4d16",
      "name": "Glaive +2",
      "img": "icons/weapons/polearms/halberd-crescent-glowing.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.N0in6FE8DQdZrHei",
      "id": "N0in6FE8DQdZrHei",
      "name": "Riding Saddle",
      "img": "icons/equipment/shoulder/pauldron-leather-molded.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.N8XNP3vjVZmM2r9S",
      "id": "N8XNP3vjVZmM2r9S",
      "name": "Blowgun +1",
      "img": "icons/commodities/tech/pipe-metal.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.NG8BlE2nwYJxCjWO",
      "id": "NG8BlE2nwYJxCjWO",
      "name": "Animated Shield",
      "img": "icons/equipment/shield/heater-steel-sword-yellow-black.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.NGVEouqK0I6J6jV5",
      "id": "NGVEouqK0I6J6jV5",
      "name": "Ioun Stone of Absorption",
      "img": "icons/commodities/gems/gem-rough-ball-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.NM1dPyKwHw2DyUWA",
      "id": "NM1dPyKwHw2DyUWA",
      "name": "Ring Mail +1",
      "img": "icons/equipment/chest/breastplate-banded-simple-leather-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.NRj0lC3SM03s1YB3",
      "id": "NRj0lC3SM03s1YB3",
      "name": "Belt of Cloud Giant Strength",
      "img": "icons/equipment/waist/belt-thick-gemmed-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.NYIib9KEYDUFe9GY",
      "id": "NYIib9KEYDUFe9GY",
      "name": "Sling Bullet +1",
      "img": "icons/skills/ranged/bullets-triple-ball-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.Nd4r4hocpfu6fYDP",
      "id": "Nd4r4hocpfu6fYDP",
      "name": "Prayer Wheel",
      "img": "icons/tools/instruments/drum-brown-red.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.NgwrqNa6kkgoPW2Q",
      "id": "NgwrqNa6kkgoPW2Q",
      "name": "Shield +1",
      "img": "icons/equipment/shield/round-wooden-boss-gold-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.NjTgPn2o0M1TGk93",
      "id": "NjTgPn2o0M1TGk93",
      "name": "Feather Token Tree",
      "img": "icons/commodities/materials/feather-colored-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.NmZMx2u6bHpRyGUa",
      "id": "NmZMx2u6bHpRyGUa",
      "name": "Frost Brand Longsword",
      "img": "icons/skills/melee/strike-weapon-polearm-ice-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.NrHboku9vJO5FGiY",
      "id": "NrHboku9vJO5FGiY",
      "name": "Morningstar +2",
      "img": "icons/weapons/maces/mace-round-spiked-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.NtdDkjmpdIMiX7I2",
      "id": "NtdDkjmpdIMiX7I2",
      "name": "Dulcimer",
      "img": "icons/tools/instruments/lute-gold-brown.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.O4YbkJkLlnsgUszZ",
      "id": "O4YbkJkLlnsgUszZ",
      "name": "Spell Scroll 9th Level",
      "img": "icons/sundries/scrolls/scroll-runed-brown-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.OG4nBBydvmfWYXIk",
      "id": "OG4nBBydvmfWYXIk",
      "name": "Spear",
      "img": "icons/weapons/polearms/spear-flared-worn-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.OPbdSlrhkUDNpgcS",
      "id": "OPbdSlrhkUDNpgcS",
      "name": "Wand of the War Mage +1",
      "img": "icons/weapons/staves/staff-engraved-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.ORKf6RRcalrdD6Qp",
      "id": "ORKf6RRcalrdD6Qp",
      "name": "Belt of Frost Giant Strength",
      "img": "icons/equipment/waist/cloth-sash-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.OUGMoQYeJzxEcRvm",
      "id": "OUGMoQYeJzxEcRvm",
      "name": "Nine Lives Stealer Rapier",
      "img": "icons/weapons/swords/sword-broad-crystal-paired.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.OcjcplcUWH07Kn9k",
      "id": "OcjcplcUWH07Kn9k",
      "name": "Brazier of Commanding Fire Elementals",
      "img": "icons/magic/fire/blast-jet-stream-splash.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.OjkIqlW2UpgFcjZa",
      "id": "OjkIqlW2UpgFcjZa",
      "name": "Plate Armor",
      "img": "icons/equipment/chest/breastplate-collared-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.OojyyGfh91iViuMF",
      "id": "OojyyGfh91iViuMF",
      "name": "Rod",
      "img": "icons/weapons/polearms/spear-hooked-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Or3kVfJ0Fbr33ARS",
      "id": "Or3kVfJ0Fbr33ARS",
      "name": "Greatclub +2",
      "img": "icons/weapons/maces/mace-spiked-steel-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.OwqRt1pVLhdMQa0d",
      "id": "OwqRt1pVLhdMQa0d",
      "name": "Dwarven Plate",
      "img": "icons/equipment/chest/breastplate-layered-steel-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.P31t6tGgt9aLAdYt",
      "id": "P31t6tGgt9aLAdYt",
      "name": "Piton",
      "img": "icons/tools/fasteners/nail-steel.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.P5UuhUBZL59wZiCY",
      "id": "P5UuhUBZL59wZiCY",
      "name": "Rations",
      "img": "icons/consumables/meat/hock-leg-pink-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.P8f9o36qxagW2uRW",
      "id": "P8f9o36qxagW2uRW",
      "name": "Maul +3",
      "img": "icons/weapons/maces/mace-spiked-wood-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.PAXfmZ2ErDlCVy0N",
      "id": "PAXfmZ2ErDlCVy0N",
      "name": "Talisman of Ultimate Evil",
      "img": "icons/magic/death/skull-horned-goat-pentagram-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.PAa2EG5kzmqxcp46",
      "id": "PAa2EG5kzmqxcp46",
      "name": "Greataxe +3",
      "img": "icons/weapons/axes/axe-double.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.PGL6aaM0wE5h0VN5",
      "id": "PGL6aaM0wE5h0VN5",
      "name": "Totem",
      "img": "icons/equipment/neck/collar-carved-bone-teeth-ring.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.PKpftwMAn88gfLi7",
      "id": "PKpftwMAn88gfLi7",
      "name": "Morningstar +1",
      "img": "icons/weapons/maces/mace-round-spiked-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.PLkzJ310FzBnRrI5",
      "id": "PLkzJ310FzBnRrI5",
      "name": "Military Saddle",
      "img": "icons/equipment/shoulder/shoulderpad-leather-banded-ring.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.PRhtLbRLb9LjHZG7",
      "id": "PRhtLbRLb9LjHZG7",
      "name": "Gloves of Swimming and Climbing",
      "img": "icons/environment/creatures/frog-spotted-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.PUMfwyVUbtyxgYbD",
      "id": "PUMfwyVUbtyxgYbD",
      "name": "Leatherworker's Tools",
      "img": "icons/commodities/leather/leather-buckle-steel-tan.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.PV0sn2Nlr8CNn4W9",
      "id": "PV0sn2Nlr8CNn4W9",
      "name": "Magnifying Glass",
      "img": "icons/tools/scribal/magnifying-glass.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.PanSr5EbqlfpSvwK",
      "id": "PanSr5EbqlfpSvwK",
      "name": "Two-Person Tent",
      "img": "icons/environment/wilderness/camp-improvised.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.Q4Iy6hqREsbk9yG7",
      "id": "Q4Iy6hqREsbk9yG7",
      "name": "Ioun Stone of Agility",
      "img": "icons/commodities/gems/gem-rough-cushion-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Q4jmng3i9Lb2nL5F",
      "id": "Q4jmng3i9Lb2nL5F",
      "name": "Manual of Quickness of Action",
      "img": "icons/sundries/books/book-symbol-triangle-silver-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.Q7E6MgPzVkwBeZ6l",
      "id": "Q7E6MgPzVkwBeZ6l",
      "name": "Ring of Psychic Resistance",
      "img": "icons/equipment/finger/ring-cabochon-notched-gold-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.QB4CFMTLR6JlD7Kq",
      "id": "QB4CFMTLR6JlD7Kq",
      "name": "Greatsword of Sharpness",
      "img": "icons/skills/wounds/bone-broken-knee-beam.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.QKTyxoO0YDnAsbYe",
      "id": "QKTyxoO0YDnAsbYe",
      "name": "Whip",
      "img": "icons/weapons/misc/whip-red-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.QM3gdsL0eaAus7XT",
      "id": "QM3gdsL0eaAus7XT",
      "name": "Vicious Handaxe",
      "img": "icons/weapons/axes/axe-broad-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.QRCsxkCwWNwswL9o",
      "id": "QRCsxkCwWNwswL9o",
      "name": "Greatclub",
      "img": "icons/weapons/maces/mace-spiked-steel-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.QXmaarJ4X8P0C1HV",
      "id": "QXmaarJ4X8P0C1HV",
      "name": "Hempen Rope (50 ft.)",
      "img": "icons/sundries/survival/rope-wrapped-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.QYJyQCnIQeLiMrmJ",
      "id": "QYJyQCnIQeLiMrmJ",
      "name": "Brass Horn of Valhalla",
      "img": "icons/tools/instruments/flute-simple-wood.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.Qfi5Rsuun3reqYmf",
      "id": "Qfi5Rsuun3reqYmf",
      "name": "Handaxe +1",
      "img": "icons/weapons/axes/axe-broad-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.QtmVEreNIWEVOoLR",
      "id": "QtmVEreNIWEVOoLR",
      "name": "Ring of Protection",
      "img": "icons/equipment/finger/ring-cabochon-silver-gold-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Qy2aRjl4iQ8EmaT5",
      "id": "Qy2aRjl4iQ8EmaT5",
      "name": "Diplomat's Pack",
      "img": "icons/containers/chest/chest-reinforced-steel-pink.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.RDPFmUR9exTEXFc8",
      "id": "RDPFmUR9exTEXFc8",
      "name": "Boots of the Winterlands",
      "img": "icons/equipment/feet/boots-leather-banded-furred.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.REBWkTKe6lJaIkpn",
      "id": "REBWkTKe6lJaIkpn",
      "name": "Soap",
      "img": "icons/sundries/survival/soap.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.RMi9efrW9ouHVLI2",
      "id": "RMi9efrW9ouHVLI2",
      "name": "Book",
      "img": "icons/sundries/books/book-worn-brown.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.RbC0UCqAnQcIPIXZ",
      "id": "RbC0UCqAnQcIPIXZ",
      "name": "War Pick +2",
      "img": "icons/weapons/axes/pickaxe-double-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.RfEZvwcLwe6Ih0LQ",
      "id": "RfEZvwcLwe6Ih0LQ",
      "name": "Greatsword +3",
      "img": "icons/weapons/swords/greatsword-guard-gem-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.RiOeHR2qaYktz5Ys",
      "id": "RiOeHR2qaYktz5Ys",
      "name": "Iron Spike",
      "img": "icons/tools/fasteners/nails-steel-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.RmP0mYRn2J7K26rX",
      "id": "RmP0mYRn2J7K26rX",
      "name": "Heavy Crossbow",
      "img": "icons/weapons/crossbows/crossbow-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Rn9gt6JGULtx9Zvz",
      "id": "Rn9gt6JGULtx9Zvz",
      "name": "Chain Mail +1",
      "img": "icons/equipment/chest/breastplate-metal-scaled-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.RnuxdHUAIgxccVwj",
      "id": "RnuxdHUAIgxccVwj",
      "name": "Lance",
      "img": "icons/weapons/ammunition/arrow-head-war-flight.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.S7AhpCPDBGUBbg7b",
      "id": "S7AhpCPDBGUBbg7b",
      "name": "Rapier +1",
      "img": "icons/weapons/swords/sword-guard-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.S7TrIOlE600KIOUx",
      "id": "S7TrIOlE600KIOUx",
      "name": "Dragon Slayer Rapier",
      "img": "icons/skills/melee/strike-axe-blood-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.SItCnYBqhzqBoaWG",
      "id": "SItCnYBqhzqBoaWG",
      "name": "Crossbow Bolt",
      "img": "icons/weapons/ammunition/arrows-bodkin-yellow-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.SK2HATQ4abKUlV8i",
      "id": "SK2HATQ4abKUlV8i",
      "name": "Breastplate",
      "img": "icons/equipment/chest/breastplate-collared-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.STxsp9Ao3pS2T4gt",
      "id": "STxsp9Ao3pS2T4gt",
      "name": "Studded Leather Armor +1",
      "img": "icons/equipment/chest/breastplate-rivited-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.SXjs8JghAPBv7d6j",
      "id": "SXjs8JghAPBv7d6j",
      "name": "Dragon Slayer Longsword",
      "img": "icons/skills/melee/strike-axe-blood-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ScxK8YNU5dWELhlQ",
      "id": "ScxK8YNU5dWELhlQ",
      "name": "Ring of Force Resistance",
      "img": "icons/equipment/finger/ring-faceted-gold-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Sj4zEvuGcSV6anKm",
      "id": "Sj4zEvuGcSV6anKm",
      "name": "Heavy Crossbow +3",
      "img": "icons/weapons/crossbows/crossbow-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.SpbjbMMoJiva2zOa",
      "id": "SpbjbMMoJiva2zOa",
      "name": "Shortsword of Wounding",
      "img": "icons/magic/water/heart-ice-freeze.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.SqTtbBCfiEsmZ36N",
      "id": "SqTtbBCfiEsmZ36N",
      "name": "Bead of Force",
      "img": "icons/magic/water/orb-ice-opaque.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.SsAmWV6YBqeOFihT",
      "id": "SsAmWV6YBqeOFihT",
      "name": "Traveler's Clothes",
      "img": "icons/equipment/chest/shirt-collared-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.SuQmsJfxyJl2hPcM",
      "id": "SuQmsJfxyJl2hPcM",
      "name": "Whetstone",
      "img": "icons/commodities/stone/geode-raw-tan.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.Sx5E6utixHdAbGNb",
      "id": "Sx5E6utixHdAbGNb",
      "name": "Acid (vial)",
      "img": "icons/consumables/potions/bottle-round-corked-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.SypSoinJkES0o5FB",
      "id": "SypSoinJkES0o5FB",
      "name": "Glamoured Studded Leather",
      "img": "icons/equipment/chest/breastplate-rivited-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.SztwZhbhZeCqyAes",
      "id": "SztwZhbhZeCqyAes",
      "name": "Alchemist's Supplies",
      "img": "icons/tools/cooking/mortar-herbs-yellow.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.TIV3B1vbrVHIhQAm",
      "id": "TIV3B1vbrVHIhQAm",
      "name": "Studded Leather Armor",
      "img": "icons/equipment/chest/breastplate-rivited-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.TMqS62qjBCveT1Ss",
      "id": "TMqS62qjBCveT1Ss",
      "name": "Vicious Trident",
      "img": "icons/skills/melee/spear-tips-triple-orange.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.TWFS1BtruQeE10BY",
      "id": "TWFS1BtruQeE10BY",
      "name": "Stone of Controlling Earth Elementals",
      "img": "icons/commodities/treasure/token-runed-os-grey.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.TZggpdbOYqOCG7mY",
      "id": "TZggpdbOYqOCG7mY",
      "name": "Alchemy Jug",
      "img": "icons/containers/kitchenware/jug-terracotta-orange.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.TevMHicE3A70AlmP",
      "id": "TevMHicE3A70AlmP",
      "name": "Potion of Frost Giant Strength",
      "img": "icons/consumables/potions/bottle-round-corked-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.TjWk2mpNXjDdfIDM",
      "id": "TjWk2mpNXjDdfIDM",
      "name": "Carpet of Flying (6x9)",
      "img": "icons/equipment/back/cloak-hooded-pink.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.TmfaFUSZJAotndn9",
      "id": "TmfaFUSZJAotndn9",
      "name": "Saddlebags",
      "img": "icons/containers/bags/pack-leather-black-brown.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.Tobce1hexTnDk4sV",
      "id": "Tobce1hexTnDk4sV",
      "name": "Rapier",
      "img": "icons/weapons/swords/sword-guard-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.TqyvIglHDj5kfohR",
      "id": "TqyvIglHDj5kfohR",
      "name": "Piton",
      "img": "icons/tools/fasteners/nail-steel.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.TwYeck6buBZ602mg",
      "id": "TwYeck6buBZ602mg",
      "name": "Crystal Ball of Mind Reading",
      "img": "icons/commodities/gems/pearl-storm.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.U4PI6l96QJUk6TGb",
      "id": "U4PI6l96QJUk6TGb",
      "name": "Eyes of the Eagle",
      "img": "icons/magic/perception/hand-eye-pink.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.U5fRz04JWgNS1WvK",
      "id": "U5fRz04JWgNS1WvK",
      "name": "Hempen Rope (50 ft.)",
      "img": "icons/sundries/survival/rope-wrapped-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.U74TPNQLJZbHJyCk",
      "id": "U74TPNQLJZbHJyCk",
      "name": "Robe of Eyes",
      "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.UAXu4MNvAvaKz9JO",
      "id": "UAXu4MNvAvaKz9JO",
      "name": "Battleaxe +1",
      "img": "icons/weapons/polearms/halberd-crescent-engraved-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.UICmOXUKBmHp9o4y",
      "id": "UICmOXUKBmHp9o4y",
      "name": "Ink Bottle",
      "img": "icons/consumables/potions/bottle-bulb-empty-glass.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.ULL5nkyN3WzazI4l",
      "id": "ULL5nkyN3WzazI4l",
      "name": "Holy Avenger Scimitar",
      "img": "icons/skills/melee/weapons-crossed-swords-yellow-teal.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.UOE8RGOpgv2oWIvM",
      "id": "UOE8RGOpgv2oWIvM",
      "name": "Scholar's Pack",
      "img": "icons/containers/bags/pack-leather-strapped-tan.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.URun3vYrXKJJdAJe",
      "id": "URun3vYrXKJJdAJe",
      "name": "Staff of Striking",
      "img": "icons/weapons/staves/staff-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.UT8zCwmdXVQlBiyl",
      "id": "UT8zCwmdXVQlBiyl",
      "name": "Leather Armor +2",
      "img": "icons/equipment/chest/breastplate-scale-leather.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.UctSPehpKb4lJQGr",
      "id": "UctSPehpKb4lJQGr",
      "name": "Vicious Club",
      "img": "icons/weapons/clubs/club-simple-barbed.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.UgnUJhu0tW1tLt7g",
      "id": "UgnUJhu0tW1tLt7g",
      "name": "Feather Token Swan Boat",
      "img": "icons/commodities/materials/feather-blue-grey.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.UkWdyJYQTfVX2cJW",
      "id": "UkWdyJYQTfVX2cJW",
      "name": "Bullseye Lantern",
      "img": "icons/sundries/lights/lantern-iron-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.UpHAWqwifZpiZzns",
      "id": "UpHAWqwifZpiZzns",
      "name": "Adamantine Ring Mail",
      "img": "icons/equipment/chest/breastplate-banded-simple-leather-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.UrH3sMdnUDckIHJ6",
      "id": "UrH3sMdnUDckIHJ6",
      "name": "Flail",
      "img": "icons/weapons/maces/flail-studded-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Uv0ilmzbWvqmlCVH",
      "id": "Uv0ilmzbWvqmlCVH",
      "name": "Waterskin",
      "img": "icons/sundries/survival/wetskin-leather-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.UxkP6FvDzPbsIY6o",
      "id": "UxkP6FvDzPbsIY6o",
      "name": "Manual of Golems",
      "img": "icons/sundries/books/book-symbol-triangle-silver-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.V13fjV5oSmvbRdgP",
      "id": "V13fjV5oSmvbRdgP",
      "name": "Mess Kit",
      "img": "icons/tools/cooking/fork-steel-tan.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.V5UAjT3ed6sDNtgm",
      "id": "V5UAjT3ed6sDNtgm",
      "name": "Crowbar",
      "img": "icons/tools/hand/pickaxe-steel-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.VGtyTdVLoWls8FL5",
      "id": "VGtyTdVLoWls8FL5",
      "name": "Scimitar +1",
      "img": "icons/weapons/swords/sword-katana.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.VHYy3ZsJNPUo1SIx",
      "id": "VHYy3ZsJNPUo1SIx",
      "name": "Scimitar +2",
      "img": "icons/weapons/swords/sword-katana.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.VQ6NWjWV37wiB29O",
      "id": "VQ6NWjWV37wiB29O",
      "name": "Wand of Secrets",
      "img": "icons/weapons/staves/staff-simple-spiral-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.VQAUcjn1qdwW3MeU",
      "id": "VQAUcjn1qdwW3MeU",
      "name": "Vicious Light Crossbow",
      "img": "icons/weapons/crossbows/crossbow-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.VRT5GEusTFstOZdF",
      "id": "VRT5GEusTFstOZdF",
      "name": "Hide Armor of Resistance",
      "img": "icons/equipment/chest/vest-cloth-tattered-tan.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.VTc5McIjCm40KPIz",
      "id": "VTc5McIjCm40KPIz",
      "name": "Plate Armor +2",
      "img": "icons/equipment/chest/breastplate-collared-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Vm6SuX6TkDvSIVGr",
      "id": "Vm6SuX6TkDvSIVGr",
      "name": "Vicious Morningstar",
      "img": "icons/weapons/maces/mace-round-spiked-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.VmcgAIsRCyrjBguC",
      "id": "VmcgAIsRCyrjBguC",
      "name": "Restorative Ointment",
      "img": "icons/commodities/materials/liquid-orange.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.VwJjuNbBf2KHMPrY",
      "id": "VwJjuNbBf2KHMPrY",
      "name": "Cloak of Arachnida",
      "img": "icons/equipment/back/cloak-heavy-fur-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.W1kDsFekjroIywuz",
      "id": "W1kDsFekjroIywuz",
      "name": "Studded Leather Armor of Resistance",
      "img": "icons/equipment/chest/breastplate-rivited-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.WCafDVKITxwnlf2x",
      "id": "WCafDVKITxwnlf2x",
      "name": "Spyglass",
      "img": "icons/tools/navigation/spyglass-telescope-brass.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.WFQS2vT8ddrFjTJg",
      "id": "WFQS2vT8ddrFjTJg",
      "name": "Parchment",
      "img": "icons/sundries/scrolls/scroll-plain-tan.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.WLVQJVpCWiPkCAtZ",
      "id": "WLVQJVpCWiPkCAtZ",
      "name": "Staff of Healing",
      "img": "icons/weapons/staves/staff-simple-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.WNdN2mBF3O7ZNcMp",
      "id": "WNdN2mBF3O7ZNcMp",
      "name": "Spear +1",
      "img": "icons/weapons/polearms/spear-flared-worn-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.WO8DLfz3G2QZ5njs",
      "id": "WO8DLfz3G2QZ5njs",
      "name": "Ring of Acid Resistance",
      "img": "icons/equipment/finger/ring-band-engraved-scrolls-silver.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.WPWszFTGzmdIuDRJ",
      "id": "WPWszFTGzmdIuDRJ",
      "name": "Flask of Holy Water",
      "img": "icons/consumables/potions/bottle-round-empty-glass.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.WWb4vAmh18sMAxfY",
      "id": "WWb4vAmh18sMAxfY",
      "name": "Flame Tongue Greatsword",
      "img": "icons/magic/fire/projectile-bolt-zigzag-orange.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.WfqBg3yBNoJQtVEB",
      "id": "WfqBg3yBNoJQtVEB",
      "name": "Shield +3",
      "img": "icons/equipment/shield/heater-embossed-gold.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Wk7EOYoY3b2tgGoS",
      "id": "Wk7EOYoY3b2tgGoS",
      "name": "Deck of Illusions",
      "img": "icons/sundries/misc/admission-ticket-grey.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.WlPzuxaVnYzxzDEC",
      "id": "WlPzuxaVnYzxzDEC",
      "name": "Whip +2",
      "img": "icons/weapons/misc/whip-red-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.WnKWD1FuAFUE7f4v",
      "id": "WnKWD1FuAFUE7f4v",
      "name": "Tome of Understanding",
      "img": "icons/sundries/books/book-black-grey.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.Wo2Dkh191C4VmLmg",
      "id": "Wo2Dkh191C4VmLmg",
      "name": "Ring Mail Armor of Resistance",
      "img": "icons/equipment/chest/breastplate-banded-simple-leather-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Wv7HzD6dv1P0q78N",
      "id": "Wv7HzD6dv1P0q78N",
      "name": "Basket",
      "img": "icons/environment/traps/cage-simple-wood.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.WwdpHLXGX5r8uZu5",
      "id": "WwdpHLXGX5r8uZu5",
      "name": "Leather Armor",
      "img": "icons/equipment/chest/breastplate-scale-leather.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.X5knPtrQAT8GePJ4",
      "id": "X5knPtrQAT8GePJ4",
      "name": "Miner's Pick",
      "img": "icons/tools/hand/pickaxe-steel-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.X6PHssSGnwiJRgcx",
      "id": "X6PHssSGnwiJRgcx",
      "name": "Luck Blade Longsword",
      "img": "icons/magic/light/projectile-beam-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.XAr1SR4POx5BAArk",
      "id": "XAr1SR4POx5BAArk",
      "name": "Carpet of Flying (5x7)",
      "img": "icons/equipment/back/cloak-hooded-pink.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.XEH5YErAN1WSytln",
      "id": "XEH5YErAN1WSytln",
      "name": "Figurine of Wondrous Power (Serpentine Owl)",
      "img": "icons/commodities/materials/feather-white.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.XGAWqtmhK6SYBL6A",
      "id": "XGAWqtmhK6SYBL6A",
      "name": "Goggles of Night",
      "img": "icons/magic/control/hypnosis-mesmerism-eye.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.XIpJkxbySJxm6hoU",
      "id": "XIpJkxbySJxm6hoU",
      "name": "Light Hammer +2",
      "img": "icons/weapons/hammers/hammer-war-spiked.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.XJ8CG4UvLELCmOi2",
      "id": "XJ8CG4UvLELCmOi2",
      "name": "Ring of Lightning Resistance",
      "img": "icons/equipment/finger/ring-cabochon-gold-orange.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.XJFqU9COdk4ycFa2",
      "id": "XJFqU9COdk4ycFa2",
      "name": "Hide Armor +2",
      "img": "icons/equipment/chest/vest-cloth-tattered-tan.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.XKnDE8DTrJxIkVCF",
      "id": "XKnDE8DTrJxIkVCF",
      "name": "Padded Armor +3",
      "img": "icons/equipment/chest/breastplate-quilted-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.XVK6TOL4sGItssAE",
      "id": "XVK6TOL4sGItssAE",
      "name": "Light Hammer",
      "img": "icons/weapons/hammers/hammer-war-spiked.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.XXLznzi3rlanMhTM",
      "id": "XXLznzi3rlanMhTM",
      "name": "Crossbow Bolt +3",
      "img": "icons/weapons/ammunition/arrows-bodkin-yellow-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.XY8b594Dn7plACLL",
      "id": "XY8b594Dn7plACLL",
      "name": "Dungeoneer's Pack",
      "img": "icons/containers/bags/pack-leather-white-tan.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.XZWHQ20ynJBK6xmU",
      "id": "XZWHQ20ynJBK6xmU",
      "name": "Ring of Air Elemental Command",
      "img": "icons/equipment/finger/ring-cabochon-silver-gold-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Xbq8CyXSRV358SfP",
      "id": "Xbq8CyXSRV358SfP",
      "name": "Oil of Etherealness",
      "img": "icons/consumables/potions/bottle-conical-corked-labeled-shell-cyan.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.XdDp6CKh9qEvPTuS",
      "id": "XdDp6CKh9qEvPTuS",
      "name": "Spell Scroll 2nd Level",
      "img": "icons/sundries/scrolls/scroll-bound-gold-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.XmnlF5fgIO3tg6TG",
      "id": "XmnlF5fgIO3tg6TG",
      "name": "Scale Mail",
      "img": "icons/equipment/chest/breastplate-banded-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.XwqNHyox5OQQio8q",
      "id": "XwqNHyox5OQQio8q",
      "name": "Carpet of Flying (3x5)",
      "img": "icons/equipment/back/cloak-hooded-pink.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.Y08Al2dMN8he1hFK",
      "id": "Y08Al2dMN8he1hFK",
      "name": "Light Hammer +3",
      "img": "icons/weapons/hammers/hammer-war-spiked.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Y9S75go1hLMXUD48",
      "id": "Y9S75go1hLMXUD48",
      "name": "Brewer's Supplies",
      "img": "icons/consumables/plants/herb-marjoram-basil-oregano-leaf-bunch-green.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.YFarUKR3OrM5raf5",
      "id": "YFarUKR3OrM5raf5",
      "name": "Half Plate Armor +2",
      "img": "icons/equipment/chest/breastplate-cuirass-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.YG9QW0flem4SLL6A",
      "id": "YG9QW0flem4SLL6A",
      "name": "Bag of Devouring",
      "img": "icons/containers/bags/pouch-leather-pink.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.YHCmjsiXxZ9UdUhU",
      "id": "YHCmjsiXxZ9UdUhU",
      "name": "Navigator's Tools",
      "img": "icons/tools/navigation/sextant-brass-brown.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.YM4QueTsF3DL77mH",
      "id": "YM4QueTsF3DL77mH",
      "name": "Rations",
      "img": "icons/consumables/meat/hock-leg-pink-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.YM6bZNmpync83VFa",
      "id": "YM6bZNmpync83VFa",
      "name": "Giant Slayer Battleaxe",
      "img": "icons/weapons/polearms/halberd-curved-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.YS9CRHg2yQlOVi3j",
      "id": "YS9CRHg2yQlOVi3j",
      "name": "Mithral Chain Mail",
      "img": "icons/equipment/chest/breastplate-metal-scaled-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.YeLz5OxRNxmvHJId",
      "id": "YeLz5OxRNxmvHJId",
      "name": "Ioun Stone of Intellect",
      "img": "icons/commodities/stone/ore-pile-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.YevPP0DZXgAcLmzv",
      "id": "YevPP0DZXgAcLmzv",
      "name": "Rapier +3",
      "img": "icons/weapons/swords/sword-guard-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.YfBwELTgPFHmQdHh",
      "id": "YfBwELTgPFHmQdHh",
      "name": "Jeweler's Tools",
      "img": "icons/commodities/gems/gem-rough-rose-teal.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.YjImJ3cVnArHH4ES",
      "id": "YjImJ3cVnArHH4ES",
      "name": "Winged Boots",
      "img": "icons/equipment/feet/boots-collared-simple-leather.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.YrkkHa6KN8a9o35k",
      "id": "YrkkHa6KN8a9o35k",
      "name": "Defender Rapier",
      "img": "icons/weapons/polearms/spear-flared-silver-pink.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.YwS4pESpfsiq0JZv",
      "id": "YwS4pESpfsiq0JZv",
      "name": "Armor of Vulnerability",
      "img": "icons/equipment/chest/breastplate-collared-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.YwlHI3BVJapz4a3E",
      "id": "YwlHI3BVJapz4a3E",
      "name": "Playing Cards Set",
      "img": "icons/sundries/gaming/playing-cards.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.Z0eO3TTpYA2hjwdd",
      "id": "Z0eO3TTpYA2hjwdd",
      "name": "Vicious Shortbow",
      "img": "icons/weapons/bows/shortbow-recurve.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Z7xno2zMzRtqqUIQ",
      "id": "Z7xno2zMzRtqqUIQ",
      "name": "Vicious Quarterstaff",
      "img": "icons/weapons/staves/staff-simple-gold.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.Z9FBwEoMi6daDGRj",
      "id": "Z9FBwEoMi6daDGRj",
      "name": "Flame Tongue Shortsword",
      "img": "icons/magic/fire/projectile-bolt-zigzag-orange.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ZKyhkS8ud2NpV7ng",
      "id": "ZKyhkS8ud2NpV7ng",
      "name": "Scimitar of Sharpness",
      "img": "icons/skills/wounds/bone-broken-knee-beam.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ZLpj1bpnWlAFUEHE",
      "id": "ZLpj1bpnWlAFUEHE",
      "name": "Giant Slayer Scimitar",
      "img": "icons/weapons/swords/sword-guard-serrated.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ZYEqOSY9BLZs2GPx",
      "id": "ZYEqOSY9BLZs2GPx",
      "name": "Bracers of Archery",
      "img": "icons/equipment/wrist/bracer-studded-leather-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.ZcvU9rRb573NOywv",
      "id": "ZcvU9rRb573NOywv",
      "name": "Longbow +2",
      "img": "icons/weapons/bows/longbow-leather-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ZdcEtbtU3VkuxIFE",
      "id": "ZdcEtbtU3VkuxIFE",
      "name": "Brooch of Shielding",
      "img": "icons/equipment/neck/pendant-bronze-gem-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.Zf7kBZa5f4WBepn1",
      "id": "Zf7kBZa5f4WBepn1",
      "name": "Ring of Earth Elemental Command",
      "img": "icons/equipment/finger/ring-band-engraved-scrolls-silver.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.ZgXJE9pjvZLMCeHg",
      "id": "ZgXJE9pjvZLMCeHg",
      "name": "Slippers of Spider Climbing",
      "img": "icons/commodities/materials/material-webbing.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.ZjUOHSyND2VFXQeP",
      "id": "ZjUOHSyND2VFXQeP",
      "name": "Crossbow Bolt +1",
      "img": "icons/weapons/ammunition/arrows-bodkin-yellow-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.ZoUVmRA3HfAK2eZy",
      "id": "ZoUVmRA3HfAK2eZy",
      "name": "Candle of Invocation",
      "img": "icons/sundries/lights/candle-unlit-grey.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.ZwFCZDgQljlidzns",
      "id": "ZwFCZDgQljlidzns",
      "name": "Leather Armor +3",
      "img": "icons/equipment/chest/breastplate-scale-leather.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.a26LjC4QxP1oorXC",
      "id": "a26LjC4QxP1oorXC",
      "name": "Headband of Intellect",
      "img": "icons/equipment/finger/ring-cabochon-silver-gold-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.a86F565Pjdzym1jH",
      "id": "a86F565Pjdzym1jH",
      "name": "Truth Serum",
      "img": "icons/consumables/potions/bottle-bulb-corked-labeled-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.a8fe9d81BRW86cvP",
      "id": "a8fe9d81BRW86cvP",
      "name": "Waterskin",
      "img": "icons/sundries/survival/wetskin-leather-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.aA7MbjnpHYoYvmuW",
      "id": "aA7MbjnpHYoYvmuW",
      "name": "Ring of Swimming",
      "img": "icons/equipment/finger/ring-cabochon-notched-gold-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.aDEAwKwttl35dWaB",
      "id": "aDEAwKwttl35dWaB",
      "name": "Scale Mail +1",
      "img": "icons/equipment/chest/breastplate-banded-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.aDHRuUs29SrumWfq",
      "id": "aDHRuUs29SrumWfq",
      "name": "Bag of Holding",
      "img": "icons/containers/bags/pouch-leather-pink.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.aEiM49V8vWpWw7rU",
      "id": "aEiM49V8vWpWw7rU",
      "name": "Net",
      "img": "icons/tools/fishing/net-gold.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.aMnWi1WXWpxRHq4r",
      "id": "aMnWi1WXWpxRHq4r",
      "name": "Potion of Climbing",
      "img": "icons/consumables/potions/potion-vial-corked-labeled-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.aOrinPg7yuDZEuWr",
      "id": "aOrinPg7yuDZEuWr",
      "name": "Spell Scroll 8th Level",
      "img": "icons/sundries/scrolls/scroll-bound-sealed-red-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.aXsfZvDCdpuv3Yvb",
      "id": "aXsfZvDCdpuv3Yvb",
      "name": "Arrow of Slaying",
      "img": "icons/weapons/ammunition/arrow-head-war-flight.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.aa9KuBy4dst7WIW9",
      "id": "aa9KuBy4dst7WIW9",
      "name": "Horn",
      "img": "icons/tools/instruments/flute-simple-wood.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.ac8IamT5vDrH1ZT8",
      "id": "ac8IamT5vDrH1ZT8",
      "name": "Alms Box",
      "img": "icons/sundries/misc/piggybank.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.akjpaK4TYkUZbGrN",
      "id": "akjpaK4TYkUZbGrN",
      "name": "Chain Mail +2",
      "img": "icons/equipment/chest/breastplate-metal-scaled-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.amRx3jOYlPeXEiAN",
      "id": "amRx3jOYlPeXEiAN",
      "name": "Light Crossbow +3",
      "img": "icons/weapons/crossbows/crossbow-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ap9prThUB2y9lDyj",
      "id": "ap9prThUB2y9lDyj",
      "name": "Weaver's Tools",
      "img": "icons/equipment/back/cloak-hooded-pink.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.asUgQFrF1xYeNhtW",
      "id": "asUgQFrF1xYeNhtW",
      "name": "Sickle +1",
      "img": "icons/weapons/sickles/sickle-curved.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.azxwKFHrNmG3HpVy",
      "id": "azxwKFHrNmG3HpVy",
      "name": "Plate Armor of Resistance",
      "img": "icons/equipment/chest/breastplate-collared-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.b2l2ubCGSnmiTrm8",
      "id": "b2l2ubCGSnmiTrm8",
      "name": "Shortsword +2",
      "img": "icons/weapons/swords/sword-guard-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.b46t42bMruQf9v3O",
      "id": "b46t42bMruQf9v3O",
      "name": "Mace of Terror",
      "img": "icons/weapons/maces/mace-round-spiked-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.bAyr7j5Peq9wIJTa",
      "id": "bAyr7j5Peq9wIJTa",
      "name": "Potion of Clairvoyance",
      "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.bDZFQqLQE73cFB8c",
      "id": "bDZFQqLQE73cFB8c",
      "name": "Hempen Rope (50 ft.)",
      "img": "icons/sundries/survival/rope-wrapped-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.bEZOY6uvHRweMM56",
      "id": "bEZOY6uvHRweMM56",
      "name": "Potion of Fire Giant Strength",
      "img": "icons/consumables/potions/bottle-round-corked-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.bHbbIhbTzu4lYMRz",
      "id": "bHbbIhbTzu4lYMRz",
      "name": "Holy Avenger Shortsword",
      "img": "icons/skills/melee/weapons-crossed-swords-yellow-teal.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.bPFVfq81EsMNu6OQ",
      "id": "bPFVfq81EsMNu6OQ",
      "name": "Wand of Lightning Bolts",
      "img": "icons/weapons/staves/staff-ornate-engraved-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.bWI5i4RbyGKT6Eiq",
      "id": "bWI5i4RbyGKT6Eiq",
      "name": "Dagger +3",
      "img": "icons/weapons/daggers/dagger-jeweled-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.baoe3U5BfMMMxhCU",
      "id": "baoe3U5BfMMMxhCU",
      "name": "Viol",
      "img": "icons/tools/instruments/lute-gold-brown.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.bcv7J9culilK68zp",
      "id": "bcv7J9culilK68zp",
      "name": "Longsword +2",
      "img": "icons/weapons/swords/greatsword-crossguard-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.bod1dKzbAkAm21Ho",
      "id": "bod1dKzbAkAm21Ho",
      "name": "Staff of Swarming Insects",
      "img": "icons/weapons/staves/staff-simple-spiral-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.bq9YKwEHLQ7p7ric",
      "id": "bq9YKwEHLQ7p7ric",
      "name": "Belt of Fire Giant Strength",
      "img": "icons/equipment/waist/belt-coiled-leather-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.bqZ6NTLDCUB98YjV",
      "id": "bqZ6NTLDCUB98YjV",
      "name": "Potion of Gaseous Form",
      "img": "icons/consumables/potions/potion-bottle-skull-label-poison-teal.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.c0luemOP0iW8L23R",
      "id": "c0luemOP0iW8L23R",
      "name": "Potion of Psychic Resistance",
      "img": "icons/consumables/potions/bottle-round-corked-pink.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.cG3m4YlHfbQlLEOx",
      "id": "cG3m4YlHfbQlLEOx",
      "name": "Forgery Kit",
      "img": "icons/sundries/documents/envelope-sealed-red-tan.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.cGUPm15mLfhGDz2b",
      "id": "cGUPm15mLfhGDz2b",
      "name": "Dust of Disappearance",
      "img": "icons/magic/water/bubbles-air-water-light.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.cI0UhWUux8gIzSHn",
      "id": "cI0UhWUux8gIzSHn",
      "name": "Chain Shirt +3",
      "img": "icons/equipment/chest/breastplate-scale-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.cKpJmsJmU8YaiuqG",
      "id": "cKpJmsJmU8YaiuqG",
      "name": "Splint Armor",
      "img": "icons/equipment/chest/breastplate-layered-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.cQ94oKUZN8FDAI8U",
      "id": "cQ94oKUZN8FDAI8U",
      "name": "Battleaxe +2",
      "img": "icons/weapons/polearms/halberd-crescent-engraved-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.caEn3ixCUFBnHTx6",
      "id": "caEn3ixCUFBnHTx6",
      "name": "Staff of the Woodlands",
      "img": "icons/weapons/staves/staff-simple-spiral-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ccm5xlWhx74d6lsK",
      "id": "ccm5xlWhx74d6lsK",
      "name": "Painter's Supplies",
      "img": "icons/tools/hand/brush-paint-brown-tan.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.cmnBssaWWzWWm70C",
      "id": "cmnBssaWWzWWm70C",
      "name": "Handaxe +3",
      "img": "icons/weapons/axes/axe-broad-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ctKfjHjk9gs9UtZI",
      "id": "ctKfjHjk9gs9UtZI",
      "name": "Potion of Speed",
      "img": "icons/consumables/potions/potion-bottle-corked-fancy-orange.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.d58CvI0Fiav9Jjt1",
      "id": "d58CvI0Fiav9Jjt1",
      "name": "Defender Shortsword",
      "img": "icons/weapons/polearms/spear-flared-silver-pink.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.d5HNCmLIPCpPoX2w",
      "id": "d5HNCmLIPCpPoX2w",
      "name": "Rod of Lordly Might",
      "img": "icons/skills/melee/hand-grip-staff-yellow-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.dG7iFak1YH1nXRpC",
      "id": "dG7iFak1YH1nXRpC",
      "name": "Vicious Battleaxe",
      "img": "icons/weapons/polearms/halberd-crescent-engraved-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.dGnkwePemh7ovuDv",
      "id": "dGnkwePemh7ovuDv",
      "name": "Ring of Mind Shielding",
      "img": "icons/equipment/finger/ring-cabochon-gold-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.dJjdWdaZU30r1zx4",
      "id": "dJjdWdaZU30r1zx4",
      "name": "Plate Armor of Etherealness",
      "img": "icons/equipment/chest/breastplate-collared-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.dOZkW5MwvsMhnd08",
      "id": "dOZkW5MwvsMhnd08",
      "name": "Half Plate Armor +1",
      "img": "icons/equipment/chest/breastplate-cuirass-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.dP7jMKyHTTgVb3ii",
      "id": "dP7jMKyHTTgVb3ii",
      "name": "Ink Bottle",
      "img": "icons/consumables/potions/bottle-bulb-empty-glass.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.dQxqcjDm0IxYusCV",
      "id": "dQxqcjDm0IxYusCV",
      "name": "Hat of Disguise",
      "img": "icons/magic/control/silhouette-hold-change-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.dRtb9Tg34NKX9mGF",
      "id": "dRtb9Tg34NKX9mGF",
      "name": "Leather Armor of Resistance",
      "img": "icons/equipment/chest/breastplate-scale-leather.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.dX8AxCh9o0A9CkT3",
      "id": "dX8AxCh9o0A9CkT3",
      "name": "Morningstar",
      "img": "icons/weapons/maces/mace-round-spiked-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.dXtZxlh2VKLCo1nA",
      "id": "dXtZxlh2VKLCo1nA",
      "name": "Leather Armor +1",
      "img": "icons/equipment/chest/breastplate-scale-leather.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.dZ9zWfhsIlabadKL",
      "id": "dZ9zWfhsIlabadKL",
      "name": "Holy Avenger Longsword",
      "img": "icons/skills/melee/weapons-crossed-swords-yellow-teal.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ddWvQRLmnnIS0eLF",
      "id": "ddWvQRLmnnIS0eLF",
      "name": "Light Crossbow",
      "img": "icons/weapons/crossbows/crossbow-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.dghpiMWDSUXtQf6X",
      "id": "dghpiMWDSUXtQf6X",
      "name": "Morningstar +3",
      "img": "icons/weapons/maces/mace-round-spiked-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.dsjke4vPPsc9gsxH",
      "id": "dsjke4vPPsc9gsxH",
      "name": "Elemental Gem of Fire",
      "img": "icons/commodities/gems/gem-rough-cushion-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.ducaFdrqwLZ0l3c7",
      "id": "ducaFdrqwLZ0l3c7",
      "name": "Flame Tongue Longsword",
      "img": "icons/magic/fire/projectile-bolt-zigzag-orange.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.dvNzJqb7vq6oJlA2",
      "id": "dvNzJqb7vq6oJlA2",
      "name": "Berserker Battleaxe",
      "img": "icons/weapons/polearms/halberd-crescent-engraved-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.dwGxrGqkn2ppNaqs",
      "id": "dwGxrGqkn2ppNaqs",
      "name": "Greatclub +1",
      "img": "icons/weapons/maces/mace-spiked-steel-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.e3XQygrXkzNvkDGF",
      "id": "e3XQygrXkzNvkDGF",
      "name": "Marvelous Pigments",
      "img": "icons/commodities/materials/powder-red-green-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.e7JpVX2549vp9mgF",
      "id": "e7JpVX2549vp9mgF",
      "name": "Vicious Spear",
      "img": "icons/weapons/polearms/spear-flared-worn-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.e98hfROZjztt7ccO",
      "id": "e98hfROZjztt7ccO",
      "name": "Feather Token Fan",
      "img": "icons/commodities/materials/feather-colored-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.eHGbr3rqRRxdBPLq",
      "id": "eHGbr3rqRRxdBPLq",
      "name": "Chain Mail +3",
      "img": "icons/equipment/chest/breastplate-metal-scaled-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.eJOrPcAz9EcquyRQ",
      "id": "eJOrPcAz9EcquyRQ",
      "name": "Flute",
      "img": "icons/tools/instruments/flute-simple-wood.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.eJY20LOs3pOkRDPl",
      "id": "eJY20LOs3pOkRDPl",
      "name": "Block of Incense",
      "img": "icons/commodities/stone/rock-chunk-pumice-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.eJtPBiZtr2pp6ynt",
      "id": "eJtPBiZtr2pp6ynt",
      "name": "Crossbow Bolt Case",
      "img": "icons/containers/ammunition/arrows-quiver-black.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.eKip69fExSYN661B",
      "id": "eKip69fExSYN661B",
      "name": "Vicious Glaive",
      "img": "icons/weapons/polearms/halberd-crescent-glowing.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.eM5gEe4SEOvA2Y9t",
      "id": "eM5gEe4SEOvA2Y9t",
      "name": "Staff of Power",
      "img": "icons/weapons/staves/staff-skull-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.eMR6B4bIoJPUDJG8",
      "id": "eMR6B4bIoJPUDJG8",
      "name": "Dust of Dryness",
      "img": "icons/magic/air/air-wave-gust-smoke-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.eO7Fbv5WBk5zvGOc",
      "id": "eO7Fbv5WBk5zvGOc",
      "name": "Handaxe",
      "img": "icons/weapons/axes/axe-broad-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.eQNXan0zp279jDtk",
      "id": "eQNXan0zp279jDtk",
      "name": "Immovable Rod",
      "img": "icons/magic/symbols/runes-etched-steel-blade.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.eQTKbhnpkrtXUfwN",
      "id": "eQTKbhnpkrtXUfwN",
      "name": "Ladder (10-foot)",
      "img": "icons/sundries/misc/ladder-improvised.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.eTNc8XPtvZNe3yQs",
      "id": "eTNc8XPtvZNe3yQs",
      "name": "Potion of Flying",
      "img": "icons/consumables/potions/potion-tube-corked-bat-gold-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.eVbPkYjpl29RE2uW",
      "id": "eVbPkYjpl29RE2uW",
      "name": "Basic Poison",
      "img": "icons/consumables/potions/potion-bottle-skull-label-poison-teal.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.eZGmdOhaTWMicXPW",
      "id": "eZGmdOhaTWMicXPW",
      "name": "Component Pouch",
      "img": "icons/containers/bags/pack-simple-leather-tan.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.ea4xclqsksEQB1QF",
      "id": "ea4xclqsksEQB1QF",
      "name": "Abacus",
      "img": "icons/commodities/treasure/broach-jewel-gold-blue.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.ecz2fVDyAg8YgJGe",
      "id": "ecz2fVDyAg8YgJGe",
      "name": "Pack Saddle",
      "img": "icons/equipment/shoulder/shoulderpad-fur-leather.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.efluRemOguW2YeZY",
      "id": "efluRemOguW2YeZY",
      "name": "Frost Brand Rapier",
      "img": "icons/skills/melee/strike-weapon-polearm-ice-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.egJhGFU3v5OfjPNS",
      "id": "egJhGFU3v5OfjPNS",
      "name": "Shortbow +3",
      "img": "icons/weapons/bows/shortbow-recurve.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ejEt6hLQxOux04lS",
      "id": "ejEt6hLQxOux04lS",
      "name": "Demon Armor",
      "img": "icons/equipment/chest/breastplate-layered-leather-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.etA2SBgWwduCLgLT",
      "id": "etA2SBgWwduCLgLT",
      "name": "Ring of Shooting Stars",
      "img": "icons/equipment/finger/ring-cabochon-gold-orange.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.evSCq83oPhR0ZK4y",
      "id": "evSCq83oPhR0ZK4y",
      "name": "Armor of Invulnerability",
      "img": "icons/equipment/chest/breastplate-collared-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.ewXgnWiYQhS8KArS",
      "id": "ewXgnWiYQhS8KArS",
      "name": "Ring of Three Wishes",
      "img": "icons/equipment/finger/ring-cabochon-gold-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.f0I81P9k29Q1lV4S",
      "id": "f0I81P9k29Q1lV4S",
      "name": "Scale Mail Armor of Resistance",
      "img": "icons/equipment/chest/breastplate-banded-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.f3eF8EYq1rkqFwDP",
      "id": "f3eF8EYq1rkqFwDP",
      "name": "Bag of Sand",
      "img": "icons/containers/bags/coinpouch-simple-leather-silver-brown.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.f4w4GxBi0nYXmhX4",
      "id": "f4w4GxBi0nYXmhX4",
      "name": "Rations",
      "img": "icons/consumables/meat/hock-leg-pink-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.f5chGcpQCi1HYPQw",
      "id": "f5chGcpQCi1HYPQw",
      "name": "Potion of Poison Resistance",
      "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.fC0lFK8P4RuhpfaU",
      "id": "fC0lFK8P4RuhpfaU",
      "name": "Cartographer's Tools",
      "img": "icons/tools/navigation/map-chart-tan.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.fCRftM4QxEDkeu0a",
      "id": "fCRftM4QxEDkeu0a",
      "name": "Club +1",
      "img": "icons/weapons/clubs/club-simple-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.fCUZ7h8YYrs16UhX",
      "id": "fCUZ7h8YYrs16UhX",
      "name": "Belt of Stone Giant Strength",
      "img": "icons/equipment/waist/belt-armored-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.fNMkFCOvMiW2Rh3t",
      "id": "fNMkFCOvMiW2Rh3t",
      "name": "Paper",
      "img": "icons/sundries/documents/paper-plain-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.fO1PuSOtZWLzEHqu",
      "id": "fO1PuSOtZWLzEHqu",
      "name": "Scale Mail +2",
      "img": "icons/equipment/chest/breastplate-banded-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.fStHPOhuJvwEjzQh",
      "id": "fStHPOhuJvwEjzQh",
      "name": "Plate Armor +1",
      "img": "icons/equipment/chest/breastplate-collared-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.fWR9EFEjR0JtFdCC",
      "id": "fWR9EFEjR0JtFdCC",
      "name": "Luck Blade Greatsword",
      "img": "icons/magic/light/projectile-beam-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.fbC0Mg1a73wdFbqO",
      "id": "fbC0Mg1a73wdFbqO",
      "name": "Scimitar",
      "img": "icons/weapons/swords/sword-katana.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.fbcQsOgWCjhEAGY7",
      "id": "fbcQsOgWCjhEAGY7",
      "name": "Efreeti Bottle",
      "img": "icons/consumables/potions/potion-flask-corked-orange.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.feKHv3JUWZdSNKf0",
      "id": "feKHv3JUWZdSNKf0",
      "name": "Dragon Slayer Scimitar",
      "img": "icons/skills/melee/strike-axe-blood-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.fu7DJcrYWfGMeVt9",
      "id": "fu7DJcrYWfGMeVt9",
      "name": "Blowgun +2",
      "img": "icons/commodities/tech/pipe-metal.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.fvezXwRJ5PqUf5NN",
      "id": "fvezXwRJ5PqUf5NN",
      "name": "Ring of Cold Resistance",
      "img": "icons/equipment/finger/ring-faceted-silver-orange.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.g2dWN7PQiMRYWzyk",
      "id": "g2dWN7PQiMRYWzyk",
      "name": "Quarterstaff",
      "img": "icons/weapons/staves/staff-simple-gold.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.g8DG0jXlvfP3uTtZ",
      "id": "g8DG0jXlvfP3uTtZ",
      "name": "Vicious War Pick",
      "img": "icons/weapons/axes/pickaxe-double-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.g8fQZ1WyTz2bTtvA",
      "id": "g8fQZ1WyTz2bTtvA",
      "name": "Alms Box",
      "img": "icons/sundries/misc/piggybank.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.gBQ8xqTA5f8wP5iu",
      "id": "gBQ8xqTA5f8wP5iu",
      "name": "Blowgun Needle",
      "img": "icons/weapons/ammunition/arrows-war-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.gLkbbUtGhQgYANM8",
      "id": "gLkbbUtGhQgYANM8",
      "name": "Arrow +2",
      "img": "icons/weapons/ammunition/arrow-head-war.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.gP1URGq3kVIIFHJ7",
      "id": "gP1URGq3kVIIFHJ7",
      "name": "Reliquary",
      "img": "icons/containers/chest/chest-reinforced-steel-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.gSwpQacBLOJeLWrK",
      "id": "gSwpQacBLOJeLWrK",
      "name": "Vicious Mace",
      "img": "icons/weapons/maces/mace-round-spiked-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.gTRFQLdVD1gsKtPi",
      "id": "gTRFQLdVD1gsKtPi",
      "name": "Potion of Growth",
      "img": "icons/consumables/potions/potion-tube-corked-glowing-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.gV671PZGnYoVZefN",
      "id": "gV671PZGnYoVZefN",
      "name": "Javelin +2",
      "img": "icons/weapons/ammunition/arrows-bodkin-yellow-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.gVo3UbvwjFIiFR0c",
      "id": "gVo3UbvwjFIiFR0c",
      "name": "Vicious Longbow",
      "img": "icons/weapons/bows/longbow-leather-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.gYDMk3LWikIP5PmA",
      "id": "gYDMk3LWikIP5PmA",
      "name": "Shortbow +1",
      "img": "icons/weapons/bows/shortbow-recurve.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.giU3yyZXvErjf78D",
      "id": "giU3yyZXvErjf78D",
      "name": "Dart +1",
      "img": "icons/weapons/ammunition/arrows-war-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.gpHgWLsD8k2yzbfR",
      "id": "gpHgWLsD8k2yzbfR",
      "name": "Cape of the Mountebank",
      "img": "icons/equipment/back/cloak-heavy-fur-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.gwuffGC4JZ8BbStz",
      "id": "gwuffGC4JZ8BbStz",
      "name": "Berserker Handaxe",
      "img": "icons/weapons/polearms/halberd-crescent-engraved-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.gyJ0imAckcWtCjyv",
      "id": "gyJ0imAckcWtCjyv",
      "name": "Club +2",
      "img": "icons/weapons/clubs/club-simple-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.h0XLhuUQ0vSnW3DU",
      "id": "h0XLhuUQ0vSnW3DU",
      "name": "Vicious Rapier",
      "img": "icons/weapons/swords/sword-guard-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.h8rS84jKsMHl9J1i",
      "id": "h8rS84jKsMHl9J1i",
      "name": "Ioun Stone of Awareness",
      "img": "icons/commodities/gems/gem-rough-cushion-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.hDF4RSCzMO8iI14x",
      "id": "hDF4RSCzMO8iI14x",
      "name": "Ioun Stone of Leadership",
      "img": "icons/commodities/stone/ore-pile-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.hFAVm9pTJDm0nu3g",
      "id": "hFAVm9pTJDm0nu3g",
      "name": "Broom of Flying",
      "img": "icons/skills/melee/hand-grip-staff-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.hGrxC676XmlnS9y0",
      "id": "hGrxC676XmlnS9y0",
      "name": "Cloak of the Manta Ray",
      "img": "icons/equipment/back/cloak-heavy-fur-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.hHX5qXva1ScCpBpL",
      "id": "hHX5qXva1ScCpBpL",
      "name": "Net +2",
      "img": "icons/tools/fishing/net-gold.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.hJS8yEVkqgJjwfWa",
      "id": "hJS8yEVkqgJjwfWa",
      "name": "Potter's Tools",
      "img": "icons/containers/kitchenware/vase-bottle-brown.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.hM84pZnpCqKfi8XH",
      "id": "hM84pZnpCqKfi8XH",
      "name": "Cobbler's Tools",
      "img": "icons/tools/hand/awl-steel-tan.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.hOzuSDqmOIOx8z3Z",
      "id": "hOzuSDqmOIOx8z3Z",
      "name": "Fishing Tackle",
      "img": "icons/tools/fishing/hook-curved-barbed-steel-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.hSY1b8yi8JWw2blf",
      "id": "hSY1b8yi8JWw2blf",
      "name": "Boots of Striding and Springing",
      "img": "icons/equipment/feet/boots-collared-rounded-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.hWqImieUaLo08l9l",
      "id": "hWqImieUaLo08l9l",
      "name": "Feather Token Bird",
      "img": "icons/commodities/materials/feather-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.hdUzXzVPonOQzW81",
      "id": "hdUzXzVPonOQzW81",
      "name": "Greataxe +2",
      "img": "icons/weapons/axes/axe-double.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.hdlBOEbEjiwUjTW5",
      "id": "hdlBOEbEjiwUjTW5",
      "name": "Ring of Djinni Summoning",
      "img": "icons/equipment/finger/ring-faceted-gold-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.hf5j1meGsA33HkUj",
      "id": "hf5j1meGsA33HkUj",
      "name": "Mirror of Life Trapping",
      "img": "icons/magic/air/wind-vortex-swirl-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.hqVKZie7x9w3Kqds",
      "id": "hqVKZie7x9w3Kqds",
      "name": "Spell Scroll 3rd Level",
      "img": "icons/sundries/scrolls/scroll-bound-gold-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.hxfOtvFrY1PXHQN1",
      "id": "hxfOtvFrY1PXHQN1",
      "name": "Ring of Telekinesis",
      "img": "icons/equipment/finger/ring-inlay-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.i2puCDRaTxkuFfB4",
      "id": "i2puCDRaTxkuFfB4",
      "name": "Ring of Free Action",
      "img": "icons/equipment/finger/ring-cabochon-notched-gold-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.i3njMqHc689GvHDn",
      "id": "i3njMqHc689GvHDn",
      "name": "Ring of X-ray Vision",
      "img": "icons/equipment/finger/ring-eye-silver-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.i4NeNZ30ycwPDHMx",
      "id": "i4NeNZ30ycwPDHMx",
      "name": "Sickle",
      "img": "icons/weapons/sickles/sickle-curved.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.i89okN7GFTWHsvPy",
      "id": "i89okN7GFTWHsvPy",
      "name": "Herbalism Kit",
      "img": "icons/containers/bags/pouch-leather-green.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.iB3gunzgxZ8xK6Z5",
      "id": "iB3gunzgxZ8xK6Z5",
      "name": "Talisman of Pure Good",
      "img": "icons/magic/life/ankh-gold-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.iBuTM09KD9IoM5L8",
      "id": "iBuTM09KD9IoM5L8",
      "name": "Dice Set",
      "img": "icons/sundries/gaming/dice-runed-brown.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.iIuNqnpWCHrLEKWj",
      "id": "iIuNqnpWCHrLEKWj",
      "name": "Net +3",
      "img": "icons/tools/fishing/net-gold.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.iLt7wTWr4cJnQulJ",
      "id": "iLt7wTWr4cJnQulJ",
      "name": "Figurine of Wondrous Power (Ivory Goat of Traveling)",
      "img": "icons/commodities/bones/hooves-cloven-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.iOMRrzfzFCfPGuD6",
      "id": "iOMRrzfzFCfPGuD6",
      "name": "Bag of Sand",
      "img": "icons/containers/bags/coinpouch-simple-leather-silver-brown.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.iRDmig2qZ7LdP0ug",
      "id": "iRDmig2qZ7LdP0ug",
      "name": "Mithral Scale Mail",
      "img": "icons/equipment/chest/breastplate-banded-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.idtlcnIWgwVdvp31",
      "id": "idtlcnIWgwVdvp31",
      "name": "Javelin +1",
      "img": "icons/weapons/ammunition/arrows-bodkin-yellow-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ig5DOQtQYJPXJId4",
      "id": "ig5DOQtQYJPXJId4",
      "name": "Ioun Stone of Fortitude",
      "img": "icons/commodities/gems/gem-rough-cushion-purple-pink.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.iiQxTvDOhPGW5spF",
      "id": "iiQxTvDOhPGW5spF",
      "name": "Amulet of Health",
      "img": "icons/equipment/neck/pendant-faceted-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.ijDzcDXfJAdj2uED",
      "id": "ijDzcDXfJAdj2uED",
      "name": "Heavy Crossbow +1",
      "img": "icons/weapons/crossbows/crossbow-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.il2GNi8C0DvGLL9P",
      "id": "il2GNi8C0DvGLL9P",
      "name": "Poisoner's Kit",
      "img": "icons/containers/bags/pouch-gold-green.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.irtqrzaUCeshmTZp",
      "id": "irtqrzaUCeshmTZp",
      "name": "Vestments",
      "img": "icons/equipment/back/mantle-collared-black.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.isKR904LkLaH4i6M",
      "id": "isKR904LkLaH4i6M",
      "name": "Vicious Halberd",
      "img": "icons/weapons/polearms/halberd-crescent-glowing.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.izF3kmyFEVI5TWhp",
      "id": "izF3kmyFEVI5TWhp",
      "name": "Dart +3",
      "img": "icons/weapons/ammunition/arrows-war-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.j01YDOu2AolsRvdN",
      "id": "j01YDOu2AolsRvdN",
      "name": "Oil Flask",
      "img": "icons/consumables/potions/bottle-bulb-empty-glass.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.j2ZGEwx8MhHZXds4",
      "id": "j2ZGEwx8MhHZXds4",
      "name": "Belt of Dwarvenkind",
      "img": "icons/equipment/waist/belt-armored-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.jDTM1RjtZMu9YYL9",
      "id": "jDTM1RjtZMu9YYL9",
      "name": "Oil Flask",
      "img": "icons/consumables/potions/bottle-bulb-empty-glass.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.jJU8vFhHLQeKe2wu",
      "id": "jJU8vFhHLQeKe2wu",
      "name": "Gem of Seeing",
      "img": "icons/commodities/gems/gem-rough-rose-teal.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.jcQqI0pxLD2nNNQ4",
      "id": "jcQqI0pxLD2nNNQ4",
      "name": "Whip +3",
      "img": "icons/weapons/misc/whip-red-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.jeoZmDD9fuQdvC77",
      "id": "jeoZmDD9fuQdvC77",
      "name": "Vicious Dart",
      "img": "icons/weapons/ammunition/arrows-war-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.jf0XMx2vfEZzZuD7",
      "id": "jf0XMx2vfEZzZuD7",
      "name": "Mace +1",
      "img": "icons/weapons/maces/mace-flanged-steel-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.jhjo20QoiD5exf09",
      "id": "jhjo20QoiD5exf09",
      "name": "Calligrapher's Supplies",
      "img": "icons/tools/scribal/pen-steel-grey-brown.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.jlI44g90pp4VazBU",
      "id": "jlI44g90pp4VazBU",
      "name": "Block and Tackle",
      "img": "icons/weapons/sickles/sickle-hooked-wood.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.jmSC8I5awCoxNVv7",
      "id": "jmSC8I5awCoxNVv7",
      "name": "Giant Slayer Greataxe",
      "img": "icons/weapons/axes/axe-double.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.jvKmgJYL33E8gev5",
      "id": "jvKmgJYL33E8gev5",
      "name": "Ioun Stone of Reserve",
      "img": "icons/commodities/gems/gem-rough-cushion-purple-pink.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.k2B9P3gm2NGjJ1m0",
      "id": "k2B9P3gm2NGjJ1m0",
      "name": "Hide Armor +1",
      "img": "icons/equipment/chest/vest-cloth-tattered-tan.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.k3T7tpcdzDyVKlF4",
      "id": "k3T7tpcdzDyVKlF4",
      "name": "Wand of the War Mage +2",
      "img": "icons/weapons/staves/staff-engraved-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.kBVK2IiZYRkEYtcM",
      "id": "kBVK2IiZYRkEYtcM",
      "name": "Greatsword +1",
      "img": "icons/weapons/swords/greatsword-guard-gem-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.kHjpHTKex95ULxUX",
      "id": "kHjpHTKex95ULxUX",
      "name": "Light Crossbow +1",
      "img": "icons/weapons/crossbows/crossbow-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.kKGJjVVlJVoakWgQ",
      "id": "kKGJjVVlJVoakWgQ",
      "name": "Potion of Force Resistance",
      "img": "icons/consumables/potions/bottle-bulb-corked-labeled-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.kNlvoSTcdMqxJPmI",
      "id": "kNlvoSTcdMqxJPmI",
      "name": "Battleaxe +3",
      "img": "icons/weapons/polearms/halberd-crescent-engraved-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.kOYXMf4GTtD7OqbD",
      "id": "kOYXMf4GTtD7OqbD",
      "name": "Dancing Scimitar",
      "img": "icons/skills/melee/maneuver-greatsword-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.kTxi62RTrrdrIBr9",
      "id": "kTxi62RTrrdrIBr9",
      "name": "Holy Avenger Rapier",
      "img": "icons/skills/melee/weapons-crossed-swords-yellow-teal.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.kdkpSZMUHGXGM15H",
      "id": "kdkpSZMUHGXGM15H",
      "name": "Signet Ring",
      "img": "icons/equipment/finger/ring-cabochon-gold-orange.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.khyjT3dKyoEOf4eA",
      "id": "khyjT3dKyoEOf4eA",
      "name": "Wand of Polymorph",
      "img": "icons/weapons/staves/staff-engraved-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.kj5DNiBKasYWyuj6",
      "id": "kj5DNiBKasYWyuj6",
      "name": "Disguise Kit",
      "img": "icons/equipment/back/cloak-hooded-blue.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.kjTPoUeomTPWJ9h3",
      "id": "kjTPoUeomTPWJ9h3",
      "name": "Adamantine Chain Shirt",
      "img": "icons/equipment/chest/breastplate-scale-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.kpDbCYgUivh7NApp",
      "id": "kpDbCYgUivh7NApp",
      "name": "Spellguard Shield",
      "img": "icons/equipment/shield/kite-wooden-sigil-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.kvD4ElYCfCKpjDeg",
      "id": "kvD4ElYCfCKpjDeg",
      "name": "Dwarven Thrower",
      "img": "icons/weapons/hammers/hammer-drilling-spiked.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.kx8DGQizmR5UI21R",
      "id": "kx8DGQizmR5UI21R",
      "name": "Waterskin",
      "img": "icons/sundries/survival/wetskin-leather-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.l2T46xCqUbJvKE7A",
      "id": "l2T46xCqUbJvKE7A",
      "name": "War Pick +1",
      "img": "icons/weapons/axes/pickaxe-double-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.l3V7V8VCXpmAAysQ",
      "id": "l3V7V8VCXpmAAysQ",
      "name": "Staff of the Magi",
      "img": "icons/weapons/staves/staff-engraved-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.l794iywHk8Wc6Uvi",
      "id": "l794iywHk8Wc6Uvi",
      "name": "Book of Lore",
      "img": "icons/sundries/books/book-plain-orange.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.l88FXiodYofrJT8a",
      "id": "l88FXiodYofrJT8a",
      "name": "Lance +1",
      "img": "icons/weapons/ammunition/arrow-head-war-flight.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.lAcTZgNtpmks2Mo5",
      "id": "lAcTZgNtpmks2Mo5",
      "name": "Potion of Cloud Giant Strength",
      "img": "icons/consumables/potions/bottle-round-corked-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.lBg9CPRdpRhn4DO4",
      "id": "lBg9CPRdpRhn4DO4",
      "name": "Mess Kit",
      "img": "icons/tools/cooking/fork-steel-tan.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.lHS63sC6bypENNlR",
      "id": "lHS63sC6bypENNlR",
      "name": "Flask",
      "img": "icons/consumables/drinks/tea-jug-gourd-brown.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.lM5uo6R4gy8rJG5Y",
      "id": "lM5uo6R4gy8rJG5Y",
      "name": "Vicious Javelin",
      "img": "icons/weapons/ammunition/arrows-bodkin-yellow-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.lN1VbnGFo3HNZXNb",
      "id": "lN1VbnGFo3HNZXNb",
      "name": "Half Plate Armor of Resistance",
      "img": "icons/equipment/chest/breastplate-cuirass-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.lPsueMv4ZoXqCYf9",
      "id": "lPsueMv4ZoXqCYf9",
      "name": "Wand of Wonder",
      "img": "icons/weapons/staves/staff-skull-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.lSd5QHnIJbKvP1bh",
      "id": "lSd5QHnIJbKvP1bh",
      "name": "Apparatus of the Crab",
      "img": "icons/containers/barrels/barrel-walnut-steel-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.lTfo6OVvAY2iJ4oq",
      "id": "lTfo6OVvAY2iJ4oq",
      "name": "Silver Horn of Valhalla",
      "img": "icons/tools/instruments/flute-simple-wood.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.laVqttkGMW4B9654",
      "id": "laVqttkGMW4B9654",
      "name": "Emblem",
      "img": "icons/sundries/flags/banner-symbol-sun-gold-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.lccm5AjIk91aIHbi",
      "id": "lccm5AjIk91aIHbi",
      "name": "Breastplate Armor of Resistance",
      "img": "icons/equipment/chest/breastplate-collared-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.lcqqW2vGF6P8nJ77",
      "id": "lcqqW2vGF6P8nJ77",
      "name": "Whip +1",
      "img": "icons/weapons/misc/whip-red-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.lg6oohwQndZT4Z0m",
      "id": "lg6oohwQndZT4Z0m",
      "name": "Censer",
      "img": "icons/containers/kitchenware/goblet-worn-clay-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.lsiR1hVfISlC5YoB",
      "id": "lsiR1hVfISlC5YoB",
      "name": "Staff of Fire",
      "img": "icons/weapons/staves/staff-engraved-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ltbDV5OitV0yrDFU",
      "id": "ltbDV5OitV0yrDFU",
      "name": "Torch",
      "img": "icons/sundries/lights/torch-black.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.luTJgPXN5n0EN7iy",
      "id": "luTJgPXN5n0EN7iy",
      "name": "Vicious Whip",
      "img": "icons/weapons/misc/whip-red-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.lvLrkAR7k8DS7J3W",
      "id": "lvLrkAR7k8DS7J3W",
      "name": "Iron Flask",
      "img": "icons/consumables/potions/bottle-round-empty-glass.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.lvaMqEhfidfHDGf5",
      "id": "lvaMqEhfidfHDGf5",
      "name": "Cloak of Protection",
      "img": "icons/equipment/back/cloak-heavy-fur-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.m1hJnK7CHsaJB26v",
      "id": "m1hJnK7CHsaJB26v",
      "name": "Mace +2",
      "img": "icons/weapons/maces/mace-flanged-steel-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.m7I2KkwIWttQSElS",
      "id": "m7I2KkwIWttQSElS",
      "name": "Tinderbox",
      "img": "icons/sundries/lights/torch-black.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.m7RubLd1lUcMjYgY",
      "id": "m7RubLd1lUcMjYgY",
      "name": "Mace of Disruption",
      "img": "icons/magic/symbols/cog-shield-white-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.mE6rsbIJXAd4tr4e",
      "id": "mE6rsbIJXAd4tr4e",
      "name": "Vestments",
      "img": "icons/equipment/back/mantle-collared-black.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.mGIwk9FwTAJB6qTn",
      "id": "mGIwk9FwTAJB6qTn",
      "name": "Oathbow",
      "img": "icons/weapons/bows/longbow-recurve-leather-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.mQVYcHmMSoCUnBnM",
      "id": "mQVYcHmMSoCUnBnM",
      "name": "Bucket",
      "img": "icons/containers/misc/bucket-steel.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.mYFfH24uzuKh4IPS",
      "id": "mYFfH24uzuKh4IPS",
      "name": "Wind Fan",
      "img": "icons/commodities/treasure/trinket-wing-white.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.meJEfX3gZgtMX4x2",
      "id": "meJEfX3gZgtMX4x2",
      "name": "Vial",
      "img": "icons/consumables/potions/vial-cork-empty.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.mhFBTY0egW8AeCHe",
      "id": "mhFBTY0egW8AeCHe",
      "name": "Potion of Hill Giant Strength",
      "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.mkyltDYnuzNU3kmF",
      "id": "mkyltDYnuzNU3kmF",
      "name": "Greatclub +3",
      "img": "icons/weapons/maces/mace-spiked-steel-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.mr96Z8YTI490ExhP",
      "id": "mr96Z8YTI490ExhP",
      "name": "Robe of the Archmagi",
      "img": "icons/magic/symbols/rune-sigil-black-pink.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.mtyw4NS1s7j2EJaD",
      "id": "mtyw4NS1s7j2EJaD",
      "name": "Spell Scroll 7th Level",
      "img": "icons/sundries/scrolls/scroll-bound-sealed-red-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.n1V07puo0RQxPGuF",
      "id": "n1V07puo0RQxPGuF",
      "name": "Hide Armor",
      "img": "icons/equipment/chest/vest-cloth-tattered-tan.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.n7fm71CN7qDIBEKk",
      "id": "n7fm71CN7qDIBEKk",
      "name": "Adamantine Chain Mail",
      "img": "icons/equipment/chest/breastplate-metal-scaled-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.nAqDwI9GyXS1diiz",
      "id": "nAqDwI9GyXS1diiz",
      "name": "Horseshoes of Speed",
      "img": "icons/tools/smithing/horseshoe-steel-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.nBFr5xTWeChM7xrb",
      "id": "nBFr5xTWeChM7xrb",
      "name": "Giant Slayer Greatsword",
      "img": "icons/weapons/swords/greatsword-guard-gold-worn.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.nL0Y0X8SjF58OmBM",
      "id": "nL0Y0X8SjF58OmBM",
      "name": "Luck Blade Shortsword",
      "img": "icons/magic/light/projectile-beam-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.nMtmxeYrbyFdv0bg",
      "id": "nMtmxeYrbyFdv0bg",
      "name": "Figurine of Wondrous Power (Silver Raven)",
      "img": "icons/commodities/materials/feather-blue-grey.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.nSNhjX5F7f86AW1a",
      "id": "nSNhjX5F7f86AW1a",
      "name": "Defender Greatsword",
      "img": "icons/weapons/polearms/spear-flared-silver-pink.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.nXWdGtzi8DXDLLsL",
      "id": "nXWdGtzi8DXDLLsL",
      "name": "Pitcher",
      "img": "icons/containers/kitchenware/jug-terracotta-orange.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.nXWevqtV6p484N59",
      "id": "nXWevqtV6p484N59",
      "name": "Potion of Animal Friendship",
      "img": "icons/consumables/potions/potion-bottle-corked-labeled-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.nY6CnKEHyJ5STgt5",
      "id": "nY6CnKEHyJ5STgt5",
      "name": "Vicious Greataxe",
      "img": "icons/weapons/axes/axe-double.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.nfIRTECQIG81CvM4",
      "id": "nfIRTECQIG81CvM4",
      "name": "Club",
      "img": "icons/weapons/clubs/club-simple-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.nk2MH16KcZmKp7FQ",
      "id": "nk2MH16KcZmKp7FQ",
      "name": "Ioun Stone of Mastery",
      "img": "icons/commodities/gems/gem-rough-cushion-green.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.nl7cc7Z1HpSHbUdQ",
      "id": "nl7cc7Z1HpSHbUdQ",
      "name": "Halberd +1",
      "img": "icons/weapons/polearms/halberd-crescent-glowing.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.nmuGH3OKdoMOwJqj",
      "id": "nmuGH3OKdoMOwJqj",
      "name": "Hammer",
      "img": "icons/tools/hand/hammer-cobbler-steel.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.nrvAo3TznyQrHS1t",
      "id": "nrvAo3TznyQrHS1t",
      "name": "War Pick +3",
      "img": "icons/weapons/axes/pickaxe-double-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.nsXZejlmgalj4he9",
      "id": "nsXZejlmgalj4he9",
      "name": "Ring Mail",
      "img": "icons/equipment/chest/breastplate-banded-simple-leather-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.nvhk1quD0Dg1ZtSH",
      "id": "nvhk1quD0Dg1ZtSH",
      "name": "Pipes of the Sewers",
      "img": "icons/tools/instruments/flute-simple-wood.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.o4Irx3hHiD3FnPbL",
      "id": "o4Irx3hHiD3FnPbL",
      "name": "Trident of Fish Command",
      "img": "icons/skills/ranged/arrows-flying-salvo-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.oG4rvCuMstgl4Nez",
      "id": "oG4rvCuMstgl4Nez",
      "name": "Hand Crossbow +3",
      "img": "icons/weapons/crossbows/crossbow-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.oN4Glcmi4BhdAI3k",
      "id": "oN4Glcmi4BhdAI3k",
      "name": "Tome of Leadership and Influence",
      "img": "icons/sundries/books/book-embossed-clasp-gold-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.oNLfJNRQgUHpU8c7",
      "id": "oNLfJNRQgUHpU8c7",
      "name": "Pipes of Haunting",
      "img": "icons/tools/instruments/flute-simple-wood.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.oRrNK2H2vcN4Kp74",
      "id": "oRrNK2H2vcN4Kp74",
      "name": "Hempen Rope (50 ft.)",
      "img": "icons/sundries/survival/rope-wrapped-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.oSarKEU8x1AupB6z",
      "id": "oSarKEU8x1AupB6z",
      "name": "Deck of Many Things",
      "img": "icons/sundries/misc/admission-ticket-grey.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.oY8KbpGmB5H2Deoy",
      "id": "oY8KbpGmB5H2Deoy",
      "name": "Silk Rope (50 ft.)",
      "img": "icons/sundries/survival/rope-wrapped-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.oYZNXHth1UYxPwVi",
      "id": "oYZNXHth1UYxPwVi",
      "name": "Periapt of Proof against Poison",
      "img": "icons/equipment/neck/necklace-hook-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.odV5cq2HSLSCH69k",
      "id": "odV5cq2HSLSCH69k",
      "name": "Prayer Book",
      "img": "icons/sundries/books/book-backed-silver-red.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.orHjq3XDPz4eXcov",
      "id": "orHjq3XDPz4eXcov",
      "name": "Dragon Slayer Greatsword",
      "img": "icons/skills/melee/strike-axe-blood-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.osLzOwQdPtrK3rQH",
      "id": "osLzOwQdPtrK3rQH",
      "name": "Shortsword",
      "img": "icons/weapons/swords/sword-guard-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.otYAEwhsANKHZAmk",
      "id": "otYAEwhsANKHZAmk",
      "name": "Gloves of Missile Snaring",
      "img": "icons/creatures/webs/web-spider-glowing-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.oxzUb5j1TMsccGW4",
      "id": "oxzUb5j1TMsccGW4",
      "name": "Mantle of Spell Resistance",
      "img": "icons/magic/unholy/silhouette-robe-evil-power.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.oylFuuS3t1nqNKsM",
      "id": "oylFuuS3t1nqNKsM",
      "name": "Candle",
      "img": "icons/sundries/lights/candle-unlit-tan.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.ozYrQ5N4s81h35Fa",
      "id": "ozYrQ5N4s81h35Fa",
      "name": "Vicious Blowgun",
      "img": "icons/weapons/staves/staff-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.p01JzD9RpIOkJiqK",
      "id": "p01JzD9RpIOkJiqK",
      "name": "Rapier of Life Stealing",
      "img": "icons/creatures/claws/claw-curved-poison-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.p2zChy24ZJdVqMSH",
      "id": "p2zChy24ZJdVqMSH",
      "name": "Chain Shirt",
      "img": "icons/equipment/chest/breastplate-scale-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.p9dtQU9wEZGumHSb",
      "id": "p9dtQU9wEZGumHSb",
      "name": "Vicious Greatclub",
      "img": "icons/weapons/maces/mace-spiked-steel-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.pC3202gDTy8G5i4r",
      "id": "pC3202gDTy8G5i4r",
      "name": "Vicious Longsword",
      "img": "icons/weapons/swords/greatsword-crossguard-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.pG6dddIcb9NmPrdt",
      "id": "pG6dddIcb9NmPrdt",
      "name": "Longsword of Wounding",
      "img": "icons/magic/water/heart-ice-freeze.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.paqlMjggWkBIAeCe",
      "id": "paqlMjggWkBIAeCe",
      "name": "Amulet",
      "img": "icons/equipment/neck/pendant-bronze-gem-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.psoZaItkOScMVaHL",
      "id": "psoZaItkOScMVaHL",
      "name": "Oil Flask",
      "img": "icons/consumables/potions/bottle-bulb-empty-glass.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.q24QnImAicnT9Byd",
      "id": "q24QnImAicnT9Byd",
      "name": "Light Hammer +1",
      "img": "icons/weapons/hammers/hammer-war-spiked.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.q3WqP3r2emnumyUF",
      "id": "q3WqP3r2emnumyUF",
      "name": "Sling +3",
      "img": "icons/weapons/slings/slingshot-wood.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.q4RcCLeKviqgckqt",
      "id": "q4RcCLeKviqgckqt",
      "name": "Waterskin",
      "img": "icons/sundries/survival/wetskin-leather-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.qBSEGJyHxdKIlBfj",
      "id": "qBSEGJyHxdKIlBfj",
      "name": "Potion of Poison",
      "img": "icons/consumables/potions/potion-bottle-skull-label-poison-teal.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.qBydtUUIkv520DT7",
      "id": "qBydtUUIkv520DT7",
      "name": "Lute",
      "img": "icons/tools/instruments/lute-gold-brown.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.qGH7YqWhi0tHisMi",
      "id": "qGH7YqWhi0tHisMi",
      "name": "Luck Blade Rapier",
      "img": "icons/magic/light/projectile-beam-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.qGRN4wvZLJ8uITf2",
      "id": "qGRN4wvZLJ8uITf2",
      "name": "Vicious Sling",
      "img": "icons/weapons/slings/slingshot-wood.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.qGfu1070HAllkO4W",
      "id": "qGfu1070HAllkO4W",
      "name": "Ink Bottle",
      "img": "icons/consumables/potions/bottle-bulb-empty-glass.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.qMGkmzfLHfXd7DiJ",
      "id": "qMGkmzfLHfXd7DiJ",
      "name": "Ring of Necrotic Resistance",
      "img": "icons/equipment/finger/ring-band-engraved-scrolls-silver.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.qMzHmlmha8qMDnEF",
      "id": "qMzHmlmha8qMDnEF",
      "name": "Lamp",
      "img": "icons/sundries/lights/lantern-iron-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.qRMQH8lRE42JkugE",
      "id": "qRMQH8lRE42JkugE",
      "name": "Mithral Half Plate Armor",
      "img": "icons/equipment/chest/breastplate-cuirass-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.qVHCzgVvOZAtuk4N",
      "id": "qVHCzgVvOZAtuk4N",
      "name": "Flame Tongue Scimitar",
      "img": "icons/magic/fire/projectile-bolt-zigzag-orange.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.qVuZznv0MnIjDU70",
      "id": "qVuZznv0MnIjDU70",
      "name": "Iron Horn of Valhalla",
      "img": "icons/tools/instruments/flute-simple-wood.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.qWlXDEgqdmdZWoab",
      "id": "qWlXDEgqdmdZWoab",
      "name": "Shovel",
      "img": "icons/tools/hand/shovel-spade-steel-grey.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.qXcUKfCVxEvV3VU8",
      "id": "qXcUKfCVxEvV3VU8",
      "name": "Decanter of Endless Water",
      "img": "icons/consumables/potions/potion-flask-corked-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.qaSro7kFhxD6INbZ",
      "id": "qaSro7kFhxD6INbZ",
      "name": "Hand Crossbow",
      "img": "icons/weapons/crossbows/crossbow-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.qcEiSj67zfbLvYdJ",
      "id": "qcEiSj67zfbLvYdJ",
      "name": "Pike +2",
      "img": "icons/weapons/polearms/pike-flared-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.qhdGVfT5j6u46mtk",
      "id": "qhdGVfT5j6u46mtk",
      "name": "Greataxe +1",
      "img": "icons/weapons/axes/axe-double.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.qmuOeNsOKwkn6K8W",
      "id": "qmuOeNsOKwkn6K8W",
      "name": "Vicious Flail",
      "img": "icons/weapons/maces/mace-round-spiked-black.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.qw05Om9XWqTMoio2",
      "id": "qw05Om9XWqTMoio2",
      "name": "Ring of the Ram",
      "img": "icons/equipment/finger/ring-band-engraved-scrolls-silver.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.r8yK6SrWOz4hqF01",
      "id": "r8yK6SrWOz4hqF01",
      "name": "Vicious Lance",
      "img": "icons/weapons/ammunition/arrow-head-war-flight.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.r97KnMO7Zxgfdh3P",
      "id": "r97KnMO7Zxgfdh3P",
      "name": "Lance +3",
      "img": "icons/weapons/ammunition/arrow-head-war-flight.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.rJKXDPikXSYXYgb5",
      "id": "rJKXDPikXSYXYgb5",
      "name": "Net +1",
      "img": "icons/tools/fishing/net-gold.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.rLMflzmxpe8JGTOA",
      "id": "rLMflzmxpe8JGTOA",
      "name": "Chain Mail",
      "img": "icons/equipment/chest/breastplate-metal-scaled-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.rOG1OM2ihgPjOvFW",
      "id": "rOG1OM2ihgPjOvFW",
      "name": "Glaive",
      "img": "icons/weapons/polearms/halberd-crescent-glowing.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.rQ6sO7HDWzqMhSI3",
      "id": "rQ6sO7HDWzqMhSI3",
      "name": "Spell Scroll Cantrip",
      "img": "icons/sundries/scrolls/scroll-bound-orange-tan.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.rRMaaGZ7qbzqMvoI",
      "id": "rRMaaGZ7qbzqMvoI",
      "name": "Bowl of Commanding Water Elementals",
      "img": "icons/magic/water/pseudopod-swirl-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.rTbVrNcwApnuTz5E",
      "id": "rTbVrNcwApnuTz5E",
      "name": "Glassblower's Tools",
      "img": "icons/commodities/tech/metal-insert.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.rTn4p9nJr4Aq2GPB",
      "id": "rTn4p9nJr4Aq2GPB",
      "name": "Potion of Invisibility",
      "img": "icons/consumables/potions/bottle-bulb-empty-glass.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.rY9sRFQp5CFSfsat",
      "id": "rY9sRFQp5CFSfsat",
      "name": "Helm of Comprehending Languages",
      "img": "icons/magic/defensive/illusion-evasion-echo-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.rc9nkN6YOD7ogtEi",
      "id": "rc9nkN6YOD7ogtEi",
      "name": "Glaive +3",
      "img": "icons/weapons/polearms/halberd-crescent-glowing.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.rhGulc3gEJhnuP31",
      "id": "rhGulc3gEJhnuP31",
      "name": "Helm of Brilliance",
      "img": "icons/magic/lightning/bolt-strike-smoke-yellow.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.rvxGvcUzoQXVNbAu",
      "id": "rvxGvcUzoQXVNbAu",
      "name": "Portable Hole",
      "img": "icons/magic/unholy/barrier-shield-glowing-pink.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.s2kQs21J3cFg7ZSs",
      "id": "s2kQs21J3cFg7ZSs",
      "name": "Figurine of Wondrous Power (Ebony Fly)",
      "img": "icons/commodities/biological/legs-insect-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.s4fR8bxQGSt4wbH7",
      "id": "s4fR8bxQGSt4wbH7",
      "name": "Cube of Force",
      "img": "icons/sundries/gaming/dice-runed-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.sIiUbRJItYAs5gtA",
      "id": "sIiUbRJItYAs5gtA",
      "name": "Dancing Longsword",
      "img": "icons/skills/melee/maneuver-greatsword-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.sJ9gfQnz2jdT6GAB",
      "id": "sJ9gfQnz2jdT6GAB",
      "name": "Soap",
      "img": "icons/sundries/survival/soap.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.sP8CV5VNEcY1Yh1Q",
      "id": "sP8CV5VNEcY1Yh1Q",
      "name": "Adamantine Plate Armor",
      "img": "icons/equipment/chest/breastplate-collared-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.sSs3hSzkKBMNBgTs",
      "id": "sSs3hSzkKBMNBgTs",
      "name": "Shield",
      "img": "icons/equipment/shield/round-wooden-boss-steel-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.sXEkkTDXWQDUMzsC",
      "id": "sXEkkTDXWQDUMzsC",
      "name": "Censer of Controlling Air Elementals",
      "img": "icons/commodities/treasure/goblet-worn-gold.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.sdHSbitJxgTX6aDG",
      "id": "sdHSbitJxgTX6aDG",
      "name": "Greatsword of Life Stealing",
      "img": "icons/creatures/claws/claw-curved-poison-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.setcTdSZ09rmsqMn",
      "id": "setcTdSZ09rmsqMn",
      "name": "Warhammer +3",
      "img": "icons/weapons/hammers/hammer-drilling-spiked.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.sfegfmo59MHJg2YC",
      "id": "sfegfmo59MHJg2YC",
      "name": "Scimitar of Life Stealing",
      "img": "icons/creatures/claws/claw-curved-poison-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.skUih6tBvcBbORzA",
      "id": "skUih6tBvcBbORzA",
      "name": "Mason's Tools",
      "img": "icons/tools/hand/hammer-and-nail.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.skoUe223EvRYGPL6",
      "id": "skoUe223EvRYGPL6",
      "name": "Medallion of Thoughts",
      "img": "icons/equipment/neck/pendant-bronze-gem-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.sl6yiYSlqkHiVVSN",
      "id": "sl6yiYSlqkHiVVSN",
      "name": "Shortsword +1",
      "img": "icons/weapons/swords/sword-guard-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.sqcerAMszpe3hwyI",
      "id": "sqcerAMszpe3hwyI",
      "name": "Bronze Horn of Valhalla",
      "img": "icons/tools/instruments/flute-simple-wood.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.srTRzwTfWKO5opOo",
      "id": "srTRzwTfWKO5opOo",
      "name": "Portable Ram",
      "img": "icons/commodities/wood/bamboo-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.stlFCpqW3ZuAftTi",
      "id": "stlFCpqW3ZuAftTi",
      "name": "Dancing Shortsword",
      "img": "icons/skills/melee/maneuver-greatsword-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.szNhDWpks5BhEXhT",
      "id": "szNhDWpks5BhEXhT",
      "name": "Ioun Stone of Regeneration",
      "img": "icons/commodities/stone/rock-chunk-pumice-white.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.t5yP0d7YaKwuKKiH",
      "id": "t5yP0d7YaKwuKKiH",
      "name": "Yew Wand",
      "img": "icons/weapons/staves/staff-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.t7GfyRp3dB3lqS9i",
      "id": "t7GfyRp3dB3lqS9i",
      "name": "Horn of Blasting",
      "img": "icons/tools/instruments/flute-simple-wood.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.t8L7B0JWamsvxhui",
      "id": "t8L7B0JWamsvxhui",
      "name": "Quarterstaff +1",
      "img": "icons/weapons/staves/staff-simple-gold.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.tC0kcqZT9HHAO0PD",
      "id": "tC0kcqZT9HHAO0PD",
      "name": "Pike",
      "img": "icons/weapons/polearms/pike-flared-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.tEWhsb2lYF4uvF0z",
      "id": "tEWhsb2lYF4uvF0z",
      "name": "Arrow +1",
      "img": "icons/weapons/ammunition/arrow-head-war.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.tFLmAPUDLxBY8jFO",
      "id": "tFLmAPUDLxBY8jFO",
      "name": "Nine Lives Stealer Greatsword",
      "img": "icons/weapons/swords/sword-broad-crystal-paired.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.tH5Rn0JVRG1zdmPa",
      "id": "tH5Rn0JVRG1zdmPa",
      "name": "Orb",
      "img": "icons/commodities/gems/pearl-natural.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.tI3rWx4bxefNCexS",
      "id": "tI3rWx4bxefNCexS",
      "name": "Spell Scroll 6th Level",
      "img": "icons/sundries/scrolls/scroll-bound-sealed-red-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.tIwoSAGJlcuyiwaQ",
      "id": "tIwoSAGJlcuyiwaQ",
      "name": "Dragon Scale Mail",
      "img": "icons/equipment/chest/breastplate-banded-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.tJQXAJx92wL6GM1v",
      "id": "tJQXAJx92wL6GM1v",
      "name": "Mithral Ring Mail",
      "img": "icons/equipment/chest/breastplate-banded-simple-leather-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.tTqixDDmzAfs995G",
      "id": "tTqixDDmzAfs995G",
      "name": "Giant Slayer Shortsword",
      "img": "icons/weapons/swords/sword-guard-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.tWJLHIL6ZIZUez9k",
      "id": "tWJLHIL6ZIZUez9k",
      "name": "Manacles",
      "img": "icons/sundries/survival/cuffs-shackles-steel.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.tfDxZIKDpOkz6pbx",
      "id": "tfDxZIKDpOkz6pbx",
      "name": "Grappling Hook",
      "img": "icons/tools/fishing/hook-multi-steel-brown.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.thkvJ5QBRORIwkkV",
      "id": "thkvJ5QBRORIwkkV",
      "name": "Gem of Brightness",
      "img": "icons/commodities/gems/gem-faceted-octagon-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.trmWAdUoR6Y2B7rA",
      "id": "trmWAdUoR6Y2B7rA",
      "name": "Hooded Lantern",
      "img": "icons/sundries/lights/lantern-iron-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.tt4WokZBZMGqgYm5",
      "id": "tt4WokZBZMGqgYm5",
      "name": "Shortbow +2",
      "img": "icons/weapons/bows/shortbow-recurve.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.tut1jbW3UCsrUjCG",
      "id": "tut1jbW3UCsrUjCG",
      "name": "Pole",
      "img": "icons/commodities/wood/wood-pole.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.twRJhPtDQe1HceFt",
      "id": "twRJhPtDQe1HceFt",
      "name": "Padded Armor +1",
      "img": "icons/equipment/chest/breastplate-quilted-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.u4ewpAFZjLrWrmQv",
      "id": "u4ewpAFZjLrWrmQv",
      "name": "Folding Boat",
      "img": "icons/environment/traps/cage-simple-wood.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.u5GmRCvAsCYoacLj",
      "id": "u5GmRCvAsCYoacLj",
      "name": "Map Case",
      "img": "icons/containers/bags/case-leather-tan.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.uHL99JKLUpTKAbz8",
      "id": "uHL99JKLUpTKAbz8",
      "name": "Staff of Withering",
      "img": "icons/weapons/staves/staff-skull-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.uIHXYhnOwETlA5lT",
      "id": "uIHXYhnOwETlA5lT",
      "name": "Shortsword +3",
      "img": "icons/weapons/swords/sword-guard-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.uLY74ppOrTaWKwer",
      "id": "uLY74ppOrTaWKwer",
      "name": "Rapier +2",
      "img": "icons/weapons/swords/sword-guard-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.uRoHwk1c8e5xJjkV",
      "id": "uRoHwk1c8e5xJjkV",
      "name": "Sickle +2",
      "img": "icons/weapons/sickles/sickle-curved.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.uVm7MiB71QblfnoY",
      "id": "uVm7MiB71QblfnoY",
      "name": "Ink Pen",
      "img": "icons/tools/scribal/pen-steel-grey-brown.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.uWUD93jwuO2Jxkti",
      "id": "uWUD93jwuO2Jxkti",
      "name": "Arrow-Catching Shield",
      "img": "icons/equipment/shield/wardoor-wooden-boss-brown.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.uXOT4fYbgPY8DGdd",
      "id": "uXOT4fYbgPY8DGdd",
      "name": "Crystal",
      "img": "icons/commodities/gems/gem-rough-navette-yellow-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.uYniEJCeAuwUC4JY",
      "id": "uYniEJCeAuwUC4JY",
      "name": "Blanket",
      "img": "icons/sundries/survival/bedroll-pink.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.ug9bTGmTTEN7JwmP",
      "id": "ug9bTGmTTEN7JwmP",
      "name": "Costume Clothes",
      "img": "icons/equipment/back/cloak-hooded-pink.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.ugzwHl8vYaPu2GNd",
      "id": "ugzwHl8vYaPu2GNd",
      "name": "Climber's Kit",
      "img": "icons/weapons/sickles/sickle-hooked-wood.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.ukcKemEoTTRB9yLC",
      "id": "ukcKemEoTTRB9yLC",
      "name": "Defender Longsword",
      "img": "icons/weapons/polearms/spear-flared-silver-pink.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.uuh4UH3Jx5CsFjdA",
      "id": "uuh4UH3Jx5CsFjdA",
      "name": "Perfume",
      "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.uw6fINSmZ2j2o57A",
      "id": "uw6fINSmZ2j2o57A",
      "name": "Tankard",
      "img": "icons/containers/kitchenware/mug-steel-wood-brown.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.v4uNbmiz4ECTI89n",
      "id": "v4uNbmiz4ECTI89n",
      "name": "Ioun Stone of Protection",
      "img": "icons/commodities/gems/gem-rough-ball-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.vJvb6fx3JVPmhG8x",
      "id": "vJvb6fx3JVPmhG8x",
      "name": "Merchant's Scale",
      "img": "icons/commodities/currency/coins-assorted-mix-silver.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.vZdLYfHlLcZqQ8zc",
      "id": "vZdLYfHlLcZqQ8zc",
      "name": "Chime of Opening",
      "img": "icons/weapons/guns/gun-worn-steel.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.vmbB2SK6pQU2Vkzb",
      "id": "vmbB2SK6pQU2Vkzb",
      "name": "Rod of Rulership",
      "img": "icons/skills/melee/hand-grip-staff-blue.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.vmymwrmE730l3pKh",
      "id": "vmymwrmE730l3pKh",
      "name": "Lamp",
      "img": "icons/sundries/lights/lantern-iron-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.vpenjFjUyEBLLlUc",
      "id": "vpenjFjUyEBLLlUc",
      "name": "Trinket",
      "img": "icons/commodities/materials/hair-tuft-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.vsgmACFYINloIdPm",
      "id": "vsgmACFYINloIdPm",
      "name": "Half Plate Armor",
      "img": "icons/equipment/chest/breastplate-cuirass-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.vuThcmO7MYlw5b9f",
      "id": "vuThcmO7MYlw5b9f",
      "name": "Trident +1",
      "img": "icons/weapons/polearms/trident-silver-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.w56FIjFafs2rN6iK",
      "id": "w56FIjFafs2rN6iK",
      "name": "Mace of Smiting",
      "img": "icons/weapons/maces/mace-spiked-wood-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.wBYmPQG3nZfD88aP",
      "id": "wBYmPQG3nZfD88aP",
      "name": "Belt of Storm Giant Strength",
      "img": "icons/equipment/waist/sash-cloth-gold-purple.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.wGDDt17DpBcXPuUD",
      "id": "wGDDt17DpBcXPuUD",
      "name": "Hammer of Thunderbolts",
      "img": "icons/skills/melee/strike-hammer-destructive-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.wGKykLRS8UqChNXI",
      "id": "wGKykLRS8UqChNXI",
      "name": "Dimensional Shackles",
      "img": "icons/magic/unholy/orb-swirling-teal.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.wNKYbKYwOHbA7SH8",
      "id": "wNKYbKYwOHbA7SH8",
      "name": "Potion of Heroism",
      "img": "icons/consumables/potions/potion-bottle-corked-fancy-orange.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.wNWK6yJMHG9ANqQV",
      "id": "wNWK6yJMHG9ANqQV",
      "name": "Blowgun",
      "img": "icons/commodities/tech/pipe-metal.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.wa1VF8TXHmkrrR35",
      "id": "wa1VF8TXHmkrrR35",
      "name": "Spell Scroll 5th Level",
      "img": "icons/sundries/scrolls/scroll-plain-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.wgBKZNeRN1XsE9I7",
      "id": "wgBKZNeRN1XsE9I7",
      "name": "Flail +3",
      "img": "icons/weapons/maces/flail-studded-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.wjHtGnd05SPdURqE",
      "id": "wjHtGnd05SPdURqE",
      "name": "Hooded Lantern",
      "img": "icons/sundries/lights/lantern-iron-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.wmedRPNenLVSUaT5",
      "id": "wmedRPNenLVSUaT5",
      "name": "Piton",
      "img": "icons/tools/fasteners/nail-steel.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.woWZ1sO5IUVGzo58",
      "id": "woWZ1sO5IUVGzo58",
      "name": "Thieves' Tools",
      "img": "icons/tools/hand/lockpicks-steel-grey.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.wqVSRfkcTjuhvDyx",
      "id": "wqVSRfkcTjuhvDyx",
      "name": "Necklace of Prayer Beads",
      "img": "icons/equipment/neck/necklace-runed-white-red.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.wtctR6tCcYbQPiS0",
      "id": "wtctR6tCcYbQPiS0",
      "name": "Longsword of Life Stealing",
      "img": "icons/creatures/claws/claw-curved-poison-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.wwNpAz2KMukovewN",
      "id": "wwNpAz2KMukovewN",
      "name": "Necklace of Adaptation",
      "img": "icons/equipment/neck/pendant-faceted-blue.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.x12sDhylcf8843fT",
      "id": "x12sDhylcf8843fT",
      "name": "Light Crossbow +2",
      "img": "icons/weapons/crossbows/crossbow-simple-brown.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.x1GUgZYjMubaFavx",
      "id": "x1GUgZYjMubaFavx",
      "name": "Crossbow Bolt +2",
      "img": "icons/weapons/ammunition/arrows-bodkin-yellow-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.x7LfMrLafLKfemGH",
      "id": "x7LfMrLafLKfemGH",
      "name": "Ring of Jumping",
      "img": "icons/equipment/finger/ring-band-engraved-scrolls-silver.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.x9I9vdo4kafHDjcO",
      "id": "x9I9vdo4kafHDjcO",
      "name": "Sling Bullet +3",
      "img": "icons/skills/ranged/bullets-triple-ball-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.xDK9GQd2iqOGH8Sd",
      "id": "xDK9GQd2iqOGH8Sd",
      "name": "Sprig of Mistletoe",
      "img": "icons/consumables/plants/fern-lady-green.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.xEtBeZjJnkDXojQM",
      "id": "xEtBeZjJnkDXojQM",
      "name": "Staff of Frost",
      "img": "icons/weapons/staves/staff-ornate-engraved-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.xKErqkLo4ASYr5EP",
      "id": "xKErqkLo4ASYr5EP",
      "name": "Woodcarver's Tools",
      "img": "icons/tools/hand/chisel-steel-brown.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.xMkP8BmFzElcsMaR",
      "id": "xMkP8BmFzElcsMaR",
      "name": "Greatsword",
      "img": "icons/weapons/swords/greatsword-guard-gem-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.xWQopgOHbS6LjsZm",
      "id": "xWQopgOHbS6LjsZm",
      "name": "Hammer",
      "img": "icons/tools/hand/hammer-cobbler-steel.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.xbVpKtrQ6tJsPhXX",
      "id": "xbVpKtrQ6tJsPhXX",
      "name": "Half Plate Armor +3",
      "img": "icons/equipment/chest/breastplate-cuirass-steel-grey.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.xjRSY2ECcc9viSz3",
      "id": "xjRSY2ECcc9viSz3",
      "name": "Scarab of Protection",
      "img": "icons/environment/creatures/bug-larva-orange.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.xjme5oSQZmdAy1fc",
      "id": "xjme5oSQZmdAy1fc",
      "name": "Well of Many Worlds",
      "img": "icons/magic/water/bubbles-air-water-light.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.xsB7Y2WI476kvOt4",
      "id": "xsB7Y2WI476kvOt4",
      "name": "Burglar's Pack",
      "img": "icons/containers/bags/pack-canvas-white-brown.webp",
      "type": "container"
    },
    {
      "uuid": "dnd5e.items.xw2kL7Puwg4wfjW3",
      "id": "xw2kL7Puwg4wfjW3",
      "name": "Giant Slayer Longsword",
      "img": "icons/weapons/swords/sword-guard-flanged-purple.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.xw99pcqPBVwtMOLw",
      "id": "xw99pcqPBVwtMOLw",
      "name": "Potion of Necrotic Resistance",
      "img": "icons/consumables/potions/bottle-round-corked-pink.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.xwUWrV15s9jLnmfZ",
      "id": "xwUWrV15s9jLnmfZ",
      "name": "Lock",
      "img": "icons/sundries/misc/lock-bronze-reinforced.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.xxRC1qTIGzGEvmkg",
      "id": "xxRC1qTIGzGEvmkg",
      "name": "Block of Incense",
      "img": "icons/commodities/stone/rock-chunk-pumice-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.xzZQIIxXjNJwNqnp",
      "id": "xzZQIIxXjNJwNqnp",
      "name": "Shield +2",
      "img": "icons/equipment/shield/heater-steel-spiral.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.yUGNrsXMfsUKwsUg",
      "id": "yUGNrsXMfsUKwsUg",
      "name": "Crowbar",
      "img": "icons/tools/hand/pickaxe-steel-white.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.ybeLtyIloDvKhDz8",
      "id": "ybeLtyIloDvKhDz8",
      "name": "Ink Pen",
      "img": "icons/tools/scribal/pen-steel-grey-brown.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.yiYCqmD5n08NftYk",
      "id": "yiYCqmD5n08NftYk",
      "name": "Sun Blade",
      "img": "icons/magic/light/beam-strike-orange-gold.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ykB6UKv5BuQnSRSL",
      "id": "ykB6UKv5BuQnSRSL",
      "name": "Frost Brand Greatsword",
      "img": "icons/skills/melee/strike-weapon-polearm-ice-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ykefWXBjq3y6y9Se",
      "id": "ykefWXBjq3y6y9Se",
      "name": "Manual of Gainful Exercise",
      "img": "icons/sundries/books/book-embossed-jewel-gold-purple.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.yoFff2zdTloKx1if",
      "id": "yoFff2zdTloKx1if",
      "name": "Pike +1",
      "img": "icons/weapons/polearms/pike-flared-red.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.ytlsBjYsZ7OBSEBs",
      "id": "ytlsBjYsZ7OBSEBs",
      "name": "Potion of Healing",
      "img": "icons/consumables/potions/potion-tube-corked-red.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.yxHi57T5mmVt0oDr",
      "id": "yxHi57T5mmVt0oDr",
      "name": "Bagpipes",
      "img": "icons/sundries/survival/waterskin-leather-brown.webp",
      "type": "tool"
    },
    {
      "uuid": "dnd5e.items.z0lIRURcyDYt1kLK",
      "id": "z0lIRURcyDYt1kLK",
      "name": "Flail +2",
      "img": "icons/weapons/maces/flail-studded-grey.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.z67d1DZzqDPmgEwP",
      "id": "z67d1DZzqDPmgEwP",
      "name": "Signal Whistle",
      "img": "icons/tools/instruments/pipe-flute-brown.webp",
      "type": "loot"
    },
    {
      "uuid": "dnd5e.items.z9SbsMIBZzuhZOqT",
      "id": "z9SbsMIBZzuhZOqT",
      "name": "Sling Bullet",
      "img": "icons/skills/ranged/bullets-triple-ball-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.z9fFB1uaGJvcXTf7",
      "id": "z9fFB1uaGJvcXTf7",
      "name": "Trident +3",
      "img": "icons/weapons/polearms/trident-silver-blue.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.zBX8LLC2CjC89Dzl",
      "id": "zBX8LLC2CjC89Dzl",
      "name": "Potion of Thunder Resistance",
      "img": "icons/consumables/potions/bottle-round-corked-yellow.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.zDJ4oEt5HArN1xmP",
      "id": "zDJ4oEt5HArN1xmP",
      "name": "Elemental Gem of Air",
      "img": "icons/commodities/gems/gem-rough-rose-teal.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.zIpNJyuOxp2raizE",
      "id": "zIpNJyuOxp2raizE",
      "name": "Splint Armor +2",
      "img": "icons/equipment/chest/breastplate-layered-steel.webp",
      "type": "equipment"
    },
    {
      "uuid": "dnd5e.items.zJ5LhDvTxYKzPIx4",
      "id": "zJ5LhDvTxYKzPIx4",
      "name": "Sovereign Glue",
      "img": "icons/consumables/drinks/tea-jug-gourd-brown.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.zSKorO6lwT7vs2uk",
      "id": "zSKorO6lwT7vs2uk",
      "name": "Berserker Greataxe",
      "img": "icons/weapons/polearms/halberd-crescent-engraved-steel.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.zWSB0NCllWaSVoNT",
      "id": "zWSB0NCllWaSVoNT",
      "name": "Dancing Greatsword",
      "img": "icons/skills/melee/maneuver-greatsword-yellow.webp",
      "type": "weapon"
    },
    {
      "uuid": "dnd5e.items.zgZkJAyFAfYmyn11",
      "id": "zgZkJAyFAfYmyn11",
      "name": "Potion of Acid Resistance",
      "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
      "type": "consumable"
    },
    {
      "uuid": "dnd5e.items.zibIgdxPz8QHSCg6",
      "id": "zibIgdxPz8QHSCg6",
      "name": "Vicious Pike",
      "img": "icons/weapons/polearms/halberd-crescent-stone-worn.webp",
      "type": "weapon"
    }
  ]
}
```


