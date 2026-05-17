package voxgigdeckofcardssdk

import (
	"github.com/voxgig-sdk/deck-of-cards-sdk/go/core"
	"github.com/voxgig-sdk/deck-of-cards-sdk/go/entity"
	"github.com/voxgig-sdk/deck-of-cards-sdk/go/feature"
	_ "github.com/voxgig-sdk/deck-of-cards-sdk/go/utility"
)

// Type aliases preserve external API.
type DeckOfCardsSDK = core.DeckOfCardsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type DeckOfCardsEntity = core.DeckOfCardsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type DeckOfCardsError = core.DeckOfCardsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDeckEntityFunc = func(client *core.DeckOfCardsSDK, entopts map[string]any) core.DeckOfCardsEntity {
		return entity.NewDeckEntity(client, entopts)
	}
	core.NewDrawEntityFunc = func(client *core.DeckOfCardsSDK, entopts map[string]any) core.DeckOfCardsEntity {
		return entity.NewDrawEntity(client, entopts)
	}
	core.NewPileEntityFunc = func(client *core.DeckOfCardsSDK, entopts map[string]any) core.DeckOfCardsEntity {
		return entity.NewPileEntity(client, entopts)
	}
	core.NewPileDrawEntityFunc = func(client *core.DeckOfCardsSDK, entopts map[string]any) core.DeckOfCardsEntity {
		return entity.NewPileDrawEntity(client, entopts)
	}
	core.NewPileListEntityFunc = func(client *core.DeckOfCardsSDK, entopts map[string]any) core.DeckOfCardsEntity {
		return entity.NewPileListEntity(client, entopts)
	}
	core.NewReturnEntityFunc = func(client *core.DeckOfCardsSDK, entopts map[string]any) core.DeckOfCardsEntity {
		return entity.NewReturnEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewDeckOfCardsSDK = core.NewDeckOfCardsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
