import { DeckOfCardsEntityBase } from '../DeckOfCardsEntityBase';
import type { DeckOfCardsSDK } from '../DeckOfCardsSDK';
import type { Control } from '../types';
import type { Return, ReturnLoadMatch } from '../DeckOfCardsTypes';
declare class ReturnEntity extends DeckOfCardsEntityBase<Return> {
    constructor(client: DeckOfCardsSDK, entopts: any);
    make(this: ReturnEntity): ReturnEntity;
    load(this: any, reqmatch?: ReturnLoadMatch, ctrl?: Control): Promise<ReturnEntity>;
}
export { ReturnEntity };
