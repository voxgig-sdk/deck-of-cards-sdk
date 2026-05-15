
import { Context } from './Context'


class DeckOfCardsError extends Error {

  isDeckOfCardsError = true

  sdk = 'DeckOfCards'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  DeckOfCardsError
}

