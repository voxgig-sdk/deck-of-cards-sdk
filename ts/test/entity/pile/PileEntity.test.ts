

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


describe('PileEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DECK_OF_CARDS_TEST_LIVE=TRUE.
  afterEach(liveDelay('DECK_OF_CARDS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeckOfCardsSDK.test()
    const ent = testsdk.Pile()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DECK_OF_CARDS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pile.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"pile","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /deck/{deck_id}/pile/{pile_name}/add/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"deck_id","or":"deck_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pile_name","or":"pile_name","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"card","or":"card","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/deck/{deck_id}/pile/{pile_name}/add/","q":{"$action":"add","exist":["card","deck_id","pile_name"]},"r":{},"s":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_name"},{"lit":"add"}],"t":{"req":"`reqdata`","res":"`body.piles`"},"index$":0},{"a":true,"co":{"id":"GET /deck/{deck_id}/pile/{pile_name}/shuffle/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"deck_id","or":"deck_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pile_name","or":"pile_name","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/deck/{deck_id}/pile/{pile_name}/shuffle/","q":{"$action":"shuffle","exist":["deck_id","pile_name"]},"r":{},"s":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_name"},{"lit":"shuffle"}],"t":{"req":"`reqdata`","res":"`body.piles`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.deck"]]},"key$":"pile","name__orig":"pile","Name":"Pile","name_":"pile","name-":"pile","NAME":"PILE","index$":2}, {"active":true,"entity":"pile","key$":"BasicPileFlow","kind":"basic","name":"BasicPileFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"pile_ref01","srcdatavar":"pile_ref01_data","suffix":"_dt0"},"m":{"deck_id":"deck01","id":"pile01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-pile_ref01"}}],"index$":0}]}, 'Pile', {"GET /deck/{deck_id}/pile/{pile_name}/add/":{"protocol":"http","operationId":"addToPile","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"description":"Whether the operation was successful","key$":"success","type":"boolean"},"deck_id":{"description":"Unique identifier for the deck","key$":"deck_id","type":"string"},"remaining":{"description":"Number of cards remaining in the main deck","key$":"remaining","type":"integer"},"piles":{"additionalProperties":{"properties":{"remaining":{"description":"Number of cards remaining in the pile","type":"integer"}},"type":"object","x-ref":"#/components/schemas/PileInfo"},"description":"Object containing pile information","key$":"piles","type":"object"}},"x-ref":"#/components/schemas/PileResponse"},"example":{"success":true,"deck_id":"3p40paa87x90","remaining":12,"piles":{"discard":{"remaining":2}}}}}}},"parameters":[{"name":"deck_id","in":"path","description":"The deck identifier","required":true,"schema":{"type":"string"},"index$":0},{"name":"pile_name","in":"path","description":"The name of the pile","required":true,"schema":{"type":"string"},"index$":1},{"name":"cards","in":"query","description":"Comma-separated list of card codes to add to the pile (e.g., AS,2S)","required":true,"schema":{"type":"string"},"index$":2}],"securitySource":"unspecified"},"GET /deck/{deck_id}/pile/{pile_name}/shuffle/":{"protocol":"http","operationId":"shufflePile","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"description":"Whether the operation was successful","key$":"success","type":"boolean"},"deck_id":{"description":"Unique identifier for the deck","key$":"deck_id","type":"string"},"remaining":{"description":"Number of cards remaining in the main deck","key$":"remaining","type":"integer"},"piles":{"additionalProperties":{"properties":{"remaining":{"description":"Number of cards remaining in the pile","type":"integer"}},"type":"object","x-ref":"#/components/schemas/PileInfo"},"description":"Object containing pile information","key$":"piles","type":"object"}},"x-ref":"#/components/schemas/PileResponse"}}}}},"parameters":[{"name":"deck_id","in":"path","description":"The deck identifier","required":true,"schema":{"type":"string"},"index$":0},{"name":"pile_name","in":"path","description":"The name of the pile","required":true,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pile_ref01_data = Object.values(setup.data.existing.pile)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const pile_ref01_ent = client.Pile()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pile/PileTestData.json')

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
    ['pile01','pile02','pile03','deck01','deck02','deck03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DECK_OF_CARDS_TEST_PILE_ENTID': idmap,
    'DECK_OF_CARDS_TEST_LIVE': 'FALSE',
    'DECK_OF_CARDS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DECK_OF_CARDS_TEST_PILE_ENTID']

  const live = 'TRUE' === env.DECK_OF_CARDS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DECK_OF_CARDS_TEST_PILE_ENTID']
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
  
