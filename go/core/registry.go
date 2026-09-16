package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewDeckEntityFunc func(client *DeckOfCardsSDK, entopts map[string]any) DeckOfCardsEntity

var NewDrawEntityFunc func(client *DeckOfCardsSDK, entopts map[string]any) DeckOfCardsEntity

var NewPileEntityFunc func(client *DeckOfCardsSDK, entopts map[string]any) DeckOfCardsEntity

var NewPileDrawEntityFunc func(client *DeckOfCardsSDK, entopts map[string]any) DeckOfCardsEntity

var NewPileListEntityFunc func(client *DeckOfCardsSDK, entopts map[string]any) DeckOfCardsEntity

var NewReturnEntityFunc func(client *DeckOfCardsSDK, entopts map[string]any) DeckOfCardsEntity

