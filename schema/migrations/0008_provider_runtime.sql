ALTER TABLE loop_runs ADD COLUMN model TEXT NOT NULL DEFAULT 'SWE-1.7';
ALTER TABLE loop_runs ADD COLUMN provider_lease_id TEXT;
ALTER TABLE loop_runs ADD COLUMN next_attempt_at TEXT;
ALTER TABLE loop_runs ADD COLUMN provider_reason TEXT;

CREATE INDEX IF NOT EXISTS loop_runs_provider_wait_order
  ON loop_runs (status, next_attempt_at ASC);

CREATE TABLE IF NOT EXISTS loop_run_checkpoints (
  checkpoint_id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  task_id TEXT NOT NULL,
  generation INTEGER NOT NULL,
  task_revision INTEGER NOT NULL,
  model TEXT NOT NULL,
  contract_hash TEXT NOT NULL,
  session_id_digest TEXT NOT NULL,
  status TEXT NOT NULL,
  phase TEXT NOT NULL,
  handoff TEXT NOT NULL,
  provider_reason TEXT,
  retry_at TEXT,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS loop_run_checkpoints_run_order
  ON loop_run_checkpoints (run_id, generation DESC, updated_at DESC);
