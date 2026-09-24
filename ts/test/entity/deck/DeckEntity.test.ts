

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DeckEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DECK_OF_CARDS_TEST_LIVE=TRUE.
  afterEach(liveDelay('DECK_OF_CARDS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeckOfCardsSDK.test()
    const ent = testsdk.Deck()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DECK_OF_CARDS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deck.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deck_id":{"a":true,"h":"Deck Id","n":"deck_id","r":false,"sh":"Unique identifier for the deck","t":"`$STRING`","key$":"deck_id","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"remaining":{"a":true,"h":"Remaining","n":"remaining","r":false,"sh":"Number of cards remaining in the deck","t":"`$INTEGER`","key$":"remaining","index$":2},"shuffled":{"a":true,"h":"Shuffled","n":"shuffled","r":false,"sh":"Whether the deck is shuffled","t":"`$BOOLEAN`","key$":"shuffled","index$":3},"success":{"a":true,"h":"Success","n":"success","r":false,"sh":"Whether the operation was successful","t":"`$BOOLEAN`","key$":"success","index$":4}},"id":{"field":"id","name":"id"},"name":"deck","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /deck/new/shuffle/","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"card","or":"card","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"deck_count","or":"deck_count","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"jokers_enabled","or":"jokers_enabled","r":false,"t":"`$BOOLEAN`","index$":2}]},"k":"http","m":"GET","o":"/deck/new/shuffle/","q":{"exist":["card","deck_count","jokers_enabled"]},"r":{},"s":[{"lit":"deck"},{"lit":"new"},{"lit":"shuffle"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /deck/{deck_id}/shuffle/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"deck_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"remaining","or":"remaining","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/deck/{deck_id}/shuffle/","q":{"$action":"shuffle","exist":["id","remaining"]},"r":{"param":{"deck_id":"id"}},"s":[{"lit":"deck"},{"var":"id"},{"lit":"shuffle"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /deck/new/","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"jokers_enabled","or":"jokers_enabled","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/deck/new/","q":{"$action":"new","exist":["jokers_enabled"]},"r":{},"s":[{"lit":"deck"},{"lit":"new"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"deck","name__orig":"deck","Name":"Deck","name_":"deck","name-":"deck","NAME":"DECK","index$":0}, {"active":true,"entity":"deck","key$":"BasicDeckFlow","kind":"basic","name":"BasicDeckFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"deck_ref01","srcdatavar":"deck_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-deck_ref01"}}],"index$":0}]}, 'Deck', {"GET /deck/new/shuffle/":{"protocol":"http","operationId":"shuffleNewDeck","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"description":"Whether the operation was successful","key$":"success","type":"boolean"},"deck_id":{"description":"Unique identifier for the deck","key$":"deck_id","type":"string"},"shuffled":{"description":"Whether the deck is shuffled","key$":"shuffled","type":"boolean"},"remaining":{"description":"Number of cards remaining in the deck","key$":"remaining","type":"integer"}},"x-ref":"#/components/schemas/DeckResponse","index$":0},"example":{"success":true,"deck_id":"3p40paa87x90","shuffled":true,"remaining":52}}}}},"parameters":[{"name":"deck_count","in":"query","description":"Number of decks to use (default is 1, Blackjack typically uses 6)","required":false,"schema":{"type":"integer","default":1},"index$":0},{"name":"cards","in":"query","description":"Comma-separated list of card codes to create a partial deck (e.g., AS,2S,KS,AD,2D,KD)","required":false,"schema":{"type":"string"},"index$":1},{"name":"jokers_enabled","in":"query","description":"Include two Jokers in the deck","required":false,"schema":{"type":"boolean"},"index$":2}],"securitySource":"unspecified"},"GET /deck/{deck_id}/shuffle/":{"protocol":"http","operationId":"reshuffleDeck","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"description":"Whether the operation was successful","key$":"success","type":"boolean"},"deck_id":{"description":"Unique identifier for the deck","key$":"deck_id","type":"string"},"shuffled":{"description":"Whether the deck is shuffled","key$":"shuffled","type":"boolean"},"remaining":{"description":"Number of cards remaining in the deck","key$":"remaining","type":"integer"}},"x-ref":"#/components/schemas/DeckResponse"},"example":{"success":true,"deck_id":"3p40paa87x90","shuffled":true,"remaining":52}}}}},"parameters":[{"name":"deck_id","in":"path","description":"The deck identifier","required":true,"schema":{"type":"string"},"index$":0},{"name":"remaining","in":"query","description":"Only shuffle cards remaining in the main stack, leaving piles and drawn cards alone","required":false,"schema":{"type":"boolean"},"index$":1}],"securitySource":"unspecified"},"GET /deck/new/":{"protocol":"http","operationId":"createNewDeck","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"description":"Whether the operation was successful","key$":"success","type":"boolean"},"deck_id":{"description":"Unique identifier for the deck","key$":"deck_id","type":"string"},"shuffled":{"description":"Whether the deck is shuffled","key$":"shuffled","type":"boolean"},"remaining":{"description":"Number of cards remaining in the deck","key$":"remaining","type":"integer"}},"x-ref":"#/components/schemas/DeckResponse"},"example":{"success":true,"deck_id":"3p40paa87x90","shuffled":false,"remaining":52}}}}},"parameters":[{"name":"jokers_enabled","in":"query","description":"Include two Jokers in the deck","required":false,"schema":{"type":"boolean"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deck_ref01_data = Object.values(setup.data.existing.deck)[0] as any

    // LOAD
    const deck_ref01_ent = client.Deck()
    const deck_ref01_match_dt0: any = {}
    deck_ref01_match_dt0.id = deck_ref01_data.id
    const deck_ref01_data_dt0 = (await deck_ref01_ent.load(deck_ref01_match_dt0)).data()
    assert(deck_ref01_data_dt0.id === deck_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/deck/DeckTestData.json')

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
    ['deck01','deck02','deck03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DECK_OF_CARDS_TEST_DECK_ENTID': idmap,
    'DECK_OF_CARDS_TEST_LIVE': 'FALSE',
    'DECK_OF_CARDS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DECK_OF_CARDS_TEST_DECK_ENTID']

  const live = 'TRUE' === env.DECK_OF_CARDS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DECK_OF_CARDS_TEST_DECK_ENTID']
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
  
