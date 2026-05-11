# Live Dashboard

Read when changing the Cloudflare status dashboard, status ingest contract, or
operator-facing ClawSweeper observability.

The live dashboard is phase-one observability only. ClawSweeper still owns
review, repair, apply, merge, comments, labels, and all GitHub mutations. The
Cloudflare Worker reads public GitHub workflow state, serves a compact pipeline
view, and optionally accepts signed status events from workflows.

## Deployment

Cloudflare account:

- account: `<redacted-org-email>`
- account id: `<cloudflare-account-id>`
- zone: `openclaw.ai`

Worker:

- name: `clawsweeper-status`
- current deployment: `https://clawsweeper.openclaw.ai/`
- fallback workers.dev deployment: `<private-fallback-endpoint>`
- machine ingest: `<private-ingest-endpoint>`

Deploy with the OpenClaw Cloudflare token:

```bash
source ~/.profile
CLOUDFLARE_ACCOUNT_ID="$OPENCLAW_CLOUDFLARE_ACCOUNT_ID" \
CLOUDFLARE_API_TOKEN="$OPENCLAW_CLOUDFLARE_API_TOKEN" \
pnpm run dashboard:deploy
```

GitHub deploys use `.github/workflows/dashboard.yml`. Configure either
`OPENCLAW_CLOUDFLARE_WORKERS_API_TOKEN` or `OPENCLAW_CLOUDFLARE_API_TOKEN` with
Workers Scripts edit permission before enabling the workflow as the production
deploy path. The deploy workflow injects the `CLAWSWEEPER_STATUS_INGEST_TOKEN`
GitHub secret into a temporary Wrangler config as the Worker `INGEST_TOKEN`.

## Access Model

The intended reader policy is Cloudflare Access with GitHub login restricted to
the `openclaw` organization. The dashboard Worker does not implement GitHub
OAuth itself. Keep auth at the Cloudflare edge.

The current local Services token can identify the account, but cannot deploy the
Worker or edit Cloudflare Access/DNS. Add the Workers deploy secret, the
`openclaw.ai` routes, and the Access policy after the Services token has Workers
Scripts edit, Zone DNS/route, and Zero Trust Access permissions.

Workflow events are sent with a bearer secret without a browser login. Ingest
requires the `INGEST_TOKEN` Worker secret. If the optional `STATUS_STORE` KV
binding exists, events and CI status use KV. Without KV, the Worker falls back
to Cloudflare edge cache so badges stay fast but less durable across colos.

```bash
curl -X POST <private-ingest-endpoint> \
  -H "Authorization: Bearer $CLAWSWEEPER_STATUS_INGEST_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"event_type":"status.test","mode":"e2e","stage":"probe","status":"ok"}'
```

## CI Status

The dashboard does not fan out from the browser to GitHub check APIs. Active
pipeline rows use the ClawSweeper workflow run status as an immediate fallback,
then `.github/workflows/dashboard-ci.yml` refreshes target pull request check
state and posts compact `ci.status` events into KV:

```bash
CLAWSWEEPER_STATUS_URL=https://clawsweeper.openclaw.ai \
CLAWSWEEPER_STATUS_INGEST_TOKEN=... \
GITHUB_TOKEN=... \
pnpm run dashboard:refresh-ci
```

The UI renders `run pending/green/red` until stored target checks arrive, then
switches to `checks pending/green/red` with failing/pending/total counts. CI
snapshots expire after two hours so old PR head state does not stick to fresh
pipeline rows. Production also enables a bounded live fallback for the first
few active PR rows so visible rows do not remain on workflow-only status when KV
is absent or a cache event lands in another Cloudflare colo.

## What It Shows

- active ClawSweeper workflow runs
- estimated active Codex jobs from active workflow jobs
- queued/waiting run count
- recent failed/timed-out/action-required runs
- active pipeline rows grouped as automerge, repair, exact review, hot review,
  apply, commit review, or background review
- CI state for active PR rows when available
- recent automerge command-to-merge timing samples
- explicit workflow status events posted to the ingest API when KV ingest is
  enabled

## Boundaries

Do not move these into the dashboard:

- maintainer authorization
- PR branch writes
- labels/comments/closes/merges
- worker budget enforcement
- final merge safety gates

Cloudflare can later become the queue/dedupe/dispatch control plane, but phase
one must stay an observer so the existing GitHub Actions safety model remains
unchanged.
