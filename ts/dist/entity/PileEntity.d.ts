import { DeckOfCardsEntityBase } from '../DeckOfCardsEntityBase';
import type { DeckOfCardsSDK } from '../DeckOfCardsSDK';
import type { Control } from '../types';
import type { Pile, PileLoadMatch } from '../DeckOfCardsTypes';
declare class PileEntity extends DeckOfCardsEntityBase<Pile> {
    constructor(client: DeckOfCardsSDK, entopts: any);
    make(this: PileEntity): PileEntity;
    load(this: any, reqmatch?: PileLoadMatch, ctrl?: Control): Promise<PileEntity>;
}
export { PileEntity };
