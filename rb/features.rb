# DeckOfCards SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module DeckOfCardsFeatures
  def self.make_feature(name)
    case name
    when "base"
      DeckOfCardsBaseFeature.new
    when "ratelimit"
      DeckOfCardsRatelimitFeature.new
    when "retry"
      DeckOfCardsRetryFeature.new
    when "test"
      DeckOfCardsTestFeature.new
    when "timeout"
      DeckOfCardsTimeoutFeature.new
    else
      DeckOfCardsBaseFeature.new
    end
  end
end
