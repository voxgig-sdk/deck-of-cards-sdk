"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'DeckOfCards',
        slug: "deck-of-cards",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://www.deckofcardsapi.com/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            deck: {},
            draw: {},
            pile: {},
            pile_draw: {},
            pile_list: {},
            return: {},
        }
    };
    entity = {
        "deck": {
            "fields": [
                {
                    "name": "deck_id",
                    "short": "Unique identifier for the deck",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "remaining",
                    "short": "Number of cards remaining in the deck",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "shuffled",
                    "short": "Whether the deck is shuffled",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "success",
                    "short": "Whether the operation was successful",
                    "type": "`$BOOLEAN`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "deck_count",
                                        "orig": "deck_count",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "jokers_enabled",
                                        "orig": "jokers_enabled",
                                        "type": "`$BOOLEAN`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/new/shuffle/",
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "lit": "new"
                                },
                                {
                                    "lit": "shuffle"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "card",
                                    "deck_count",
                                    "jokers_enabled"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "deck",
                                "new",
                                "shuffle"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "deck_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "remaining",
                                        "orig": "remaining",
                                        "type": "`$BOOLEAN`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/{deck_id}/shuffle/",
                            "rename": {
                                "param": {
                                    "deck_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "shuffle"
                                }
                            ],
                            "select": {
                                "$action": "shuffle",
                                "exist": [
                                    "id",
                                    "remaining"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "deck",
                                "{id}",
                                "shuffle"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "jokers_enabled",
                                        "orig": "jokers_enabled",
                                        "type": "`$BOOLEAN`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/new/",
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "lit": "new"
                                }
                            ],
                            "select": {
                                "$action": "new",
                                "exist": [
                                    "jokers_enabled"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "deck",
                                "new"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "draw": {
            "fields": [
                {
                    "name": "code",
                    "short": "Two-character card code (e.g., AS for Ace of Spades)",
                    "type": "`$STRING`"
                },
                {
                    "name": "image",
                    "short": "URL to the PNG image of the card",
                    "type": "`$STRING`"
                },
                {
                    "name": "images",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "suit",
                    "short": "Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)",
                    "type": "`$STRING`"
                },
                {
                    "name": "value",
                    "short": "Card value (e.g., ACE, 2, 10, KING)",
                    "type": "`$STRING`"
                }
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/{deck_id}/draw/",
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "var": "deck_id"
                                },
                                {
                                    "lit": "draw"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "deck_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.cards`"
                            },
                            "parts": [
                                "deck",
                                "{deck_id}",
                                "draw"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "deck"
                    ]
                ]
            }
        },
        "pile": {
            "fields": [
                {
                    "name": "remaining",
                    "short": "Number of cards remaining in the pile",
                    "type": "`$INTEGER`"
                }
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "pile_name",
                                        "orig": "pile_name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "card",
                                        "orig": "card",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/{deck_id}/pile/{pile_name}/add/",
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "var": "deck_id"
                                },
                                {
                                    "lit": "pile"
                                },
                                {
                                    "var": "pile_name"
                                },
                                {
                                    "lit": "add"
                                }
                            ],
                            "select": {
                                "$action": "add",
                                "exist": [
                                    "card",
                                    "deck_id",
                                    "pile_name"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.piles`"
                            },
                            "parts": [
                                "deck",
                                "{deck_id}",
                                "pile",
                                "{pile_name}",
                                "add"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "deck_id",
                                        "orig": "deck_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "pile_name",
                                        "orig": "pile_name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/{deck_id}/pile/{pile_name}/shuffle/",
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "var": "deck_id"
                                },
                                {
                                    "lit": "pile"
                                },
                                {
                                    "var": "pile_name"
                                },
                                {
                                    "lit": "shuffle"
                                }
                            ],
                            "select": {
                                "$action": "shuffle",
                                "exist": [
                                    "deck_id",
                                    "pile_name"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.piles`"
                            },
                            "parts": [
                                "deck",
                                "{deck_id}",
                                "pile",
                                "{pile_name}",
                                "shuffle"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "deck",
                        "pile"
                    ]
                ]
            }
        },
        "pile_draw": {
            "fields": [
                {
                    "name": "code",
                    "short": "Two-character card code (e.g., AS for Ace of Spades)",
                    "type": "`$STRING`"
                },
                {
                    "name": "image",
                    "short": "URL to the PNG image of the card",
                    "type": "`$STRING`"
                },
                {
                    "name": "images",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "suit",
                    "short": "Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)",
                    "type": "`$STRING`"
                },
                {
                    "name": "value",
                    "short": "Card value (e.g., ACE, 2, 10, KING)",
                    "type": "`$STRING`"
                }
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "pile_name",
                                        "orig": "pile_name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "card",
                                        "orig": "card",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/{deck_id}/pile/{pile_name}/draw/",
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "var": "deck_id"
                                },
                                {
                                    "lit": "pile"
                                },
                                {
                                    "var": "pile_name"
                                },
                                {
                                    "lit": "draw"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "card",
                                    "count",
                                    "deck_id",
                                    "pile_name"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "deck",
                                "{deck_id}",
                                "pile",
                                "{pile_name}",
                                "draw"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "deck_id",
                                        "orig": "deck_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "pile_id",
                                        "orig": "pile_name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/{deck_id}/pile/{pile_name}/draw/bottom/",
                            "rename": {
                                "param": {
                                    "pile_name": "pile_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "var": "deck_id"
                                },
                                {
                                    "lit": "pile"
                                },
                                {
                                    "var": "pile_id"
                                },
                                {
                                    "lit": "draw"
                                },
                                {
                                    "lit": "bottom"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "deck_id",
                                    "pile_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "deck",
                                "{deck_id}",
                                "pile",
                                "{pile_id}",
                                "draw",
                                "bottom"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "deck_id",
                                        "orig": "deck_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "pile_id",
                                        "orig": "pile_name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/{deck_id}/pile/{pile_name}/draw/random/",
                            "rename": {
                                "param": {
                                    "pile_name": "pile_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "var": "deck_id"
                                },
                                {
                                    "lit": "pile"
                                },
                                {
                                    "var": "pile_id"
                                },
                                {
                                    "lit": "draw"
                                },
                                {
                                    "lit": "random"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "deck_id",
                                    "pile_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "deck",
                                "{deck_id}",
                                "pile",
                                "{pile_id}",
                                "draw",
                                "random"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "deck",
                        "pile"
                    ]
                ]
            }
        },
        "pile_list": {
            "fields": [
                {
                    "name": "cards",
                    "short": "Array of cards in the pile",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "remaining",
                    "short": "Number of cards remaining in the pile",
                    "type": "`$INTEGER`"
                }
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "pile_name",
                                        "orig": "pile_name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/{deck_id}/pile/{pile_name}/list/",
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "var": "deck_id"
                                },
                                {
                                    "lit": "pile"
                                },
                                {
                                    "var": "pile_name"
                                },
                                {
                                    "lit": "list"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "deck_id",
                                    "pile_name"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.piles`"
                            },
                            "parts": [
                                "deck",
                                "{deck_id}",
                                "pile",
                                "{pile_name}",
                                "list"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "deck",
                        "pile"
                    ]
                ]
            }
        },
        "return": {
            "fields": [
                {
                    "name": "remaining",
                    "short": "Number of cards remaining in the pile",
                    "type": "`$INTEGER`"
                }
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "pile_name",
                                        "orig": "pile_name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "card",
                                        "orig": "card",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/{deck_id}/pile/{pile_name}/return/",
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "var": "deck_id"
                                },
                                {
                                    "lit": "pile"
                                },
                                {
                                    "var": "pile_name"
                                },
                                {
                                    "lit": "return"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "card",
                                    "deck_id",
                                    "pile_name"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.piles`"
                            },
                            "parts": [
                                "deck",
                                "{deck_id}",
                                "pile",
                                "{pile_name}",
                                "return"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "deck_id",
                                        "orig": "deck_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "card",
                                        "orig": "card",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/deck/{deck_id}/return/",
                            "segments": [
                                {
                                    "lit": "deck"
                                },
                                {
                                    "var": "deck_id"
                                },
                                {
                                    "lit": "return"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "card",
                                    "deck_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.piles`"
                            },
                            "parts": [
                                "deck",
                                "{deck_id}",
                                "return"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "deck"
                    ],
                    [
                        "deck",
                        "pile"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map