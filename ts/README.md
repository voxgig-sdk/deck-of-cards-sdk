# DeckOfCards TypeScript SDK



The TypeScript SDK for the DeckOfCards API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Deck()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/deck-of-cards-sdk/releases](https://github.com/voxgig-sdk/deck-of-cards-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { DeckOfCardsSDK } from '@voxgig-sdk/deck-of-cards'

const client = new DeckOfCardsSDK()
```

### 3. Load a deck

`load()` returns the entity directly and throws on failure:

```ts
try {
  const deck = await client.Deck().load({ id: 'example_id' })
  console.log(deck)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const deck = await client.Deck().load({ id: "example_id" })
  console.log(deck)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = DeckOfCardsSDK.test()

const deck = await client.Deck().load({ id: 'test01' })
// deck is a bare entity populated with mock response data
console.log(deck)
```

You can also use the instance method:

```ts
const client = new DeckOfCardsSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Deck()

// First call runs the operation and stores its result
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new DeckOfCardsSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DECK_OF_CARDS_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### DeckOfCardsSDK

#### Constructor

```ts
new DeckOfCardsSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Deck(data?)` | `DeckEntity` | Create a Deck entity instance. |
| `Draw(data?)` | `DrawEntity` | Create a Draw entity instance. |
| `Pile(data?)` | `PileEntity` | Create a Pile entity instance. |
| `PileDraw(data?)` | `PileDrawEntity` | Create a PileDraw entity instance. |
| `PileList(data?)` | `PileListEntity` | Create a PileList entity instance. |
| `Return(data?)` | `ReturnEntity` | Create a Return entity instance. |
| `tester(testopts?, sdkopts?)` | `DeckOfCardsSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `DeckOfCardsSDK.test(testopts?, sdkopts?)` | `DeckOfCardsSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DeckOfCardsSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Deck

| Field | Description |
| --- | --- |
| `deck_id` |  |
| `remaining` |  |
| `shuffled` |  |
| `success` |  |

Operations: load.

API path: `/deck/new/shuffle/`

#### Draw

| Field | Description |
| --- | --- |
| `code` |  |
| `image` |  |
| `suit` |  |
| `value` |  |

Operations: list.

API path: `/deck/{deck_id}/draw/`

#### Pile

| Field | Description |
| --- | --- |
| `deck_id` |  |
| `pile` |  |
| `remaining` |  |
| `success` |  |

Operations: load.

API path: `/deck/{deck_id}/pile/{pile_name}/add/`

#### PileDraw

| Field | Description |
| --- | --- |
| `code` |  |
| `image` |  |
| `suit` |  |
| `value` |  |

Operations: list.

API path: `/deck/{deck_id}/pile/{pile_name}/draw/`

#### PileList

| Field | Description |
| --- | --- |
| `deck_id` |  |
| `pile` |  |
| `remaining` |  |
| `success` |  |

Operations: load.

API path: `/deck/{deck_id}/pile/{pile_name}/list/`

#### Return

| Field | Description |
| --- | --- |
| `deck_id` |  |
| `pile` |  |
| `remaining` |  |
| `shuffled` |  |
| `success` |  |

Operations: load.

API path: `/deck/{deck_id}/pile/{pile_name}/return/`



## Entities


### Deck

Create an instance: `const deck = client.Deck()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deck_id` | `string` |  |
| `remaining` | `number` |  |
| `shuffled` | `boolean` |  |
| `success` | `boolean` |  |

#### Example: Load

```ts
const deck = await client.Deck().load({ id: 'deck_id' })
```


### Draw

Create an instance: `const draw = client.Draw()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `image` | `string` |  |
| `suit` | `string` |  |
| `value` | `string` |  |

#### Example: List

```ts
const draws = await client.Draw().list()
```


### Pile

Create an instance: `const pile = client.Pile()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deck_id` | `string` |  |
| `pile` | `Record<string, any>` |  |
| `remaining` | `number` |  |
| `success` | `boolean` |  |

#### Example: Load

```ts
const pile = await client.Pile().load()
```


### PileDraw

Create an instance: `const pile_draw = client.PileDraw()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `image` | `string` |  |
| `suit` | `string` |  |
| `value` | `string` |  |

#### Example: List

```ts
const pile_draws = await client.PileDraw().list()
```


### PileList

Create an instance: `const pile_list = client.PileList()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deck_id` | `string` |  |
| `pile` | `Record<string, any>` |  |
| `remaining` | `number` |  |
| `success` | `boolean` |  |

#### Example: Load

```ts
const pile_list = await client.PileList().load()
```


### Return

Create an instance: `const return_ = client.Return()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deck_id` | `string` |  |
| `pile` | `Record<string, any>` |  |
| `remaining` | `number` |  |
| `shuffled` | `boolean` |  |
| `success` | `boolean` |  |

#### Example: Load

```ts
const return_ = await client.Return().load()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
deck-of-cards/
├── src/
│   ├── DeckOfCardsSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { DeckOfCardsSDK } from '@voxgig-sdk/deck-of-cards'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const deck = client.Deck()
await deck.load({ id: "example_id" })

// deck.data() now returns the deck data from the last `load`
// deck.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
