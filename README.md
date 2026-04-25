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

Last dashboard update: Apr 25, 2026, 17:42 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 17:42 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24936769311](https://github.com/openclaw/clawsweeper/actions/runs/24936769311)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6222 |
| Fresh reviewed issues in the last 7 days | 6213 |
| Proposed issue closes | 695 (11.2% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4534 |
| Fresh reviewed PRs in the last 7 days | 4470 |
| Proposed PR closes | 135 (3% of reviewed PRs) |
| Open items total | 10756 |
| Reviewed files | 10683 |
| Unreviewed open items | 73 |
| Archived closed files | 8557 |
| Fresh verified reviews in the last 7 days | 10683 |
| Proposed closes awaiting apply | 830 (7.8% of fresh reviews) |
| Closed by Codex apply | 6657 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 7622/7904 current (282 due, 96.4%) |
| Daily PR cadence | 4365/4470 current (105 due, 97.7%) |
| Daily new issue cadence (<30d) | 3257/3434 current (177 due, 94.8%) |
| Weekly older issue cadence | 2779/2779 current (0 due, 100%) |
| Due now by cadence | 355 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#58505](https://github.com/openclaw/openclaw/issues/58505) | [Feature]: Allow `before_prompt_build` hook to abort LLM call and return a custom response | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58505.md) | complete | Apr 25, 2026, 17:40 UTC |
| [#58433](https://github.com/openclaw/openclaw/issues/58433) | [Bug]: [Windows] Path character loss bug - \"system\" becomes \"ystem\" in file paths | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58433.md) | complete | Apr 25, 2026, 17:40 UTC |
| [#58704](https://github.com/openclaw/openclaw/issues/58704) | WhatsApp bridge: assistant output can leak into user messages during /new or /reset session transition | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58704.md) | complete | Apr 25, 2026, 17:40 UTC |
| [#58680](https://github.com/openclaw/openclaw/issues/58680) | Feature: Add clearThinking compat option for Z.AI Preserved Thinking | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58680.md) | complete | Apr 25, 2026, 17:40 UTC |
| [#58355](https://github.com/openclaw/openclaw/issues/58355) | [Bug]: Failed to set model: GatewayRequestError: model not allowed: ollama/qwen3.5:35b-a3b-coding-nvfp4 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58355.md) | complete | Apr 25, 2026, 17:40 UTC |
| [#58402](https://github.com/openclaw/openclaw/issues/58402) | [Bug]: message tool \"Operation aborted\" false negative + WhatsApp reconnect storm + xai-auth log spam | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58402.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58574](https://github.com/openclaw/openclaw/issues/58574) | [Feature]: readable `nextAt` value for cron job | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58574.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58626](https://github.com/openclaw/openclaw/issues/58626) | 升级版本后配置文件中的插件路径未更新，导致 gateway 启动失败 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58626.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58470](https://github.com/openclaw/openclaw/issues/58470) | Gateway startup doesn't clear stale 'running' status in sessions.json | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58470.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58398](https://github.com/openclaw/openclaw/issues/58398) | Adopt Claude Code's multi-layer compaction architecture | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58398.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58358](https://github.com/openclaw/openclaw/issues/58358) | [Bug]: OpenClaw mishandles message_stop for KimiCodingPlan Anthropic format (not present in v2026.3.1) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58358.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58488](https://github.com/openclaw/openclaw/issues/58488) | acpx: model forwarding to ACP agents uses Claude-specific _meta convention; breaks non-Claude harnesses (e.g. kilocode) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58488.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58377](https://github.com/openclaw/openclaw/issues/58377) | cron: LiveSessionModelSwitchError treated as transient failure — triggers retry loop and Sonnet budget leak | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58377.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58443](https://github.com/openclaw/openclaw/issues/58443) | [Bug] Gateway duplicates inbound messages — same message injected multiple times into session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58443.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58452](https://github.com/openclaw/openclaw/issues/58452) | [Feature]: UI Improvement | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58452.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58407](https://github.com/openclaw/openclaw/issues/58407) | [Feature]: Inject parent channel pinned messages into Discord thread session context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58407.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58534](https://github.com/openclaw/openclaw/issues/58534) | Session management performance degrades severely with subagent usage (100%+ CPU at ~400 sessions) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58534.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58570](https://github.com/openclaw/openclaw/issues/58570) | Gateway should log warning when message is dropped due to allow: false | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58570.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58519](https://github.com/openclaw/openclaw/issues/58519) | Slack Socket Mode: event loop starvation causes pong timeouts and silent message loss | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58519.md) | complete | Apr 25, 2026, 17:39 UTC |
| [#58411](https://github.com/openclaw/openclaw/issues/58411) | sessions_spawn lacks --bind here equivalent — agent cannot bind ACP session to existing Discord thread | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58411.md) | complete | Apr 25, 2026, 17:39 UTC |

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
