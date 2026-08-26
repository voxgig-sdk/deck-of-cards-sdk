// Typed models for the DeckOfCards SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/deck-of-cards-sdk/go/core"
)

// Deck is the typed data model for the deck entity.
type Deck struct {
	DeckId *string `json:"deck_id,omitempty"`
	Id *string `json:"id,omitempty"`
	Remaining *int `json:"remaining,omitempty"`
	Shuffled *bool `json:"shuffled,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// DeckLoadMatch is the typed request payload for Deck.LoadTyped.
type DeckLoadMatch struct {
	DeckId *string `json:"deck_id,omitempty"`
	Id string `json:"id"`
	Remaining *int `json:"remaining,omitempty"`
	Shuffled *bool `json:"shuffled,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Draw is the typed data model for the draw entity.
type Draw struct {
	Code *string `json:"code,omitempty"`
	Image *string `json:"image,omitempty"`
	Images *map[string]any `json:"images,omitempty"`
	Suit *string `json:"suit,omitempty"`
	Value *string `json:"value,omitempty"`
}

// DrawListMatch is the typed request payload for Draw.ListTyped.
type DrawListMatch struct {
	DeckId string `json:"deck_id"`
}

// Pile is the typed data model for the pile entity.
type Pile struct {
	Remaining *int `json:"remaining,omitempty"`
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
	Images *map[string]any `json:"images,omitempty"`
	Suit *string `json:"suit,omitempty"`
	Value *string `json:"value,omitempty"`
}

// PileDrawListMatch is the typed request payload for PileDraw.ListTyped.
type PileDrawListMatch struct {
	DeckId string `json:"deck_id"`
	PileName *string `json:"pile_name,omitempty"`
	PileId *string `json:"pile_id,omitempty"`
}

// PileList is the typed data model for the pile_list entity.
type PileList struct {
	Cards *[]any `json:"cards,omitempty"`
	Remaining *int `json:"remaining,omitempty"`
}

// PileListLoadMatch is the typed request payload for PileList.LoadTyped.
type PileListLoadMatch struct {
	DeckId string `json:"deck_id"`
	PileName string `json:"pile_name"`
}

// Return is the typed data model for the return entity.
type Return struct {
	Remaining *int `json:"remaining,omitempty"`
}

// ReturnLoadMatch is the typed request payload for Return.LoadTyped.
type ReturnLoadMatch struct {
	DeckId string `json:"deck_id"`
	PileName *string `json:"pile_name,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
