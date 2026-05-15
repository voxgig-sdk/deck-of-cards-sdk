<?php
declare(strict_types=1);

// DeckOfCards SDK exists test

require_once __DIR__ . '/../deckofcards_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = DeckOfCardsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
