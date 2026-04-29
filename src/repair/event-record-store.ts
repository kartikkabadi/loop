import fs from "node:fs";
import path from "node:path";

export type EventRecordStore = {
  targetRepo: string;
  itemNumber: string;
  snapshotDir: string;
};

export type EventRecordPaths = {
  targetSlug: string;
  itemRecord: string;
  closedRecord: string;
  snapshotItem: string;
  snapshotClosed: string;
};

export type EventSnapshotApplyResult = "closed" | "open" | "remote-closed" | "missing";

export function eventRecordPaths(store: EventRecordStore): EventRecordPaths {
  const targetSlug = store.targetRepo.replace("/", "-");
  return {
    targetSlug,
    itemRecord: `records/${targetSlug}/items/${store.itemNumber}.md`,
    closedRecord: `records/${targetSlug}/closed/${store.itemNumber}.md`,
    snapshotItem: path.join(store.snapshotDir, "items", `${store.itemNumber}.md`),
    snapshotClosed: path.join(store.snapshotDir, "closed", `${store.itemNumber}.md`),
  };
}

export function resetEventSnapshot(store: EventRecordStore): void {
  fs.rmSync(store.snapshotDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(store.snapshotDir, "items"), { recursive: true });
  fs.mkdirSync(path.join(store.snapshotDir, "closed"), { recursive: true });
}

export function captureEventSnapshot(store: EventRecordStore): EventRecordPaths {
  const paths = eventRecordPaths(store);
  copyIfExists(paths.itemRecord, paths.snapshotItem);
  copyIfExists(paths.closedRecord, paths.snapshotClosed);
  return paths;
}

export function applyEventSnapshot(paths: EventRecordPaths): EventSnapshotApplyResult {
  if (fs.existsSync(paths.snapshotClosed)) {
    fs.mkdirSync(path.dirname(paths.closedRecord), { recursive: true });
    fs.rmSync(paths.itemRecord, { force: true });
    fs.copyFileSync(paths.snapshotClosed, paths.closedRecord);
    return "closed";
  }

  if (!fs.existsSync(paths.snapshotItem)) return "missing";

  if (fs.existsSync(paths.closedRecord)) return "remote-closed";

  fs.mkdirSync(path.dirname(paths.itemRecord), { recursive: true });
  fs.copyFileSync(paths.snapshotItem, paths.itemRecord);
  return "open";
}

function copyIfExists(source: string, destination: string): void {
  if (!fs.existsSync(source)) return;
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}
