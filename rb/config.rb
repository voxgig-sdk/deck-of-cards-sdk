# DeckOfCards SDK configuration

module DeckOfCardsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "DeckOfCards",
        "slug" => "deck-of-cards",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://www.deckofcardsapi.com/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "deck" => {},
          "draw" => {},
          "pile" => {},
          "pile_draw" => {},
          "pile_list" => {},
          "return" => {},
        },
      },
      "entity" => {
        "deck" => {
          "fields" => [
            {
              "name" => "deck_id",
              "short" => "Unique identifier for the deck",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "remaining",
              "short" => "Number of cards remaining in the deck",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "shuffled",
              "short" => "Whether the deck is shuffled",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "success",
              "short" => "Whether the operation was successful",
              "type" => "`$BOOLEAN`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "deck",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "card",
                        "orig" => "card",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "deck_count",
                        "orig" => "deck_count",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "jokers_enabled",
                        "orig" => "jokers_enabled",
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/new/shuffle/",
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "lit" => "new",
                    },
                    {
                      "lit" => "shuffle",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "card",
                      "deck_count",
                      "jokers_enabled",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "deck",
                    "new",
                    "shuffle",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "deck_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "remaining",
                        "orig" => "remaining",
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/{deck_id}/shuffle/",
                  "rename" => {
                    "param" => {
                      "deck_id" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "var" => "id",
                    },
                    {
                      "lit" => "shuffle",
                    },
                  ],
                  "select" => {
                    "$action" => "shuffle",
                    "exist" => [
                      "id",
                      "remaining",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "deck",
                    "{id}",
                    "shuffle",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "jokers_enabled",
                        "orig" => "jokers_enabled",
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/new/",
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "lit" => "new",
                    },
                  ],
                  "select" => {
                    "$action" => "new",
                    "exist" => [
                      "jokers_enabled",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "deck",
                    "new",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "draw" => {
          "fields" => [
            {
              "name" => "code",
              "short" => "Two-character card code (e.g., AS for Ace of Spades)",
              "type" => "`$STRING`",
            },
            {
              "name" => "image",
              "short" => "URL to the PNG image of the card",
              "type" => "`$STRING`",
            },
            {
              "name" => "images",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "suit",
              "short" => "Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)",
              "type" => "`$STRING`",
            },
            {
              "name" => "value",
              "short" => "Card value (e.g., ACE, 2, 10, KING)",
              "type" => "`$STRING`",
            },
          ],
          "name" => "draw",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "deck_id",
                        "orig" => "deck_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/{deck_id}/draw/",
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "var" => "deck_id",
                    },
                    {
                      "lit" => "draw",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "deck_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.cards`",
                  },
                  "parts" => [
                    "deck",
                    "{deck_id}",
                    "draw",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "deck",
              ],
            ],
          },
        },
        "pile" => {
          "fields" => [
            {
              "name" => "remaining",
              "short" => "Number of cards remaining in the pile",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "pile",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "deck_id",
                        "orig" => "deck_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "pile_name",
                        "orig" => "pile_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "card",
                        "orig" => "card",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/{deck_id}/pile/{pile_name}/add/",
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "var" => "deck_id",
                    },
                    {
                      "lit" => "pile",
                    },
                    {
                      "var" => "pile_name",
                    },
                    {
                      "lit" => "add",
                    },
                  ],
                  "select" => {
                    "$action" => "add",
                    "exist" => [
                      "card",
                      "deck_id",
                      "pile_name",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.piles`",
                  },
                  "parts" => [
                    "deck",
                    "{deck_id}",
                    "pile",
                    "{pile_name}",
                    "add",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "deck_id",
                        "orig" => "deck_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "pile_name",
                        "orig" => "pile_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/{deck_id}/pile/{pile_name}/shuffle/",
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "var" => "deck_id",
                    },
                    {
                      "lit" => "pile",
                    },
                    {
                      "var" => "pile_name",
                    },
                    {
                      "lit" => "shuffle",
                    },
                  ],
                  "select" => {
                    "$action" => "shuffle",
                    "exist" => [
                      "deck_id",
                      "pile_name",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.piles`",
                  },
                  "parts" => [
                    "deck",
                    "{deck_id}",
                    "pile",
                    "{pile_name}",
                    "shuffle",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "deck",
                "pile",
              ],
            ],
          },
        },
        "pile_draw" => {
          "fields" => [
            {
              "name" => "code",
              "short" => "Two-character card code (e.g., AS for Ace of Spades)",
              "type" => "`$STRING`",
            },
            {
              "name" => "image",
              "short" => "URL to the PNG image of the card",
              "type" => "`$STRING`",
            },
            {
              "name" => "images",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "suit",
              "short" => "Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)",
              "type" => "`$STRING`",
            },
            {
              "name" => "value",
              "short" => "Card value (e.g., ACE, 2, 10, KING)",
              "type" => "`$STRING`",
            },
          ],
          "name" => "pile_draw",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "deck_id",
                        "orig" => "deck_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "pile_name",
                        "orig" => "pile_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "card",
                        "orig" => "card",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/{deck_id}/pile/{pile_name}/draw/",
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "var" => "deck_id",
                    },
                    {
                      "lit" => "pile",
                    },
                    {
                      "var" => "pile_name",
                    },
                    {
                      "lit" => "draw",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "card",
                      "count",
                      "deck_id",
                      "pile_name",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "deck",
                    "{deck_id}",
                    "pile",
                    "{pile_name}",
                    "draw",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "deck_id",
                        "orig" => "deck_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "pile_id",
                        "orig" => "pile_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/{deck_id}/pile/{pile_name}/draw/bottom/",
                  "rename" => {
                    "param" => {
                      "pile_name" => "pile_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "var" => "deck_id",
                    },
                    {
                      "lit" => "pile",
                    },
                    {
                      "var" => "pile_id",
                    },
                    {
                      "lit" => "draw",
                    },
                    {
                      "lit" => "bottom",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "deck_id",
                      "pile_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "deck",
                    "{deck_id}",
                    "pile",
                    "{pile_id}",
                    "draw",
                    "bottom",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "deck_id",
                        "orig" => "deck_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "pile_id",
                        "orig" => "pile_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/{deck_id}/pile/{pile_name}/draw/random/",
                  "rename" => {
                    "param" => {
                      "pile_name" => "pile_id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "var" => "deck_id",
                    },
                    {
                      "lit" => "pile",
                    },
                    {
                      "var" => "pile_id",
                    },
                    {
                      "lit" => "draw",
                    },
                    {
                      "lit" => "random",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "deck_id",
                      "pile_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "deck",
                    "{deck_id}",
                    "pile",
                    "{pile_id}",
                    "draw",
                    "random",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "deck",
                "pile",
              ],
            ],
          },
        },
        "pile_list" => {
          "fields" => [
            {
              "name" => "cards",
              "short" => "Array of cards in the pile",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "remaining",
              "short" => "Number of cards remaining in the pile",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "pile_list",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "deck_id",
                        "orig" => "deck_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "pile_name",
                        "orig" => "pile_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/{deck_id}/pile/{pile_name}/list/",
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "var" => "deck_id",
                    },
                    {
                      "lit" => "pile",
                    },
                    {
                      "var" => "pile_name",
                    },
                    {
                      "lit" => "list",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "deck_id",
                      "pile_name",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.piles`",
                  },
                  "parts" => [
                    "deck",
                    "{deck_id}",
                    "pile",
                    "{pile_name}",
                    "list",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "deck",
                "pile",
              ],
            ],
          },
        },
        "return" => {
          "fields" => [
            {
              "name" => "remaining",
              "short" => "Number of cards remaining in the pile",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "return",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "deck_id",
                        "orig" => "deck_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "pile_name",
                        "orig" => "pile_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "card",
                        "orig" => "card",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/{deck_id}/pile/{pile_name}/return/",
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "var" => "deck_id",
                    },
                    {
                      "lit" => "pile",
                    },
                    {
                      "var" => "pile_name",
                    },
                    {
                      "lit" => "return",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "card",
                      "deck_id",
                      "pile_name",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.piles`",
                  },
                  "parts" => [
                    "deck",
                    "{deck_id}",
                    "pile",
                    "{pile_name}",
                    "return",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "deck_id",
                        "orig" => "deck_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "card",
                        "orig" => "card",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/deck/{deck_id}/return/",
                  "segments" => [
                    {
                      "lit" => "deck",
                    },
                    {
                      "var" => "deck_id",
                    },
                    {
                      "lit" => "return",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "card",
                      "deck_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.piles`",
                  },
                  "parts" => [
                    "deck",
                    "{deck_id}",
                    "return",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "deck",
              ],
              [
                "deck",
                "pile",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    DeckOfCardsFeatures.make_feature(name)
  end
end
