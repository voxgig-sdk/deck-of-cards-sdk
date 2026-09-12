import { DeckOfCardsEntityBase } from '../DeckOfCardsEntityBase';
import type { DeckOfCardsSDK } from '../DeckOfCardsSDK';
import type { Control } from '../types';
import type { Draw, DrawListMatch } from '../DeckOfCardsTypes';
declare class DrawEntity extends DeckOfCardsEntityBase<Draw> {
    constructor(client: DeckOfCardsSDK, entopts: any);
    make(this: DrawEntity): DrawEntity;
    list(this: any, reqmatch?: DrawListMatch, ctrl?: Control): Promise<DrawEntity[]>;
}
export { DrawEntity };
