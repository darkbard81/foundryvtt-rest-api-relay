## **GET** /file-system

### Request

#### Request URL

```
$baseUrl/file-system?clientId=$clientId
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Parameters

| Parameter Type | Key | Value | Description |
| -------------- | --- | ----- | ----------- |
| Query String Parameter | clientId | \{\{clientId\}\} |   |
| Query String Parameter | recursive | true |   |
| Query String Parameter | path | modules |   |
| Query String Parameter | source | public |   |

### Response

#### Status: 200 OK

```json
{
  "clientId": "foundry-rQLkX9c1U2Tzkyh8",
  "requestId": "file_system_1747509490436_qx1foyp",
  "success": true,
  "path": "",
  "source": "data",
  "recursive": false,
  "files": [
    {
      "name": "1rak3y78d6ve1.jpeg",
      "path": "1rak3y78d6ve1.jpeg",
      "type": "file"
    },
    {
      "name": "61y2jk9nv6ve1.jpeg",
      "path": "61y2jk9nv6ve1.jpeg",
      "type": "file"
    },
    {
      "name": "battleoffortune-cut.wav",
      "path": "battleoffortune-cut.wav",
      "type": "file"
    },
    {
      "name": "bm9nzrmh50q91.jpg",
      "path": "bm9nzrmh50q91.jpg",
      "type": "file"
    },
    {
      "name": "CavernPitPublic-785x1024.jpg",
      "path": "CavernPitPublic-785x1024.jpg",
      "type": "file"
    },
    {
      "name": "eveningstory-cut.wav",
      "path": "eveningstory-cut.wav",
      "type": "file"
    },
    {
      "name": "Extended-Map-of-FaerunMasterfile-30000-sliced-big_01.jpg",
      "path": "Extended-Map-of-FaerunMasterfile-30000-sliced-big_01.jpg",
      "type": "file"
    },
    {
      "name": "gncbkmmsi6ve1.jpeg",
      "path": "gncbkmmsi6ve1.jpeg",
      "type": "file"
    },
    {
      "name": "Light%20Room.jpg",
      "path": "Light%20Room.jpg",
      "type": "file"
    },
    {
      "name": "Minotaur%27s%20Maze%2072dpi%20VTT%20FREE.jpg",
      "path": "Minotaur%27s%20Maze%2072dpi%20VTT%20FREE.jpg",
      "type": "file"
    },
    {
      "name": "Minotaurs-Maze-72dpi-VTT-FREE-768x1024.jpg",
      "path": "Minotaurs-Maze-72dpi-VTT-FREE-768x1024.jpg",
      "type": "file"
    },
    {
      "name": "Raising-The-Stakes.json",
      "path": "Raising-The-Stakes.json",
      "type": "file"
    },
    {
      "name": "roguesidea-cut.wav",
      "path": "roguesidea-cut.wav",
      "type": "file"
    },
    {
      "name": "shrine-of-the-demon-eskarna.png",
      "path": "shrine-of-the-demon-eskarna.png",
      "type": "file"
    },
    {
      "name": "SkyfortMap2.jpg",
      "path": "SkyfortMap2.jpg",
      "type": "file"
    },
    {
      "name": "test.json",
      "path": "test.json",
      "type": "file"
    },
    {
      "name": "test300.png",
      "path": "test300.png",
      "type": "file"
    }
  ],
  "directories": [
    {
      "name": "data",
      "path": "data",
      "type": "directory"
    },
    {
      "name": "modules",
      "path": "modules",
      "type": "directory"
    },
    {
      "name": "moulinette",
      "path": "moulinette",
      "type": "directory"
    },
    {
      "name": "systems",
      "path": "systems",
      "type": "directory"
    },
    {
      "name": "test",
      "path": "test",
      "type": "directory"
    },
    {
      "name": "test1",
      "path": "test1",
      "type": "directory"
    },
    {
      "name": "token-action-hud-core",
      "path": "token-action-hud-core",
      "type": "directory"
    },
    {
      "name": "tokenizer",
      "path": "tokenizer",
      "type": "directory"
    },
    {
      "name": "worlds",
      "path": "worlds",
      "type": "directory"
    }
  ]
}
```


