ALTER TABLE loop_runs ADD COLUMN cancellation_generation INTEGER NOT NULL DEFAULT 1;
ALTER TABLE loop_run_checkpoints ADD COLUMN cancellation_generation INTEGER NOT NULL DEFAULT 1;

CREATE INDEX IF NOT EXISTS loop_runs_cancellation_order
  ON loop_runs (task_id, cancellation_generation, updated_at DESC);
