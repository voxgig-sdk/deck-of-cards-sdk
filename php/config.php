<?php
declare(strict_types=1);

// DeckOfCards SDK configuration

class DeckOfCardsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "DeckOfCards",
                "slug" => "deck-of-cards",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://www.deckofcardsapi.com/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "deck" => [],
                    "draw" => [],
                    "pile" => [],
                    "pile_draw" => [],
                    "pile_list" => [],
                    "return" => [],
                ],
            ],
            "entity" => [
        'deck' => [
          'fields' => [
            [
              'name' => 'deck_id',
              'title' => 'Deck Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the deck',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'remaining',
              'title' => 'Remaining',
              'type' => '`$INTEGER`',
              'short' => 'Number of cards remaining in the deck',
            ],
            [
              'name' => 'shuffled',
              'title' => 'Shuffled',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether the deck is shuffled',
            ],
            [
              'name' => 'success',
              'title' => 'Success',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether the operation was successful',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'deck',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/new/shuffle/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'lit' => 'new',
                    ],
                    [
                      'lit' => 'shuffle',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    'new',
                    'shuffle',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'card',
                        'orig' => 'card',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'deck_count',
                        'orig' => 'deck_count',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'jokers_enabled',
                        'orig' => 'jokers_enabled',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'card',
                      'deck_count',
                      'jokers_enabled',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/shuffle/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'shuffle',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    '{id}',
                    'shuffle',
                  ],
                  'rename' => [
                    'param' => [
                      'deck_id' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'deck_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'remaining',
                        'orig' => 'remaining',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'shuffle',
                    'exist' => [
                      'id',
                      'remaining',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/new/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'lit' => 'new',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    'new',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'jokers_enabled',
                        'orig' => 'jokers_enabled',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'new',
                    'exist' => [
                      'jokers_enabled',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'draw' => [
          'fields' => [
            [
              'name' => 'code',
              'title' => 'Code',
              'type' => '`$STRING`',
              'short' => 'Two-character card code (e.g., AS for Ace of Spades)',
            ],
            [
              'name' => 'image',
              'title' => 'Image',
              'type' => '`$STRING`',
              'short' => 'URL to the PNG image of the card',
            ],
            [
              'name' => 'images',
              'title' => 'Images',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'suit',
              'title' => 'Suit',
              'type' => '`$STRING`',
              'short' => 'Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)',
            ],
            [
              'name' => 'value',
              'title' => 'Value',
              'type' => '`$STRING`',
              'short' => 'Card value (e.g., ACE, 2, 10, KING)',
            ],
          ],
          'name' => 'draw',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/draw/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'var' => 'deck_id',
                    ],
                    [
                      'lit' => 'draw',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'draw',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.cards`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'count',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'count',
                      'deck_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.deck',
              ],
            ],
          ],
        ],
        'pile' => [
          'fields' => [],
          'name' => 'pile',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/pile/{pile_name}/add/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'var' => 'deck_id',
                    ],
                    [
                      'lit' => 'pile',
                    ],
                    [
                      'var' => 'pile_name',
                    ],
                    [
                      'lit' => 'add',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'add',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.piles`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'card',
                        'orig' => 'card',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'add',
                    'exist' => [
                      'card',
                      'deck_id',
                      'pile_name',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/pile/{pile_name}/shuffle/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'var' => 'deck_id',
                    ],
                    [
                      'lit' => 'pile',
                    ],
                    [
                      'var' => 'pile_name',
                    ],
                    [
                      'lit' => 'shuffle',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'shuffle',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.piles`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'shuffle',
                    'exist' => [
                      'deck_id',
                      'pile_name',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.deck',
              ],
            ],
          ],
        ],
        'pile_draw' => [
          'fields' => [
            [
              'name' => 'code',
              'title' => 'Code',
              'type' => '`$STRING`',
              'short' => 'Two-character card code (e.g., AS for Ace of Spades)',
            ],
            [
              'name' => 'image',
              'title' => 'Image',
              'type' => '`$STRING`',
              'short' => 'URL to the PNG image of the card',
            ],
            [
              'name' => 'images',
              'title' => 'Images',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'suit',
              'title' => 'Suit',
              'type' => '`$STRING`',
              'short' => 'Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)',
            ],
            [
              'name' => 'value',
              'title' => 'Value',
              'type' => '`$STRING`',
              'short' => 'Card value (e.g., ACE, 2, 10, KING)',
            ],
          ],
          'name' => 'pile_draw',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/pile/{pile_name}/draw/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'var' => 'deck_id',
                    ],
                    [
                      'lit' => 'pile',
                    ],
                    [
                      'var' => 'pile_name',
                    ],
                    [
                      'lit' => 'draw',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'draw',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'card',
                        'orig' => 'card',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'count',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'card',
                      'count',
                      'deck_id',
                      'pile_name',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/pile/{pile_name}/draw/bottom/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'var' => 'deck_id',
                    ],
                    [
                      'lit' => 'pile',
                    ],
                    [
                      'var' => 'pile_id',
                    ],
                    [
                      'lit' => 'draw',
                    ],
                    [
                      'lit' => 'bottom',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_id}',
                    'draw',
                    'bottom',
                  ],
                  'rename' => [
                    'param' => [
                      'pile_name' => 'pile_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'pile_id',
                        'orig' => 'pile_name',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'count',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'count',
                      'deck_id',
                      'pile_id',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/pile/{pile_name}/draw/random/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'var' => 'deck_id',
                    ],
                    [
                      'lit' => 'pile',
                    ],
                    [
                      'var' => 'pile_id',
                    ],
                    [
                      'lit' => 'draw',
                    ],
                    [
                      'lit' => 'random',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_id}',
                    'draw',
                    'random',
                  ],
                  'rename' => [
                    'param' => [
                      'pile_name' => 'pile_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'pile_id',
                        'orig' => 'pile_name',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'count',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'count',
                      'deck_id',
                      'pile_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.deck',
                '$.main.kit.entity.pile',
              ],
            ],
          ],
        ],
        'pile_list' => [
          'fields' => [
            [
              'name' => 'cards',
              'title' => 'Cards',
              'type' => '`$ARRAY`',
              'short' => 'Array of cards in the pile',
            ],
            [
              'name' => 'remaining',
              'title' => 'Remaining',
              'type' => '`$INTEGER`',
              'short' => 'Number of cards remaining in the pile',
            ],
          ],
          'name' => 'pile_list',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/pile/{pile_name}/list/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'var' => 'deck_id',
                    ],
                    [
                      'lit' => 'pile',
                    ],
                    [
                      'var' => 'pile_name',
                    ],
                    [
                      'lit' => 'list',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'list',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.piles`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'deck_id',
                      'pile_name',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.deck',
                '$.main.kit.entity.pile',
              ],
            ],
          ],
        ],
        'return' => [
          'fields' => [
            [
              'name' => 'remaining',
              'title' => 'Remaining',
              'type' => '`$INTEGER`',
              'short' => 'Number of cards remaining in the pile',
            ],
          ],
          'name' => 'return',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/pile/{pile_name}/return/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'var' => 'deck_id',
                    ],
                    [
                      'lit' => 'pile',
                    ],
                    [
                      'var' => 'pile_name',
                    ],
                    [
                      'lit' => 'return',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'return',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.piles`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'card',
                        'orig' => 'card',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'card',
                      'deck_id',
                      'pile_name',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/return/',
                  'segments' => [
                    [
                      'lit' => 'deck',
                    ],
                    [
                      'var' => 'deck_id',
                    ],
                    [
                      'lit' => 'return',
                    ],
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'return',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.piles`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'card',
                        'orig' => 'card',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'card',
                      'deck_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.deck',
              ],
              [
                '$.main.kit.entity.deck',
                '$.main.kit.entity.pile',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return DeckOfCardsFeatures::make_feature($name);
    }
}
