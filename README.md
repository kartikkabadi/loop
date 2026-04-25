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

Last dashboard update: Apr 25, 2026, 17:34 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 17:34 UTC

State: Apply in progress

Starting apply run for up to 500 fresh all closes. Checkpoints commit every 50 fresh closes; close delay is 5000ms.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24936577973](https://github.com/openclaw/clawsweeper/actions/runs/24936577973)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6277 |
| Fresh reviewed issues in the last 7 days | 6258 |
| Proposed issue closes | 739 (11.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4551 |
| Fresh reviewed PRs in the last 7 days | 4479 |
| Proposed PR closes | 147 (3.3% of reviewed PRs) |
| Open items total | 10828 |
| Reviewed files | 10737 |
| Unreviewed open items | 91 |
| Archived closed files | 8483 |
| Fresh verified reviews in the last 7 days | 10737 |
| Proposed closes awaiting apply | 886 (8.3% of fresh reviews) |
| Closed by Codex apply | 6607 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 7594/7958 current (364 due, 95.4%) |
| Daily PR cadence | 4285/4479 current (194 due, 95.7%) |
| Daily new issue cadence (<30d) | 3309/3479 current (170 due, 95.1%) |
| Weekly older issue cadence | 2779/2779 current (0 due, 100%) |
| Due now by cadence | 455 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#58218](https://github.com/openclaw/openclaw/issues/58218) | [Bug]: | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58218.md) | complete | Apr 25, 2026, 16:55 UTC |
| [#58201](https://github.com/openclaw/openclaw/issues/58201) | Feature Request: Agent-level plugin configuration override | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58201.md) | complete | Apr 25, 2026, 16:55 UTC |
| [#58150](https://github.com/openclaw/openclaw/issues/58150) | [Bug]: RISC-V64: OpenClaw fails with LLM request failed: network connection error even though direct HTTP requests work | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58150.md) | complete | Apr 25, 2026, 16:55 UTC |
| [#58064](https://github.com/openclaw/openclaw/issues/58064) | Discord/Telegram channels silently fail to initialize under LaunchAgent after restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58064.md) | complete | Apr 25, 2026, 16:54 UTC |
| [#58298](https://github.com/openclaw/openclaw/issues/58298) | Feature request: message tool support for Feishu interactive cards | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58298.md) | complete | Apr 25, 2026, 16:54 UTC |
| [#58110](https://github.com/openclaw/openclaw/issues/58110) | Feature Request: Multi-Agent Support with Chat-Style UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58110.md) | complete | Apr 25, 2026, 16:54 UTC |
| [#58272](https://github.com/openclaw/openclaw/issues/58272) | [Bug]: macOS Path Resolution: ENOENT on both mixed-character directories AND mixed-character filenames (CJK + ASCII) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58272.md) | complete | Apr 25, 2026, 16:54 UTC |
| [#57992](https://github.com/openclaw/openclaw/issues/57992) | [Bug]: Sandbox container creation silently fails - no error logged, agent zombies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57992.md) | complete | Apr 25, 2026, 16:54 UTC |
| [#58130](https://github.com/openclaw/openclaw/issues/58130) | [Feature]: Copy UI in CoPaw | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58130.md) | complete | Apr 25, 2026, 16:54 UTC |
| [#58139](https://github.com/openclaw/openclaw/issues/58139) | [Bug]: memory-lancedb plugin fails with Windows Docker bind mount | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58139.md) | complete | Apr 25, 2026, 16:54 UTC |
| [#71662](https://github.com/openclaw/openclaw/issues/71662) | claude-cli provider: session abort triggers gateway-wide SIGTERM (v2026.4.23) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71662.md) | complete | Apr 25, 2026, 16:54 UTC |
| [#58078](https://github.com/openclaw/openclaw/issues/58078) | [Feature]: Pre-install iproute2 in official Docker image for macvlan/routing use cases | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58078.md) | complete | Apr 25, 2026, 16:54 UTC |
| [#58287](https://github.com/openclaw/openclaw/issues/58287) | Bug: Heartbeat prompt visible as user message in Control UI chat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58287.md) | complete | Apr 25, 2026, 16:53 UTC |
| [#58189](https://github.com/openclaw/openclaw/issues/58189) | [Bug]: When I use VLLM to deploy QWEN3-32B, I get stuck in a loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58189.md) | complete | Apr 25, 2026, 16:53 UTC |
| [#58254](https://github.com/openclaw/openclaw/issues/58254) | [Bug]: gateway fails to restart after auto-update on macOS (launchd ThrottleInterval race) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58254.md) | complete | Apr 25, 2026, 16:53 UTC |
| [#58289](https://github.com/openclaw/openclaw/issues/58289) | [Bug]: Non-main agent may miss models.json and fail with \"Unknown model\" when provider plan is empty | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58289.md) | complete | Apr 25, 2026, 16:53 UTC |
| [#58147](https://github.com/openclaw/openclaw/issues/58147) | Control UI / WebChat: Respect agents.defaults.timeFormat for session duration display | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58147.md) | complete | Apr 25, 2026, 16:53 UTC |
| [#58284](https://github.com/openclaw/openclaw/issues/58284) | Feature request: turn-based / rolling session pruning (not only cache-ttl) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58284.md) | complete | Apr 25, 2026, 16:53 UTC |
| [#66861](https://github.com/openclaw/openclaw/issues/66861) | [Bug]: OC157 post-compaction resume quality still requires local carry on 2026.4.14 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66861.md) | complete | Apr 25, 2026, 16:52 UTC |
| [#58135](https://github.com/openclaw/openclaw/issues/58135) | [Feature]: expose promptMode parameter in sessions_spawn for deterministic blank sub-agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58135.md) | complete | Apr 25, 2026, 16:52 UTC |

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
