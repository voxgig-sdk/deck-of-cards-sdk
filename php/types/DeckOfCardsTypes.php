<?php
declare(strict_types=1);

// Typed models for the DeckOfCards SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Deck entity data model. */
class Deck
{
    public ?string $deck_id = null;
    public ?int $remaining = null;
    public ?bool $shuffled = null;
    public ?bool $success = null;
}

/** Request payload for Deck#load. */
class DeckLoadMatch
{
    public string $id;
}

/** Draw entity data model. */
class Draw
{
    public ?string $code = null;
    public ?string $image = null;
    public ?string $suit = null;
    public ?string $value = null;
}

/** Request payload for Draw#list. */
class DrawListMatch
{
    public string $deck_id;
}

/** Pile entity data model. */
class Pile
{
    public ?string $deck_id = null;
    public ?array $pile = null;
    public ?int $remaining = null;
    public ?bool $success = null;
}

/** Request payload for Pile#load. */
class PileLoadMatch
{
    public string $deck_id;
    public string $pile_name;
}

/** PileDraw entity data model. */
class PileDraw
{
    public ?string $code = null;
    public ?string $image = null;
    public ?string $suit = null;
    public ?string $value = null;
}

/** Request payload for PileDraw#list. */
class PileDrawListMatch
{
    public string $deck_id;
    public string $pile_name;
    public string $pile_id;
}

/** PileList entity data model. */
class PileList
{
    public ?string $deck_id = null;
    public ?array $pile = null;
    public ?int $remaining = null;
    public ?bool $success = null;
}

/** Request payload for PileList#load. */
class PileListLoadMatch
{
    public string $deck_id;
    public string $pile_name;
}

/** Return entity data model. */
class Return
{
    public ?string $deck_id = null;
    public ?array $pile = null;
    public ?int $remaining = null;
    public ?bool $shuffled = null;
    public ?bool $success = null;
}

/** Request payload for Return#load. */
class ReturnLoadMatch
{
    public string $deck_id;
    public string $pile_name;
}

