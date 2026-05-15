# DeckOfCards SDK exists test

require "minitest/autorun"
require_relative "../DeckOfCards_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = DeckOfCardsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
