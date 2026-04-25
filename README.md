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

Last dashboard update: Apr 25, 2026, 23:27 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 23:28 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24943186439](https://github.com/openclaw/clawsweeper/actions/runs/24943186439)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5510 |
| Fresh reviewed issues in the last 7 days | 5472 |
| Proposed issue closes | 536 (9.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4268 |
| Fresh reviewed PRs in the last 7 days | 4188 |
| Proposed PR closes | 46 (1.1% of reviewed PRs) |
| Open items total | 9778 |
| Reviewed files | 9660 |
| Unreviewed open items | 118 |
| Archived closed files | 9637 |
| Fresh verified reviews in the last 7 days | 9660 |
| Proposed closes awaiting apply | 582 (6% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 6340/6889 current (549 due, 92%) |
| Daily PR cadence | 3933/4188 current (255 due, 93.9%) |
| Daily new issue cadence (<30d) | 2407/2701 current (294 due, 89.1%) |
| Weekly older issue cadence | 2771/2771 current (0 due, 100%) |
| Due now by cadence | 667 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#47251](https://github.com/openclaw/openclaw/issues/47251) | memorySearch local can fail after normal npm install because node-llama-cpp is not provisioned | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47251.md) | complete | Apr 25, 2026, 23:26 UTC |
| [#47429](https://github.com/openclaw/openclaw/issues/47429) | Bug: CLI plugins loaded twice (all plugins registered 2x) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47429.md) | complete | Apr 25, 2026, 23:26 UTC |
| [#46997](https://github.com/openclaw/openclaw/issues/46997) | [Bug]: WebChat \"missing scope: operator.write\" Error | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46997.md) | complete | Apr 25, 2026, 23:26 UTC |
| [#47332](https://github.com/openclaw/openclaw/issues/47332) | [Bug]: Console token spend not displayed correctly | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47332.md) | complete | Apr 25, 2026, 23:25 UTC |
| [#47280](https://github.com/openclaw/openclaw/issues/47280) | [Bug] Logfile rotation ineffective - logger transport retains stale file reference | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47280.md) | complete | Apr 25, 2026, 23:25 UTC |
| [#47002](https://github.com/openclaw/openclaw/issues/47002) | [Bug]: Config validator rejects mediaLocalRoots despite type definitions supporting it (Telegram outbound) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47002.md) | complete | Apr 25, 2026, 23:25 UTC |
| [#47149](https://github.com/openclaw/openclaw/issues/47149) | Auto-announce silently fails when subagent response exceeds channel message limit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47149.md) | complete | Apr 25, 2026, 23:25 UTC |
| [#46965](https://github.com/openclaw/openclaw/issues/46965) | Feature: global suppressToolErrorWarnings (not just heartbeat) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46965.md) | complete | Apr 25, 2026, 23:24 UTC |
| [#46909](https://github.com/openclaw/openclaw/issues/46909) | [Bug]: Agent avatar disappears after updating to 2026.3.12 - Control UI display issue | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46909.md) | complete | Apr 25, 2026, 23:24 UTC |
| [#46938](https://github.com/openclaw/openclaw/issues/46938) | 模型超时导致记忆维护失败，建议增加 session 临时存储机制 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46938.md) | complete | Apr 25, 2026, 23:24 UTC |
| [#47386](https://github.com/openclaw/openclaw/issues/47386) | [Feature] Webchat UI: Add collapsible tool output summary mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47386.md) | complete | Apr 25, 2026, 23:24 UTC |
| [#47351](https://github.com/openclaw/openclaw/issues/47351) | Web control UI cannot display images (Markdown and Base64 images not supported) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47351.md) | complete | Apr 25, 2026, 23:24 UTC |
| [#46935](https://github.com/openclaw/openclaw/issues/46935) | /model available values are not round-trippable; bare model names get prefixed with current provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46935.md) | complete | Apr 25, 2026, 23:24 UTC |
| [#47129](https://github.com/openclaw/openclaw/issues/47129) | [Bug]: Gateway silently fails to process chat messages - no response, no logs, lock file stuck | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47129.md) | complete | Apr 25, 2026, 23:24 UTC |
| [#47070](https://github.com/openclaw/openclaw/issues/47070) | Attach input provenance to sessions_spawn child tasks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47070.md) | complete | Apr 25, 2026, 23:24 UTC |
| [#46647](https://github.com/openclaw/openclaw/issues/46647) | Slack system prompt incorrectly checks inlineButtons instead of interactiveReplies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46647.md) | complete | Apr 25, 2026, 23:24 UTC |
| [#46641](https://github.com/openclaw/openclaw/issues/46641) | Feature Request: User-facing notification before auto-compaction | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46641.md) | complete | Apr 25, 2026, 23:24 UTC |
| [#47382](https://github.com/openclaw/openclaw/issues/47382) | Feature: Channel Silence Watchdog — runtime beacon during long model requests | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47382.md) | complete | Apr 25, 2026, 23:24 UTC |
| [#46685](https://github.com/openclaw/openclaw/issues/46685) | Memory index fetch failed: createPinnedLookup incompatible with undici v7 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46685.md) | complete | Apr 25, 2026, 23:23 UTC |
| [#47335](https://github.com/openclaw/openclaw/issues/47335) | Reply generated but not delivered when compaction triggers session rollover | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47335.md) | complete | Apr 25, 2026, 23:23 UTC |

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
