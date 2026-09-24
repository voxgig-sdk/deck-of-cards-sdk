

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


describe('ReturnEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DECK_OF_CARDS_TEST_LIVE=TRUE.
  afterEach(liveDelay('DECK_OF_CARDS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeckOfCardsSDK.test()
    const ent = testsdk.Return()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DECK_OF_CARDS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'return.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"remaining":{"a":true,"h":"Remaining","n":"remaining","r":false,"sh":"Number of cards remaining in the pile","t":"`$INTEGER`","key$":"remaining","index$":0}},"name":"return","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /deck/{deck_id}/pile/{pile_name}/return/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"deck_id","or":"deck_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pile_name","or":"pile_name","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"card","or":"card","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/deck/{deck_id}/pile/{pile_name}/return/","q":{"exist":["card","deck_id","pile_name"]},"r":{},"s":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_name"},{"lit":"return"}],"t":{"req":"`reqdata`","res":"`body.piles`"},"index$":0},{"a":true,"co":{"id":"GET /deck/{deck_id}/return/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"deck_id","or":"deck_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"card","or":"card","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/deck/{deck_id}/return/","q":{"exist":["card","deck_id"]},"r":{},"s":[{"lit":"deck"},{"var":"deck_id"},{"lit":"return"}],"t":{"req":"`reqdata`","res":"`body.piles`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.deck"],["$.main.kit.entity.deck","$.main.kit.entity.pile"]]},"key$":"return","name__orig":"return","Name":"Return","name_":"return","name-":"return","NAME":"RETURN","index$":5}, {"active":true,"entity":"return","key$":"BasicReturnFlow","kind":"basic","name":"BasicReturnFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"return_ref01","srcdatavar":"return_ref01_data","suffix":"_dt0"},"m":{"id":"return01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-return_ref01"}}],"index$":0}]}, 'Return', {"GET /deck/{deck_id}/pile/{pile_name}/return/":{"protocol":"http","operationId":"returnCardsFromPile","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"description":"Whether the operation was successful","key$":"success","type":"boolean"},"deck_id":{"description":"Unique identifier for the deck","key$":"deck_id","type":"string"},"shuffled":{"description":"Whether the deck is shuffled","key$":"shuffled","type":"boolean"},"remaining":{"description":"Number of cards remaining in the deck","key$":"remaining","type":"integer"},"piles":{"additionalProperties":{"properties":{"remaining":{"description":"Number of cards remaining in the pile","type":"integer","key$":"remaining"}},"type":"object","x-ref":"#/components/schemas/PileInfo","key$":"additionalProperties"},"description":"Object containing pile information","key$":"piles","type":"object"}},"x-ref":"#/components/schemas/ReturnResponse"}}}}},"parameters":[{"name":"deck_id","in":"path","description":"The deck identifier","required":true,"schema":{"type":"string"},"index$":0},{"name":"pile_name","in":"path","description":"The name of the pile","required":true,"schema":{"type":"string"},"index$":1},{"name":"cards","in":"query","description":"Comma-separated list of specific card codes to return (e.g., AS,2S)","required":false,"schema":{"type":"string"},"index$":2}],"securitySource":"unspecified"},"GET /deck/{deck_id}/return/":{"protocol":"http","operationId":"returnCardsToDeck","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"description":"Whether the operation was successful","key$":"success","type":"boolean"},"deck_id":{"description":"Unique identifier for the deck","key$":"deck_id","type":"string"},"shuffled":{"description":"Whether the deck is shuffled","key$":"shuffled","type":"boolean"},"remaining":{"description":"Number of cards remaining in the deck","key$":"remaining","type":"integer"},"piles":{"additionalProperties":{"properties":{"remaining":{"description":"Number of cards remaining in the pile","type":"integer","key$":"remaining"}},"type":"object","x-ref":"#/components/schemas/PileInfo","key$":"additionalProperties"},"description":"Object containing pile information","key$":"piles","type":"object"}},"x-ref":"#/components/schemas/ReturnResponse"},"example":{"success":true,"deck_id":"3p40paa87x90","shuffled":true,"remaining":52,"piles":{"discard":{"remaining":0}}}}}}},"parameters":[{"name":"deck_id","in":"path","description":"The deck identifier","required":true,"schema":{"type":"string"},"index$":0},{"name":"cards","in":"query","description":"Comma-separated list of specific card codes to return (e.g., AS,2S)","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let return_ref01_data = Object.values(setup.data.existing.return)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const return_ref01_ent = client.Return()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/return/ReturnTestData.json')

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
    ['return01','return02','return03','deck01','deck02','deck03','pile01','pile02','pile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DECK_OF_CARDS_TEST_RETURN_ENTID': idmap,
    'DECK_OF_CARDS_TEST_LIVE': 'FALSE',
    'DECK_OF_CARDS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DECK_OF_CARDS_TEST_RETURN_ENTID']

  const live = 'TRUE' === env.DECK_OF_CARDS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DECK_OF_CARDS_TEST_RETURN_ENTID']
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
  
