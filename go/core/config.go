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
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "remaining",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "shuffled",
						"req": false,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "deck",
				"op": map[string]any{
					"load": map[string]any{
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "card",
											"orig": "card",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "deck_count",
											"orig": "deck_count",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "jokers_enabled",
											"orig": "jokers_enabled",
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "remaining",
											"orig": "remaining",
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 1,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "jokers_enabled",
											"orig": "jokers_enabled",
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 2,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "image",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "suit",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "value",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "draw",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"name": "deck_id",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "pile",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "remaining",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "pile",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "card",
											"orig": "card",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "image",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "suit",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "value",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "pile_draw",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "card",
											"orig": "card",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "pile_id",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 1,
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "pile_id",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 2,
							},
						},
						"input": "data",
						"key$": "list",
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
						"name": "deck_id",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "pile",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "remaining",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "pile_list",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"name": "deck_id",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "pile",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "remaining",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "shuffled",
						"req": false,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "success",
						"req": false,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "return",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"kind": "param",
											"name": "pile_name",
											"orig": "pile_name",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "card",
											"orig": "card",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "card",
											"orig": "card",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "load",
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
