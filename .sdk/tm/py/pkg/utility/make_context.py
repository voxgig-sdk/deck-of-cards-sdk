# DeckOfCards SDK utility: make_context

from projectname_sdk.core.context import DeckOfCardsContext


def make_context_util(ctxmap, basectx):
    return DeckOfCardsContext(ctxmap, basectx)
