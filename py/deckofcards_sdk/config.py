# DeckOfCards SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "DeckOfCards",
            "slug": "deck-of-cards",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://www.deckofcardsapi.com/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "deck": {},
                "draw": {},
                "pile": {},
                "pile_draw": {},
                "pile_list": {},
                "return": {},
            },
        },
        "entity": {
      "deck": {
        "fields": [
          {
            "name": "deck_id",
            "short": "Unique identifier for the deck",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "remaining",
            "short": "Number of cards remaining in the deck",
            "type": "`$INTEGER`",
          },
          {
            "name": "shuffled",
            "short": "Whether the deck is shuffled",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "success",
            "short": "Whether the operation was successful",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "deck",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "deck_count",
                      "orig": "deck_count",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "jokers_enabled",
                      "orig": "jokers_enabled",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/new/shuffle/",
                "parts": [
                  "deck",
                  "new",
                  "shuffle",
                ],
                "select": {
                  "exist": [
                    "card",
                    "deck_count",
                    "jokers_enabled",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "remaining",
                      "orig": "remaining",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/shuffle/",
                "parts": [
                  "deck",
                  "{id}",
                  "shuffle",
                ],
                "rename": {
                  "param": {
                    "deck_id": "id",
                  },
                },
                "select": {
                  "$action": "shuffle",
                  "exist": [
                    "id",
                    "remaining",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "jokers_enabled",
                      "orig": "jokers_enabled",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/new/",
                "parts": [
                  "deck",
                  "new",
                ],
                "select": {
                  "$action": "new",
                  "exist": [
                    "jokers_enabled",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "draw": {
        "fields": [
          {
            "name": "code",
            "short": "Two-character card code (e.g., AS for Ace of Spades)",
            "type": "`$STRING`",
          },
          {
            "name": "image",
            "short": "URL to the PNG image of the card",
            "type": "`$STRING`",
          },
          {
            "name": "images",
            "type": "`$OBJECT`",
          },
          {
            "name": "suit",
            "short": "Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)",
            "type": "`$STRING`",
          },
          {
            "name": "value",
            "short": "Card value (e.g., ACE, 2, 10, KING)",
            "type": "`$STRING`",
          },
        ],
        "name": "draw",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/draw/",
                "parts": [
                  "deck",
                  "{deck_id}",
                  "draw",
                ],
                "select": {
                  "exist": [
                    "count",
                    "deck_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.cards`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "deck",
            ],
          ],
        },
      },
      "pile": {
        "fields": [
          {
            "name": "remaining",
            "short": "Number of cards remaining in the pile",
            "type": "`$INTEGER`",
          },
        ],
        "name": "pile",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/add/",
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_name}",
                  "add",
                ],
                "select": {
                  "$action": "add",
                  "exist": [
                    "card",
                    "deck_id",
                    "pile_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.piles`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/shuffle/",
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_name}",
                  "shuffle",
                ],
                "select": {
                  "$action": "shuffle",
                  "exist": [
                    "deck_id",
                    "pile_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.piles`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "deck",
              "pile",
            ],
          ],
        },
      },
      "pile_draw": {
        "fields": [
          {
            "name": "code",
            "short": "Two-character card code (e.g., AS for Ace of Spades)",
            "type": "`$STRING`",
          },
          {
            "name": "image",
            "short": "URL to the PNG image of the card",
            "type": "`$STRING`",
          },
          {
            "name": "images",
            "type": "`$OBJECT`",
          },
          {
            "name": "suit",
            "short": "Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)",
            "type": "`$STRING`",
          },
          {
            "name": "value",
            "short": "Card value (e.g., ACE, 2, 10, KING)",
            "type": "`$STRING`",
          },
        ],
        "name": "pile_draw",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/draw/",
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_name}",
                  "draw",
                ],
                "select": {
                  "exist": [
                    "card",
                    "count",
                    "deck_id",
                    "pile_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "pile_id",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/draw/bottom/",
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_id}",
                  "draw",
                  "bottom",
                ],
                "rename": {
                  "param": {
                    "pile_name": "pile_id",
                  },
                },
                "select": {
                  "exist": [
                    "count",
                    "deck_id",
                    "pile_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "pile_id",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/draw/random/",
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_id}",
                  "draw",
                  "random",
                ],
                "rename": {
                  "param": {
                    "pile_name": "pile_id",
                  },
                },
                "select": {
                  "exist": [
                    "count",
                    "deck_id",
                    "pile_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "deck",
              "pile",
            ],
          ],
        },
      },
      "pile_list": {
        "fields": [
          {
            "name": "cards",
            "short": "Array of cards in the pile",
            "type": "`$ARRAY`",
          },
          {
            "name": "remaining",
            "short": "Number of cards remaining in the pile",
            "type": "`$INTEGER`",
          },
        ],
        "name": "pile_list",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/list/",
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_name}",
                  "list",
                ],
                "select": {
                  "exist": [
                    "deck_id",
                    "pile_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.piles`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "deck",
              "pile",
            ],
          ],
        },
      },
      "return": {
        "fields": [
          {
            "name": "remaining",
            "short": "Number of cards remaining in the pile",
            "type": "`$INTEGER`",
          },
        ],
        "name": "return",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/return/",
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_name}",
                  "return",
                ],
                "select": {
                  "exist": [
                    "card",
                    "deck_id",
                    "pile_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.piles`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/return/",
                "parts": [
                  "deck",
                  "{deck_id}",
                  "return",
                ],
                "select": {
                  "exist": [
                    "card",
                    "deck_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.piles`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
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
