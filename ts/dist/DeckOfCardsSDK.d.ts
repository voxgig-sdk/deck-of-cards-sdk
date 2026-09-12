import { DeckEntity } from './entity/DeckEntity';
import { DrawEntity } from './entity/DrawEntity';
import { PileEntity } from './entity/PileEntity';
import { PileDrawEntity } from './entity/PileDrawEntity';
import { PileListEntity } from './entity/PileListEntity';
import { ReturnEntity } from './entity/ReturnEntity';
export type * from './DeckOfCardsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { DeckOfCardsEntityBase } from './DeckOfCardsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class DeckOfCardsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Deck(entopts?: Record<string, any>): DeckEntity;
    Draw(entopts?: Record<string, any>): DrawEntity;
    Pile(entopts?: Record<string, any>): PileEntity;
    PileDraw(entopts?: Record<string, any>): PileDrawEntity;
    PileList(entopts?: Record<string, any>): PileListEntity;
    Return(entopts?: Record<string, any>): ReturnEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): DeckOfCardsSDK;
    tester(testopts?: any, sdkopts?: any): DeckOfCardsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof DeckOfCardsSDK;
export { stdutil, config, BaseFeature, DeckOfCardsEntityBase, DeckOfCardsSDK, SDK, };
