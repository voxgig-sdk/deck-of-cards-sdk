// Typed models for the DeckOfCards SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Deck {
  deck_id?: string
  remaining?: number
  shuffled?: boolean
  success?: boolean
}

export interface DeckLoadMatch {
  deck_id?: string
  remaining?: number
  shuffled?: boolean
  success?: boolean
}

export interface Draw {
  code?: string
  image?: string
  suit?: string
  value?: string
}

export interface DrawListMatch {
  deck_id: string
}

export interface Pile {
  deck_id?: string
  pile?: Record<string, any>
  remaining?: number
  success?: boolean
}

export interface PileLoadMatch {
  deck_id: string
  pile_name: string
}

export interface PileDraw {
  code?: string
  image?: string
  suit?: string
  value?: string
}

export interface PileDrawListMatch {
  deck_id: string
  pile_name?: string
  pile_id?: string
}

export interface PileList {
  deck_id?: string
  pile?: Record<string, any>
  remaining?: number
  success?: boolean
}

export interface PileListLoadMatch {
  deck_id: string
  pile_name: string
}

export interface Return {
  deck_id?: string
  pile?: Record<string, any>
  remaining?: number
  shuffled?: boolean
  success?: boolean
}

export interface ReturnLoadMatch {
  deck_id: string
  pile_name?: string
}

