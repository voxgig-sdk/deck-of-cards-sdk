package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "DeckOfCards",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"active": true,
						"name": "deck_id",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "remaining",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "shuffled",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 3,
					},
				},
				"name": "deck",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "card",
											"orig": "card",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 1,
											"kind": "query",
											"name": "deck_count",
											"orig": "deck_count",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "jokers_enabled",
											"orig": "jokers_enabled",
											"reqd": false,
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/new/shuffle/",
								"parts": []any{
									"deck",
									"new",
									"shuffle",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "remaining",
											"orig": "remaining",
											"reqd": false,
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/shuffle/",
								"parts": []any{
									"deck",
									"{id}",
									"shuffle",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"deck_id": "id",
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "jokers_enabled",
											"orig": "jokers_enabled",
											"reqd": false,
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/new/",
								"parts": []any{
									"deck",
									"new",
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
								"index$": 2,
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
						"active": true,
						"name": "code",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "image",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "images",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "suit",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "value",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
				},
				"name": "draw",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"example": 1,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/draw/",
								"parts": []any{
									"deck",
									"{deck_id}",
									"draw",
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
								"index$": 0,
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
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "remaining",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
				},
				"name": "pile",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
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
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_name}",
									"add",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/shuffle/",
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_name}",
									"shuffle",
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
								"index$": 1,
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
						"active": true,
						"name": "code",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "image",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "images",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "suit",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "value",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
				},
				"name": "pile_draw",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "card",
											"orig": "card",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/draw/",
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_name}",
									"draw",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "pile_id",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/draw/bottom/",
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_id}",
									"draw",
									"bottom",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"pile_name": "pile_id",
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "pile_id",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/draw/random/",
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_id}",
									"draw",
									"random",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"pile_name": "pile_id",
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
								"index$": 2,
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
						"active": true,
						"name": "cards",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "remaining",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 1,
					},
				},
				"name": "pile_list",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/list/",
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_name}",
									"list",
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
								"index$": 0,
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
						"active": true,
						"name": "remaining",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
				},
				"name": "return",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "card",
											"orig": "card",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/pile/{pile_name}/return/",
								"parts": []any{
									"deck",
									"{deck_id}",
									"pile",
									"{pile_name}",
									"return",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "deck_id",
											"orig": "deck_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "card",
											"orig": "card",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/deck/{deck_id}/return/",
								"parts": []any{
									"deck",
									"{deck_id}",
									"return",
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
								"index$": 1,
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

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
