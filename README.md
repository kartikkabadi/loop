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

Last dashboard update: Apr 25, 2026, 22:43 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 22:43 UTC

State: Review publish complete

Merged review artifacts for run 24942165093. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24942165093](https://github.com/openclaw/clawsweeper/actions/runs/24942165093)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5514 |
| Fresh reviewed issues in the last 7 days | 5481 |
| Proposed issue closes | 386 (7% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4276 |
| Fresh reviewed PRs in the last 7 days | 4200 |
| Proposed PR closes | 47 (1.1% of reviewed PRs) |
| Open items total | 9790 |
| Reviewed files | 9681 |
| Unreviewed open items | 109 |
| Archived closed files | 9616 |
| Fresh verified reviews in the last 7 days | 9681 |
| Proposed closes awaiting apply | 433 (4.5% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 6360/6910 current (550 due, 92%) |
| Daily PR cadence | 3945/4200 current (255 due, 93.9%) |
| Daily new issue cadence (<30d) | 2415/2710 current (295 due, 89.1%) |
| Weekly older issue cadence | 2771/2771 current (0 due, 100%) |
| Due now by cadence | 659 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#43374](https://github.com/openclaw/openclaw/issues/43374) | All LLM API calls time out simultaneously despite APIs being reachable (multi-agent concurrency issue) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43374.md) | complete | Apr 25, 2026, 22:41 UTC |
| [#43168](https://github.com/openclaw/openclaw/issues/43168) | [Bug]: Heartbeat wakeups are persisted into main dashboard session as synthetic user messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43168.md) | complete | Apr 25, 2026, 22:40 UTC |
| [#43220](https://github.com/openclaw/openclaw/issues/43220) | [Feature]: Safer and More Reproducible Way to Share or Migrate OpenClaw Instances | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43220.md) | complete | Apr 25, 2026, 22:40 UTC |
| [#43286](https://github.com/openclaw/openclaw/issues/43286) | Add session.threadIsolation: false to allow shared session across Slack threads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43286.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43141](https://github.com/openclaw/openclaw/issues/43141) | Queued cron-lane runs are not abort-aware and can time out before model invocation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43141.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43313](https://github.com/openclaw/openclaw/issues/43313) | fix(media): classify audio-only MP4/M4A containers as audio, not video | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43313.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43150](https://github.com/openclaw/openclaw/issues/43150) | Config Write Race Condition Causes Lost Updates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43150.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43455](https://github.com/openclaw/openclaw/issues/43455) | Browserbase integration broken: static cdpUrl returns 404, needs session API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43455.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | Multi-agent orchestration is unstable: concurrent agents add/config overwrites, session-lock failures, and detached child work | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43367.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43143](https://github.com/openclaw/openclaw/issues/43143) | Discussion: 10 active PR limit may throttle batch contributors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43143.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43009](https://github.com/openclaw/openclaw/issues/43009) | TUI displays Context Tokens as ?/200k instead of actual value | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43009.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43341](https://github.com/openclaw/openclaw/issues/43341) | Bug: TUI not receiving real-time message updates from main session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43341.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43262](https://github.com/openclaw/openclaw/issues/43262) | [Bug] Memory Search - Inconsistent Search Results | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43262.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43410](https://github.com/openclaw/openclaw/issues/43410) | 34 built-in skills missing trigger phrases in description field | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43410.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43524](https://github.com/openclaw/openclaw/issues/43524) | Daily reset doesn't trigger session-memory hook flush | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43524.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#43146](https://github.com/openclaw/openclaw/issues/43146) | [Bug]: Telegram group/topic sessions forbid same-chat message tool sends, blocking attachments/media despite same-chat thread routing support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43146.md) | complete | Apr 25, 2026, 22:39 UTC |
| [#42862](https://github.com/openclaw/openclaw/issues/42862) | [Feature Request] 自动在聊天窗口中渲染图片URL | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42862.md) | complete | Apr 25, 2026, 22:38 UTC |
| [#43308](https://github.com/openclaw/openclaw/issues/43308) | [Feature]: Add observability and tracing integration hooks (Langfuse or similar) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43308.md) | complete | Apr 25, 2026, 22:38 UTC |
| [#42715](https://github.com/openclaw/openclaw/issues/42715) | Multi-provider AI Gateway: missing apiKey causes silent model fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42715.md) | complete | Apr 25, 2026, 22:38 UTC |
| [#43235](https://github.com/openclaw/openclaw/issues/43235) | [Feature]:Support per-agent command lanes for multi-agent deployments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43235.md) | complete | Apr 25, 2026, 22:38 UTC |

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
