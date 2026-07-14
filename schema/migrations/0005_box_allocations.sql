CREATE TABLE IF NOT EXISTS loop_box_allocations (
  allocation_id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL,
  run_id TEXT NOT NULL,
  attempt INTEGER NOT NULL,
  provider TEXT NOT NULL,
  deterministic_name TEXT NOT NULL,
  box_id TEXT,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  error_message TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS loop_box_allocations_box_id
  ON loop_box_allocations (box_id)
  WHERE box_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS loop_box_allocations_task_order
  ON loop_box_allocations (task_id, attempt ASC);

CREATE INDEX IF NOT EXISTS loop_box_allocations_expiry
  ON loop_box_allocations (expires_at);
