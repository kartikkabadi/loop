# Spam Scanner

Read when changing ClawSweeper comment spam detection, audit records, or org
blocking policy.

The spam scanner is an audit-only intake lane. It scans new issue comments and
PR review comments, applies deterministic prefilters, sends likely candidates to
the cheap `gpt-instant` model, and writes durable audit records. It does not
block users, hide comments, label items, or mutate target repositories.

Default behavior:

- target repo: `openclaw/openclaw`
- model: `gpt-instant`
- schedule: hourly
- catch-up window: 3 hours
- cap: 100 comments
- dedupe: comment kind, id, and `updated_at`

Outputs in `openclaw/clawsweeper-state`:

- `results/spam-scanner-latest.json`: latest run summary
- `results/spam-scanner.json`: durable processed comment-version ledger
- `results/spam-audit/<repo-slug>/<kind>-<comment-id>.json`: per-comment audit

Audit records include the comment URL, author association, body hash, short body
excerpt, deterministic signals, model, model result, and `action: none`.

Run manually:

```bash
pnpm run build:repair
OPENAI_API_KEY=... pnpm run repair:spam-scan -- \
  --write-report \
  --repo openclaw/openclaw \
  --lookback-minutes 180 \
  --max-comments 100
```

Use exact comment ids for event replays:

```bash
pnpm run repair:spam-scan -- --write-report --repo openclaw/openclaw --comment-ids 123
pnpm run repair:spam-scan -- --write-report --repo openclaw/openclaw --review-comment-ids 456
```

Future blocking must be a separate apply step. It needs explicit org permission
`Blocking users: write`, maintainer/collaborator allowlisting, and audit records
that prove the exact comment and reason for each block.
