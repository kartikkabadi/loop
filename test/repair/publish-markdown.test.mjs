import assert from "node:assert/strict";
import test from "node:test";

import { normalizeRetiredRepairEnvNames, tableCell } from "../../dist/repair/publish-markdown.js";

test("repair markdown renders current env names for retired repair gates", () => {
  const retiredRepairPrefix = "CLAWSWEEPER_" + "REPAIR_";
  assert.equal(
    normalizeRetiredRepairEnvNames(`merge requires ${retiredRepairPrefix}ALLOW_MERGE=1`),
    "merge requires CLAWSWEEPER_ALLOW_MERGE=1",
  );
  assert.equal(
    tableCell(`split into narrower jobs or set ${retiredRepairPrefix}ALLOW_BROAD_FIX_ARTIFACTS=1`),
    "split into narrower jobs or set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1",
  );
});
