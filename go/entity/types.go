// Typed models for the DeckOfCards SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Deck is the typed data model for the deck entity.
type Deck struct {
	DeckId *string `json:"deck_id,omitempty"`
	Remaining *int `json:"remaining,omitempty"`
	Shuffled *bool `json:"shuffled,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// DeckLoadMatch is the typed request payload for Deck.LoadTyped.
type DeckLoadMatch struct {
	Id string `json:"id"`
}

// Draw is the typed data model for the draw entity.
type Draw struct {
	Code *string `json:"code,omitempty"`
	Image *string `json:"image,omitempty"`
	Suit *string `json:"suit,omitempty"`
	Value *string `json:"value,omitempty"`
}

// DrawListMatch is the typed request payload for Draw.ListTyped.
type DrawListMatch struct {
	DeckId string `json:"deck_id"`
}

// Pile is the typed data model for the pile entity.
type Pile struct {
	DeckId *string `json:"deck_id,omitempty"`
	Pile *map[string]any `json:"pile,omitempty"`
	Remaining *int `json:"remaining,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// PileLoadMatch is the typed request payload for Pile.LoadTyped.
type PileLoadMatch struct {
	DeckId string `json:"deck_id"`
	PileName string `json:"pile_name"`
}

// PileDraw is the typed data model for the pile_draw entity.
type PileDraw struct {
	Code *string `json:"code,omitempty"`
	Image *string `json:"image,omitempty"`
	Suit *string `json:"suit,omitempty"`
	Value *string `json:"value,omitempty"`
}

// PileDrawListMatch is the typed request payload for PileDraw.ListTyped.
type PileDrawListMatch struct {
	DeckId string `json:"deck_id"`
	PileName string `json:"pile_name"`
	PileId string `json:"pile_id"`
}

// PileList is the typed data model for the pile_list entity.
type PileList struct {
	DeckId *string `json:"deck_id,omitempty"`
	Pile *map[string]any `json:"pile,omitempty"`
	Remaining *int `json:"remaining,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// PileListLoadMatch is the typed request payload for PileList.LoadTyped.
type PileListLoadMatch struct {
	DeckId string `json:"deck_id"`
	PileName string `json:"pile_name"`
}

// Return is the typed data model for the return entity.
type Return struct {
	DeckId *string `json:"deck_id,omitempty"`
	Pile *map[string]any `json:"pile,omitempty"`
	Remaining *int `json:"remaining,omitempty"`
	Shuffled *bool `json:"shuffled,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// ReturnLoadMatch is the typed request payload for Return.LoadTyped.
type ReturnLoadMatch struct {
	DeckId string `json:"deck_id"`
	PileName string `json:"pile_name"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
