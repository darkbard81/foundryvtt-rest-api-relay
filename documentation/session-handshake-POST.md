## **POST** /session-handshake

Creates a temporary, one-time-use, token that can be used to create a headless Foundry session.

### Request

#### Request URL

```
$baseUrl/session-handshake
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |
| x-foundry-url | http://localhost:30000 | The url to your foundry game |
| x-username | Gamemaster | The username to log in with (eg. "Gamemaster") |
| x-world-name | worldName | (Optional) The name of the world as it appears in foundry if the world is not already loaded. |

#### Request Payload

```json
{}
```

### Response

#### Status: 200 OK

```json
{
  "token": "702763fa83528be2d7b6dd89e0725d782bb80e178c656e774ea2768ba5b979f3",
  "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAia2cR7h3zZzv6hqU5cB3\nxvj7SfxZ8OgF8b5Tlaybb0dmbGLcefAZ/QlSUQIHSeRwNQL8Feexur6ivMyq21dY\npYVe1Up9pnE5vW/9+yTn1TPcKfHZTSc+Ixuh0CFuFgkdcAv3J0lIb0J0I0GipEgA\nwQsvsOKENbKn0/Gpz+ER2cyPTRwX9TjytyxXiHXRpWxOSTVK469sMM7043Pof6/g\nzFJ0y4Oy3315+luOB4j7sPOQ88rVorOs6ZZiiQF1suJOPqIEG/70rzjXU7Y4Hj9W\nsxeG28IXzm9OrpfApN0y05Kd3L8mkJob41TzeMhSn6lyradix+G5rQEzUw76idwq\nGwIDAQAB\n-----END PUBLIC KEY-----\n",
  "nonce": "57af2e6b47b7d1b9d1122576e33490d3",
  "expires": 1743526884659
}
```


