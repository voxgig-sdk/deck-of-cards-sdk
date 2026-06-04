# DeckOfCards SDK configuration


def make_config():
    return {
        "main": {
            "name": "DeckOfCards",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "remaining",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "shuffled",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "success",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "deck",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "deck_count",
                      "orig": "deck_count",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "jokers_enabled",
                      "orig": "jokers_enabled",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                  ],
                },
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
                "active": True,
                "index$": 0,
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
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "remaining",
                      "orig": "remaining",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                  ],
                },
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
                "active": True,
                "index$": 1,
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "jokers_enabled",
                      "orig": "jokers_enabled",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                  ],
                },
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
                "active": True,
                "index$": 2,
              },
            ],
            "input": "data",
            "key$": "load",
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
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "image",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "suit",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "value",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "draw",
        "op": {
          "list": {
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
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
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
            "name": "deck_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "pile",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "remaining",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "success",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "pile",
        "op": {
          "load": {
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
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
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
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "load",
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
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "image",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "suit",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "value",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "pile_draw",
        "op": {
          "list": {
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
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
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
                "active": True,
                "index$": 0,
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
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "pile_id",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
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
                "active": True,
                "index$": 1,
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
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "pile_id",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
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
                "active": True,
                "index$": 2,
              },
            ],
            "input": "data",
            "key$": "list",
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
            "name": "deck_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "pile",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "remaining",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "success",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "pile_list",
        "op": {
          "load": {
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
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
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
            "name": "deck_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "pile",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "remaining",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "shuffled",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "success",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "return",
        "op": {
          "load": {
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
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
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
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "load",
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
