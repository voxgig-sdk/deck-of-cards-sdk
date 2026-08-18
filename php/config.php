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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'remaining',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'shuffled',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'success',
              'type' => '`$BOOLEAN`',
            ],
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
                  'parts' => [
                    'deck',
                    'new',
                    'shuffle',
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
                  'parts' => [
                    'deck',
                    'new',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'images',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'suit',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
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
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'draw',
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
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'add',
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
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'shuffle',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'images',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'suit',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
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
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'draw',
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
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'remaining',
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
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'list',
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
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'pile',
                    '{pile_name}',
                    'return',
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
                  'parts' => [
                    'deck',
                    '{deck_id}',
                    'return',
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
