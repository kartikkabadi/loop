CREATE TABLE IF NOT EXISTS loop_evidence (
  evidence_id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL,
  revision INTEGER NOT NULL,
  contract_hash TEXT NOT NULL,
  base_sha TEXT NOT NULL,
  head_sha TEXT NOT NULL,
  kind TEXT NOT NULL,
  object_key TEXT NOT NULL UNIQUE,
  digest TEXT NOT NULL,
  byte_length INTEGER NOT NULL,
  content_type TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS loop_evidence_task_order
  ON loop_evidence (task_id, created_at ASC);

CREATE INDEX IF NOT EXISTS loop_evidence_expiry
  ON loop_evidence (expires_at);
