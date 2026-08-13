# DeckOfCards SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

DeckOfCardsUtility.registrar = ->(u) {
  u.clean = DeckOfCardsUtilities::Clean
  u.done = DeckOfCardsUtilities::Done
  u.make_error = DeckOfCardsUtilities::MakeError
  u.feature_add = DeckOfCardsUtilities::FeatureAdd
  u.feature_hook = DeckOfCardsUtilities::FeatureHook
  u.feature_init = DeckOfCardsUtilities::FeatureInit
  u.fetcher = DeckOfCardsUtilities::Fetcher
  u.make_fetch_def = DeckOfCardsUtilities::MakeFetchDef
  u.make_context = DeckOfCardsUtilities::MakeContext
  u.make_options = DeckOfCardsUtilities::MakeOptions
  u.make_request = DeckOfCardsUtilities::MakeRequest
  u.make_response = DeckOfCardsUtilities::MakeResponse
  u.make_result = DeckOfCardsUtilities::MakeResult
  u.make_point = DeckOfCardsUtilities::MakePoint
  u.make_spec = DeckOfCardsUtilities::MakeSpec
  u.make_url = DeckOfCardsUtilities::MakeUrl
  u.param = DeckOfCardsUtilities::Param
  u.prepare_auth = DeckOfCardsUtilities::PrepareAuth
  u.prepare_body = DeckOfCardsUtilities::PrepareBody
  u.prepare_headers = DeckOfCardsUtilities::PrepareHeaders
  u.prepare_method = DeckOfCardsUtilities::PrepareMethod
  u.prepare_params = DeckOfCardsUtilities::PrepareParams
  u.prepare_path = DeckOfCardsUtilities::PreparePath
  u.prepare_query = DeckOfCardsUtilities::PrepareQuery
  u.graphql_body = DeckOfCardsUtilities::GraphqlBody
  u.graphql_errors = DeckOfCardsUtilities::GraphqlErrors
  u.result_basic = DeckOfCardsUtilities::ResultBasic
  u.result_body = DeckOfCardsUtilities::ResultBody
  u.result_headers = DeckOfCardsUtilities::ResultHeaders
  u.transform_request = DeckOfCardsUtilities::TransformRequest
  u.transform_response = DeckOfCardsUtilities::TransformResponse
}
