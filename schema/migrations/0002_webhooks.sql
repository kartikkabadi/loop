CREATE TABLE IF NOT EXISTS loop_webhook_deliveries (
  delivery_id TEXT PRIMARY KEY,
  received_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS loop_webhook_deliveries_expiry
  ON loop_webhook_deliveries (expires_at);
