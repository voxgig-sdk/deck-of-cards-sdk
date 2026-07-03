# DeckOfCards SDK

Deck of Cards API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install deck-of-cards
```

**Python**
```bash
pip install deck-of-cards-sdk
```

**PHP**
```bash
composer require voxgig/deck-of-cards-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/deck-of-cards-sdk/go
```

**Ruby**
```bash
gem install deck-of-cards-sdk
```

**Lua**
```bash
luarocks install deck-of-cards-sdk
```

## Quickstart

### TypeScript

```ts
import { DeckOfCardsSDK } from 'deck-of-cards'

const client = new DeckOfCardsSDK({
  apikey: process.env.DECK-OF-CARDS_APIKEY,
})

// Load deck data
const deck = await client.Deck().load({})
console.log(deck.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o deck-of-cards-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "deck-of-cards": {
      "command": "/abs/path/to/deck-of-cards-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Deck** |  | `/deck/new/shuffle/` |
| **Draw** |  | `/deck/{deck_id}/draw/` |
| **Pile** |  | `/deck/{deck_id}/pile/{pile_name}/add/` |
| **PileDraw** |  | `/deck/{deck_id}/pile/{pile_name}/draw/` |
| **PileList** |  | `/deck/{deck_id}/pile/{pile_name}/list/` |
| **Return** |  | `/deck/{deck_id}/pile/{pile_name}/return/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from deckofcards_sdk import DeckOfCardsSDK

client = DeckOfCardsSDK({
    "apikey": os.environ.get("DECK-OF-CARDS_APIKEY"),
})


# Load a specific deck
deck, err = client.Deck().load({"id": "example_id"})
print(deck)
```

### PHP

```php
<?php
require_once 'deckofcards_sdk.php';

$client = new DeckOfCardsSDK([
    "apikey" => getenv("DECK-OF-CARDS_APIKEY"),
]);


// Load a specific deck
[$deck, $err] = $client->Deck()->load(["id" => "example_id"]);
print_r($deck);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/deck-of-cards-sdk/go"

client := sdk.NewDeckOfCardsSDK(map[string]any{
    "apikey": os.Getenv("DECK-OF-CARDS_APIKEY"),
})

// Load deck data
deck, err := client.Deck(nil).Load(map[string]any{}, nil)
fmt.Println(deck)
```

### Ruby

```ruby
require_relative "DeckOfCards_sdk"

client = DeckOfCardsSDK.new({
  "apikey" => ENV["DECK-OF-CARDS_APIKEY"],
})


# Load a specific deck
deck, err = client.Deck().load({ "id" => "example_id" })
puts deck
```

### Lua

```lua
local sdk = require("deck-of-cards_sdk")

local client = sdk.new({
  apikey = os.getenv("DECK-OF-CARDS_APIKEY"),
})


-- Load a specific deck
local deck, err = client:Deck():load({ id = "example_id" })
print(deck)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = DeckOfCardsSDK.test()
const result = await client.Deck().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = DeckOfCardsSDK.test()
result, err = client.Deck().load({"id": "test01"})
```

### PHP

```php
$client = DeckOfCardsSDK::test();
[$result, $err] = $client->Deck()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Deck(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = DeckOfCardsSDK.test
result, err = client.Deck().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Deck():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the Deck of Cards API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
