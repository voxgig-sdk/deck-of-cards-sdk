# DeckOfCards Golang SDK Reference

Complete API reference for the DeckOfCards Golang SDK.


## DeckOfCardsSDK

### Constructor

```go
func NewDeckOfCardsSDK(options map[string]any) *DeckOfCardsSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *DeckOfCardsSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *DeckOfCardsSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Deck(data map[string]any) DeckOfCardsEntity`

Create a new `Deck` entity instance. Pass `nil` for no initial data.

#### `Draw(data map[string]any) DeckOfCardsEntity`

Create a new `Draw` entity instance. Pass `nil` for no initial data.

#### `Pile(data map[string]any) DeckOfCardsEntity`

Create a new `Pile` entity instance. Pass `nil` for no initial data.

#### `PileDraw(data map[string]any) DeckOfCardsEntity`

Create a new `PileDraw` entity instance. Pass `nil` for no initial data.

#### `PileList(data map[string]any) DeckOfCardsEntity`

Create a new `PileList` entity instance. Pass `nil` for no initial data.

#### `Return(data map[string]any) DeckOfCardsEntity`

Create a new `Return` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## DeckEntity

```go
deck := client.Deck(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | ``$STRING`` | No |  |
| `remaining` | ``$INTEGER`` | No |  |
| `shuffled` | ``$BOOLEAN`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Deck(nil).Load(map[string]any{"id": "deck_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeckEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DrawEntity

```go
draw := client.Draw(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `suit` | ``$STRING`` | No |  |
| `value` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Draw(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DrawEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PileEntity

```go
pile := client.Pile(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | ``$STRING`` | No |  |
| `pile` | ``$OBJECT`` | No |  |
| `remaining` | ``$INTEGER`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Pile(nil).Load(map[string]any{"id": "pile_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PileEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PileDrawEntity

```go
pile_draw := client.PileDraw(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `suit` | ``$STRING`` | No |  |
| `value` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PileDraw(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PileDrawEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PileListEntity

```go
pile_list := client.PileList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | ``$STRING`` | No |  |
| `pile` | ``$OBJECT`` | No |  |
| `remaining` | ``$INTEGER`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PileList(nil).Load(map[string]any{"id": "pile_list_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PileListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReturnEntity

```go
return := client.Return(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Return(nil).Load(map[string]any{"id": "return_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReturnEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewDeckOfCardsSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

