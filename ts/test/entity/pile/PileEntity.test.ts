

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"remaining","req":false,"short":"Number of cards remaining in the pile","type":"`$INTEGER`","index$":0}],"name":"pile","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"deck_id","orig":"deck_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"pile_name","orig":"pile_name","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"card","orig":"card","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /deck/{deck_id}/pile/{pile_name}/add/","json":"{\"operationId\":\"addToPile\",\"parameters\":[{\"description\":\"The deck identifier\",\"in\":\"path\",\"name\":\"deck_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the pile\",\"in\":\"path\",\"name\":\"pile_name\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated list of card codes to add to the pile (e.g., AS,2S)\",\"in\":\"query\",\"name\":\"cards\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"deck_id\":\"3p40paa87x90\",\"piles\":{\"discard\":{\"remaining\":2}},\"remaining\":12,\"success\":true},\"schema\":{\"properties\":{\"deck_id\":{\"description\":\"Unique identifier for the deck\",\"type\":\"string\"},\"piles\":{\"additionalProperties\":{\"properties\":{\"remaining\":{\"description\":\"Number of cards remaining in the pile\",\"type\":\"integer\"}},\"type\":\"object\"},\"description\":\"Object containing pile information\",\"type\":\"object\"},\"remaining\":{\"description\":\"Number of cards remaining in the main deck\",\"type\":\"integer\"},\"success\":{\"description\":\"Whether the operation was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/deck/{deck_id}/pile/{pile_name}/add/","segments":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_name"},{"lit":"add"}],"select":{"$action":"add","exist":["card","deck_id","pile_name"]},"transform":{"req":"`reqdata`","res":"`body.piles`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"deck_id","orig":"deck_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"pile_name","orig":"pile_name","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /deck/{deck_id}/pile/{pile_name}/shuffle/","json":"{\"operationId\":\"shufflePile\",\"parameters\":[{\"description\":\"The deck identifier\",\"in\":\"path\",\"name\":\"deck_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The name of the pile\",\"in\":\"path\",\"name\":\"pile_name\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"deck_id\":{\"description\":\"Unique identifier for the deck\",\"type\":\"string\"},\"piles\":{\"additionalProperties\":{\"properties\":{\"remaining\":{\"description\":\"Number of cards remaining in the pile\",\"type\":\"integer\"}},\"type\":\"object\"},\"description\":\"Object containing pile information\",\"type\":\"object\"},\"remaining\":{\"description\":\"Number of cards remaining in the main deck\",\"type\":\"integer\"},\"success\":{\"description\":\"Whether the operation was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/deck/{deck_id}/pile/{pile_name}/shuffle/","segments":[{"lit":"deck"},{"var":"deck_id"},{"lit":"pile"},{"var":"pile_name"},{"lit":"shuffle"}],"select":{"$action":"shuffle","exist":["deck_id","pile_name"]},"transform":{"req":"`reqdata`","res":"`body.piles`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["deck","pile"]]},"key$":"pile","name__orig":"pile","Name":"Pile","name_":"pile","name-":"pile","NAME":"PILE","index$":2}, {"active":true,"entity":"pile","key$":"BasicPileFlow","kind":"basic","name":"BasicPileFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"pile_ref01","srcdatavar":"pile_ref01_data","suffix":"_dt0"},"match":{"deck_id":"deck01","id":"pile01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-pile_ref01"}}],"index$":0}]}, 'Pile')
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
    ['pile01','pile02','pile03','deck01','deck02','deck03','pile01','pile02','pile03'],
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
  
