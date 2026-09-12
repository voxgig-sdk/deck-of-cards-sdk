import { DeckOfCardsEntityBase } from '../DeckOfCardsEntityBase';
import type { DeckOfCardsSDK } from '../DeckOfCardsSDK';
import type { Control } from '../types';
import type { Deck, DeckLoadMatch } from '../DeckOfCardsTypes';
declare class DeckEntity extends DeckOfCardsEntityBase<Deck> {
    constructor(client: DeckOfCardsSDK, entopts: any);
    make(this: DeckEntity): DeckEntity;
    load(this: any, reqmatch?: DeckLoadMatch, ctrl?: Control): Promise<DeckEntity>;
}
export { DeckEntity };
