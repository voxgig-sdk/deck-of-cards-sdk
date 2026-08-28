# Typed models for the DeckOfCards SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Deck(TypedDict, total=False):
    deck_id: str
    id: str
    remaining: int
    shuffled: bool
    success: bool


class DeckLoadMatch(TypedDict, total=False):
    card: str
    deck_count: int
    jokers_enabled: bool


class Draw(TypedDict, total=False):
    code: str
    image: str
    images: dict
    suit: str
    value: str


class DrawListMatchRequired(TypedDict):
    deck_id: str


class DrawListMatch(DrawListMatchRequired, total=False):
    count: int


class Pile(TypedDict, total=False):
    remaining: int


class PileLoadMatchRequired(TypedDict):
    deck_id: str
    pile_name: str


class PileLoadMatch(PileLoadMatchRequired, total=False):
    card: str


class PileDraw(TypedDict, total=False):
    code: str
    image: str
    images: dict
    suit: str
    value: str


class PileDrawListMatchRequired(TypedDict):
    deck_id: str


class PileDrawListMatch(PileDrawListMatchRequired, total=False):
    pile_name: str
    card: str
    count: int
    pile_id: str


class PileList(TypedDict, total=False):
    cards: list
    remaining: int


class PileListLoadMatch(TypedDict):
    deck_id: str
    pile_name: str


class Return(TypedDict, total=False):
    remaining: int


class ReturnLoadMatchRequired(TypedDict):
    deck_id: str


class ReturnLoadMatch(ReturnLoadMatchRequired, total=False):
    pile_name: str
    card: str
