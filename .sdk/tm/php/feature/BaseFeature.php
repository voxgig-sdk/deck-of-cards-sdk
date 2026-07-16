<?php
declare(strict_types=1);

// DeckOfCards SDK base feature

class DeckOfCardsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(DeckOfCardsContext $ctx, array $options): void {}
    public function PostConstruct(DeckOfCardsContext $ctx): void {}
    public function PostConstructEntity(DeckOfCardsContext $ctx): void {}
    public function SetData(DeckOfCardsContext $ctx): void {}
    public function GetData(DeckOfCardsContext $ctx): void {}
    public function GetMatch(DeckOfCardsContext $ctx): void {}
    public function SetMatch(DeckOfCardsContext $ctx): void {}
    public function PrePoint(DeckOfCardsContext $ctx): void {}
    public function PreSpec(DeckOfCardsContext $ctx): void {}
    public function PreRequest(DeckOfCardsContext $ctx): void {}
    public function PreResponse(DeckOfCardsContext $ctx): void {}
    public function PreResult(DeckOfCardsContext $ctx): void {}
    public function PreDone(DeckOfCardsContext $ctx): void {}
    public function PreUnexpected(DeckOfCardsContext $ctx): void {}
}
