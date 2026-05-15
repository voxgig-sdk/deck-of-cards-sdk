
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DeckOfCardsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await DeckOfCardsSDK.test()
    equal(null !== testsdk, true)
  })

})
