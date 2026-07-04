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
            "active": True,
            "name": "deck_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "remaining",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "shuffled",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "success",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 3,
          },
        ],
        "name": "deck",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 1,
                      "kind": "query",
                      "name": "deck_count",
                      "orig": "deck_count",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "jokers_enabled",
                      "orig": "jokers_enabled",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
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
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "remaining",
                      "orig": "remaining",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
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
                "index$": 1,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "jokers_enabled",
                      "orig": "jokers_enabled",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
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
                "index$": 2,
              },
            ],
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
            "active": True,
            "name": "code",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "image",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "suit",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "value",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "draw",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "reqd": False,
                      "type": "`$INTEGER`",
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
                "index$": 0,
              },
            ],
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
            "active": True,
            "name": "deck_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "pile",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "remaining",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "success",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 3,
          },
        ],
        "name": "pile",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "reqd": True,
                      "type": "`$STRING`",
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
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
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
                "index$": 1,
              },
            ],
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
            "active": True,
            "name": "code",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "image",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "suit",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "value",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "pile_draw",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "reqd": False,
                      "type": "`$INTEGER`",
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
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "pile_id",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "reqd": False,
                      "type": "`$INTEGER`",
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
                "index$": 1,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "pile_id",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "reqd": False,
                      "type": "`$INTEGER`",
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
                "index$": 2,
              },
            ],
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
            "active": True,
            "name": "deck_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "pile",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "remaining",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "success",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 3,
          },
        ],
        "name": "pile_list",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
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
                "index$": 0,
              },
            ],
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
            "active": True,
            "name": "deck_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "pile",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "remaining",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "shuffled",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "success",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 4,
          },
        ],
        "name": "return",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "pile_name",
                      "orig": "pile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "reqd": False,
                      "type": "`$STRING`",
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
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "deck_id",
                      "orig": "deck_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "card",
                      "orig": "card",
                      "reqd": False,
                      "type": "`$STRING`",
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
                "index$": 1,
              },
            ],
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
