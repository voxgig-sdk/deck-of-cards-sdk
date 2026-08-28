# DeckOfCards Python SDK Reference

Complete API reference for the DeckOfCards Python SDK.


## DeckOfCardsSDK

### Constructor

```python
from deckofcards_sdk import DeckOfCardsSDK

client = DeckOfCardsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DeckOfCardsSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = DeckOfCardsSDK.test()
```


### Instance Methods

#### `Deck(data=None)`

Create a new `DeckEntity` instance. Pass `None` for no initial data.

#### `Draw(data=None)`

Create a new `DrawEntity` instance. Pass `None` for no initial data.

#### `Pile(data=None)`

Create a new `PileEntity` instance. Pass `None` for no initial data.

#### `PileDraw(data=None)`

Create a new `PileDrawEntity` instance. Pass `None` for no initial data.

#### `PileList(data=None)`

Create a new `PileListEntity` instance. Pass `None` for no initial data.

#### `Return(data=None)`

Create a new `ReturnEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## DeckEntity

```python
deck = client.Deck()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | `str` | No | Unique identifier for the deck |
| `id` | `str` | No |  |
| `remaining` | `int` | No | Number of cards remaining in the deck |
| `shuffled` | `bool` | No | Whether the deck is shuffled |
| `success` | `bool` | No | Whether the operation was successful |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Deck().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeckEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DrawEntity

```python
draw = client.Draw()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | No | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | `str` | No | URL to the PNG image of the card |
| `images` | `dict` | No |  |
| `suit` | `str` | No | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | `str` | No | Card value (e.g., ACE, 2, 10, KING) |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Draw().list({"deck_id": "example"})
for draw in results:
    print(draw)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DrawEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PileEntity

```python
pile = client.Pile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `remaining` | `int` | No | Number of cards remaining in the pile |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Pile().load({"deck_id": "deck_id", "pile_name": "pile_name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PileDrawEntity

```python
pile_draw = client.PileDraw()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | No | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | `str` | No | URL to the PNG image of the card |
| `images` | `dict` | No |  |
| `suit` | `str` | No | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | `str` | No | Card value (e.g., ACE, 2, 10, KING) |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PileDraw().list({"deck_id": "example"})
for pile_draw in results:
    print(pile_draw)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PileDrawEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PileListEntity

```python
pile_list = client.PileList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cards` | `list` | No | Array of cards in the pile |
| `remaining` | `int` | No | Number of cards remaining in the pile |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PileList().load({"deck_id": "deck_id", "pile_name": "pile_name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PileListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReturnEntity

```python
return_ = client.Return()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `remaining` | `int` | No | Number of cards remaining in the pile |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Return().load({"deck_id": "deck_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReturnEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = DeckOfCardsSDK({
    "feature": {
        "test": {"active": True},
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

