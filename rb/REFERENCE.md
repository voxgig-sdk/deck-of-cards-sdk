# DeckOfCards Ruby SDK Reference

Complete API reference for the DeckOfCards Ruby SDK.


## DeckOfCardsSDK

### Constructor

```ruby
require_relative 'DeckOfCards_sdk'

client = DeckOfCardsSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DeckOfCardsSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = DeckOfCardsSDK.test
```


### Instance Methods

#### `Deck(data = nil)`

Create a new `Deck` entity instance. Pass `nil` for no initial data.

#### `Draw(data = nil)`

Create a new `Draw` entity instance. Pass `nil` for no initial data.

#### `Pile(data = nil)`

Create a new `Pile` entity instance. Pass `nil` for no initial data.

#### `PileDraw(data = nil)`

Create a new `PileDraw` entity instance. Pass `nil` for no initial data.

#### `PileList(data = nil)`

Create a new `PileList` entity instance. Pass `nil` for no initial data.

#### `Return(data = nil)`

Create a new `Return` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## DeckEntity

```ruby
deck = client.Deck
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | `String` | No | Unique identifier for the deck |
| `id` | `String` | No |  |
| `remaining` | `Integer` | No | Number of cards remaining in the deck |
| `shuffled` | `Boolean` | No | Whether the deck is shuffled |
| `success` | `Boolean` | No | Whether the operation was successful |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Deck.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeckEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DrawEntity

```ruby
draw = client.Draw
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `String` | No | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | `String` | No | URL to the PNG image of the card |
| `images` | `Hash` | No |  |
| `suit` | `String` | No | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | `String` | No | Card value (e.g., ACE, 2, 10, KING) |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Draw.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DrawEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PileEntity

```ruby
pile = client.Pile
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `remaining` | `Integer` | No | Number of cards remaining in the pile |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Pile.load({ "deck_id" => "deck_id", "pile_name" => "pile_name" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PileDrawEntity

```ruby
pile_draw = client.PileDraw
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `String` | No | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | `String` | No | URL to the PNG image of the card |
| `images` | `Hash` | No |  |
| `suit` | `String` | No | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | `String` | No | Card value (e.g., ACE, 2, 10, KING) |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PileDraw.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PileDrawEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PileListEntity

```ruby
pile_list = client.PileList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cards` | `Array` | No | Array of cards in the pile |
| `remaining` | `Integer` | No | Number of cards remaining in the pile |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PileList.load({ "deck_id" => "deck_id", "pile_name" => "pile_name" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PileListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReturnEntity

```ruby
return_ = client.Return
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `remaining` | `Integer` | No | Number of cards remaining in the pile |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Return.load({ "deck_id" => "deck_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReturnEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = DeckOfCardsSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

