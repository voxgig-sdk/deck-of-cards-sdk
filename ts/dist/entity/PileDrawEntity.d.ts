import { DeckOfCardsEntityBase } from '../DeckOfCardsEntityBase';
import type { DeckOfCardsSDK } from '../DeckOfCardsSDK';
import type { Control } from '../types';
import type { PileDraw, PileDrawListMatch } from '../DeckOfCardsTypes';
declare class PileDrawEntity extends DeckOfCardsEntityBase<PileDraw> {
    constructor(client: DeckOfCardsSDK, entopts: any);
    make(this: PileDrawEntity): PileDrawEntity;
    list(this: any, reqmatch?: PileDrawListMatch, ctrl?: Control): Promise<PileDrawEntity[]>;
}
export { PileDrawEntity };
