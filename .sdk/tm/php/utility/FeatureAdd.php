<?php
declare(strict_types=1);

// DeckOfCards SDK utility: feature_add

class DeckOfCardsFeatureAdd
{
    public static function call(DeckOfCardsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
