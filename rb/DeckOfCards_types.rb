# frozen_string_literal: true

# Typed models for the DeckOfCards SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Deck entity data model.
#
# @!attribute [rw] deck_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] remaining
#   @return [Integer, nil]
#
# @!attribute [rw] shuffled
#   @return [Boolean, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Deck = Struct.new(
  :deck_id,
  :id,
  :remaining,
  :shuffled,
  :success,
  keyword_init: true
)

# Request payload for Deck#load.
#
# @!attribute [rw] card
#   @return [String, nil]
#
# @!attribute [rw] deck_count
#   @return [Integer, nil]
#
# @!attribute [rw] jokers_enabled
#   @return [Boolean, nil]
DeckLoadMatch = Struct.new(
  :card,
  :deck_count,
  :jokers_enabled,
  keyword_init: true
)

# Draw entity data model.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] images
#   @return [Hash, nil]
#
# @!attribute [rw] suit
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
Draw = Struct.new(
  :code,
  :image,
  :images,
  :suit,
  :value,
  keyword_init: true
)

# Request payload for Draw#list.
#
# @!attribute [rw] deck_id
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
DrawListMatch = Struct.new(
  :deck_id,
  :count,
  keyword_init: true
)

# Pile entity data model.
#
# @!attribute [rw] remaining
#   @return [Integer, nil]
Pile = Struct.new(
  :remaining,
  keyword_init: true
)

# Request payload for Pile#load.
#
# @!attribute [rw] deck_id
#   @return [String]
#
# @!attribute [rw] pile_name
#   @return [String]
#
# @!attribute [rw] card
#   @return [String, nil]
PileLoadMatch = Struct.new(
  :deck_id,
  :pile_name,
  :card,
  keyword_init: true
)

# PileDraw entity data model.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] images
#   @return [Hash, nil]
#
# @!attribute [rw] suit
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
PileDraw = Struct.new(
  :code,
  :image,
  :images,
  :suit,
  :value,
  keyword_init: true
)

# Request payload for PileDraw#list.
#
# @!attribute [rw] deck_id
#   @return [String]
#
# @!attribute [rw] pile_name
#   @return [String, nil]
#
# @!attribute [rw] card
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] pile_id
#   @return [String, nil]
PileDrawListMatch = Struct.new(
  :deck_id,
  :pile_name,
  :card,
  :count,
  :pile_id,
  keyword_init: true
)

# PileList entity data model.
#
# @!attribute [rw] cards
#   @return [Array, nil]
#
# @!attribute [rw] remaining
#   @return [Integer, nil]
PileList = Struct.new(
  :cards,
  :remaining,
  keyword_init: true
)

# Request payload for PileList#load.
#
# @!attribute [rw] deck_id
#   @return [String]
#
# @!attribute [rw] pile_name
#   @return [String]
PileListLoadMatch = Struct.new(
  :deck_id,
  :pile_name,
  keyword_init: true
)

# Return entity data model.
#
# @!attribute [rw] remaining
#   @return [Integer, nil]
Return = Struct.new(
  :remaining,
  keyword_init: true
)

# Request payload for Return#load.
#
# @!attribute [rw] deck_id
#   @return [String]
#
# @!attribute [rw] pile_name
#   @return [String, nil]
#
# @!attribute [rw] card
#   @return [String, nil]
ReturnLoadMatch = Struct.new(
  :deck_id,
  :pile_name,
  :card,
  keyword_init: true
)

