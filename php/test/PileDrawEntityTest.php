<?php
declare(strict_types=1);

// PileDraw entity test

require_once __DIR__ . '/../deckofcards_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PileDrawEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = DeckOfCardsSDK::test(null, null);
        $ent = $testsdk->PileDraw(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "pile_draw" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = DeckOfCardsSDK::test($seed, null);
        $seen = iterator_to_array($base->PileDraw(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = DeckOfCardsConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = DeckOfCardsSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->PileDraw(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = pile_draw_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "pile_draw." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set DECK_OF_CARDS_TEST_PILE_DRAW_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $pile_draw_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.pile_draw")));
        $pile_draw_ref01_data = null;
        if (count($pile_draw_ref01_data_raw) > 0) {
            $pile_draw_ref01_data = Helpers::to_map($pile_draw_ref01_data_raw[0][1]);
        }

        // LIST
        $pile_draw_ref01_ent = $client->PileDraw(null);
        $pile_draw_ref01_match = [
            "deck_id" => $setup["idmap"]["deck01"],
            "pile_id" => $setup["idmap"]["pile01"],
        ];

        $pile_draw_ref01_list_result = $pile_draw_ref01_ent->list($pile_draw_ref01_match, null);
        $this->assertIsArray($pile_draw_ref01_list_result);

    }
}

function pile_draw_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/pile_draw/PileDrawTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = DeckOfCardsSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["pile_draw01", "pile_draw02", "pile_draw03", "deck01", "deck02", "deck03", "pile01", "pile02", "pile03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("DECK_OF_CARDS_TEST_PILE_DRAW_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "DECK_OF_CARDS_TEST_PILE_DRAW_ENTID" => $idmap,
        "DECK_OF_CARDS_TEST_LIVE" => "FALSE",
        "DECK_OF_CARDS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["DECK_OF_CARDS_TEST_PILE_DRAW_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["DECK_OF_CARDS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new DeckOfCardsSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["DECK_OF_CARDS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["DECK_OF_CARDS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
