package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/deck-of-cards-sdk/go"
	"github.com/voxgig-sdk/deck-of-cards-sdk/go/core"

	vs "github.com/voxgig-sdk/deck-of-cards-sdk/go/utility/struct"
)

func TestPileDrawEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PileDraw(nil)
		if ent == nil {
			t.Fatal("expected non-nil PileDrawEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := pile_drawBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "pile_draw." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set DECKOFCARDS_TEST_PILE_DRAW_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		pileDrawRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.pile_draw", setup.data)))
		var pileDrawRef01Data map[string]any
		if len(pileDrawRef01DataRaw) > 0 {
			pileDrawRef01Data = core.ToMapAny(pileDrawRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = pileDrawRef01Data

		// LIST
		pileDrawRef01Ent := client.PileDraw(nil)
		pileDrawRef01Match := map[string]any{
			"deck_id": setup.idmap["deck01"],
			"pile_id": setup.idmap["pile01"],
		}

		pileDrawRef01ListResult, err := pileDrawRef01Ent.List(pileDrawRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, pileDrawRef01ListOk := pileDrawRef01ListResult.([]any)
		if !pileDrawRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", pileDrawRef01ListResult)
		}

	})
}

func pile_drawBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "pile_draw", "PileDrawTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read pile_draw test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse pile_draw test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"pile_draw01", "pile_draw02", "pile_draw03", "deck01", "deck02", "deck03", "pile01", "pile02", "pile03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("DECKOFCARDS_TEST_PILE_DRAW_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DECKOFCARDS_TEST_PILE_DRAW_ENTID": idmap,
		"DECKOFCARDS_TEST_LIVE":      "FALSE",
		"DECKOFCARDS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["DECKOFCARDS_TEST_PILE_DRAW_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["DECKOFCARDS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewDeckOfCardsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["DECKOFCARDS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["DECKOFCARDS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
