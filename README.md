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

Last dashboard update: Apr 25, 2026, 14:20 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 14:20 UTC

State: Apply in progress

Checkpoint 9 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 450/500. Result records in checkpoint: 50.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24931927101](https://github.com/openclaw/clawsweeper/actions/runs/24931927101)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 7124 |
| Fresh reviewed issues in the last 7 days | 7102 |
| Proposed issue closes | 1512 (21.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4733 |
| Fresh reviewed PRs in the last 7 days | 4668 |
| Proposed PR closes | 303 (6.5% of reviewed PRs) |
| Open items total | 11857 |
| Reviewed files | 11776 |
| Unreviewed open items | 81 |
| Archived closed files | 7398 |
| Fresh verified reviews in the last 7 days | 11770 |
| Proposed closes awaiting apply | 1815 (15.4% of fresh reviews) |
| Closed by Codex apply | 5557 |
| Failed or stale reviews | 6 |
| Daily cadence coverage | 8880/9004 current (124 due, 98.6%) |
| Daily PR cadence | 4549/4669 current (120 due, 97.4%) |
| Daily new issue cadence (<30d) | 4331/4335 current (4 due, 99.9%) |
| Weekly older issue cadence | 2771/2772 current (1 due, 100%) |
| Due now by cadence | 206 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#67625](https://github.com/openclaw/openclaw/issues/67625) | [Bug]: Billing error message fires after billing issue is resolved — deduplication missing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67625.md) | complete | Apr 25, 2026, 14:08 UTC |
| [#71605](https://github.com/openclaw/openclaw/issues/71605) | Gateway WS `agent` dispatch times out 60s + embedded mode contends with running daemon for session file locks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71605.md) | complete | Apr 25, 2026, 14:08 UTC |
| [#71588](https://github.com/openclaw/openclaw/issues/71588) | Feishu group can double reply when tool-use turns emit visible assistant text | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71588.md) | complete | Apr 25, 2026, 14:08 UTC |
| [#54414](https://github.com/openclaw/openclaw/pull/54414) | feat(slack): add configurable thread implicit mentions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54414.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#71609](https://github.com/openclaw/openclaw/issues/71609) | Control UI device token mismatch loop after scope upgrade causes rate-limit lockout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71609.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#64704](https://github.com/openclaw/openclaw/issues/64704) | [Bug]: active-memory plugin package not found on npm or ClawHub (2026.4.10) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64704.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#71599](https://github.com/openclaw/openclaw/issues/71599) | [Bug]: Bundled runtime deps still restage on first user turn in 2026.4.24-beta.2 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71599.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#71610](https://github.com/openclaw/openclaw/issues/71610) | MCP Server Memory Leak - zombie processes accumulate | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71610.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#70717](https://github.com/openclaw/openclaw/issues/70717) | Gateway RSS regression on 2026.4.15 — fresh cold-start baseline 700MB+ on macOS ARM64, steady climb regardless of workload | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70717.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#54436](https://github.com/openclaw/openclaw/pull/54436) | media: fix resource leaks and temp file cleanup in downloadToFile | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54436.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#71587](https://github.com/openclaw/openclaw/issues/71587) | [Bug]: Add missing OpenCode Go models (Kimi K2.6, GLM-5.1, MiMo-V2, Qwen, DeepSeek) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71587.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#71597](https://github.com/openclaw/openclaw/issues/71597) | [Bug]: The OpenCLAW version 2026.4.23 cannot use local models. | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71597.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#54343](https://github.com/openclaw/openclaw/pull/54343) | fix(auto-reply): require operator.admin for /stop command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54343.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#54406](https://github.com/openclaw/openclaw/pull/54406) | fix(agents): add compaction event observability | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54406.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#54326](https://github.com/openclaw/openclaw/pull/54326) | fix(agents): allowlist streaming usage for proven endpoints | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54326.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#66130](https://github.com/openclaw/openclaw/issues/66130) | [Bug]: Gateway drain blocks ALL channels for 5+ minutes when config change requires restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66130.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#70127](https://github.com/openclaw/openclaw/issues/70127) | [Bug]: msteams search action fails — $search not supported on /chats/messages with Application permissions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70127.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#68660](https://github.com/openclaw/openclaw/issues/68660) | Gateway spawns duplicate MCP instances on a recurring cadence; old instances never terminated (task leak → EAGAIN) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68660.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#71606](https://github.com/openclaw/openclaw/issues/71606) | [Feature]: keep each cron run in its own Telegram forum topic | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71606.md) | complete | Apr 25, 2026, 14:07 UTC |
| [#54392](https://github.com/openclaw/openclaw/pull/54392) | fix: clamp compaction max_tokens to model output limit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54392.md) | complete | Apr 25, 2026, 14:06 UTC |

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
