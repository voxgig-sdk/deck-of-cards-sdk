# DeckOfCards SDK feature factory

from deckofcards_sdk.feature.base_feature import DeckOfCardsBaseFeature
from deckofcards_sdk.feature.test_feature import DeckOfCardsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DeckOfCardsBaseFeature(),
        "test": lambda: DeckOfCardsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
