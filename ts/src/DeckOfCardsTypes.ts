// Typed models for the DeckOfCards SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Deck {
  deck_id?: string
  id?: string
  remaining?: number
  shuffled?: boolean
  success?: boolean
}

export interface DeckLoadMatch {
  deck_id?: string
  id: string
  remaining?: number
  shuffled?: boolean
  success?: boolean

  // Selects a custom action instead of the plain load:
  //   'new' | 'shuffle'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Draw {
  code?: string
  image?: string
  images?: Record<string, any>
  suit?: string
  value?: string
}

export interface DrawListMatch {
  deck_id: string
}

export interface Pile {
  remaining?: number
}

export interface PileLoadMatch {
  deck_id: string
  pile_name: string

  // Selects a custom action instead of the plain load:
  //   'add' | 'shuffle'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PileDraw {
  code?: string
  image?: string
  images?: Record<string, any>
  suit?: string
  value?: string
}

export interface PileDrawListMatch {
  deck_id: string
  pile_name?: string
  pile_id?: string
}

export interface PileList {
  cards?: any[]
  remaining?: number
}

export interface PileListLoadMatch {
  deck_id: string
  pile_name: string
}

export interface Return {
  remaining?: number
}

export interface ReturnLoadMatch {
  deck_id: string
  pile_name?: string
}

