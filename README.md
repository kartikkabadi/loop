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

Last dashboard update: Apr 25, 2026, 16:46 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 16:46 UTC

State: Review publish complete

Merged review artifacts for run 24935428061. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24935428061](https://github.com/openclaw/clawsweeper/actions/runs/24935428061)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6487 |
| Fresh reviewed issues in the last 7 days | 6472 |
| Proposed issue closes | 946 (14.6% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4594 |
| Fresh reviewed PRs in the last 7 days | 4531 |
| Proposed PR closes | 189 (4.2% of reviewed PRs) |
| Open items total | 11081 |
| Reviewed files | 11003 |
| Unreviewed open items | 78 |
| Archived closed files | 8211 |
| Fresh verified reviews in the last 7 days | 11003 |
| Proposed closes awaiting apply | 1135 (10.3% of fresh reviews) |
| Closed by Codex apply | 6307 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 8078/8221 current (143 due, 98.3%) |
| Daily PR cadence | 4444/4531 current (87 due, 98.1%) |
| Daily new issue cadence (<30d) | 3634/3690 current (56 due, 98.5%) |
| Weekly older issue cadence | 2782/2782 current (0 due, 100%) |
| Due now by cadence | 221 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#57725](https://github.com/openclaw/openclaw/issues/57725) | [bug] Embedded ws-stream websocket upgrade fails with HTTP 500 (falls back to HTTP) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57725.md) | complete | Apr 25, 2026, 16:44 UTC |
| [#57567](https://github.com/openclaw/openclaw/issues/57567) | Bug: Configuration Migration Failure During Upgrade (v3.24 → v3.28) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57567.md) | complete | Apr 25, 2026, 16:44 UTC |
| [#57844](https://github.com/openclaw/openclaw/issues/57844) | Slack Socket Mode: inbound events silently dropped on v2026.3.11+ (works on v2026.3.8) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57844.md) | complete | Apr 25, 2026, 16:44 UTC |
| [#57756](https://github.com/openclaw/openclaw/issues/57756) | [Bug]: session-key-based session access is not scoped to the calling operator client/device | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57756.md) | complete | Apr 25, 2026, 16:43 UTC |
| [#57705](https://github.com/openclaw/openclaw/issues/57705) | feat(sessions): expose sub-agent concurrency budget in session_status or new sessions_capacity tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57705.md) | complete | Apr 25, 2026, 16:43 UTC |
| [#57801](https://github.com/openclaw/openclaw/issues/57801) | Feishu WebSocket reconnect every 5 minutes causes webchat console disconnect (code=1006) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57801.md) | complete | Apr 25, 2026, 16:43 UTC |
| [#57796](https://github.com/openclaw/openclaw/issues/57796) | Preserve provenance field in plugin hook event messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57796.md) | complete | Apr 25, 2026, 16:43 UTC |
| [#57708](https://github.com/openclaw/openclaw/issues/57708) | RFC: Markdown → rich_text block auto-conversion for Slack messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57708.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57661](https://github.com/openclaw/openclaw/issues/57661) | [Bug]: agent-to-agent session_send timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57661.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57713](https://github.com/openclaw/openclaw/issues/57713) | [Bug]: Default sandbox image openclaw-sandbox:bookworm-slim lacked python3, breaking edit/write | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57713.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57636](https://github.com/openclaw/openclaw/issues/57636) | [Feature]: Plugin hooks cannot distinguish main agent runs from subagent runs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57636.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57752](https://github.com/openclaw/openclaw/issues/57752) | [Bug]: 新版本使用kimi2.5模型的时候，一直报错，不能使用 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57752.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57792](https://github.com/openclaw/openclaw/issues/57792) | v2026.3.28: AJV schema validator crashes with Maximum call stack size exceeded, agents produce zero output | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57792.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57699](https://github.com/openclaw/openclaw/issues/57699) | Memory leak and excessive memory growth in long-running Gateway process | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57699.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57834](https://github.com/openclaw/openclaw/issues/57834) | [Bug]: Session force-resets immediately after user questions in kimi-claw channel | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57834.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57795](https://github.com/openclaw/openclaw/issues/57795) | WebChat can leave parent agent stuck in typing state after subagent completion | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57795.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57638](https://github.com/openclaw/openclaw/issues/57638) | feat: cron.defaults for model, delivery, and contextTokens | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57638.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57442](https://github.com/openclaw/openclaw/issues/57442) | [Feature Request] Add elapsed/response time back to session_status display | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57442.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57552](https://github.com/openclaw/openclaw/issues/57552) | Proposal: Enhance security audit to include `skill.md` for better risk detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57552.md) | complete | Apr 25, 2026, 16:42 UTC |
| [#57726](https://github.com/openclaw/openclaw/issues/57726) | Add built-in auth health monitoring with proactive expiry/failure notifications | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57726.md) | complete | Apr 25, 2026, 16:42 UTC |

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
