## **POST** /start-session

Starts a headless Foundry session. Must provide a handshake token and the encrypted password.
The postman file includes scripts that automate this.

This is for interacting with Foundry without opening a separate browser. The connection is slower using a headless browser, and /sheet is not currently supported in headless mode.  Intended for cases when there is no user actively logged in to Foundry when sending API requests.

The API key in the Foundry REST API Module in that world *must* be the same one used to create the headless session.

Each API key is limited to one running headless session at a time.

After 10 minutes of inactivity a headless session will be closed.

### Request

#### Request URL

```
$baseUrl/start-session
```

#### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |
| x-api-key | \{\{apiKey\}\} |   |

#### Request Payload

```json
{
  "handshakeToken": "$handshakeToken",
  "encryptedPassword": "$encryptedPassword"
}
```

### Response

#### Status: 200 OK

```json
{
  "success": true,
  "message": "Foundry session started successfully",
  "sessionId": "b536aee8-67f3-42d0-9917-f56e6d71bd03",
  "clientId": "foundry-DKL4ZKK80lUZFgSJ"
}
```

## Examples

***DO NOT USE EXAMPLES IN PRODUCTION CODE. NEVER HARD CODE SENSITIVE DATA LIKE API KEYS OR PASSWORDS***

### Node.js
```js
const axios = require('axios');
const crypto = require('crypto');

const BASE_URL = 'https://foundryvtt-rest-api-relay.fly.dev';
const API_KEY = 'my-api-key'; // Replace with your actual API key
const FOUNDRY_URL = 'http://localhost:30000'; // Replace with your actual Foundry URL
const USERNAME = 'Gamemaster';
const PASSWORD = 'password'; // Replace with your actual password
const WORLD_NAME = 'My World'; // Replace with your actual world name

async function startSession() {
    try {
        // Step 1: Handshake
        console.log('Requesting handshake...');
        const handshakeResponse = await axios.post(`${BASE_URL}/session-handshake`, {}, {
            headers: {
                'x-api-key': API_KEY,
                'x-foundry-url': FOUNDRY_URL,
                'x-username': USERNAME,
                'x-world-name': WORLD_NAME
            }
        });

        const { token, publicKey, nonce } = handshakeResponse.data;
        console.log('Handshake successful!');

        // Step 2: Encrypt password and nonce
        const dataToEncrypt = JSON.stringify({ password: PASSWORD, nonce });
        const encryptedPassword = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha1'
            },
            Buffer.from(dataToEncrypt)
        ).toString('base64');

        console.log('Password encrypted successfully!');

        // Step 3: Start session
        console.log('Starting session...');
        const sessionResponse = await axios.post(`${BASE_URL}/start-session`, {
            handshakeToken: token,
            encryptedPassword
        }, {
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        console.log('Session started successfully:', sessionResponse.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

startSession();
```

## Python
```python
import requests
import json
import base64
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.serialization import load_pem_public_key

BASE_URL = 'https://foundryvtt-rest-api-relay.fly.dev'
API_KEY = 'my-api-key' # Replace with your actual API key
FOUNDRY_URL = 'http://localhost:30000' # Replace with your actual Foundry VTT URL
USERNAME = 'Gamemaster'
PASSWORD = 'password' # Replace with your actual password
WORLD_NAME = 'My World' # Replace with your actual world name

def start_session():
    try:
        # Step 1: Handshake
        print('Requesting handshake...')
        handshake_response = requests.post(
            f'{BASE_URL}/session-handshake',
            headers={
                'x-api-key': API_KEY,
                'x-foundry-url': FOUNDRY_URL,
                'x-username': USERNAME,
                'x-world-name': WORLD_NAME
            }
        )
        handshake_data = handshake_response.json()
        token = handshake_data['token']
        public_key_pem = handshake_data['publicKey']
        nonce = handshake_data['nonce']
        print('Handshake successful!')

        # Step 2: Encrypt password and nonce
        print('Encrypting password...')
        public_key = load_pem_public_key(public_key_pem.encode('utf-8'))
        data_to_encrypt = json.dumps({ 'password': PASSWORD, 'nonce': nonce }).encode('utf-8')

        encrypted = public_key.encrypt(
            data_to_encrypt,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA1()),
                algorithm=hashes.SHA1(),
                label=None
            )
        )
        encrypted_password = base64.b64encode(encrypted).decode('utf-8')
        print('Password encrypted successfully!')

        # Step 3: Start session
        print('Starting session...')
        session_response = requests.post(
            f'{BASE_URL}/start-session',
            headers={
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            json={
                'handshakeToken': token,
                'encryptedPassword': encrypted_password
            }
        )
        session_data = session_response.json()
        print('Session started successfully:', session_data)
    except Exception as e:
        print('Error:', str(e))

start_session()
```