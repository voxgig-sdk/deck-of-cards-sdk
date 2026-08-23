# DeckOfCards TypeScript SDK Reference

Complete API reference for the DeckOfCards TypeScript SDK.


## DeckOfCardsSDK

### Constructor

```ts
new DeckOfCardsSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DeckOfCardsSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = DeckOfCardsSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `DeckOfCardsSDK` instance in test mode.


### Instance Methods

#### `Deck(data?: object)`

Create a new `Deck` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeckEntity` instance.

#### `Draw(data?: object)`

Create a new `Draw` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DrawEntity` instance.

#### `Pile(data?: object)`

Create a new `Pile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PileEntity` instance.

#### `PileDraw(data?: object)`

Create a new `PileDraw` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PileDrawEntity` instance.

#### `PileList(data?: object)`

Create a new `PileList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PileListEntity` instance.

#### `Return(data?: object)`

Create a new `Return` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReturnEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `DeckOfCardsSDK.test()`.

**Returns:** `DeckOfCardsSDK` instance in test mode.


---

## DeckEntity

```ts
const deck = client.Deck()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | `string` | No | Unique identifier for the deck |
| `remaining` | `number` | No | Number of cards remaining in the deck |
| `shuffled` | `boolean` | No | Whether the deck is shuffled |
| `success` | `boolean` | No | Whether the operation was successful |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `new` | `/deck/new/` | `client.Deck().load({ $action: 'new', ... })` |
| `shuffle` | `/deck/{deck_id}/shuffle/` | `client.Deck().load({ $action: 'shuffle', ... })` |

An action returns that action's OWN response, which is not necessarily a
Deck record — check the API definition for its shape.

```ts
const result = await client.Deck().load({
  $action: 'new',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Deck().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeckEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeckOfCardsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DrawEntity

```ts
const draw = client.Draw()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | `string` | No | URL to the PNG image of the card |
| `images` | `Record<string, any>` | No |  |
| `suit` | `string` | No | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | `string` | No | Card value (e.g., ACE, 2, 10, KING) |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Draw().list({ deck_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DrawEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeckOfCardsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PileEntity

```ts
const pile = client.Pile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `remaining` | `number` | No | Number of cards remaining in the pile |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `add` | `/deck/{deck_id}/pile/{pile_name}/add/` | `client.Pile().load({ $action: 'add', ... })` |
| `shuffle` | `/deck/{deck_id}/pile/{pile_name}/shuffle/` | `client.Pile().load({ $action: 'shuffle', ... })` |

An action returns that action's OWN response, which is not necessarily a
Pile record — check the API definition for its shape.

```ts
const result = await client.Pile().load({
  $action: 'add',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Pile().load({ deck_id: 'deck_id', pile_name: 'pile_name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PileEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeckOfCardsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PileDrawEntity

```ts
const pile_draw = client.PileDraw()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | `string` | No | URL to the PNG image of the card |
| `images` | `Record<string, any>` | No |  |
| `suit` | `string` | No | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | `string` | No | Card value (e.g., ACE, 2, 10, KING) |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PileDraw().list({ deck_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PileDrawEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeckOfCardsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PileListEntity

```ts
const pile_list = client.PileList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cards` | `any[]` | No | Array of cards in the pile |
| `remaining` | `number` | No | Number of cards remaining in the pile |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PileList().load({ deck_id: 'deck_id', pile_name: 'pile_name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PileListEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeckOfCardsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReturnEntity

```ts
const return_ = client.Return()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `remaining` | `number` | No | Number of cards remaining in the pile |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Return().load({ deck_id: 'deck_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReturnEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeckOfCardsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new DeckOfCardsSDK({
  feature: {
    test: { active: true },
  }
})
```

