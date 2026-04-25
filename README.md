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

Last dashboard update: Apr 25, 2026, 14:46 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 14:46 UTC

State: Review publish complete

Merged review artifacts for run 24933176396. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24933176396](https://github.com/openclaw/clawsweeper/actions/runs/24933176396)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6946 |
| Fresh reviewed issues in the last 7 days | 6931 |
| Proposed issue closes | 1340 (19.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4697 |
| Fresh reviewed PRs in the last 7 days | 4633 |
| Proposed PR closes | 277 (6% of reviewed PRs) |
| Open items total | 11643 |
| Reviewed files | 11569 |
| Unreviewed open items | 74 |
| Archived closed files | 7615 |
| Fresh verified reviews in the last 7 days | 11564 |
| Proposed closes awaiting apply | 1617 (14% of fresh reviews) |
| Closed by Codex apply | 5707 |
| Failed or stale reviews | 5 |
| Daily cadence coverage | 8662/8794 current (132 due, 98.5%) |
| Daily PR cadence | 4557/4634 current (77 due, 98.3%) |
| Daily new issue cadence (<30d) | 4105/4160 current (55 due, 98.7%) |
| Weekly older issue cadence | 2775/2775 current (0 due, 100%) |
| Due now by cadence | 206 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#55236](https://github.com/openclaw/openclaw/issues/55236) | [Bug]: Discord main replies can appear late after result is already ready, causing timing confusion | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55236.md) | complete | Apr 25, 2026, 14:44 UTC |
| [#71613](https://github.com/openclaw/openclaw/issues/71613) | Feature: channel reload <provider> — reinitialise single channel without full gateway restart | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71613.md) | complete | Apr 25, 2026, 14:44 UTC |
| [#54874](https://github.com/openclaw/openclaw/issues/54874) | [Bug] Slow typing in webchat input with keystroke delay | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54874.md) | complete | Apr 25, 2026, 14:43 UTC |
| [#55224](https://github.com/openclaw/openclaw/issues/55224) | [Bug] Tool parameters randomly dropped in long sessions (exec/write/sessions_spawn) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55224.md) | complete | Apr 25, 2026, 14:43 UTC |
| [#55248](https://github.com/openclaw/openclaw/issues/55248) | Bug: Subagent announce fails after compaction corrupts thinking blocks | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55248.md) | complete | Apr 25, 2026, 14:43 UTC |
| [#55297](https://github.com/openclaw/openclaw/issues/55297) | Feature request: auto-update for skills and plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55297.md) | complete | Apr 25, 2026, 14:43 UTC |
| [#71607](https://github.com/openclaw/openclaw/issues/71607) | Cron may keep stale in-memory schedule after job expression change, causing duplicate runs (sanitized) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71607.md) | complete | Apr 25, 2026, 14:43 UTC |
| [#71616](https://github.com/openclaw/openclaw/issues/71616) | Control UI: assistant replies not rendered until next user message is sent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71616.md) | complete | Apr 25, 2026, 14:43 UTC |
| [#55231](https://github.com/openclaw/openclaw/issues/55231) | delivery-recovery flushes stale pending messages as batch on every restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55231.md) | complete | Apr 25, 2026, 14:43 UTC |
| [#55243](https://github.com/openclaw/openclaw/issues/55243) | [Bug]: Agent won't do assigned task (says it will but does nothing) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55243.md) | complete | Apr 25, 2026, 14:43 UTC |
| [#55329](https://github.com/openclaw/openclaw/issues/55329) | Feature: per-agent memory path support for self-improving and memory-automation skills | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55329.md) | complete | Apr 25, 2026, 14:42 UTC |
| [#71615](https://github.com/openclaw/openclaw/issues/71615) | [Bug]: 2026.4.23 tool-heavy main sessions can jump from low context to near-full within 1-2 replay turns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71615.md) | complete | Apr 25, 2026, 14:42 UTC |
| [#55409](https://github.com/openclaw/openclaw/issues/55409) | Nostr channel: WebSocket subscriptions fail with timeout/connection refused | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55409.md) | complete | Apr 25, 2026, 14:42 UTC |
| [#55093](https://github.com/openclaw/openclaw/pull/55093) | Stabilize runtime facade builds and mark dirty local versions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55093.md) | complete | Apr 25, 2026, 14:42 UTC |
| [#67056](https://github.com/openclaw/openclaw/issues/67056) | [Bug]: Image runtime does not preserve provider headers for custom OpenAI-compatible models | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67056.md) | complete | Apr 25, 2026, 14:42 UTC |
| [#71618](https://github.com/openclaw/openclaw/issues/71618) | [Feature]: DeepseekV4 has publish | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71618.md) | complete | Apr 25, 2026, 14:42 UTC |
| [#55235](https://github.com/openclaw/openclaw/issues/55235) | [Feature]: Generate and update openclaw.json JSON schema on bootstrap/update | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55235.md) | complete | Apr 25, 2026, 14:42 UTC |
| [#55249](https://github.com/openclaw/openclaw/issues/55249) | Feature: Session labels / nicknames for easier identification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55249.md) | complete | Apr 25, 2026, 14:42 UTC |
| [#55171](https://github.com/openclaw/openclaw/pull/55171) | fix(feishu): unbind stale cross-agent conversation bindings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55171.md) | complete | Apr 25, 2026, 14:42 UTC |
| [#54929](https://github.com/openclaw/openclaw/pull/54929) | fix(gateway): route web chat image turns through the configured image model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54929.md) | complete | Apr 25, 2026, 14:41 UTC |

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
