<?php
declare(strict_types=1);

// DeckOfCards SDK utility: prepare_body

class DeckOfCardsPrepareBody
{
    public static function call(DeckOfCardsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
