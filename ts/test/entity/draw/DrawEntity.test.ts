

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


describe('DrawEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DECK_OF_CARDS_TEST_LIVE=TRUE.
  afterEach(liveDelay('DECK_OF_CARDS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeckOfCardsSDK.test()
    const ent = testsdk.Draw()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DECK_OF_CARDS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'draw.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"code","req":false,"short":"Two-character card code (e.g., AS for Ace of Spades)","type":"`$STRING`","index$":0},{"active":true,"name":"image","req":false,"short":"URL to the PNG image of the card","type":"`$STRING`","index$":1},{"active":true,"name":"images","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"suit","req":false,"short":"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)","type":"`$STRING`","index$":3},{"active":true,"name":"value","req":false,"short":"Card value (e.g., ACE, 2, 10, KING)","type":"`$STRING`","index$":4}],"name":"draw","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"deck_id","orig":"deck_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":1,"kind":"query","name":"count","orig":"count","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /deck/{deck_id}/draw/","json":"{\"operationId\":\"drawCards\",\"parameters\":[{\"description\":\"The deck identifier (use 'new' to create a shuffled deck and draw from it)\",\"in\":\"path\",\"name\":\"deck_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of cards to draw from the deck\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"cards\":[{\"code\":\"6H\",\"image\":\"https://deckofcardsapi.com/static/img/6H.png\",\"images\":{\"png\":\"https://deckofcardsapi.com/static/img/6H.png\",\"svg\":\"https://deckofcardsapi.com/static/img/6H.svg\"},\"suit\":\"HEARTS\",\"value\":\"6\"}],\"deck_id\":\"kxozasf3edqu\",\"remaining\":51,\"success\":true},\"schema\":{\"properties\":{\"cards\":{\"description\":\"Array of drawn cards\",\"items\":{\"properties\":{\"code\":{\"description\":\"Two-character card code (e.g., AS for Ace of Spades)\",\"type\":\"string\"},\"image\":{\"description\":\"URL to the PNG image of the card\",\"type\":\"string\"},\"images\":{\"properties\":{\"png\":{\"description\":\"URL to the PNG image of the card\",\"type\":\"string\"},\"svg\":{\"description\":\"URL to the SVG image of the card\",\"type\":\"string\"}},\"type\":\"object\"},\"suit\":{\"description\":\"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)\",\"type\":\"string\"},\"value\":{\"description\":\"Card value (e.g., ACE, 2, 10, KING)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"deck_id\":{\"description\":\"Unique identifier for the deck\",\"type\":\"string\"},\"remaining\":{\"description\":\"Number of cards remaining in the deck\",\"type\":\"integer\"},\"success\":{\"description\":\"Whether the operation was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/deck/{deck_id}/draw/","segments":[{"lit":"deck"},{"var":"deck_id"},{"lit":"draw"}],"select":{"exist":["count","deck_id"]},"transform":{"req":"`reqdata`","res":"`body.cards`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["deck"]]},"key$":"draw","name__orig":"draw","Name":"Draw","name_":"draw","name-":"draw","NAME":"DRAW","index$":1}, {"active":true,"entity":"draw","key$":"BasicDrawFlow","kind":"basic","name":"BasicDrawFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"deck_id":"deck01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"draw_ref01"}}],"index$":0}]}, 'Draw')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let draw_ref01_data = Object.values(setup.data.existing.draw)[0] as any

    // LIST
    const draw_ref01_ent = client.Draw()
    const draw_ref01_match: any = {}
    draw_ref01_match['deck_id'] = setup.idmap['deck01']

    const draw_ref01_list = (await draw_ref01_ent.list(draw_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/draw/DrawTestData.json')

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
    ['draw01','draw02','draw03','deck01','deck02','deck03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DECK_OF_CARDS_TEST_DRAW_ENTID': idmap,
    'DECK_OF_CARDS_TEST_LIVE': 'FALSE',
    'DECK_OF_CARDS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DECK_OF_CARDS_TEST_DRAW_ENTID']

  const live = 'TRUE' === env.DECK_OF_CARDS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DECK_OF_CARDS_TEST_DRAW_ENTID']
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
  
