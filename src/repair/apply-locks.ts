import type { LooseRecord } from "./json-types.js";

export function lockedConversationSkipIfLocked(base: LooseRecord, live: LooseRecord) {
  if (live?.locked !== true) return null;
  return lockedConversationSkip(base, live);
}

export function lockedConversationSkip(
  base: LooseRecord,
  live: LooseRecord,
  options: { terminalWriteError?: boolean } = {},
) {
  return {
    ...base,
    status: "skipped",
    reason: lockedConversationReason(live, options),
    live_state: live?.state ?? null,
    live_updated_at: live?.updated_at ?? null,
    ...(normalizedLockReason(live) ? { active_lock_reason: normalizedLockReason(live) } : {}),
  };
}

export function lockedConversationReason(
  live: LooseRecord,
  options: { terminalWriteError?: boolean } = {},
) {
  const activeLockReason = normalizedLockReason(live);
  const reason = activeLockReason ? `target is locked (${activeLockReason})` : "target is locked";
  return options.terminalWriteError ? `${reason}; GitHub rejected the write` : reason;
}

function normalizedLockReason(live: LooseRecord) {
  const reason = live?.active_lock_reason;
  return typeof reason === "string" && reason.trim() ? reason.trim() : "";
}
