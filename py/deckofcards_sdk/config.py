# DeckOfCards SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "title": "Deck Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the deck",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "remaining",
            "title": "Remaining",
            "type": "`$INTEGER`",
            "short": "Number of cards remaining in the deck",
          },
          {
            "name": "shuffled",
            "title": "Shuffled",
            "type": "`$BOOLEAN`",
            "short": "Whether the deck is shuffled",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
            "short": "Whether the operation was successful",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "deck",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/new/shuffle/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "lit": "new",
                  },
                  {
                    "lit": "shuffle",
                  },
                ],
                "parts": [
                  "deck",
                  "new",
                  "shuffle",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "card",
                      "orig": "card",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "deck_count",
                      "orig": "deck_count",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "jokers_enabled",
                      "orig": "jokers_enabled",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "card",
                    "deck_count",
                    "jokers_enabled",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/shuffle/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "shuffle",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "deck_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "remaining",
                      "orig": "remaining",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "shuffle",
                  "exist": [
                    "id",
                    "remaining",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/new/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "lit": "new",
                  },
                ],
                "parts": [
                  "deck",
                  "new",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "jokers_enabled",
                      "orig": "jokers_enabled",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "new",
                  "exist": [
                    "jokers_enabled",
                  ],
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
            "title": "Code",
            "type": "`$STRING`",
            "short": "Two-character card code (e.g., AS for Ace of Spades)",
          },
          {
            "name": "image",
            "title": "Image",
            "type": "`$STRING`",
            "short": "URL to the PNG image of the card",
          },
          {
            "name": "images",
            "title": "Images",
            "type": "`$OBJECT`",
          },
          {
            "name": "suit",
            "title": "Suit",
            "type": "`$STRING`",
            "short": "Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)",
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$STRING`",
            "short": "Card value (e.g., ACE, 2, 10, KING)",
          },
        ],
        "name": "draw",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/draw/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "var": "deck_id",
                  },
                  {
                    "lit": "draw",
                  },
                ],
                "parts": [
                  "deck",
                  "{deck_id}",
                  "draw",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.cards`",
                },
                "args": {
                  "params": [
                    {
                      "name": "deck_id",
                      "orig": "deck_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "count",
                    "deck_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.deck",
            ],
          ],
        },
      },
      "pile": {
        "fields": [],
        "name": "pile",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/add/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "var": "deck_id",
                  },
                  {
                    "lit": "pile",
                  },
                  {
                    "var": "pile_name",
                  },
                  {
                    "lit": "add",
                  },
                ],
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_name}",
                  "add",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.piles`",
                },
                "args": {
                  "params": [
                    {
                      "name": "deck_id",
                      "orig": "deck_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "pile_name",
                      "orig": "pile_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "card",
                      "orig": "card",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "add",
                  "exist": [
                    "card",
                    "deck_id",
                    "pile_name",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/shuffle/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "var": "deck_id",
                  },
                  {
                    "lit": "pile",
                  },
                  {
                    "var": "pile_name",
                  },
                  {
                    "lit": "shuffle",
                  },
                ],
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_name}",
                  "shuffle",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.piles`",
                },
                "args": {
                  "params": [
                    {
                      "name": "deck_id",
                      "orig": "deck_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "pile_name",
                      "orig": "pile_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "shuffle",
                  "exist": [
                    "deck_id",
                    "pile_name",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.deck",
            ],
          ],
        },
      },
      "pile_draw": {
        "fields": [
          {
            "name": "code",
            "title": "Code",
            "type": "`$STRING`",
            "short": "Two-character card code (e.g., AS for Ace of Spades)",
          },
          {
            "name": "image",
            "title": "Image",
            "type": "`$STRING`",
            "short": "URL to the PNG image of the card",
          },
          {
            "name": "images",
            "title": "Images",
            "type": "`$OBJECT`",
          },
          {
            "name": "suit",
            "title": "Suit",
            "type": "`$STRING`",
            "short": "Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)",
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$STRING`",
            "short": "Card value (e.g., ACE, 2, 10, KING)",
          },
        ],
        "name": "pile_draw",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/draw/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "var": "deck_id",
                  },
                  {
                    "lit": "pile",
                  },
                  {
                    "var": "pile_name",
                  },
                  {
                    "lit": "draw",
                  },
                ],
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_name}",
                  "draw",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "deck_id",
                      "orig": "deck_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "pile_name",
                      "orig": "pile_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "card",
                      "orig": "card",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "card",
                    "count",
                    "deck_id",
                    "pile_name",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/draw/bottom/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "var": "deck_id",
                  },
                  {
                    "lit": "pile",
                  },
                  {
                    "var": "pile_id",
                  },
                  {
                    "lit": "draw",
                  },
                  {
                    "lit": "bottom",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "deck_id",
                      "orig": "deck_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "pile_id",
                      "orig": "pile_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "count",
                    "deck_id",
                    "pile_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/draw/random/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "var": "deck_id",
                  },
                  {
                    "lit": "pile",
                  },
                  {
                    "var": "pile_id",
                  },
                  {
                    "lit": "draw",
                  },
                  {
                    "lit": "random",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "deck_id",
                      "orig": "deck_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "pile_id",
                      "orig": "pile_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "count",
                    "deck_id",
                    "pile_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.deck",
              "$.main.kit.entity.pile",
            ],
          ],
        },
      },
      "pile_list": {
        "fields": [
          {
            "name": "cards",
            "title": "Cards",
            "type": "`$ARRAY`",
            "short": "Array of cards in the pile",
          },
          {
            "name": "remaining",
            "title": "Remaining",
            "type": "`$INTEGER`",
            "short": "Number of cards remaining in the pile",
          },
        ],
        "name": "pile_list",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/list/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "var": "deck_id",
                  },
                  {
                    "lit": "pile",
                  },
                  {
                    "var": "pile_name",
                  },
                  {
                    "lit": "list",
                  },
                ],
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_name}",
                  "list",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.piles`",
                },
                "args": {
                  "params": [
                    {
                      "name": "deck_id",
                      "orig": "deck_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "pile_name",
                      "orig": "pile_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "deck_id",
                    "pile_name",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.deck",
              "$.main.kit.entity.pile",
            ],
          ],
        },
      },
      "return": {
        "fields": [
          {
            "name": "remaining",
            "title": "Remaining",
            "type": "`$INTEGER`",
            "short": "Number of cards remaining in the pile",
          },
        ],
        "name": "return",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/pile/{pile_name}/return/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "var": "deck_id",
                  },
                  {
                    "lit": "pile",
                  },
                  {
                    "var": "pile_name",
                  },
                  {
                    "lit": "return",
                  },
                ],
                "parts": [
                  "deck",
                  "{deck_id}",
                  "pile",
                  "{pile_name}",
                  "return",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.piles`",
                },
                "args": {
                  "params": [
                    {
                      "name": "deck_id",
                      "orig": "deck_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "pile_name",
                      "orig": "pile_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "card",
                      "orig": "card",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "card",
                    "deck_id",
                    "pile_name",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/deck/{deck_id}/return/",
                "segments": [
                  {
                    "lit": "deck",
                  },
                  {
                    "var": "deck_id",
                  },
                  {
                    "lit": "return",
                  },
                ],
                "parts": [
                  "deck",
                  "{deck_id}",
                  "return",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.piles`",
                },
                "args": {
                  "params": [
                    {
                      "name": "deck_id",
                      "orig": "deck_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "card",
                      "orig": "card",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "card",
                    "deck_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.deck",
            ],
            [
              "$.main.kit.entity.deck",
              "$.main.kit.entity.pile",
            ],
          ],
        },
      },
    },
    }
