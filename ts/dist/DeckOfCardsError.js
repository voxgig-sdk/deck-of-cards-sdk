"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckOfCardsError = void 0;
class DeckOfCardsError extends Error {
    isDeckOfCardsError = true;
    sdk = 'DeckOfCards';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.DeckOfCardsError = DeckOfCardsError;
//# sourceMappingURL=DeckOfCardsError.js.map