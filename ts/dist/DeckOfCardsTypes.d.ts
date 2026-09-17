export interface Deck {
    deck_id?: string;
    id?: string;
    remaining?: number;
    shuffled?: boolean;
    success?: boolean;
}
export interface DeckLoadMatch {
    card?: string;
    deck_count?: number;
    jokers_enabled?: boolean;
    $action?: string;
    [action: string]: any;
}
export interface Draw {
    code?: string;
    image?: string;
    images?: Record<string, any>;
    suit?: string;
    value?: string;
}
export interface DrawListMatch {
    deck_id: string;
    count?: number;
}
export interface Pile {
}
export interface PileLoadMatch {
    deck_id: string;
    pile_name: string;
    card?: string;
    $action?: string;
    [action: string]: any;
}
export interface PileDraw {
    code?: string;
    image?: string;
    images?: Record<string, any>;
    suit?: string;
    value?: string;
}
export interface PileDrawListMatch {
    deck_id: string;
    pile_name?: string;
    card?: string;
    count?: number;
    pile_id?: string;
}
export interface PileList {
    cards?: any[];
    remaining?: number;
}
export interface PileListLoadMatch {
    deck_id: string;
    pile_name: string;
}
export interface Return {
    remaining?: number;
}
export interface ReturnLoadMatch {
    deck_id: string;
    pile_name?: string;
    card?: string;
}
