<?php
declare(strict_types=1);

// DeckOfCards SDK utility: feature_hook

class DeckOfCardsFeatureHook
{
    public static function call(DeckOfCardsContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
