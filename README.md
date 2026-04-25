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

Last dashboard update: Apr 25, 2026, 23:13 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 23:13 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24942940415](https://github.com/openclaw/clawsweeper/actions/runs/24942940415)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5517 |
| Fresh reviewed issues in the last 7 days | 5479 |
| Proposed issue closes | 465 (8.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4273 |
| Fresh reviewed PRs in the last 7 days | 4195 |
| Proposed PR closes | 47 (1.1% of reviewed PRs) |
| Open items total | 9790 |
| Reviewed files | 9674 |
| Unreviewed open items | 116 |
| Archived closed files | 9623 |
| Fresh verified reviews in the last 7 days | 9674 |
| Proposed closes awaiting apply | 512 (5.3% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 6352/6902 current (550 due, 92%) |
| Daily PR cadence | 3940/4195 current (255 due, 93.9%) |
| Daily new issue cadence (<30d) | 2412/2707 current (295 due, 89.1%) |
| Weekly older issue cadence | 2772/2772 current (0 due, 100%) |
| Due now by cadence | 666 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#45049](https://github.com/openclaw/openclaw/issues/45049) | Agent loop allows simulated tool calls instead of enforcing real tool invocation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45049.md) | complete | Apr 25, 2026, 23:11 UTC |
| [#45108](https://github.com/openclaw/openclaw/issues/45108) | [Bug]: Sandbox write/edit fails on openclaw-sandbox:bookworm-slim with \"moltbot-sandbox-fs: 2: python3: not found\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45108.md) | complete | Apr 25, 2026, 23:11 UTC |
| [#45102](https://github.com/openclaw/openclaw/issues/45102) | [Bug] Gateway requires frequent restart when processing long tasks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45102.md) | complete | Apr 25, 2026, 23:11 UTC |
| [#45050](https://github.com/openclaw/openclaw/issues/45050) | Feishu leaks raw provider `server_error` payload to users instead of generic fallback, with no safe pre-output retry | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45050.md) | complete | Apr 25, 2026, 23:11 UTC |
| [#44931](https://github.com/openclaw/openclaw/issues/44931) | [Bug]: Gateway silently dead for hours when OAuth expires — no user notification, no auto-recovery | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44931.md) | complete | Apr 25, 2026, 23:11 UTC |
| [#45224](https://github.com/openclaw/openclaw/issues/45224) | Unhandled Playwright assertion error in CRSession._onMessage crashes Gateway | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45224.md) | complete | Apr 25, 2026, 23:10 UTC |
| [#44930](https://github.com/openclaw/openclaw/issues/44930) | [BUG] Telegram messages silently dropped due to update offset race condition | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44930.md) | complete | Apr 25, 2026, 23:10 UTC |
| [#45137](https://github.com/openclaw/openclaw/issues/45137) | feat(slack): Support multi-gateway deployments via mux receiver | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45137.md) | complete | Apr 25, 2026, 23:10 UTC |
| [#45268](https://github.com/openclaw/openclaw/issues/45268) | status: context usage is misleading when totalTokensFresh=false | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45268.md) | complete | Apr 25, 2026, 23:10 UTC |
| [#45275](https://github.com/openclaw/openclaw/issues/45275) | [Bug]: Run \"pnpm ui:build\" noticed Couldn't find 'C:\\Program' at windows. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45275.md) | complete | Apr 25, 2026, 23:10 UTC |
| [#44679](https://github.com/openclaw/openclaw/issues/44679) | Thinking block auto-recovery PR #22270 was never merged (circular closure) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44679.md) | complete | Apr 25, 2026, 23:10 UTC |
| [#44672](https://github.com/openclaw/openclaw/issues/44672) | [Bug]: macOS app can stay stuck on generic 'pairing required' after node->operator upgrade approval | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44672.md) | complete | Apr 25, 2026, 23:10 UTC |
| [#44919](https://github.com/openclaw/openclaw/issues/44919) | [Bug]: Anthropic OAuth credentials desync between ~/.claude/.credentials.json and auth-profiles.json — silent subagent failures | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44919.md) | complete | Apr 25, 2026, 23:10 UTC |
| [#44774](https://github.com/openclaw/openclaw/issues/44774) | [Feature Request] Agent selector in top-right corner instead of client label | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44774.md) | complete | Apr 25, 2026, 23:09 UTC |
| [#44734](https://github.com/openclaw/openclaw/issues/44734) | [Bug]: Memory Multimodal Indexing - Gemini API rejects OGG/Opus audio files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44734.md) | complete | Apr 25, 2026, 23:09 UTC |
| [#44980](https://github.com/openclaw/openclaw/issues/44980) | Telegram media download fails when proxy is required - fetchRemoteMedia bypasses configured proxy | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44980.md) | complete | Apr 25, 2026, 23:09 UTC |
| [#45160](https://github.com/openclaw/openclaw/issues/45160) | OOM crash on start without NODE_OPTIONS=--max-old-space-size=1536 (v2026.3.12+) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45160.md) | complete | Apr 25, 2026, 23:09 UTC |
| [#44905](https://github.com/openclaw/openclaw/issues/44905) | Discord leaks internal tool-call traces (NO_REPLY, commentary, to=functions) to channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44905.md) | complete | Apr 25, 2026, 23:09 UTC |
| [#45041](https://github.com/openclaw/openclaw/issues/45041) | [Feature] Output-level filter to strip leaked reasoning/meta-planning from assistant messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45041.md) | complete | Apr 25, 2026, 23:09 UTC |
| [#44539](https://github.com/openclaw/openclaw/issues/44539) | openclaw doctor reports 'Telegram: not configured' despite Telegram channel working correctly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44539.md) | complete | Apr 25, 2026, 23:09 UTC |

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
