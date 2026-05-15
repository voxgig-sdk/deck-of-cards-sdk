-- DeckOfCards SDK error

local DeckOfCardsError = {}
DeckOfCardsError.__index = DeckOfCardsError


function DeckOfCardsError.new(code, msg, ctx)
  local self = setmetatable({}, DeckOfCardsError)
  self.is_sdk_error = true
  self.sdk = "DeckOfCards"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function DeckOfCardsError:error()
  return self.msg
end


function DeckOfCardsError:__tostring()
  return self.msg
end


return DeckOfCardsError
