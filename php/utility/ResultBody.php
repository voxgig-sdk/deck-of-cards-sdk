<?php
declare(strict_types=1);

// DeckOfCards SDK utility: result_body

class DeckOfCardsResultBody
{
    public static function call(DeckOfCardsContext $ctx): ?DeckOfCardsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
