# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per open item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 25, 2026, 19:26 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 19:26 UTC

State: Apply in progress

Checkpoint 6 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 300/500. Result records in checkpoint: 53.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24937779720](https://github.com/openclaw/clawsweeper/actions/runs/24937779720)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5607 |
| Fresh reviewed issues in the last 7 days | 5511 |
| Proposed issue closes | 89 (1.6% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4389 |
| Fresh reviewed PRs in the last 7 days | 4266 |
| Proposed PR closes | 11 (0.3% of reviewed PRs) |
| Open items total | 9996 |
| Reviewed files | 9946 |
| Unreviewed open items | 50 |
| Archived closed files | 9306 |
| Fresh verified reviews in the last 7 days | 9777 |
| Proposed closes awaiting apply | 100 (1% of fresh reviews) |
| Closed by Codex apply | 7405 |
| Failed or stale reviews | 169 |
| Daily cadence coverage | 6494/7166 current (672 due, 90.6%) |
| Daily PR cadence | 4055/4350 current (295 due, 93.2%) |
| Daily new issue cadence (<30d) | 2439/2816 current (377 due, 86.6%) |
| Weekly older issue cadence | 2780/2780 current (0 due, 100%) |
| Due now by cadence | 722 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#59868](https://github.com/openclaw/openclaw/issues/59868) | edit tool shows false positive error when oldText match fails after file was already fixed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59868.md) | complete | Apr 25, 2026, 18:42 UTC |
| [#59307](https://github.com/openclaw/openclaw/issues/59307) | Regression 2026.3.31: embedded agent calls read tool without path during heartbeat polls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59307.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:40 UTC |
| [#59913](https://github.com/openclaw/openclaw/issues/59913) | OpenAI compat gateway images bypass sanitization/resize, hit Anthropic 5MB limit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59913.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:40 UTC |
| [#59545](https://github.com/openclaw/openclaw/issues/59545) | [Bug]: macOS app General settings rewrites ~/.openclaw/openclaw.json without user changes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59545.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:40 UTC |
| [#59784](https://github.com/openclaw/openclaw/issues/59784) | [Bug]: Subscription quota limit (\"You've hit your limit\") classified as billing error, blocks model fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59784.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:40 UTC |
| [#59872](https://github.com/openclaw/openclaw/issues/59872) | Agent repeatedly uses web_fetch for Twitter/X URLs despite documented alternatives — needs tool-level domain routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59872.md) | complete | Apr 25, 2026, 18:39 UTC |
| [#60661](https://github.com/openclaw/openclaw/pull/60661) | Keep gateway CLI timeout client-side after accepted runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60661.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:39 UTC |
| [#59576](https://github.com/openclaw/openclaw/issues/59576) | Mattermost: bot does not see file attachments (file_ids empty in WebSocket event) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59576.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:39 UTC |
| [#59514](https://github.com/openclaw/openclaw/issues/59514) | feat: support Bearer token auth for Bedrock gateway proxies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59514.md) | complete | Apr 25, 2026, 18:39 UTC |
| [#59361](https://github.com/openclaw/openclaw/issues/59361) | [Bug]: openclaw agent exits 0 with no output on v2026.3.31; lobster CLI unregistered as command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59361.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:39 UTC |
| [#59744](https://github.com/openclaw/openclaw/issues/59744) | Discord inbound attachments lose original filename (saved as UUID) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59744.md) | complete | Apr 25, 2026, 18:39 UTC |
| [#59788](https://github.com/openclaw/openclaw/issues/59788) | [Feature]: Start and persist routed agent sessions from outbound WhatsApp sends | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59788.md) | complete | Apr 25, 2026, 18:39 UTC |
| [#59806](https://github.com/openclaw/openclaw/issues/59806) | Bug: Feishu plugin fails with 'Cannot destructure property tenant_access_token' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59806.md) | complete | Apr 25, 2026, 18:39 UTC |
| [#59881](https://github.com/openclaw/openclaw/issues/59881) | Plugin hook ctx.channelId returns provider name instead of actual channel ID | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59881.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:39 UTC |
| [#59727](https://github.com/openclaw/openclaw/issues/59727) | CI/CD: Refactor complex workflow matrices into reusable workflows and JSON configs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59727.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:39 UTC |
| [#59730](https://github.com/openclaw/openclaw/issues/59730) | Testing: Consolidate multiple Vitest config files into unified configuration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59730.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:39 UTC |
| [#59888](https://github.com/openclaw/openclaw/issues/59888) | [Bug]: WhatsApp web-auto-reply dispatches stale/cached reply to subsequent inbound message (5ms response, no LLM call) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59888.md) | complete | Apr 25, 2026, 18:39 UTC |
| [#59871](https://github.com/openclaw/openclaw/issues/59871) | [Bug]: [Bug] TUI renders internal command envelopes to operator; async completion events inject verbose agent instructions into session transcript | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59871.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:39 UTC |
| [#59509](https://github.com/openclaw/openclaw/issues/59509) | feat: support per-model location override for google-vertex provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59509.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:39 UTC |
| [#59817](https://github.com/openclaw/openclaw/issues/59817) | Discord DMs can fork into duplicate channel sessions during channel-info/network failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59817.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:39 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.5`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews. The dashboard reports local cadence coverage for daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 40 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort medium --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort medium --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20
```

Manual review runs can set `--apply-closures` or workflow input `apply_closures=true`, but the safer path is proposal first, then `apply_existing=true`.

## Checks

```bash
npm run check
npm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` npm package.

## GitHub Actions Setup

Required secrets:

- `OPENAI_API_KEY`: OpenAI API key used to log Codex in before review shards run.
- `CODEX_API_KEY`: optional compatibility alias for the same key during the login check.
- `OPENCLAW_GH_TOKEN`: GitHub token with write access to `openclaw/openclaw` issues and PRs.

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI or Codex API key environment variables. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. It uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
