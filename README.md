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

Last dashboard update: Apr 25, 2026, 08:31 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 08:31 UTC

State: Apply in progress

Checkpoint 4 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 200/500. Result records in checkpoint: 52.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24926354430](https://github.com/openclaw/clawsweeper/actions/runs/24926354430)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8814 |
| Fresh reviewed issues in the last 7 days | 9013 |
| Proposed issue closes | 3361 (37.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5451 |
| Fresh reviewed PRs in the last 7 days | 5668 |
| Proposed PR closes | 913 (16.1% of reviewed PRs) |
| Open items total | 14265 |
| Reviewed files | 14681 |
| Unreviewed open items | 0 |
| Archived closed files | 4219 |
| Fresh verified reviews in the last 7 days | 14681 |
| Proposed closes awaiting apply | 4274 (29.1% of fresh reviews) |
| Closed by Codex apply | 3307 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 11254/11254 current (0 due, 100%) |
| Daily PR cadence | 5451/5451 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 5803/5803 current (0 due, 100%) |
| Weekly older issue cadence | 3210/3210 current (0 due, 100%) |
| Due now by cadence | 0 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#70700](https://github.com/openclaw/openclaw/issues/70700) | [Bug]: Control UI inconsistently handles workspace-relative agent avatars even when /avatar/{agentId} resolves correctly | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70700.md) | complete | Apr 25, 2026, 08:27 UTC |
| [#70725](https://github.com/openclaw/openclaw/issues/70725) | [UI] 启动时 skills 过度加载导致对话上下文被压缩，聊天失去记忆 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70725.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70728](https://github.com/openclaw/openclaw/issues/70728) | Windows startup feels slow because Telegram recovery is consistently slow and Feishu sometimes times out during startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70728.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70744](https://github.com/openclaw/openclaw/issues/70744) | Telegram direct session can become unrecoverable after context overflow and auto-compaction hangs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70744.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70758](https://github.com/openclaw/openclaw/issues/70758) | [Bug]: Cron --announce fails with numeric Telegram chatId: Unsupported channel | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70758.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70694](https://github.com/openclaw/openclaw/issues/70694) | sessions_spawn: task prompt appears truncated/lost for some subagent runs (8 input tokens for 2k-char task) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70694.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70678](https://github.com/openclaw/openclaw/issues/70678) | [Bug]: WhatsApp channel force-reconnects every 30 minutes on quiet-device sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70678.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70631](https://github.com/openclaw/openclaw/issues/70631) | [Feature]: Add configurable Gateway CLI timeout and session isolation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70631.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70753](https://github.com/openclaw/openclaw/issues/70753) | Bundled HTTP MCP client times out against hosted SSE server even when endpoint responds in <1s | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70753.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70670](https://github.com/openclaw/openclaw/issues/70670) | Bug: Infinite edit loop when editing context-loaded files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70670.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70645](https://github.com/openclaw/openclaw/issues/70645) | [SECURITY] Reasoning leak in WebSocket outbound stream when approval-pending triggers on channel plugin | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70645.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70679](https://github.com/openclaw/openclaw/issues/70679) | Bug: claude-cli usage accumulator double-counts cache_read_input_tokens across tool-loop iterations | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70679.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70738](https://github.com/openclaw/openclaw/issues/70738) | [Bug]: | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70738.md) | complete | Apr 25, 2026, 08:26 UTC |
| [#70699](https://github.com/openclaw/openclaw/issues/70699) | openclaw acp accepts input but never returns output; ACP one-shot runs time out with no first event | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70699.md) | complete | Apr 25, 2026, 08:25 UTC |
| [#70702](https://github.com/openclaw/openclaw/issues/70702) | Control UI: assistant messages don't render until page reload | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70702.md) | complete | Apr 25, 2026, 08:25 UTC |
| [#70717](https://github.com/openclaw/openclaw/issues/70717) | Gateway RSS regression on 2026.4.15 — fresh cold-start baseline 700MB+ on macOS ARM64, steady climb regardless of workload | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70717.md) | complete | Apr 25, 2026, 08:25 UTC |
| [#70582](https://github.com/openclaw/openclaw/issues/70582) | LCM compaction sends deprecated  parameter to claude-opus-4-7, causing repeated API errors and retry loops | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70582.md) | complete | Apr 25, 2026, 08:25 UTC |
| [#70654](https://github.com/openclaw/openclaw/issues/70654) | GPT-5.4 Responses API: encrypted_content item_id mismatch after model switch or compaction | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70654.md) | complete | Apr 25, 2026, 08:25 UTC |
| [#70634](https://github.com/openclaw/openclaw/issues/70634) | [Bug]: Human messages get starved in agent lane queues when agents communicate in loops | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70634.md) | complete | Apr 25, 2026, 08:25 UTC |
| [#70733](https://github.com/openclaw/openclaw/issues/70733) | [Bug]: Critical Bug: Spontaneous insertion of \"//\" in identifiers during 'edit' and 'write' operations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70733.md) | complete | Apr 25, 2026, 08:25 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

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
