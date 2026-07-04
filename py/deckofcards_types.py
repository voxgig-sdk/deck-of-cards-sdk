# Typed models for the DeckOfCards SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Deck:
    deck_id: Optional[str] = None
    remaining: Optional[int] = None
    shuffled: Optional[bool] = None
    success: Optional[bool] = None


@dataclass
class DeckLoadMatch:
    id: str


@dataclass
class Draw:
    code: Optional[str] = None
    image: Optional[str] = None
    suit: Optional[str] = None
    value: Optional[str] = None


@dataclass
class DrawListMatch:
    deck_id: str


@dataclass
class Pile:
    deck_id: Optional[str] = None
    pile: Optional[dict] = None
    remaining: Optional[int] = None
    success: Optional[bool] = None


@dataclass
class PileLoadMatch:
    deck_id: str
    pile_name: str


@dataclass
class PileDraw:
    code: Optional[str] = None
    image: Optional[str] = None
    suit: Optional[str] = None
    value: Optional[str] = None


@dataclass
class PileDrawListMatch:
    deck_id: str
    pile_name: str
    pile_id: str


@dataclass
class PileList:
    deck_id: Optional[str] = None
    pile: Optional[dict] = None
    remaining: Optional[int] = None
    success: Optional[bool] = None


@dataclass
class PileListLoadMatch:
    deck_id: str
    pile_name: str


@dataclass
class Return:
    deck_id: Optional[str] = None
    pile: Optional[dict] = None
    remaining: Optional[int] = None
    shuffled: Optional[bool] = None
    success: Optional[bool] = None


@dataclass
class ReturnLoadMatch:
    deck_id: str
    pile_name: str

