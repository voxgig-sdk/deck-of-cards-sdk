<?php
declare(strict_types=1);

// DeckOfCards SDK context

require_once __DIR__ . '/Control.php';
require_once __DIR__ . '/Operation.php';
require_once __DIR__ . '/Spec.php';
require_once __DIR__ . '/Result.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Error.php';
require_once __DIR__ . '/Helpers.php';

class DeckOfCardsContext
{
    public string $id;
    public array $out;
    public mixed $client;
    public ?DeckOfCardsUtility $utility;
    public DeckOfCardsControl $ctrl;
    public array $meta;
    public ?array $config;
    public ?array $entopts;
    public ?array $options;
    public mixed $entity;
    public ?array $shared;
    public array $opmap;
    public array $data;
    public array $reqdata;
    public array $match;
    public array $reqmatch;
    public ?array $point;
    public ?DeckOfCardsSpec $spec;
    public ?DeckOfCardsResult $result;
    public ?DeckOfCardsResponse $response;
    public DeckOfCardsOperation $op;

    public function __construct(array $ctxmap = [], ?self $basectx = null)
    {
        $this->id = 'C' . random_int(10000000, 99999999);
        $this->out = [];

        $this->client = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'client') ?? ($basectx ? $basectx->client : null);
        $this->utility = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'utility') ?? ($basectx ? $basectx->utility : null);

        $this->ctrl = new DeckOfCardsControl();
        $ctrl_raw = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'ctrl');
        if (is_array($ctrl_raw)) {
            if (array_key_exists('throw', $ctrl_raw)) {
                $this->ctrl->throw_err = $ctrl_raw['throw'];
            }
            if (isset($ctrl_raw['explain']) && is_array($ctrl_raw['explain'])) {
                $this->ctrl->explain = $ctrl_raw['explain'];
            }
        } elseif ($basectx !== null && $basectx->ctrl !== null) {
            $this->ctrl = $basectx->ctrl;
        }

        $m = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'meta');
        $this->meta = is_array($m) ? $m : ($basectx ? $basectx->meta ?? [] : []);

        $cfg = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'config');
        $this->config = is_array($cfg) ? $cfg : ($basectx ? $basectx->config : null);

        $eo = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'entopts');
        $this->entopts = is_array($eo) ? $eo : ($basectx ? $basectx->entopts : null);

        $o = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'options');
        $this->options = is_array($o) ? $o : ($basectx ? $basectx->options : null);

        $e = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'entity');
        $this->entity = $e ?? ($basectx ? $basectx->entity : null);

        $s = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'shared');
        $this->shared = is_array($s) ? $s : ($basectx ? $basectx->shared : null);

        $om = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'opmap');
        $this->opmap = is_array($om) ? $om : ($basectx ? $basectx->opmap ?? [] : []);

        $this->data = DeckOfCardsHelpers::to_map(DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'data')) ?? [];
        $this->reqdata = DeckOfCardsHelpers::to_map(DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'reqdata')) ?? [];
        $this->match = DeckOfCardsHelpers::to_map(DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'match')) ?? [];
        $this->reqmatch = DeckOfCardsHelpers::to_map(DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'reqmatch')) ?? [];

        $pt = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'point');
        $this->point = is_array($pt) ? $pt : ($basectx ? $basectx->point : null);

        $sp = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'spec');
        $this->spec = ($sp instanceof DeckOfCardsSpec) ? $sp : ($basectx ? $basectx->spec : null);

        $r = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'result');
        $this->result = ($r instanceof DeckOfCardsResult) ? $r : ($basectx ? $basectx->result : null);

        $rp = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'response');
        $this->response = ($rp instanceof DeckOfCardsResponse) ? $rp : ($basectx ? $basectx->response : null);

        $opname = DeckOfCardsHelpers::get_ctx_prop($ctxmap, 'opname') ?? '';
        $this->op = $this->resolve_op($opname);
    }

    public function resolve_op(string $opname): DeckOfCardsOperation
    {
        // Cache key is `<entity>:<opname>` so two entities with the same op
        // (e.g. both have a "list") get distinct cached Operations. Keying
        // on opname alone caused the first-resolved entity's points to be
        // served to every subsequent entity's call.
        $entname = (is_object($this->entity) && method_exists($this->entity, 'get_name'))
            ? $this->entity->get_name()
            : '_';
        $cacheKey = $entname . ':' . $opname;

        if (isset($this->opmap[$cacheKey])) {
            return $this->opmap[$cacheKey];
        }
        if ($opname === '') {
            return new DeckOfCardsOperation([]);
        }

        $opcfg = \Voxgig\Struct\Struct::getpath($this->config, "entity.{$entname}.op.{$opname}");

        $input = ($opname === 'update' || $opname === 'create') ? 'data' : 'match';

        $points = [];
        if (is_array($opcfg)) {
            $t = \Voxgig\Struct\Struct::getprop($opcfg, 'points');
            if (is_array($t)) {
                $points = $t;
            }
        }

        $op = new DeckOfCardsOperation([
            'entity' => $entname,
            'name' => $opname,
            'input' => $input,
            'points' => $points,
        ]);
        $this->opmap[$cacheKey] = $op;
        return $op;
    }

    public function make_error(string $code, string $msg): DeckOfCardsError
    {
        return new DeckOfCardsError($code, $msg, $this);
    }
}
