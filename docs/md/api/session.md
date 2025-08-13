---
tag: session
---

# session

### POST /session-handshake

Create a handshake token for the client to use for secure authentication

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| x-api-key | string | ✓ | header | API key header |
| x-foundry-url | string | ✓ | header | Foundry URL header |
| x-username | string | ✓ | header | Username header |
| x-world-name | string |  | header | World name header |

#### Returns

**object** - Handshake token and encryption details

#### Example Request

```http
POST /session-handshake
Content-Type: application/json


```

---

### POST /start-session

Start a headless Foundry session using puppeteer

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| handshakeToken | string | ✓ | body | The token received from session-handshake |
| encryptedPassword | string | ✓ | body | Password encrypted with the public key |
| x-api-key | string | ✓ | header | API key header |

#### Returns

**object** - Session information including sessionId and clientId

#### Example Request

```http
POST /start-session
Content-Type: application/json

{
  "handshakeToken": "example-value",
  "encryptedPassword": "example-value"
}
```

---

### DELETE /end-session

Stop a headless Foundry session

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| sessionId | string | ✓ | query | The ID of the session to end |
| x-api-key | string | ✓ | header | API key header |

#### Returns

**object** - Status of the operation

#### Example Request

```http
DELETE /end-session
Content-Type: application/json


```

---

### GET /session

Get all active headless Foundry sessions

#### Parameters

| Name | Type | Required | Source | Description |
|------|------|----------|--------|--------------|
| x-api-key | string | ✓ | header | API key header |

#### Returns

**object** - List of active sessions for the current API key

#### Example Request

```http
GET /session

```

---

