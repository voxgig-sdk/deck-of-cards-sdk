-- Return direct test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("deck-of-cards_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

describe("ReturnDirect", function()
  it("should direct-load-return", function()
    local setup = return_direct_setup({ id = "direct01" })
    local _should_skip, _reason = runner.is_control_skipped("direct", "direct-load-return", setup.live and "live" or "unit")
    if _should_skip then
      pending(_reason or "skipped via sdk-test-control.json")
      return
    end
    if setup.live then
      pending("live direct-load needs real ID — set *_ENTID env var with real IDs to run")
      return
    end
    local client = setup.client

    local params = {}
    local query = {}
    if not setup.live then
      params["deck_id"] = "direct01"
      params["pile_name"] = "direct02"
    end

    local result, err = client:direct({
      path = "deck/{deck_id}/pile/{pile_name}/return",
      method = "GET",
      params = params,
      query = query,
    })
    if setup.live then
      -- Live mode is lenient: synthetic IDs frequently 4xx. Skip rather
      -- than fail when the load endpoint isn't reachable with the IDs we
      -- can construct from setup.idmap.
      if err ~= nil then
        pending("load call failed (likely synthetic IDs against live API): " .. tostring(err))
        return
      end
      if not result["ok"] then
        pending("load call not ok (likely synthetic IDs against live API)")
        return
      end
      local status = helpers.to_int(result["status"])
      if status < 200 or status >= 300 then
        pending("expected 2xx status, got " .. tostring(status))
        return
      end
    else
      assert.is_nil(err)
      assert.is_true(result["ok"])
      assert.are.equal(200, helpers.to_int(result["status"]))
      assert.is_not_nil(result["data"])
      if type(result["data"]) == "table" then
        assert.are.equal("direct01", result["data"]["id"])
      end
      assert.are.equal(1, #setup.calls)
    end
  end)

end)


function return_direct_setup(mockres)
  runner.load_env_local()

  local calls = {}

  local env = runner.env_override({
    ["DECKOFCARDS_TEST_RETURN_ENTID"] = {},
    ["DECKOFCARDS_TEST_LIVE"] = "FALSE",
    ["DECKOFCARDS_APIKEY"] = "NONE",
  })

  local live = env["DECKOFCARDS_TEST_LIVE"] == "TRUE"

  if live then
    local merged_opts = {
      apikey = env["DECKOFCARDS_APIKEY"],
    }
    local client = sdk.new(merged_opts)
    return {
      client = client,
      calls = calls,
      live = true,
      idmap = {},
    }
  end

  local function mock_fetch(url, init)
    table.insert(calls, { url = url, init = init })
    return {
      status = 200,
      statusText = "OK",
      headers = {},
      json = function()
        if mockres ~= nil then
          return mockres
        end
        return { id = "direct01" }
      end,
      body = "mock",
    }, nil
  end

  local client = sdk.new({
    base = "http://localhost:8080",
    system = {
      fetch = mock_fetch,
    },
  })

  return {
    client = client,
    calls = calls,
    live = false,
    idmap = {},
  }
end
