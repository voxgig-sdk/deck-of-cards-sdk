# DeckOfCards PHP SDK



The PHP SDK for the DeckOfCards API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Deck()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/deck-of-cards-sdk/releases](https://github.com/voxgig-sdk/deck-of-cards-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'deckofcards_sdk.php';

$client = new DeckOfCardsSDK();
```

### 3. Load a pile

Pile is nested under deck, so provide the `deck_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Pile record (throws on error).
    $pile = $client->Pile()->load(["deck_id" => "example_deck_id", "pile_name" => "example_pile_name"]);
    print_r($pile);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $deck = $client->Deck()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = DeckOfCardsSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$deck = $client->Deck()->load();
print_r($deck);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new DeckOfCardsSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
DECK_OF_CARDS_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### DeckOfCardsSDK

```php
require_once 'deckofcards_sdk.php';
$client = new DeckOfCardsSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = DeckOfCardsSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### DeckOfCardsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Deck` | `($data): DeckEntity` | Create a Deck entity instance. |
| `Draw` | `($data): DrawEntity` | Create a Draw entity instance. |
| `Pile` | `($data): PileEntity` | Create a Pile entity instance. |
| `PileDraw` | `($data): PileDrawEntity` | Create a PileDraw entity instance. |
| `PileList` | `($data): PileListEntity` | Create a PileList entity instance. |
| `Return` | `($data): ReturnEntity` | Create a Return entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Deck

| Field | Description |
| --- | --- |
| `deck_id` | Unique identifier for the deck |
| `id` |  |
| `remaining` | Number of cards remaining in the deck |
| `shuffled` | Whether the deck is shuffled |
| `success` | Whether the operation was successful |

Operations: Load.

API path: `/deck/new/shuffle/`

#### Draw

| Field | Description |
| --- | --- |
| `code` | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | URL to the PNG image of the card |
| `images` |  |
| `suit` | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | Card value (e.g., ACE, 2, 10, KING) |

Operations: List.

API path: `/deck/{deck_id}/draw/`

#### Pile

| Field | Description |
| --- | --- |
| `remaining` | Number of cards remaining in the pile |

Operations: Load.

API path: `/deck/{deck_id}/pile/{pile_name}/add/`

#### PileDraw

| Field | Description |
| --- | --- |
| `code` | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | URL to the PNG image of the card |
| `images` |  |
| `suit` | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | Card value (e.g., ACE, 2, 10, KING) |

Operations: List.

API path: `/deck/{deck_id}/pile/{pile_name}/draw/`

#### PileList

| Field | Description |
| --- | --- |
| `cards` | Array of cards in the pile |
| `remaining` | Number of cards remaining in the pile |

Operations: Load.

API path: `/deck/{deck_id}/pile/{pile_name}/list/`

#### Return

| Field | Description |
| --- | --- |
| `remaining` | Number of cards remaining in the pile |

Operations: Load.

API path: `/deck/{deck_id}/pile/{pile_name}/return/`



## Entities


### Deck

Create an instance: `$deck = $client->Deck();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deck_id` | `string` | Unique identifier for the deck |
| `id` | `string` |  |
| `remaining` | `int` | Number of cards remaining in the deck |
| `shuffled` | `bool` | Whether the deck is shuffled |
| `success` | `bool` | Whether the operation was successful |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Deck record (throws on error).
$deck = $client->Deck()->load();
```


### Draw

Create an instance: `$draw = $client->Draw();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | `string` | URL to the PNG image of the card |
| `images` | `array` |  |
| `suit` | `string` | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | `string` | Card value (e.g., ACE, 2, 10, KING) |

#### Example: List

```php
// list() returns an array of Draw records (throws on error).
$draws = $client->Draw()->list();
```


### Pile

Create an instance: `$pile = $client->Pile();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `remaining` | `int` | Number of cards remaining in the pile |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Pile record (throws on error).
$pile = $client->Pile()->load(["deck_id" => "deck_id", "pile_name" => "pile_name"]);
```


### PileDraw

Create an instance: `$pile_draw = $client->PileDraw();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | Two-character card code (e.g., AS for Ace of Spades) |
| `image` | `string` | URL to the PNG image of the card |
| `images` | `array` |  |
| `suit` | `string` | Card suit (SPADES, DIAMONDS, CLUBS, HEARTS) |
| `value` | `string` | Card value (e.g., ACE, 2, 10, KING) |

#### Example: List

```php
// list() returns an array of PileDraw records (throws on error).
$pile_draws = $client->PileDraw()->list();
```


### PileList

Create an instance: `$pile_list = $client->PileList();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cards` | `array` | Array of cards in the pile |
| `remaining` | `int` | Number of cards remaining in the pile |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PileList record (throws on error).
$pile_list = $client->PileList()->load(["deck_id" => "deck_id", "pile_name" => "pile_name"]);
```


### Return

Create an instance: `$return = $client->Return();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `remaining` | `int` | Number of cards remaining in the pile |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Return record (throws on error).
$return = $client->Return()->load(["deck_id" => "deck_id"]);
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── deckofcards_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`deckofcards_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$deck = $client->Deck();
$deck->load();

// $deck->data_get() now returns the deck data from the last load
// $deck->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
