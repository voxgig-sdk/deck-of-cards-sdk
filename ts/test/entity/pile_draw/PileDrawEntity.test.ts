

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"Two-character card code (e.g., AS for Ace of Spades)","t":"`$STRING`","key$":"code","index$":0},"image":{"a":true,"h":"Image","n":"image","r":false,"sh":"URL to the PNG image of the card","t":"`$STRING`","key$":"image","index$":1},"images":{"a":true,"h":"Images","n":"images","r":false,"t":"`$OBJECT`","key$":"images","index$":2},"suit":{"a":true,"h":"Suit","n":"suit","r":false,"sh":"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)","t":"`$STRING`","key$":"suit","index$":3},"value":{"a":true,"h":"Value","n":"value","r":false,"sh":"Card value (e.g., ACE, 2, 10, KING)","t":"`$STRING`","key$":"value","index$":4}},"name":"pile_draw","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /deck/{deck_id}/pile/{pile_name}/draw/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"deck_id","or":"deck_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pile_name","or":"pile_name","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"card","or":"card","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"count","or":"count","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/deck/{deck_id}/pile/{pile_name}/draw/","q":{"exist":["card","count","deck_id","pile_name"]},"r":{},"s":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_name"},{"lit":"draw"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /deck/{deck_id}/pile/{pile_name}/draw/bottom/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"deck_id","or":"deck_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pile_id","or":"pile_name","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"count","or":"count","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/deck/{deck_id}/pile/{pile_name}/draw/bottom/","q":{"exist":["count","deck_id","pile_id"]},"r":{"param":{"pile_name":"pile_id"}},"s":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_id"},{"lit":"draw"},{"lit":"bottom"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /deck/{deck_id}/pile/{pile_name}/draw/random/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"deck_id","or":"deck_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pile_id","or":"pile_name","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"count","or":"count","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/deck/{deck_id}/pile/{pile_name}/draw/random/","q":{"exist":["count","deck_id","pile_id"]},"r":{"param":{"pile_name":"pile_id"}},"s":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_id"},{"lit":"draw"},{"lit":"random"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.deck","$.main.kit.entity.pile"]]},"key$":"pile_draw","name__orig":"pile_draw","Name":"PileDraw","name_":"pile_draw","name-":"pile-draw","NAME":"PILE_DRAW","index$":3}, {"active":true,"entity":"pile_draw","key$":"BasicPileDrawFlow","kind":"basic","name":"BasicPileDrawFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"deck_id":"deck01","pile_id":"pile01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"pile_draw_ref01"}}],"index$":0}]}, 'PileDraw', {"GET /deck/{deck_id}/pile/{pile_name}/draw/":{"protocol":"http","operationId":"drawFromPileTop","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"description":"Whether the operation was successful","key$":"success","type":"boolean"},"deck_id":{"description":"Unique identifier for the deck","key$":"deck_id","type":"string"},"remaining":{"description":"Number of cards remaining in the main deck","key$":"remaining","type":"integer"},"piles":{"additionalProperties":{"properties":{"remaining":{"description":"Number of cards remaining in the pile","type":"integer"}},"type":"object","x-ref":"#/components/schemas/PileInfo"},"description":"Object containing pile information","key$":"piles","type":"object"},"cards":{"description":"Array of drawn cards from the pile","items":{"properties":{"code":{"description":"Two-character card code (e.g., AS for Ace of Spades)","type":"string","key$":"code"},"image":{"description":"URL to the PNG image of the card","type":"string","key$":"image"},"images":{"properties":{"png":{"description":"URL to the PNG image of the card","type":"string"},"svg":{"description":"URL to the SVG image of the card","type":"string"}},"type":"object","key$":"images"},"suit":{"description":"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)","type":"string","key$":"suit"},"value":{"description":"Card value (e.g., ACE, 2, 10, KING)","type":"string","key$":"value"}},"type":"object","x-ref":"#/components/schemas/Card","index$":0},"key$":"cards","type":"array"}},"x-ref":"#/components/schemas/PileDrawResponse"},"example":{"success":true,"deck_id":"3p40paa87x90","remaining":12,"piles":{"discard":{"remaining":1}},"cards":[{"image":"https://www.deckofcardsapi.com/static/img/AS.png","value":"ACE","suit":"SPADES","code":"AS"}]}}}}},"parameters":[{"name":"deck_id","in":"path","description":"The deck identifier","required":true,"schema":{"type":"string"},"index$":0},{"name":"pile_name","in":"path","description":"The name of the pile","required":true,"schema":{"type":"string"},"index$":1},{"name":"cards","in":"query","description":"Comma-separated list of specific card codes to draw (e.g., AS)","required":false,"schema":{"type":"string"},"index$":2},{"name":"count","in":"query","description":"Number of cards to draw from the pile","required":false,"schema":{"type":"integer"},"index$":3}],"securitySource":"unspecified"},"GET /deck/{deck_id}/pile/{pile_name}/draw/bottom/":{"protocol":"http","operationId":"drawFromPileBottom","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"description":"Whether the operation was successful","key$":"success","type":"boolean"},"deck_id":{"description":"Unique identifier for the deck","key$":"deck_id","type":"string"},"remaining":{"description":"Number of cards remaining in the main deck","key$":"remaining","type":"integer"},"piles":{"additionalProperties":{"properties":{"remaining":{"description":"Number of cards remaining in the pile","type":"integer"}},"type":"object","x-ref":"#/components/schemas/PileInfo"},"description":"Object containing pile information","key$":"piles","type":"object"},"cards":{"description":"Array of drawn cards from the pile","items":{"properties":{"code":{"description":"Two-character card code (e.g., AS for Ace of Spades)","type":"string","key$":"code"},"image":{"description":"URL to the PNG image of the card","type":"string","key$":"image"},"images":{"properties":{"png":{"description":"URL to the PNG image of the card","type":"string"},"svg":{"description":"URL to the SVG image of the card","type":"string"}},"type":"object","key$":"images"},"suit":{"description":"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)","type":"string","key$":"suit"},"value":{"description":"Card value (e.g., ACE, 2, 10, KING)","type":"string","key$":"value"}},"type":"object","x-ref":"#/components/schemas/Card","index$":0},"key$":"cards","type":"array"}},"x-ref":"#/components/schemas/PileDrawResponse"}}}}},"parameters":[{"name":"deck_id","in":"path","description":"The deck identifier","required":true,"schema":{"type":"string"},"index$":0},{"name":"pile_name","in":"path","description":"The name of the pile","required":true,"schema":{"type":"string"},"index$":1},{"name":"count","in":"query","description":"Number of cards to draw from the bottom of the pile","required":false,"schema":{"type":"integer"},"index$":2}],"securitySource":"unspecified"},"GET /deck/{deck_id}/pile/{pile_name}/draw/random/":{"protocol":"http","operationId":"drawFromPileRandom","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"description":"Whether the operation was successful","key$":"success","type":"boolean"},"deck_id":{"description":"Unique identifier for the deck","key$":"deck_id","type":"string"},"remaining":{"description":"Number of cards remaining in the main deck","key$":"remaining","type":"integer"},"piles":{"additionalProperties":{"properties":{"remaining":{"description":"Number of cards remaining in the pile","type":"integer"}},"type":"object","x-ref":"#/components/schemas/PileInfo"},"description":"Object containing pile information","key$":"piles","type":"object"},"cards":{"description":"Array of drawn cards from the pile","items":{"properties":{"code":{"description":"Two-character card code (e.g., AS for Ace of Spades)","type":"string","key$":"code"},"image":{"description":"URL to the PNG image of the card","type":"string","key$":"image"},"images":{"properties":{"png":{"description":"URL to the PNG image of the card","type":"string"},"svg":{"description":"URL to the SVG image of the card","type":"string"}},"type":"object","key$":"images"},"suit":{"description":"Card suit (SPADES, DIAMONDS, CLUBS, HEARTS)","type":"string","key$":"suit"},"value":{"description":"Card value (e.g., ACE, 2, 10, KING)","type":"string","key$":"value"}},"type":"object","x-ref":"#/components/schemas/Card","index$":0},"key$":"cards","type":"array"}},"x-ref":"#/components/schemas/PileDrawResponse"}}}}},"parameters":[{"name":"deck_id","in":"path","description":"The deck identifier","required":true,"schema":{"type":"string"},"index$":0},{"name":"pile_name","in":"path","description":"The name of the pile","required":true,"schema":{"type":"string"},"index$":1},{"name":"count","in":"query","description":"Number of random cards to draw from the pile","required":false,"schema":{"type":"integer"},"index$":2}],"securitySource":"unspecified"}})
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
  
