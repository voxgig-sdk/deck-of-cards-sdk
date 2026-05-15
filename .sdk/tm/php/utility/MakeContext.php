<?php
declare(strict_types=1);

// DeckOfCards SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DeckOfCardsMakeContext
{
    public static function call(array $ctxmap, ?DeckOfCardsContext $basectx): DeckOfCardsContext
    {
        return new DeckOfCardsContext($ctxmap, $basectx);
    }
}
