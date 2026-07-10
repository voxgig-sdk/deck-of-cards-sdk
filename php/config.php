<?php
declare(strict_types=1);

// DeckOfCards SDK configuration

class DeckOfCardsConfig
{
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
              'active' => true,
              'name' => 'deck_id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'remaining',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'shuffled',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
          ],
          'name' => 'deck',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'card',
                        'orig' => 'card',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'deck_count',
                        'orig' => 'deck_count',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'jokers_enabled',
                        'orig' => 'jokers_enabled',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'remaining',
                        'orig' => 'remaining',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
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
                  'index$' => 1,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'jokers_enabled',
                        'orig' => 'jokers_enabled',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
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
                  'index$' => 2,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'draw' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'image',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'suit',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'value',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
          ],
          'name' => 'draw',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'count',
                        'orig' => 'count',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
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
              'active' => true,
              'name' => 'deck_id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'pile',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'remaining',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
          ],
          'name' => 'pile',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'card',
                        'orig' => 'card',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'load',
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
              'active' => true,
              'name' => 'code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'image',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'suit',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'value',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
          ],
          'name' => 'pile_draw',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'card',
                        'orig' => 'card',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'count',
                        'orig' => 'count',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'pile_id',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'count',
                        'orig' => 'count',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 1,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'pile_id',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'count',
                        'orig' => 'count',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
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
                  'index$' => 2,
                ],
              ],
              'key$' => 'list',
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
              'active' => true,
              'name' => 'deck_id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'pile',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'remaining',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
          ],
          'name' => 'pile_list',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
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
              'active' => true,
              'name' => 'deck_id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'pile',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'remaining',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'shuffled',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 4,
            ],
          ],
          'name' => 'return',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'pile_name',
                        'orig' => 'pile_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'card',
                        'orig' => 'card',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'deck_id',
                        'orig' => 'deck_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'card',
                        'orig' => 'card',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'load',
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
