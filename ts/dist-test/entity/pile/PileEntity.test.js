"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PileEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DECK_OF_CARDS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DECK_OF_CARDS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DeckOfCardsSDK.test();
        const ent = testsdk.Pile();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DECK_OF_CARDS_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pile.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "remaining", "req": false, "short": "Number of cards remaining in the pile", "type": "`$INTEGER`", "index$": 0 }], "name": "pile", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "deck_id", "orig": "deck_id", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "pile_name", "orig": "pile_name", "reqd": true, "type": "`$STRING`", "index$": 1 }], "query": [{ "active": true, "kind": "query", "name": "card", "orig": "card", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /deck/{deck_id}/pile/{pile_name}/add/", "json": "{\"operationId\":\"addToPile\",\"parameters\":[{\"description\":\"The deck identifier\",\"in\":\"path\",\"name\":\"deck_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the pile\",\"in\":\"path\",\"name\":\"pile_name\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated list of card codes to add to the pile (e.g., AS,2S)\",\"in\":\"query\",\"name\":\"cards\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"deck_id\":\"3p40paa87x90\",\"piles\":{\"discard\":{\"remaining\":2}},\"remaining\":12,\"success\":true},\"schema\":{\"properties\":{\"deck_id\":{\"description\":\"Unique identifier for the deck\",\"type\":\"string\"},\"piles\":{\"additionalProperties\":{\"properties\":{\"remaining\":{\"description\":\"Number of cards remaining in the pile\",\"type\":\"integer\"}},\"type\":\"object\"},\"description\":\"Object containing pile information\",\"type\":\"object\"},\"remaining\":{\"description\":\"Number of cards remaining in the main deck\",\"type\":\"integer\"},\"success\":{\"description\":\"Whether the operation was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/deck/{deck_id}/pile/{pile_name}/add/", "segments": [{ "lit": "deck" }, { "var": "deck_id" }, { "lit": "pile" }, { "var": "pile_name" }, { "lit": "add" }], "select": { "$action": "add", "exist": ["card", "deck_id", "pile_name"] }, "transform": { "req": "`reqdata`", "res": "`body.piles`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "deck_id", "orig": "deck_id", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "pile_name", "orig": "pile_name", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /deck/{deck_id}/pile/{pile_name}/shuffle/", "json": "{\"operationId\":\"shufflePile\",\"parameters\":[{\"description\":\"The deck identifier\",\"in\":\"path\",\"name\":\"deck_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the pile\",\"in\":\"path\",\"name\":\"pile_name\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"deck_id\":{\"description\":\"Unique identifier for the deck\",\"type\":\"string\"},\"piles\":{\"additionalProperties\":{\"properties\":{\"remaining\":{\"description\":\"Number of cards remaining in the pile\",\"type\":\"integer\"}},\"type\":\"object\"},\"description\":\"Object containing pile information\",\"type\":\"object\"},\"remaining\":{\"description\":\"Number of cards remaining in the main deck\",\"type\":\"integer\"},\"success\":{\"description\":\"Whether the operation was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/deck/{deck_id}/pile/{pile_name}/shuffle/", "segments": [{ "lit": "deck" }, { "var": "deck_id" }, { "lit": "pile" }, { "var": "pile_name" }, { "lit": "shuffle" }], "select": { "$action": "shuffle", "exist": ["deck_id", "pile_name"] }, "transform": { "req": "`reqdata`", "res": "`body.piles`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["deck", "pile"]] }, "key$": "pile", "name__orig": "pile", "Name": "Pile", "name_": "pile", "name-": "pile", "NAME": "PILE", "index$": 2 }, { "active": true, "entity": "pile", "key$": "BasicPileFlow", "kind": "basic", "name": "BasicPileFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "pile_ref01", "srcdatavar": "pile_ref01_data", "suffix": "_dt0" }, "match": { "deck_id": "deck01", "id": "pile01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-pile_ref01" } }], "index$": 0 }] }, 'Pile');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let pile_ref01_data = Object.values(setup.data.existing.pile)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const pile_ref01_ent = client.Pile();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pile/PileTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DeckOfCardsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pile01', 'pile02', 'pile03', 'deck01', 'deck02', 'deck03', 'pile01', 'pile02', 'pile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DECK_OF_CARDS_TEST_PILE_ENTID': idmap,
        'DECK_OF_CARDS_TEST_LIVE': 'FALSE',
        'DECK_OF_CARDS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DECK_OF_CARDS_TEST_PILE_ENTID'];
    const live = 'TRUE' === env.DECK_OF_CARDS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DECK_OF_CARDS_TEST_PILE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DeckOfCardsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.DECK_OF_CARDS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PileEntity.test.js.map