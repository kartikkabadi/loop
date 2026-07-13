CREATE TABLE IF NOT EXISTS loop_runner_registrations (
  run_id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL,
  box_id TEXT NOT NULL,
  generation INTEGER NOT NULL,
  phase TEXT NOT NULL,
  process_alive INTEGER NOT NULL,
  registered_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS loop_runner_registrations_heartbeat
  ON loop_runner_registrations (last_seen_at ASC);
