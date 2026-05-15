# DeckOfCards SDK utility: make_context
require_relative '../core/context'
module DeckOfCardsUtilities
  MakeContext = ->(ctxmap, basectx) {
    DeckOfCardsContext.new(ctxmap, basectx)
  }
end
