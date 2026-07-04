# DeckOfCards PHP SDK Reference

Complete API reference for the DeckOfCards PHP SDK.


## DeckOfCardsSDK

### Constructor

```php
require_once __DIR__ . '/deck-of-cards_sdk.php';

$client = new DeckOfCardsSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DeckOfCardsSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = DeckOfCardsSDK::test();
```


### Instance Methods

#### `Deck($data = null)`

Create a new `DeckEntity` instance. Pass `null` for no initial data.

#### `Draw($data = null)`

Create a new `DrawEntity` instance. Pass `null` for no initial data.

#### `Pile($data = null)`

Create a new `PileEntity` instance. Pass `null` for no initial data.

#### `PileDraw($data = null)`

Create a new `PileDrawEntity` instance. Pass `null` for no initial data.

#### `PileList($data = null)`

Create a new `PileListEntity` instance. Pass `null` for no initial data.

#### `Return($data = null)`

Create a new `ReturnEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## DeckEntity

```php
$deck = $client->Deck();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | ``$STRING`` | No |  |
| `remaining` | ``$INTEGER`` | No |  |
| `shuffled` | ``$BOOLEAN`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Deck()->load(["id" => "deck_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DeckEntity`

Create a new `DeckEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DrawEntity

```php
$draw = $client->Draw();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `suit` | ``$STRING`` | No |  |
| `value` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Draw()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DrawEntity`

Create a new `DrawEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PileEntity

```php
$pile = $client->Pile();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | ``$STRING`` | No |  |
| `pile` | ``$OBJECT`` | No |  |
| `remaining` | ``$INTEGER`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Pile()->load(["id" => "pile_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PileEntity`

Create a new `PileEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PileDrawEntity

```php
$pile_draw = $client->PileDraw();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `suit` | ``$STRING`` | No |  |
| `value` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->PileDraw()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PileDrawEntity`

Create a new `PileDrawEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PileListEntity

```php
$pile_list = $client->PileList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deck_id` | ``$STRING`` | No |  |
| `pile` | ``$OBJECT`` | No |  |
| `remaining` | ``$INTEGER`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PileList()->load(["id" => "pile_list_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PileListEntity`

Create a new `PileListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ReturnEntity

```php
$return = $client->Return();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Return()->load(["id" => "return_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ReturnEntity`

Create a new `ReturnEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new DeckOfCardsSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

