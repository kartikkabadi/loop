CREATE TABLE IF NOT EXISTS loop_github_task_links (
  owner TEXT NOT NULL,
  repository TEXT NOT NULL,
  issue_number INTEGER NOT NULL,
  task_id TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (owner, repository, issue_number),
  UNIQUE (task_id)
);

CREATE TABLE IF NOT EXISTS loop_github_commands (
  delivery_id TEXT PRIMARY KEY,
  owner TEXT NOT NULL,
  repository TEXT NOT NULL,
  issue_number INTEGER NOT NULL,
  task_id TEXT,
  actor TEXT NOT NULL,
  command TEXT NOT NULL,
  arguments TEXT NOT NULL,
  status TEXT NOT NULL,
  reason TEXT,
  received_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS loop_github_commands_task_order
  ON loop_github_commands (task_id, received_at DESC);
