<?php
declare(strict_types=1);

// DeckOfCards SDK utility: result_headers

class DeckOfCardsResultHeaders
{
    public static function call(DeckOfCardsContext $ctx): ?DeckOfCardsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
