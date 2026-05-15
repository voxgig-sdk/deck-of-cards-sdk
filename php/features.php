<?php
declare(strict_types=1);

// DeckOfCards SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class DeckOfCardsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new DeckOfCardsBaseFeature();
            case "test":
                return new DeckOfCardsTestFeature();
            default:
                return new DeckOfCardsBaseFeature();
        }
    }
}
