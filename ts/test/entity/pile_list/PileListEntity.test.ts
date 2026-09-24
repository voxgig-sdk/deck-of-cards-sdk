

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cards":{"a":true,"h":"Cards","n":"cards","r":false,"sh":"Array of cards in the pile","t":"`$ARRAY`","key$":"cards","index$":0},"remaining":{"a":true,"h":"Remaining","n":"remaining","r":false,"sh":"Number of cards remaining in the pile","t":"`$INTEGER`","key$":"remaining","index$":1}},"name":"pile_list","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /deck/{deck_id}/pile/{pile_name}/list/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"deck_id","or":"deck_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pile_name","or":"pile_name","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/deck/{deck_id}/pile/{pile_name}/list/","q":{"exist":["deck_id","pile_name"]},"r":{},"s":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_name"},{"lit":"list"}],"t":{"req":"`reqdata`","res":"`body.piles`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.deck","$.main.kit.entity.pile"]]},"key$":"pile_list","name__orig":"pile_list","Name":"PileList","name_":"pile_list","name-":"pile-list","NAME":"PILE_LIST","index$":4}, {"active":true,"entity":"pile_list","key$":"BasicPileListFlow","kind":"basic","name":"BasicPileListFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"pile_list_ref01","srcdatavar":"pile_list_ref01_data","suffix":"_dt0"},"m":{"deck_id":"deck01","id":"pile_list01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-pile_list_ref01"}}],"index$":0}]}, 'PileList', {"GET /deck/{deck_id}/pile/{pile_name}/list/":{"protocol":"http","operationId":"listPileCards","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"description":"Whether the operation was successful","key$":"success","type":"boolean"},"deck_id":{"description":"Unique identifier for the deck","key$":"deck_id","type":"string"},"remaining":{"description":"Number of cards remaining in the main deck","key$":"remaining","type":"integer"},"piles":{"additionalProperties":{"properties":{"cards":{"description":"Array of cards in the pile","items":{"properties":{"code":{"description":"Two-character card code (e.g., AS for Ace of Spades)","type":"string"},"image":{"description":"URL to the PNG image of the card","type":"string"},"images":{"properties":{"png":{"description":"URL to the PNG image of the card","type":"string"},"svg":{"description":"URL to the SVG image of the card","type":"string"}},"type":"object"},"suit":{"description":"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)","type":"string"},"value":{"description":"Card value (e.g., ACE, 2, 10, KING)","type":"string"}},"type":"object","x-ref":"#/components/schemas/Card"},"type":"array","key$":"cards"},"remaining":{"description":"Number of cards remaining in the pile","type":"integer","key$":"remaining"}},"type":"object","x-ref":"#/components/schemas/PileDetailInfo","key$":"additionalProperties"},"description":"Object containing detailed pile information with cards","key$":"piles","type":"object"}},"x-ref":"#/components/schemas/PileListResponse"},"example":{"success":true,"deck_id":"d5x0uw65g416","remaining":42,"piles":{"player1":{"remaining":3},"player2":{"cards":[{"image":"https://www.deckofcardsapi.com/static/img/KH.png","value":"KING","suit":"HEARTS","code":"KH"}],"remaining":2}}}}}}},"parameters":[{"name":"deck_id","in":"path","description":"The deck identifier","required":true,"schema":{"type":"string"},"index$":0},{"name":"pile_name","in":"path","description":"The name of the pile","required":true,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
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
  
