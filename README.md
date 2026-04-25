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

Last dashboard update: Apr 25, 2026, 16:00 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 16:00 UTC

State: Apply in progress

Starting apply run for up to 500 fresh all closes. Checkpoints commit every 50 fresh closes; close delay is 5000ms.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24934812741](https://github.com/openclaw/clawsweeper/actions/runs/24934812741)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6691 |
| Fresh reviewed issues in the last 7 days | 6674 |
| Proposed issue closes | 1077 (16.1% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4629 |
| Fresh reviewed PRs in the last 7 days | 4550 |
| Proposed PR closes | 214 (4.7% of reviewed PRs) |
| Open items total | 11320 |
| Reviewed files | 11239 |
| Unreviewed open items | 81 |
| Archived closed files | 7958 |
| Fresh verified reviews in the last 7 days | 11224 |
| Proposed closes awaiting apply | 1291 (11.5% of fresh reviews) |
| Closed by Codex apply | 6107 |
| Failed or stale reviews | 15 |
| Daily cadence coverage | 8038/8456 current (418 due, 95.1%) |
| Daily PR cadence | 4426/4558 current (132 due, 97.1%) |
| Daily new issue cadence (<30d) | 3612/3898 current (286 due, 92.7%) |
| Weekly older issue cadence | 2783/2783 current (0 due, 100%) |
| Due now by cadence | 499 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#64855](https://github.com/openclaw/openclaw/issues/64855) | [Feature Request] Context Router: Selective Context Injection Based on Conversation Type | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64855.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#71629](https://github.com/openclaw/openclaw/issues/71629) | [Bug]: active-memory timeoutMs does not behave as a hard deadline for embedded run | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71629.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#66497](https://github.com/openclaw/openclaw/issues/66497) | WebSocket delta corruption with inline directive tags | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66497.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#55269](https://github.com/openclaw/openclaw/issues/55269) | [Feature]: allow command exec to specify shell profile | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55269.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#71628](https://github.com/openclaw/openclaw/issues/71628) | Bug: DeepSeek V4 reasoning_content not replayed when proxied through Venice — 400 error on multi-turn with tool calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71628.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#67974](https://github.com/openclaw/openclaw/issues/67974) | [Bug] Config hot-reload loses Feishu account credentials | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67974.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#71624](https://github.com/openclaw/openclaw/issues/71624) | [Feature]: Plugin idea: openclaw-cost-tracker (per-session token + cost reporting) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71624.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#56504](https://github.com/openclaw/openclaw/pull/56504) | fix: normalize tool IDs in repairToolUseResultPairing for cross-model sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56504.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#56495](https://github.com/openclaw/openclaw/pull/56495) | fix(whatsapp): prevent unsolicited pairing codes during reconnect cycles | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56495.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#56532](https://github.com/openclaw/openclaw/pull/56532) | memory-lancedb: add configurable timeout/retry for embedding calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56532.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#71632](https://github.com/openclaw/openclaw/issues/71632) | Session-id poisoning: scalar cliSessionIds reused via claude --resume bypasses cliSessionBindings hash validation (2026.4.22) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71632.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#56442](https://github.com/openclaw/openclaw/pull/56442) | feat: Add opt-in ACP parent completion notify for sessions_spawn | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56442.md) | complete | Apr 25, 2026, 15:43 UTC |
| [#55378](https://github.com/openclaw/openclaw/issues/55378) | [Bug]: Telegram forum topics show Claude Opus 4.6 pre-tool narration / work-note text as visible replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55378.md) | complete | Apr 25, 2026, 15:42 UTC |
| [#56509](https://github.com/openclaw/openclaw/pull/56509) | fix(cron): prevent one-shot at jobs from re-triggering after completion | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56509.md) | complete | Apr 25, 2026, 15:42 UTC |
| [#68985](https://github.com/openclaw/openclaw/issues/68985) | openclaw update restarts gateway but does not refresh installed systemd unit metadata | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68985.md) | complete | Apr 25, 2026, 15:42 UTC |
| [#71631](https://github.com/openclaw/openclaw/issues/71631) | [Feature]: Improve gateway configuration and Web UI chat responsiveness | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71631.md) | complete | Apr 25, 2026, 15:42 UTC |
| [#56497](https://github.com/openclaw/openclaw/pull/56497) | feat(extension): support session cache for volcengine | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56497.md) | complete | Apr 25, 2026, 15:42 UTC |
| [#56283](https://github.com/openclaw/openclaw/pull/56283) | feat(outbound): strip markdown for plain-text channels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56283.md) | complete | Apr 25, 2026, 15:42 UTC |
| [#56538](https://github.com/openclaw/openclaw/pull/56538) | fix: use TextDecoder for proper GBK encoding support on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56538.md) | complete | Apr 25, 2026, 15:42 UTC |
| [#55253](https://github.com/openclaw/openclaw/issues/55253) | Plugin crash loop causes session zombie state — need circuit breaker + auto-recovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55253.md) | complete | Apr 25, 2026, 15:42 UTC |

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
