<?php
declare(strict_types=1);

// DeckOfCards SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class DeckOfCardsSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new DeckOfCardsUtility();
        $this->_utility = $utility;

        $config = DeckOfCardsConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = DeckOfCardsHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = DeckOfCardsHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, DeckOfCardsFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return DeckOfCardsUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = DeckOfCardsHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = DeckOfCardsHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = DeckOfCardsHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new DeckOfCardsSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = DeckOfCardsHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = DeckOfCardsHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_deck = null;

    // Canonical facade: $client->Deck()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deck()
    // resolves here too.
    public function Deck($data = null)
    {
        require_once __DIR__ . '/entity/deck_entity.php';
        if ($data === null) {
            if ($this->_deck === null) {
                $this->_deck = new DeckEntity($this, null);
            }
            return $this->_deck;
        }
        return new DeckEntity($this, $data);
    }


    private $_draw = null;

    // Canonical facade: $client->Draw()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->draw()
    // resolves here too.
    public function Draw($data = null)
    {
        require_once __DIR__ . '/entity/draw_entity.php';
        if ($data === null) {
            if ($this->_draw === null) {
                $this->_draw = new DrawEntity($this, null);
            }
            return $this->_draw;
        }
        return new DrawEntity($this, $data);
    }


    private $_pile = null;

    // Canonical facade: $client->Pile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pile()
    // resolves here too.
    public function Pile($data = null)
    {
        require_once __DIR__ . '/entity/pile_entity.php';
        if ($data === null) {
            if ($this->_pile === null) {
                $this->_pile = new PileEntity($this, null);
            }
            return $this->_pile;
        }
        return new PileEntity($this, $data);
    }


    private $_pile_draw = null;

    // Canonical facade: $client->PileDraw()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pile_draw()
    // resolves here too.
    public function PileDraw($data = null)
    {
        require_once __DIR__ . '/entity/pile_draw_entity.php';
        if ($data === null) {
            if ($this->_pile_draw === null) {
                $this->_pile_draw = new PileDrawEntity($this, null);
            }
            return $this->_pile_draw;
        }
        return new PileDrawEntity($this, $data);
    }


    private $_pile_list = null;

    // Canonical facade: $client->PileList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pile_list()
    // resolves here too.
    public function PileList($data = null)
    {
        require_once __DIR__ . '/entity/pile_list_entity.php';
        if ($data === null) {
            if ($this->_pile_list === null) {
                $this->_pile_list = new PileListEntity($this, null);
            }
            return $this->_pile_list;
        }
        return new PileListEntity($this, $data);
    }


    private $_return = null;

    // Canonical facade: $client->Return()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->return()
    // resolves here too.
    public function Return($data = null)
    {
        require_once __DIR__ . '/entity/return_entity.php';
        if ($data === null) {
            if ($this->_return === null) {
                $this->_return = new ReturnEntity($this, null);
            }
            return $this->_return;
        }
        return new ReturnEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new DeckOfCardsSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
