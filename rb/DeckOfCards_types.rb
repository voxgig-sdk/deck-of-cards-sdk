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
  :remaining,
  :shuffled,
  :success,
  keyword_init: true
)

# Request payload for Deck#load.
#
# @!attribute [rw] id
#   @return [String]
DeckLoadMatch = Struct.new(
  :id,
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
# @!attribute [rw] suit
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
Draw = Struct.new(
  :code,
  :image,
  :suit,
  :value,
  keyword_init: true
)

# Request payload for Draw#list.
#
# @!attribute [rw] deck_id
#   @return [String]
DrawListMatch = Struct.new(
  :deck_id,
  keyword_init: true
)

# Pile entity data model.
#
# @!attribute [rw] deck_id
#   @return [String, nil]
#
# @!attribute [rw] pile
#   @return [Hash, nil]
#
# @!attribute [rw] remaining
#   @return [Integer, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Pile = Struct.new(
  :deck_id,
  :pile,
  :remaining,
  :success,
  keyword_init: true
)

# Request payload for Pile#load.
#
# @!attribute [rw] deck_id
#   @return [String]
#
# @!attribute [rw] pile_name
#   @return [String]
PileLoadMatch = Struct.new(
  :deck_id,
  :pile_name,
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
# @!attribute [rw] suit
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
PileDraw = Struct.new(
  :code,
  :image,
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
#   @return [String]
#
# @!attribute [rw] pile_id
#   @return [String]
PileDrawListMatch = Struct.new(
  :deck_id,
  :pile_name,
  :pile_id,
  keyword_init: true
)

# PileList entity data model.
#
# @!attribute [rw] deck_id
#   @return [String, nil]
#
# @!attribute [rw] pile
#   @return [Hash, nil]
#
# @!attribute [rw] remaining
#   @return [Integer, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
PileList = Struct.new(
  :deck_id,
  :pile,
  :remaining,
  :success,
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
# @!attribute [rw] deck_id
#   @return [String, nil]
#
# @!attribute [rw] pile
#   @return [Hash, nil]
#
# @!attribute [rw] remaining
#   @return [Integer, nil]
#
# @!attribute [rw] shuffled
#   @return [Boolean, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Return = Struct.new(
  :deck_id,
  :pile,
  :remaining,
  :shuffled,
  :success,
  keyword_init: true
)

# Request payload for Return#load.
#
# @!attribute [rw] deck_id
#   @return [String]
#
# @!attribute [rw] pile_name
#   @return [String]
ReturnLoadMatch = Struct.new(
  :deck_id,
  :pile_name,
  keyword_init: true
)

