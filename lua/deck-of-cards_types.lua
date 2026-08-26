-- Typed models for the DeckOfCards SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Deck
---@field deck_id? string
---@field id? string
---@field remaining? number
---@field shuffled? boolean
---@field success? boolean

---@class DeckLoadMatch
---@field deck_id? string
---@field id string
---@field remaining? number
---@field shuffled? boolean
---@field success? boolean

---@class Draw
---@field code? string
---@field image? string
---@field images? table
---@field suit? string
---@field value? string

---@class DrawListMatch
---@field deck_id string

---@class Pile
---@field remaining? number

---@class PileLoadMatch
---@field deck_id string
---@field pile_name string

---@class PileDraw
---@field code? string
---@field image? string
---@field images? table
---@field suit? string
---@field value? string

---@class PileDrawListMatch
---@field deck_id string
---@field pile_name? string
---@field pile_id? string

---@class PileList
---@field cards? table
---@field remaining? number

---@class PileListLoadMatch
---@field deck_id string
---@field pile_name string

---@class Return
---@field remaining? number

---@class ReturnLoadMatch
---@field deck_id string
---@field pile_name? string

local M = {}

return M
