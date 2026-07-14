CREATE TABLE IF NOT EXISTS loop_runs (
  run_id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL,
  attempt INTEGER NOT NULL,
  generation INTEGER NOT NULL,
  expected_version INTEGER NOT NULL,
  status TEXT NOT NULL,
  started_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  error_message TEXT
);

CREATE INDEX IF NOT EXISTS loop_runs_task_order
  ON loop_runs (task_id, attempt ASC, generation ASC);

CREATE INDEX IF NOT EXISTS loop_runs_status_order
  ON loop_runs (status, updated_at ASC);
