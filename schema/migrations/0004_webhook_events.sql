CREATE TABLE IF NOT EXISTS loop_webhook_events (
  delivery_id TEXT PRIMARY KEY,
  event_name TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  received_at TEXT NOT NULL,
  processed_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS loop_webhook_events_processed_order
  ON loop_webhook_events (processed_at ASC);
