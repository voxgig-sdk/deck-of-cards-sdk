<?php
declare(strict_types=1);

// DeckOfCards SDK utility: prepare_headers

class DeckOfCardsPrepareHeaders
{
    public static function call(DeckOfCardsContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
