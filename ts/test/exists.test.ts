
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DeckOfCardsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DeckOfCardsSDK.test()
    equal(testsdk instanceof DeckOfCardsSDK, true,
      'DeckOfCardsSDK.test() must return a client synchronously')
  })

})
