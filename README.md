# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per open item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- duplicate or superseded by a canonical issue/PR
- concrete but not actionable in this source repo
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 25, 2026, 22:30 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 22:30 UTC

State: Review in progress

Planned 250 items across 50 shards. Capacity is 250 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24942165093](https://github.com/openclaw/clawsweeper/actions/runs/24942165093)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5517 |
| Fresh reviewed issues in the last 7 days | 5484 |
| Proposed issue closes | 319 (5.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4275 |
| Fresh reviewed PRs in the last 7 days | 4201 |
| Proposed PR closes | 47 (1.1% of reviewed PRs) |
| Open items total | 9792 |
| Reviewed files | 9685 |
| Unreviewed open items | 107 |
| Archived closed files | 9612 |
| Fresh verified reviews in the last 7 days | 9685 |
| Proposed closes awaiting apply | 366 (3.8% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 6365/6915 current (550 due, 92%) |
| Daily PR cadence | 3946/4201 current (255 due, 93.9%) |
| Daily new issue cadence (<30d) | 2419/2714 current (295 due, 89.1%) |
| Weekly older issue cadence | 2770/2770 current (0 due, 100%) |
| Due now by cadence | 657 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#41372](https://github.com/openclaw/openclaw/issues/41372) | Field Report: 25 findings from 4 weeks of self-hosted production use (config crashes, CLI docs, Discord, cron) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41372.md) | complete | Apr 25, 2026, 22:25 UTC |
| [#41469](https://github.com/openclaw/openclaw/issues/41469) | Signal channel: attachments fail with LocalMediaAccessError for agent workspaces | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41469.md) | complete | Apr 25, 2026, 22:25 UTC |
| [#41272](https://github.com/openclaw/openclaw/issues/41272) | Bug: Cron job UI rejects timeoutSeconds: 0 (no-timeout mode) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41272.md) | complete | Apr 25, 2026, 22:25 UTC |
| [#41394](https://github.com/openclaw/openclaw/issues/41394) | [Feature]: add config validation mode (strict vs tolerant) for different operations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41394.md) | complete | Apr 25, 2026, 22:25 UTC |
| [#41516](https://github.com/openclaw/openclaw/issues/41516) | Make typing indicator TTL (typingTtlMs) configurable | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41516.md) | complete | Apr 25, 2026, 22:25 UTC |
| [#41226](https://github.com/openclaw/openclaw/issues/41226) | [Bug]: Behavior bug (incorrect output/state without crash) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41226.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41346](https://github.com/openclaw/openclaw/issues/41346) | Externally-registered cron jobs auto-enable without user confirmation, inherit expensive default model, no usage circuit breaker | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41346.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41270](https://github.com/openclaw/openclaw/issues/41270) | Config mutation commands have inconsistent restart semantics (config.set vs config.patch) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41270.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41344](https://github.com/openclaw/openclaw/issues/41344) | [Bug]: Control UI Agent form shows wrong Primary model and Save fails with GatewayRequestError: invalid config | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41344.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41579](https://github.com/openclaw/openclaw/issues/41579) | [Feature]: Add File Gallery button in Mission Control left nav | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41579.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41484](https://github.com/openclaw/openclaw/issues/41484) | feat: per-job elevated exec scoping for cron and heartbeat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41484.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41312](https://github.com/openclaw/openclaw/issues/41312) | [Feature]: Add cacheRead guardrails for large retained tool results in long sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41312.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41483](https://github.com/openclaw/openclaw/issues/41483) | [Bug]: --to flag ignored when using --agent with custom channel, all sessions map to main | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41483.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41285](https://github.com/openclaw/openclaw/issues/41285) | [Bug]: error 4008 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41285.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41329](https://github.com/openclaw/openclaw/issues/41329) | Bug: Heartbeat tool_use blocks leak into parent session transcript, corrupting Anthropic sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41329.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#39686](https://github.com/openclaw/openclaw/issues/39686) | WebUI: duplicate messages after WebSocket reconnect (v2026.3.7) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39686.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41294](https://github.com/openclaw/openclaw/issues/41294) | [Feature]: Interactive fallback confirmation mod | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41294.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41168](https://github.com/openclaw/openclaw/issues/41168) | [Bug]: TUI always connects to heartbeat session instead of latest active session, and each session loads full skill context causing storage bloat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41168.md) | complete | Apr 25, 2026, 22:24 UTC |
| [#41082](https://github.com/openclaw/openclaw/issues/41082) | 上下文切换延迟：回答新问题时还在回答旧问题（压缩机制导致） | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41082.md) | complete | Apr 25, 2026, 22:23 UTC |
| [#41283](https://github.com/openclaw/openclaw/issues/41283) | [Bug]: tools.catalog 0ms errorCode=INVALID_REQUEST errorMessage=unknown agent id | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41283.md) | complete | Apr 25, 2026, 22:23 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes during review. `apply_existing=true` is the only workflow mode that comments or closes items.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Pre-hydrates compact related issue/PR context referenced from the item body, comments, timeline, or PR review comments, plus a small best-effort local title search over existing reports for likely duplicates/superseded work.
5. Runs Codex with `gpt-5.5`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
6. Writes `items/<number>.md` with the decision, proposed close comment, review runtime (`review_model`, `review_reasoning_effort`, sandbox, service tier), and a GitHub snapshot hash.
7. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, runs Codex without the nested Linux sandbox that blocks shell inspection on GitHub runners, checks the checkout again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. A review policy change, including model, reasoning effort, sandbox, service tier, prompt, or schema changes, also makes old reports due again. When more items are due than fit in a run, the planner prioritizes active items first, then policy-stale reports, then PRs, then new issues, then older weekly reviews. The dashboard reports local cadence coverage for daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Transient GitHub API/network failures use shorter retries so long scans can survive connection resets or gateway errors. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

`npm run audit` compares live open GitHub items with the generated `items/` and `closed/` records without moving files. It reports missing open records, open records still archived under `closed/`, stale `items/` records that no longer appear open, duplicate markdown records, protected-label proposed closes, and stale review-status records. Use `--output audit-report.json` for the full report, `--sample-limit N` to control console samples, and `--strict` to exit non-zero when state drift is present.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 50 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run audit -- --max-pages 250 --sample-limit 25
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later.

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

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI, Codex, or GitHub token environment variables. Parent ClawSweeper code uses `OPENCLAW_GH_TOKEN` to gather target and related GitHub context before invoking Codex. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. It uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
