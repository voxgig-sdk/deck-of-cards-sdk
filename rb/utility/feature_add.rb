# DeckOfCards SDK utility: feature_add
module DeckOfCardsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
