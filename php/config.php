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
              'short' => 'Unique identifier for the deck',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'remaining',
              'short' => 'Number of cards remaining in the deck',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'shuffled',
              'short' => 'Whether the deck is shuffled',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'success',
              'short' => 'Whether the operation was successful',
              'type' => '`$BOOLEAN`',
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
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'card',
                        'orig' => 'card',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'deck_count',
                        'orig' => 'deck_count',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'jokers_enabled',
                        'orig' => 'jokers_enabled',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'card',
                      'deck_count',
                      'jokers_enabled',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'deck',
                    'new',
                    'shuffle',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'remaining',
                        'orig' => 'remaining',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/shuffle/',
                  'rename' => [
                    'param' => [
                      'deck_id' => 'id',
                    ],
                  ],
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
                  'select' => [
                    '$action' => 'shuffle',
                    'exist' => [
                      'id',
                      'remaining',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'deck',
                    '{id}',
                    'shuffle',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'jokers_enabled',
                        'orig' => 'jokers_enabled',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
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
                  'select' => [
                    '$action' => 'new',
                    'exist' => [
                      'jokers_enabled',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'deck',
                    'new',
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
              'short' => 'Two-character card code (e.g., AS for Ace of Spades)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'short' => 'URL to the PNG image of the card',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'images',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'suit',
              'short' => 'Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
              'short' => 'Card value (e.g., ACE, 2, 10, KING)',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'draw',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'count',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'count',
                      'deck_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.cards`',
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'draw',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'deck',
              ],
            ],
          ],
        ],
        'pile' => [
          'fields' => [
            [
              'name' => 'remaining',
              'short' => 'Number of cards remaining in the pile',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'pile',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'card',
                        'orig' => 'card',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'select' => [
                    '$action' => 'add',
                    'exist' => [
                      'card',
                      'deck_id',
                      'pile_name',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.piles`',
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'add',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'select' => [
                    '$action' => 'shuffle',
                    'exist' => [
                      'deck_id',
                      'pile_name',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.piles`',
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'shuffle',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'deck',
                'pile',
              ],
            ],
          ],
        ],
        'pile_draw' => [
          'fields' => [
            [
              'name' => 'code',
              'short' => 'Two-character card code (e.g., AS for Ace of Spades)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'short' => 'URL to the PNG image of the card',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'images',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'suit',
              'short' => 'Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
              'short' => 'Card value (e.g., ACE, 2, 10, KING)',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'pile_draw',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'card',
                        'orig' => 'card',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'count',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'card',
                      'count',
                      'deck_id',
                      'pile_name',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'draw',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'pile_id',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'count',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/pile/{pile_name}/draw/bottom/',
                  'rename' => [
                    'param' => [
                      'pile_name' => 'pile_id',
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'count',
                      'deck_id',
                      'pile_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_id}',
                    'draw',
                    'bottom',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'pile_id',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'count',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/deck/{deck_id}/pile/{pile_name}/draw/random/',
                  'rename' => [
                    'param' => [
                      'pile_name' => 'pile_id',
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'count',
                      'deck_id',
                      'pile_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_id}',
                    'draw',
                    'random',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'deck',
                'pile',
              ],
            ],
          ],
        ],
        'pile_list' => [
          'fields' => [
            [
              'name' => 'cards',
              'short' => 'Array of cards in the pile',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'remaining',
              'short' => 'Number of cards remaining in the pile',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'pile_list',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'deck_id',
                      'pile_name',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.piles`',
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'list',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'deck',
                'pile',
              ],
            ],
          ],
        ],
        'return' => [
          'fields' => [
            [
              'name' => 'remaining',
              'short' => 'Number of cards remaining in the pile',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'return',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'card',
                        'orig' => 'card',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'card',
                      'deck_id',
                      'pile_name',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.piles`',
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'return',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'card',
                        'orig' => 'card',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'card',
                      'deck_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.piles`',
                  ],
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'return',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'deck',
              ],
              [
                'deck',
                'pile',
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
