package core

type DeckOfCardsError struct {
	IsDeckOfCardsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewDeckOfCardsError(code string, msg string, ctx *Context) *DeckOfCardsError {
	return &DeckOfCardsError{
		IsDeckOfCardsError: true,
		Sdk:              "DeckOfCards",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *DeckOfCardsError) Error() string {
	return e.Msg
}
