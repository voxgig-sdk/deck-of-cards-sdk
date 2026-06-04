# DeckOfCards SDK

Shuffle, draw, and manage virtual playing-card decks and piles over a simple HTTP API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Deck of Cards API

The [Deck of Cards API](https://www.deckofcardsapi.com/) is a small RESTful service that simulates one or more standard 52-card playing decks. It is maintained by Chase Roberts and is widely used as a teaching example for HTTP clients and card-game tutorials.

What you get from the API:

- Create a brand-new deck (`/api/deck/new/`) or a freshly shuffled deck (`/api/deck/new/shuffle/`).
- Draw cards from the main deck (`/api/deck/<deck_id>/draw/`) and reshuffle remaining cards (`/api/deck/<deck_id>/shuffle/`).
- Build and manage named piles per deck: add (`/pile/<pile_name>/add/`), draw (`/pile/<pile_name>/draw/`), list (`/pile/<pile_name>/list/`), and shuffle (`/pile/<pile_name>/shuffle/`) cards in a pile.
- Return drawn or piled cards back to the main deck (`/api/deck/<deck_id>/return/`).
- Support for partial decks (selected card codes) when creating a new deck.

Operational notes: no authentication or API key is required and CORS is enabled on the endpoints. Deck identifiers expire after roughly two weeks of inactivity, so long-lived games should refresh or recreate decks as needed.

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

## 30-second quickstart

### TypeScript

```ts
import { DeckOfCardsSDK } from 'deck-of-cards'

const client = new DeckOfCardsSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

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
| **Deck** | A virtual deck of cards created and managed under `/api/deck/new/` and `/api/deck/<deck_id>/`, optionally shuffled at creation or built from a partial set of card codes. | `/deck/new/shuffle/` |
| **Draw** | Drawing cards from the main deck via `/api/deck/<deck_id>/draw/`, which removes the requested number of cards and returns their codes, suits, values, and images. | `/deck/{deck_id}/draw/` |
| **Pile** | A named sub-collection of cards belonging to a deck, addressed as `/api/deck/<deck_id>/pile/<pile_name>/`, used to model hands, discard stacks, or any grouping of cards. | `/deck/{deck_id}/pile/{pile_name}/add/` |
| **PileDraw** | Drawing cards out of a specific pile via `/api/deck/<deck_id>/pile/<pile_name>/draw/`, optionally by count or by specific card codes. | `/deck/{deck_id}/pile/{pile_name}/draw/` |
| **PileList** | Listing the current contents of a named pile via `/api/deck/<deck_id>/pile/<pile_name>/list/` so clients can inspect which cards it holds. | `/deck/{deck_id}/pile/{pile_name}/list/` |
| **Return** | Returning previously drawn cards (from the main deck or from piles) back into the deck via `/api/deck/<deck_id>/return/`, so they can be drawn again. | `/deck/{deck_id}/pile/{pile_name}/return/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from deckofcards_sdk import DeckOfCardsSDK

client = DeckOfCardsSDK({})


# Load a specific deck
deck, err = client.Deck(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'deckofcards_sdk.php';

$client = new DeckOfCardsSDK([]);


// Load a specific deck
[$deck, $err] = $client->Deck(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/deck-of-cards-sdk/go"

client := sdk.NewDeckOfCardsSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "DeckOfCards_sdk"

client = DeckOfCardsSDK.new({})


# Load a specific deck
deck, err = client.Deck(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("deck-of-cards_sdk")

local client = sdk.new({})


-- Load a specific deck
local deck, err = client:Deck(nil):load(
  { id = "example_id" }, nil
)
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
client = DeckOfCardsSDK.test(None, None)
result, err = client.Deck(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = DeckOfCardsSDK::test(null, null);
[$result, $err] = $client->Deck(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Deck(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = DeckOfCardsSDK.test(nil, nil)
result, err = client.Deck(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Deck(nil):load(
  { id = "test01" }, nil
)
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

## Using the Deck of Cards API

- Upstream: [https://www.deckofcardsapi.com/](https://www.deckofcardsapi.com/)

- The Deck of Cards API does not publish an explicit licence on its homepage.
- Created and maintained by Chase Roberts.
- Treat the service as a free, best-effort hobby API; check the homepage for current terms before relying on it in production.

---

Generated from the Deck of Cards API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
