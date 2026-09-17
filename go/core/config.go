package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "DeckOfCards",
			"slug": "deck-of-cards",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://www.deckofcardsapi.com/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"deck": map[string]any{},
				"draw": map[string]any{},
				"pile": map[string]any{},
				"pile_draw": map[string]any{},
				"pile_list": map[string]any{},
				"return": map[string]any{},
			},
		},
		"entity": map[string]any{
			"deck": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deck_id",
						"short": "Unique identifier for the deck",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "remaining",
						"short": "Number of cards remaining in the deck",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "shuffled",
						"short": "Whether the deck is shuffled",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "success",
						"short": "Whether the operation was successful",
						"type": "`$BOOLEAN`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "deck",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "card",
											"orig": "card",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "deck_count",
											"orig": "deck_count",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "jokers_enabled",
											"orig": "jokers_enabled",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/new/shuffle/",
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"lit": "new",
									},
									map[string]any{
										"lit": "shuffle",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"card",
										"deck_count",
										"jokers_enabled",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"deck",
									"new",
									"shuffle",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "remaining",
											"orig": "remaining",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/shuffle/",
								"rename": map[string]any{
									"param": map[string]any{
										"deck_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "shuffle",
									},
								},
								"select": map[string]any{
									"$action": "shuffle",
									"exist": []any{
										"id",
										"remaining",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"deck",
									"{id}",
									"shuffle",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "jokers_enabled",
											"orig": "jokers_enabled",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/new/",
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"lit": "new",
									},
								},
								"select": map[string]any{
									"$action": "new",
									"exist": []any{
										"jokers_enabled",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"deck",
									"new",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"draw": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"short": "Two-character card code (e.g., AS for Ace of Spades)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image",
						"short": "URL to the PNG image of the card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "images",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "suit",
						"short": "Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"short": "Card value (e.g., ACE, 2, 10, KING)",
						"type": "`$STRING`",
					},
				},
				"name": "draw",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/draw/",
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"var": "deck_id",
									},
									map[string]any{
										"lit": "draw",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"deck_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.cards`",
								},
								"parts": []any{
									"deck",
									"{deck_id}",
									"draw",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"deck",
						},
					},
				},
			},
			"pile": map[string]any{
				"fields": []any{},
				"name": "pile",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "card",
											"orig": "card",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/add/",
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"var": "deck_id",
									},
									map[string]any{
										"lit": "pile",
									},
									map[string]any{
										"var": "pile_name",
									},
									map[string]any{
										"lit": "add",
									},
								},
								"select": map[string]any{
									"$action": "add",
									"exist": []any{
										"card",
										"deck_id",
										"pile_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.piles`",
								},
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_name}",
									"add",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/shuffle/",
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"var": "deck_id",
									},
									map[string]any{
										"lit": "pile",
									},
									map[string]any{
										"var": "pile_name",
									},
									map[string]any{
										"lit": "shuffle",
									},
								},
								"select": map[string]any{
									"$action": "shuffle",
									"exist": []any{
										"deck_id",
										"pile_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.piles`",
								},
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_name}",
									"shuffle",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"deck",
							"pile",
						},
					},
				},
			},
			"pile_draw": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"short": "Two-character card code (e.g., AS for Ace of Spades)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image",
						"short": "URL to the PNG image of the card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "images",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "suit",
						"short": "Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"short": "Card value (e.g., ACE, 2, 10, KING)",
						"type": "`$STRING`",
					},
				},
				"name": "pile_draw",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "card",
											"orig": "card",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/draw/",
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"var": "deck_id",
									},
									map[string]any{
										"lit": "pile",
									},
									map[string]any{
										"var": "pile_name",
									},
									map[string]any{
										"lit": "draw",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"card",
										"count",
										"deck_id",
										"pile_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_name}",
									"draw",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "pile_id",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/draw/bottom/",
								"rename": map[string]any{
									"param": map[string]any{
										"pile_name": "pile_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"var": "deck_id",
									},
									map[string]any{
										"lit": "pile",
									},
									map[string]any{
										"var": "pile_id",
									},
									map[string]any{
										"lit": "draw",
									},
									map[string]any{
										"lit": "bottom",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"deck_id",
										"pile_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_id}",
									"draw",
									"bottom",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "pile_id",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/draw/random/",
								"rename": map[string]any{
									"param": map[string]any{
										"pile_name": "pile_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"var": "deck_id",
									},
									map[string]any{
										"lit": "pile",
									},
									map[string]any{
										"var": "pile_id",
									},
									map[string]any{
										"lit": "draw",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"deck_id",
										"pile_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_id}",
									"draw",
									"random",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"deck",
							"pile",
						},
					},
				},
			},
			"pile_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cards",
						"short": "Array of cards in the pile",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "remaining",
						"short": "Number of cards remaining in the pile",
						"type": "`$INTEGER`",
					},
				},
				"name": "pile_list",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/list/",
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"var": "deck_id",
									},
									map[string]any{
										"lit": "pile",
									},
									map[string]any{
										"var": "pile_name",
									},
									map[string]any{
										"lit": "list",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"deck_id",
										"pile_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.piles`",
								},
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_name}",
									"list",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"deck",
							"pile",
						},
					},
				},
			},
			"return": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "remaining",
						"short": "Number of cards remaining in the pile",
						"type": "`$INTEGER`",
					},
				},
				"name": "return",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "card",
											"orig": "card",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/return/",
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"var": "deck_id",
									},
									map[string]any{
										"lit": "pile",
									},
									map[string]any{
										"var": "pile_name",
									},
									map[string]any{
										"lit": "return",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"card",
										"deck_id",
										"pile_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.piles`",
								},
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_name}",
									"return",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "card",
											"orig": "card",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/return/",
								"segments": []any{
									map[string]any{
										"lit": "deck",
									},
									map[string]any{
										"var": "deck_id",
									},
									map[string]any{
										"lit": "return",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"card",
										"deck_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.piles`",
								},
								"parts": []any{
									"deck",
									"{deck_id}",
									"return",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"deck",
						},
						[]any{
							"deck",
							"pile",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
