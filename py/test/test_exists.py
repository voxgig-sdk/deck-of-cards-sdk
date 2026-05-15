# ProjectName SDK exists test

import pytest
from deckofcards_sdk import DeckOfCardsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DeckOfCardsSDK.test(None, None)
        assert testsdk is not None
