CREATE TABLE IF NOT EXISTS loop_task_events (
  task_id TEXT NOT NULL,
  sequence INTEGER NOT NULL,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  idempotency_key TEXT,
  state_json TEXT NOT NULL,
  PRIMARY KEY (task_id, sequence)
);

CREATE INDEX IF NOT EXISTS loop_task_events_task_order
  ON loop_task_events (task_id, sequence DESC);

CREATE UNIQUE INDEX IF NOT EXISTS loop_task_events_idempotency
  ON loop_task_events (task_id, idempotency_key)
  WHERE idempotency_key IS NOT NULL;
