# DeckOfCards SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module DeckOfCardsFeatures
  def self.make_feature(name)
    case name
    when "base"
      DeckOfCardsBaseFeature.new
    when "test"
      DeckOfCardsTestFeature.new
    else
      DeckOfCardsBaseFeature.new
    end
  end
end
