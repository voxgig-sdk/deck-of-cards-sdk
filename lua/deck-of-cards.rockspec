package = "voxgig-sdk-deck-of-cards"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/deck-of-cards-sdk.git"
}
description = {
  summary = "DeckOfCards SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["deck-of-cards_sdk"] = "deck-of-cards_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
