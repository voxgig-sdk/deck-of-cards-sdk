# DeckOfCards Lua SDK Reference

Complete API reference for the DeckOfCards Lua SDK.


## DeckOfCardsSDK

### Constructor

```lua
local sdk = require("deck-of-cards_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Deck(data)`

Create a new `Deck` entity instance. Pass `nil` for no initial data.

#### `Draw(data)`

Create a new `Draw` entity instance. Pass `nil` for no initial data.

#### `Pile(data)`

Create a new `Pile` entity instance. Pass `nil` for no initial data.

#### `PileDraw(data)`

Create a new `PileDraw` entity instance. Pass `nil` for no initial data.

#### `PileList(data)`

Create a new `PileList` entity instance. Pass `nil` for no initial data.

#### `Return(data)`

Create a new `Return` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## DeckEntity

```lua
local deck = client:Deck(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | `string` | No | Unique identifier for the deck |
| `remaining` | `number` | No | Number of cards remaining in the deck |
| `shuffled` | `boolean` | No | Whether the deck is shuffled |
| `success` | `boolean` | No | Whether the operation was successful |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Deck():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeckEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DrawEntity

```lua
local draw = client:Draw(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | `string` | No | URL to the PNG image of the card |
| `images` | `table` | No |  |
| `suit` | `string` | No | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | `string` | No | Card value (e.g., ACE, 2, 10, KING) |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Draw():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DrawEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PileEntity

```lua
local pile = client:Pile(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `remaining` | `number` | No | Number of cards remaining in the pile |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Pile():load({ deck_id = "deck_id", pile_name = "pile_name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PileDrawEntity

```lua
local pile_draw = client:PileDraw(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | `string` | No | URL to the PNG image of the card |
| `images` | `table` | No |  |
| `suit` | `string` | No | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | `string` | No | Card value (e.g., ACE, 2, 10, KING) |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PileDraw():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PileDrawEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PileListEntity

```lua
local pile_list = client:PileList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cards` | `table` | No | Array of cards in the pile |
| `remaining` | `number` | No | Number of cards remaining in the pile |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PileList():load({ deck_id = "deck_id", pile_name = "pile_name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PileListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReturnEntity

```lua
local return_ = client:Return(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `remaining` | `number` | No | Number of cards remaining in the pile |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Return():load({ deck_id = "deck_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReturnEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

