<?php
declare(strict_types=1);

// DeckOfCards SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

DeckOfCardsUtility::setRegistrar(function (DeckOfCardsUtility $u): void {
    $u->clean = [DeckOfCardsClean::class, 'call'];
    $u->done = [DeckOfCardsDone::class, 'call'];
    $u->make_error = [DeckOfCardsMakeError::class, 'call'];
    $u->feature_add = [DeckOfCardsFeatureAdd::class, 'call'];
    $u->feature_hook = [DeckOfCardsFeatureHook::class, 'call'];
    $u->feature_init = [DeckOfCardsFeatureInit::class, 'call'];
    $u->fetcher = [DeckOfCardsFetcher::class, 'call'];
    $u->make_fetch_def = [DeckOfCardsMakeFetchDef::class, 'call'];
    $u->make_context = [DeckOfCardsMakeContext::class, 'call'];
    $u->make_options = [DeckOfCardsMakeOptions::class, 'call'];
    $u->make_request = [DeckOfCardsMakeRequest::class, 'call'];
    $u->make_response = [DeckOfCardsMakeResponse::class, 'call'];
    $u->make_result = [DeckOfCardsMakeResult::class, 'call'];
    $u->make_point = [DeckOfCardsMakePoint::class, 'call'];
    $u->make_spec = [DeckOfCardsMakeSpec::class, 'call'];
    $u->make_url = [DeckOfCardsMakeUrl::class, 'call'];
    $u->param = [DeckOfCardsParam::class, 'call'];
    $u->prepare_auth = [DeckOfCardsPrepareAuth::class, 'call'];
    $u->prepare_body = [DeckOfCardsPrepareBody::class, 'call'];
    $u->prepare_headers = [DeckOfCardsPrepareHeaders::class, 'call'];
    $u->prepare_method = [DeckOfCardsPrepareMethod::class, 'call'];
    $u->prepare_params = [DeckOfCardsPrepareParams::class, 'call'];
    $u->prepare_path = [DeckOfCardsPreparePath::class, 'call'];
    $u->prepare_query = [DeckOfCardsPrepareQuery::class, 'call'];
    $u->result_basic = [DeckOfCardsResultBasic::class, 'call'];
    $u->result_body = [DeckOfCardsResultBody::class, 'call'];
    $u->result_headers = [DeckOfCardsResultHeaders::class, 'call'];
    $u->transform_request = [DeckOfCardsTransformRequest::class, 'call'];
    $u->transform_response = [DeckOfCardsTransformResponse::class, 'call'];
});
