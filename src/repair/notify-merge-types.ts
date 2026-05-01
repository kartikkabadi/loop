import type { JsonObject } from "./json-types.js";

export type MergeNotification = {
  key: string;
  idempotencyKey: string;
  repo: string;
  number: number;
  target: string;
  prUrl: string;
  title: string | null;
  action: string;
  reason: string | null;
  mergedAt: string | null;
  mergeCommitSha: string | null;
  runId: string | null;
  runUrl: string | null;
  clusterId: string | null;
  publishedAt: string | null;
};

export type MergeLedgerEntry = MergeNotification & {
  notifiedAt: string;
  hookRunId: string | null;
  discordTarget: string | null;
};

export type MergeNotificationLedger = {
  version: 1;
  updated_at: string | null;
  notifications: MergeLedgerEntry[];
};

export type CollectionResult = {
  considered: number;
  notifications: MergeNotification[];
  skipped: JsonObject[];
};

export type MergeNotifierSummary = {
  status: "ok" | "skipped";
  considered: number;
  pending: number;
  sent: number;
  failed: number;
  skipped: number;
  exitCode: number;
  reason: string | null;
};

export type MergeNotifierRuntime = {
  root?: string;
  env?: NodeJS.ProcessEnv;
  fetch?: typeof fetch;
  now?: () => Date;
  log?: (message: string) => void;
};
