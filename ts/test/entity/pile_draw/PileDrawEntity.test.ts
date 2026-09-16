

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


describe('PileDrawEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DECK_OF_CARDS_TEST_LIVE=TRUE.
  afterEach(liveDelay('DECK_OF_CARDS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeckOfCardsSDK.test()
    const ent = testsdk.PileDraw()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DECK_OF_CARDS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pile_draw.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"code","req":false,"short":"Two-character card code (e.g., AS for Ace of Spades)","type":"`$STRING`","index$":0},{"active":true,"name":"image","req":false,"short":"URL to the PNG image of the card","type":"`$STRING`","index$":1},{"active":true,"name":"images","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"suit","req":false,"short":"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)","type":"`$STRING`","index$":3},{"active":true,"name":"value","req":false,"short":"Card value (e.g., ACE, 2, 10, KING)","type":"`$STRING`","index$":4}],"name":"pile_draw","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"deck_id","orig":"deck_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"pile_name","orig":"pile_name","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"card","orig":"card","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"count","orig":"count","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /deck/{deck_id}/pile/{pile_name}/draw/","json":"{\"operationId\":\"drawFromPileTop\",\"parameters\":[{\"description\":\"The deck identifier\",\"in\":\"path\",\"name\":\"deck_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the pile\",\"in\":\"path\",\"name\":\"pile_name\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated list of specific card codes to draw (e.g., AS)\",\"in\":\"query\",\"name\":\"cards\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of cards to draw from the pile\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"cards\":[{\"code\":\"AS\",\"image\":\"https://www.deckofcardsapi.com/static/img/AS.png\",\"suit\":\"SPADES\",\"value\":\"ACE\"}],\"deck_id\":\"3p40paa87x90\",\"piles\":{\"discard\":{\"remaining\":1}},\"remaining\":12,\"success\":true},\"schema\":{\"properties\":{\"cards\":{\"description\":\"Array of drawn cards from the pile\",\"items\":{\"properties\":{\"code\":{\"description\":\"Two-character card code (e.g., AS for Ace of Spades)\",\"type\":\"string\"},\"image\":{\"description\":\"URL to the PNG image of the card\",\"type\":\"string\"},\"images\":{\"properties\":{\"png\":{\"description\":\"URL to the PNG image of the card\",\"type\":\"string\"},\"svg\":{\"description\":\"URL to the SVG image of the card\",\"type\":\"string\"}},\"type\":\"object\"},\"suit\":{\"description\":\"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)\",\"type\":\"string\"},\"value\":{\"description\":\"Card value (e.g., ACE, 2, 10, KING)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"deck_id\":{\"description\":\"Unique identifier for the deck\",\"type\":\"string\"},\"piles\":{\"additionalProperties\":{\"properties\":{\"remaining\":{\"description\":\"Number of cards remaining in the pile\",\"type\":\"integer\"}},\"type\":\"object\"},\"description\":\"Object containing pile information\",\"type\":\"object\"},\"remaining\":{\"description\":\"Number of cards remaining in the main deck\",\"type\":\"integer\"},\"success\":{\"description\":\"Whether the operation was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/deck/{deck_id}/pile/{pile_name}/draw/","segments":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_name"},{"lit":"draw"}],"select":{"exist":["card","count","deck_id","pile_name"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"deck_id","orig":"deck_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"pile_id","orig":"pile_name","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"count","orig":"count","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /deck/{deck_id}/pile/{pile_name}/draw/bottom/","json":"{\"operationId\":\"drawFromPileBottom\",\"parameters\":[{\"description\":\"The deck identifier\",\"in\":\"path\",\"name\":\"deck_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the pile\",\"in\":\"path\",\"name\":\"pile_name\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of cards to draw from the bottom of the pile\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cards\":{\"description\":\"Array of drawn cards from the pile\",\"items\":{\"properties\":{\"code\":{\"description\":\"Two-character card code (e.g., AS for Ace of Spades)\",\"type\":\"string\"},\"image\":{\"description\":\"URL to the PNG image of the card\",\"type\":\"string\"},\"images\":{\"properties\":{\"png\":{\"description\":\"URL to the PNG image of the card\",\"type\":\"string\"},\"svg\":{\"description\":\"URL to the SVG image of the card\",\"type\":\"string\"}},\"type\":\"object\"},\"suit\":{\"description\":\"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)\",\"type\":\"string\"},\"value\":{\"description\":\"Card value (e.g., ACE, 2, 10, KING)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"deck_id\":{\"description\":\"Unique identifier for the deck\",\"type\":\"string\"},\"piles\":{\"additionalProperties\":{\"properties\":{\"remaining\":{\"description\":\"Number of cards remaining in the pile\",\"type\":\"integer\"}},\"type\":\"object\"},\"description\":\"Object containing pile information\",\"type\":\"object\"},\"remaining\":{\"description\":\"Number of cards remaining in the main deck\",\"type\":\"integer\"},\"success\":{\"description\":\"Whether the operation was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/deck/{deck_id}/pile/{pile_name}/draw/bottom/","rename":{"param":{"pile_name":"pile_id"}},"segments":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_id"},{"lit":"draw"},{"lit":"bottom"}],"select":{"exist":["count","deck_id","pile_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"deck_id","orig":"deck_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"pile_id","orig":"pile_name","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"count","orig":"count","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /deck/{deck_id}/pile/{pile_name}/draw/random/","json":"{\"operationId\":\"drawFromPileRandom\",\"parameters\":[{\"description\":\"The deck identifier\",\"in\":\"path\",\"name\":\"deck_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the pile\",\"in\":\"path\",\"name\":\"pile_name\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of random cards to draw from the pile\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cards\":{\"description\":\"Array of drawn cards from the pile\",\"items\":{\"properties\":{\"code\":{\"description\":\"Two-character card code (e.g., AS for Ace of Spades)\",\"type\":\"string\"},\"image\":{\"description\":\"URL to the PNG image of the card\",\"type\":\"string\"},\"images\":{\"properties\":{\"png\":{\"description\":\"URL to the PNG image of the card\",\"type\":\"string\"},\"svg\":{\"description\":\"URL to the SVG image of the card\",\"type\":\"string\"}},\"type\":\"object\"},\"suit\":{\"description\":\"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)\",\"type\":\"string\"},\"value\":{\"description\":\"Card value (e.g., ACE, 2, 10, KING)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"deck_id\":{\"description\":\"Unique identifier for the deck\",\"type\":\"string\"},\"piles\":{\"additionalProperties\":{\"properties\":{\"remaining\":{\"description\":\"Number of cards remaining in the pile\",\"type\":\"integer\"}},\"type\":\"object\"},\"description\":\"Object containing pile information\",\"type\":\"object\"},\"remaining\":{\"description\":\"Number of cards remaining in the main deck\",\"type\":\"integer\"},\"success\":{\"description\":\"Whether the operation was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/deck/{deck_id}/pile/{pile_name}/draw/random/","rename":{"param":{"pile_name":"pile_id"}},"segments":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_id"},{"lit":"draw"},{"lit":"random"}],"select":{"exist":["count","deck_id","pile_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"list"}},"relations":{"ancestors":[["deck","pile"]]},"key$":"pile_draw","name__orig":"pile_draw","Name":"PileDraw","name_":"pile_draw","name-":"pile-draw","NAME":"PILE_DRAW","index$":3}, {"active":true,"entity":"pile_draw","key$":"BasicPileDrawFlow","kind":"basic","name":"BasicPileDrawFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"deck_id":"deck01","pile_id":"pile01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"pile_draw_ref01"}}],"index$":0}]}, 'PileDraw')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pile_draw_ref01_data = Object.values(setup.data.existing.pile_draw)[0] as any

    // LIST
    const pile_draw_ref01_ent = client.PileDraw()
    const pile_draw_ref01_match: any = {}
    pile_draw_ref01_match['deck_id'] = setup.idmap['deck01']
    pile_draw_ref01_match['pile_id'] = setup.idmap['pile01']

    const pile_draw_ref01_list = (await pile_draw_ref01_ent.list(pile_draw_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pile_draw/PileDrawTestData.json')

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
    ['pile_draw01','pile_draw02','pile_draw03','deck01','deck02','deck03','pile01','pile02','pile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DECK_OF_CARDS_TEST_PILE_DRAW_ENTID': idmap,
    'DECK_OF_CARDS_TEST_LIVE': 'FALSE',
    'DECK_OF_CARDS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DECK_OF_CARDS_TEST_PILE_DRAW_ENTID']

  const live = 'TRUE' === env.DECK_OF_CARDS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DECK_OF_CARDS_TEST_PILE_DRAW_ENTID']
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
  
