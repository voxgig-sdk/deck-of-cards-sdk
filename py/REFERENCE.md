# DeckOfCards Python SDK Reference

Complete API reference for the DeckOfCards Python SDK.


## DeckOfCardsSDK

### Constructor

```python
from deck-of-cards_sdk import DeckOfCardsSDK

client = DeckOfCardsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
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

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## DeckEntity

```python
deck = client.Deck()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | ``$STRING`` | No |  |
| `remaining` | ``$INTEGER`` | No |  |
| `shuffled` | ``$BOOLEAN`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Deck().load({"id": "deck_id"})
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
| `code` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `suit` | ``$STRING`` | No |  |
| `value` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Draw().list({})
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
| `deck_id` | ``$STRING`` | No |  |
| `pile` | ``$OBJECT`` | No |  |
| `remaining` | ``$INTEGER`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Pile().load({"id": "pile_id"})
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
| `code` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `suit` | ``$STRING`` | No |  |
| `value` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.PileDraw().list({})
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
| `deck_id` | ``$STRING`` | No |  |
| `pile` | ``$OBJECT`` | No |  |
| `remaining` | ``$INTEGER`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.PileList().load({"id": "pile_list_id"})
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
return = client.Return()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | ``$STRING`` | No |  |
| `pile` | ``$OBJECT`` | No |  |
| `remaining` | ``$INTEGER`` | No |  |
| `shuffled` | ``$BOOLEAN`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Return().load({"id": "return_id"})
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

