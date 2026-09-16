# DeckOfCards SDK feature factory

from deckofcards_sdk.feature.base_feature import DeckOfCardsBaseFeature
from deckofcards_sdk.feature.ratelimit_feature import DeckOfCardsRatelimitFeature
from deckofcards_sdk.feature.retry_feature import DeckOfCardsRetryFeature
from deckofcards_sdk.feature.test_feature import DeckOfCardsTestFeature
from deckofcards_sdk.feature.timeout_feature import DeckOfCardsTimeoutFeature


_FEATURES = {
    "base": lambda: DeckOfCardsBaseFeature(),
    "ratelimit": lambda: DeckOfCardsRatelimitFeature(),
    "retry": lambda: DeckOfCardsRetryFeature(),
    "test": lambda: DeckOfCardsTestFeature(),
    "timeout": lambda: DeckOfCardsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
