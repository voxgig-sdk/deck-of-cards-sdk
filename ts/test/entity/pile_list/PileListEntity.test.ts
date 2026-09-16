

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DeckOfCardsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('PileListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DECK_OF_CARDS_TEST_LIVE=TRUE.
  afterEach(liveDelay('DECK_OF_CARDS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeckOfCardsSDK.test()
    const ent = testsdk.PileList()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DECK_OF_CARDS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pile_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cards","req":false,"short":"Array of cards in the pile","type":"`$ARRAY`","index$":0},{"active":true,"name":"remaining","req":false,"short":"Number of cards remaining in the pile","type":"`$INTEGER`","index$":1}],"name":"pile_list","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"deck_id","orig":"deck_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"pile_name","orig":"pile_name","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /deck/{deck_id}/pile/{pile_name}/list/","json":"{\"operationId\":\"listPileCards\",\"parameters\":[{\"description\":\"The deck identifier\",\"in\":\"path\",\"name\":\"deck_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the pile\",\"in\":\"path\",\"name\":\"pile_name\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"deck_id\":\"d5x0uw65g416\",\"piles\":{\"player1\":{\"remaining\":3},\"player2\":{\"cards\":[{\"code\":\"KH\",\"image\":\"https://www.deckofcardsapi.com/static/img/KH.png\",\"suit\":\"HEARTS\",\"value\":\"KING\"}],\"remaining\":2}},\"remaining\":42,\"success\":true},\"schema\":{\"properties\":{\"deck_id\":{\"description\":\"Unique identifier for the deck\",\"type\":\"string\"},\"piles\":{\"additionalProperties\":{\"properties\":{\"cards\":{\"description\":\"Array of cards in the pile\",\"items\":{\"properties\":{\"code\":{\"description\":\"Two-character card code (e.g., AS for Ace of Spades)\",\"type\":\"string\"},\"image\":{\"description\":\"URL to the PNG image of the card\",\"type\":\"string\"},\"images\":{\"properties\":{\"png\":{\"description\":\"URL to the PNG image of the card\",\"type\":\"string\"},\"svg\":{\"description\":\"URL to the SVG image of the card\",\"type\":\"string\"}},\"type\":\"object\"},\"suit\":{\"description\":\"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)\",\"type\":\"string\"},\"value\":{\"description\":\"Card value (e.g., ACE, 2, 10, KING)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"remaining\":{\"description\":\"Number of cards remaining in the pile\",\"type\":\"integer\"}},\"type\":\"object\"},\"description\":\"Object containing detailed pile information with cards\",\"type\":\"object\"},\"remaining\":{\"description\":\"Number of cards remaining in the main deck\",\"type\":\"integer\"},\"success\":{\"description\":\"Whether the operation was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/deck/{deck_id}/pile/{pile_name}/list/","segments":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_name"},{"lit":"list"}],"select":{"exist":["deck_id","pile_name"]},"transform":{"req":"`reqdata`","res":"`body.piles`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["deck","pile"]]},"key$":"pile_list","name__orig":"pile_list","Name":"PileList","name_":"pile_list","name-":"pile-list","NAME":"PILE_LIST","index$":4}, {"active":true,"entity":"pile_list","key$":"BasicPileListFlow","kind":"basic","name":"BasicPileListFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"pile_list_ref01","srcdatavar":"pile_list_ref01_data","suffix":"_dt0"},"match":{"deck_id":"deck01","id":"pile_list01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-pile_list_ref01"}}],"index$":0}]}, 'PileList')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pile_list_ref01_data = Object.values(setup.data.existing.pile_list)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const pile_list_ref01_ent = client.PileList()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pile_list/PileListTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DeckOfCardsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['pile_list01','pile_list02','pile_list03','deck01','deck02','deck03','pile01','pile02','pile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DECK_OF_CARDS_TEST_PILE_LIST_ENTID': idmap,
    'DECK_OF_CARDS_TEST_LIVE': 'FALSE',
    'DECK_OF_CARDS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DECK_OF_CARDS_TEST_PILE_LIST_ENTID']

  const live = 'TRUE' === env.DECK_OF_CARDS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DECK_OF_CARDS_TEST_PILE_LIST_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DeckOfCardsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
