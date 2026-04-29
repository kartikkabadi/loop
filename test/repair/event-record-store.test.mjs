import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  applyEventSnapshot,
  captureEventSnapshot,
  eventRecordPaths,
  resetEventSnapshot,
} from "../../dist/repair/event-record-store.js";

test("event record snapshots prefer closed records and remove open records", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-event-records-"));
  const store = {
    targetRepo: "openclaw/openclaw",
    itemNumber: "42",
    snapshotDir: path.join(root, "snapshot"),
  };

  withCwd(root, () => {
    const paths = eventRecordPaths(store);
    resetEventSnapshot(store);
    write(paths.itemRecord, "open\n");
    write(paths.closedRecord, "closed\n");

    const captured = captureEventSnapshot(store);
    fs.rmSync(paths.itemRecord);
    fs.rmSync(paths.closedRecord);

    assert.equal(applyEventSnapshot(captured), "closed");
    assert.equal(fs.existsSync(paths.itemRecord), false);
    assert.equal(fs.readFileSync(paths.closedRecord, "utf8"), "closed\n");
  });
});

test("event record snapshots skip stale open snapshots when remote is already closed", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-event-records-"));
  const store = {
    targetRepo: "openclaw/openclaw",
    itemNumber: "99",
    snapshotDir: path.join(root, "snapshot"),
  };

  withCwd(root, () => {
    const paths = eventRecordPaths(store);
    resetEventSnapshot(store);
    write(paths.itemRecord, "open snapshot\n");
    captureEventSnapshot(store);
    fs.rmSync(paths.itemRecord);
    write(paths.closedRecord, "remote closed\n");

    assert.equal(applyEventSnapshot(paths), "remote-closed");
    assert.equal(fs.readFileSync(paths.closedRecord, "utf8"), "remote closed\n");
    assert.equal(fs.existsSync(paths.itemRecord), false);
  });
});

function withCwd(cwd, callback) {
  const previous = process.cwd();
  process.chdir(cwd);
  try {
    return callback();
  } finally {
    process.chdir(previous);
  }
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}
