import { DeckOfCardsEntityBase } from '../DeckOfCardsEntityBase';
import type { DeckOfCardsSDK } from '../DeckOfCardsSDK';
import type { Control } from '../types';
import type { PileList, PileListLoadMatch } from '../DeckOfCardsTypes';
declare class PileListEntity extends DeckOfCardsEntityBase<PileList> {
    constructor(client: DeckOfCardsSDK, entopts: any);
    make(this: PileListEntity): PileListEntity;
    load(this: any, reqmatch?: PileListLoadMatch, ctrl?: Control): Promise<PileListEntity>;
}
export { PileListEntity };
