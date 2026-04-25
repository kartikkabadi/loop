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

Last dashboard update: Apr 25, 2026, 16:17 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 16:17 UTC

State: Apply in progress

Checkpoint 3 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 150/500. Result records in checkpoint: 51.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24934812741](https://github.com/openclaw/clawsweeper/actions/runs/24934812741)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6567 |
| Fresh reviewed issues in the last 7 days | 6554 |
| Proposed issue closes | 1014 (15.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4607 |
| Fresh reviewed PRs in the last 7 days | 4537 |
| Proposed PR closes | 194 (4.3% of reviewed PRs) |
| Open items total | 11174 |
| Reviewed files | 11095 |
| Unreviewed open items | 79 |
| Archived closed files | 8112 |
| Fresh verified reviews in the last 7 days | 11091 |
| Proposed closes awaiting apply | 1208 (10.9% of fresh reviews) |
| Closed by Codex apply | 6257 |
| Failed or stale reviews | 4 |
| Daily cadence coverage | 8155/8311 current (156 due, 98.1%) |
| Daily PR cadence | 4443/4539 current (96 due, 97.9%) |
| Daily new issue cadence (<30d) | 3712/3772 current (60 due, 98.4%) |
| Weekly older issue cadence | 2784/2784 current (0 due, 100%) |
| Due now by cadence | 235 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#56997](https://github.com/openclaw/openclaw/issues/56997) | [Feature] Control UI: Support channel-based session view toggle | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56997.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#56876](https://github.com/openclaw/openclaw/issues/56876) | [Feature Request] Add file type detection and preprocessing for binary documents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56876.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#56881](https://github.com/openclaw/openclaw/issues/56881) | Regression after 2026.3.28: sessionStrategy behavior changed, ws-stream 500 fallback, slower Discord interaction handling | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56881.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#57142](https://github.com/openclaw/openclaw/issues/57142) | Webchat: autocomplete/suggestions for custom terms in chat input | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57142.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#56951](https://github.com/openclaw/openclaw/issues/56951) | Slack inline buttons should be enabled by default | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56951.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#57212](https://github.com/openclaw/openclaw/issues/57212) | Discord voice: audio receive pipeline silent — no STT, no decrypt errors, no speaking events | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57212.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#57141](https://github.com/openclaw/openclaw/issues/57141) | [Bug]: Telegram DM topic ACP bind fails on next message with missing ACP metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57141.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#56968](https://github.com/openclaw/openclaw/issues/56968) | Bug: status shows 'Memory enabled · unavailable' for third-party memory plugins (memory-lancedb-pro) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56968.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#57031](https://github.com/openclaw/openclaw/issues/57031) | fix: QueuedFileWriter silently swallows all write errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57031.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#56973](https://github.com/openclaw/openclaw/issues/56973) | refactor: remove normalizeChannelId wrapper collision — use canonical names directly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56973.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#57017](https://github.com/openclaw/openclaw/issues/57017) | fix: readCronRunLogEntriesPage reads entire JSONL into memory without size cap | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57017.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#57202](https://github.com/openclaw/openclaw/issues/57202) | [Feature]: 分布式部署的可能性？ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57202.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#57091](https://github.com/openclaw/openclaw/issues/57091) | [Feature]: Improve Workspace Skill Loading: Add Frontmatter Parsing Error Visibility and Validation for SKILL.md | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57091.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#57110](https://github.com/openclaw/openclaw/issues/57110) | Tailscale serve mode lacks optional secondary authentication | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57110.md) | complete | Apr 25, 2026, 16:14 UTC |
| [#57225](https://github.com/openclaw/openclaw/issues/57225) | [Bug]: Discord multi-segment responses arrive out of order when interleaved with tool calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57225.md) | complete | Apr 25, 2026, 16:13 UTC |
| [#57068](https://github.com/openclaw/openclaw/issues/57068) | Agent overview: primary model selection does not save (reverts to 'Not set' after Refresh) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57068.md) | complete | Apr 25, 2026, 16:13 UTC |
| [#57019](https://github.com/openclaw/openclaw/issues/57019) | fix: session write lock race — async release can delete newly-acquired lock | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57019.md) | complete | Apr 25, 2026, 16:13 UTC |
| [#57139](https://github.com/openclaw/openclaw/issues/57139) | sessions_history should support reading archived/reset sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57139.md) | complete | Apr 25, 2026, 16:13 UTC |
| [#56638](https://github.com/openclaw/openclaw/issues/56638) | Agent tool surface missing media/audio delivery tool since 2026.3.x | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56638.md) | complete | Apr 25, 2026, 16:13 UTC |
| [#57174](https://github.com/openclaw/openclaw/issues/57174) | Feature: Per-agent compaction configuration (thresholds, mode, reserveTokens) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57174.md) | complete | Apr 25, 2026, 16:13 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
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
npm run plan -- --batch-size 5 --shard-count 40 --max-pages 250 --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast --codex-timeout-ms 600000
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

- `OPENAI_API_KEY`: OpenAI API key used by Codex.
- `CODEX_API_KEY`: same API key for `codex exec` CI auth.
- `OPENCLAW_GH_TOKEN`: GitHub token with write access to `openclaw/openclaw` issues and PRs.

The workflow logs Codex in with `OPENAI_API_KEY`, passes `CODEX_API_KEY` to `codex exec`, and fails the shard instead of writing fallback review markdown if Codex auth/output fails. It uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
