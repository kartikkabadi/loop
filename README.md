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

Last dashboard update: Apr 25, 2026, 16:11 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 16:11 UTC

State: Apply in progress

Checkpoint 2 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 100/500. Result records in checkpoint: 50.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24934812741](https://github.com/openclaw/clawsweeper/actions/runs/24934812741)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6609 |
| Fresh reviewed issues in the last 7 days | 6593 |
| Proposed issue closes | 1024 (15.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4614 |
| Fresh reviewed PRs in the last 7 days | 4538 |
| Proposed PR closes | 201 (4.4% of reviewed PRs) |
| Open items total | 11223 |
| Reviewed files | 11139 |
| Unreviewed open items | 84 |
| Archived closed files | 8062 |
| Fresh verified reviews in the last 7 days | 11131 |
| Proposed closes awaiting apply | 1225 (11% of fresh reviews) |
| Closed by Codex apply | 6207 |
| Failed or stale reviews | 8 |
| Daily cadence coverage | 8039/8356 current (317 due, 96.2%) |
| Daily PR cadence | 4431/4542 current (111 due, 97.6%) |
| Daily new issue cadence (<30d) | 3608/3814 current (206 due, 94.6%) |
| Weekly older issue cadence | 2783/2783 current (0 due, 100%) |
| Due now by cadence | 401 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#56106](https://github.com/openclaw/openclaw/issues/56106) | Transcript JSONL encoding corrupted on Windows (GBK/UTF-8 mix) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56106.md) | complete | Apr 25, 2026, 16:00 UTC |
| [#56045](https://github.com/openclaw/openclaw/issues/56045) | Cron job output continues to be delivered after jobs are deleted; persists with zero active jobs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56045.md) | complete | Apr 25, 2026, 15:59 UTC |
| [#56131](https://github.com/openclaw/openclaw/issues/56131) | Bug: session reset archives are not discoverable via sessions_history, breaking context recovery after reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56131.md) | complete | Apr 25, 2026, 15:59 UTC |
| [#56118](https://github.com/openclaw/openclaw/issues/56118) | Node browser proxy: Chrome MCP existing-session (user profile) fails with Connection closed — consent dialog never appears | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56118.md) | complete | Apr 25, 2026, 15:59 UTC |
| [#56078](https://github.com/openclaw/openclaw/issues/56078) | [Bug]: Cron Job Output Not Saved in OpenClaw 2026.3.24 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56078.md) | complete | Apr 25, 2026, 15:59 UTC |
| [#56034](https://github.com/openclaw/openclaw/issues/56034) | Session maintenance prunes active/running sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56034.md) | complete | Apr 25, 2026, 15:59 UTC |
| [#56096](https://github.com/openclaw/openclaw/issues/56096) | Bug: Telegram sendChatAction infinite retry loop with no backoff | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56096.md) | complete | Apr 25, 2026, 15:59 UTC |
| [#56102](https://github.com/openclaw/openclaw/issues/56102) | [Bug]: ACP server rejects MCP protocolVersion: 2025-11-25 from VS Code 1.113 / Cursor | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56102.md) | complete | Apr 25, 2026, 15:59 UTC |
| [#55880](https://github.com/openclaw/openclaw/issues/55880) | Scheduled auto-upgrade cron can fail without visible notification, and gateway recovery does not restore macOS LaunchAgent gateway | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55880.md) | complete | Apr 25, 2026, 15:58 UTC |
| [#56126](https://github.com/openclaw/openclaw/issues/56126) | Feature: Batch API support for non-urgent cron jobs (50% cost reduction) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56126.md) | complete | Apr 25, 2026, 15:58 UTC |
| [#56044](https://github.com/openclaw/openclaw/issues/56044) | Recent update broke /stop and interrupt behavior — collect mode swallows user messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56044.md) | complete | Apr 25, 2026, 15:58 UTC |
| [#56197](https://github.com/openclaw/openclaw/issues/56197) | [Bug]: Feishu embedded agent returns HTTP 401 \"Invalid token\" to user instead of retrying with refreshed token | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56197.md) | complete | Apr 25, 2026, 15:58 UTC |
| [#56110](https://github.com/openclaw/openclaw/issues/56110) | Feature Request: Add STATE.md to auto-loaded workspace bootstrap files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56110.md) | complete | Apr 25, 2026, 15:58 UTC |
| [#55878](https://github.com/openclaw/openclaw/issues/55878) | [Bug]: macOS app crashes in WebSocketTaskBox.sendPing() and no stable menu bar icon appears | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55878.md) | complete | Apr 25, 2026, 15:58 UTC |
| [#55734](https://github.com/openclaw/openclaw/issues/55734) | [Bug]: OpenClaw navigates URLs into Chrome internal UI components (chrome://omnibox-popup.top-chrome/, chrome://tab-search.top-chrome/) instead of actual web tabs when using CDP mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55734.md) | complete | Apr 25, 2026, 15:58 UTC |
| [#55686](https://github.com/openclaw/openclaw/issues/55686) | [Feature Request] Make command options clickable buttons in Feishu (e.g., /reasoning) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55686.md) | complete | Apr 25, 2026, 15:57 UTC |
| [#55917](https://github.com/openclaw/openclaw/issues/55917) | [Bug]: Telegram documents sometimes arrive only as <media:document> instead of a real attachment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55917.md) | complete | Apr 25, 2026, 15:57 UTC |
| [#55836](https://github.com/openclaw/openclaw/issues/55836) | [Feature]: TUI: vi/vim keybinding mode for input editor | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55836.md) | complete | Apr 25, 2026, 15:57 UTC |
| [#56193](https://github.com/openclaw/openclaw/issues/56193) | [Bug]: sessions_spawn(runtime=\"subagent\") can receive ACP-only streamTo from the current tool-call bridge | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56193.md) | complete | Apr 25, 2026, 15:57 UTC |
| [#56161](https://github.com/openclaw/openclaw/issues/56161) | [Bug]: openclaw skills install` always installs to default agent workspace, ignoring current agent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56161.md) | complete | Apr 25, 2026, 15:57 UTC |

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
