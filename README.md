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

Last dashboard update: Apr 25, 2026, 21:43 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 21:44 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24941372685](https://github.com/openclaw/clawsweeper/actions/runs/24941372685)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5512 |
| Fresh reviewed issues in the last 7 days | 5490 |
| Proposed issue closes | 157 (2.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4272 |
| Fresh reviewed PRs in the last 7 days | 4203 |
| Proposed PR closes | 46 (1.1% of reviewed PRs) |
| Open items total | 9784 |
| Reviewed files | 9693 |
| Unreviewed open items | 91 |
| Archived closed files | 9604 |
| Fresh verified reviews in the last 7 days | 9693 |
| Proposed closes awaiting apply | 203 (2.1% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 6417/6924 current (507 due, 92.7%) |
| Daily PR cadence | 3961/4203 current (242 due, 94.2%) |
| Daily new issue cadence (<30d) | 2456/2721 current (265 due, 90.3%) |
| Weekly older issue cadence | 2769/2769 current (0 due, 100%) |
| Due now by cadence | 598 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#6890](https://github.com/openclaw/openclaw/issues/6890) | [Feature]: Add Ralph Loop feature and add max iteration number into the agent configuration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6890.md) | complete | Apr 25, 2026, 21:42 UTC |
| [#6757](https://github.com/openclaw/openclaw/issues/6757) | Feature Request: Agent-triggered context compaction (self-compact tool) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6757.md) | complete | Apr 25, 2026, 21:41 UTC |
| [#6599](https://github.com/openclaw/openclaw/issues/6599) | Feature: Add /models test-fallback command to verify fallback chain | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6599.md) | complete | Apr 25, 2026, 21:41 UTC |
| [#7234](https://github.com/openclaw/openclaw/issues/7234) | Feature: Granular Discord action gates (split actions.messages into read/edit/delete) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7234.md) | complete | Apr 25, 2026, 21:41 UTC |
| [#71691](https://github.com/openclaw/openclaw/issues/71691) | Session fork caused by heartbeat compaction loop losing conversation context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71691.md) | complete | Apr 25, 2026, 21:41 UTC |
| [#6722](https://github.com/openclaw/openclaw/issues/6722) | WhatsApp: Add link preview support (generateHighQualityLinkPreview) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/6722.md) | complete | Apr 25, 2026, 21:41 UTC |
| [#7476](https://github.com/openclaw/openclaw/issues/7476) | Feature Request: WhatsApp sticker send support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7476.md) | complete | Apr 25, 2026, 21:41 UTC |
| [#7080](https://github.com/openclaw/openclaw/issues/7080) | Feature Request: Enable Processing of WhatsApp Emotion and Poll Responses by Agents | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7080.md) | complete | Apr 25, 2026, 21:41 UTC |
| [#7057](https://github.com/openclaw/openclaw/issues/7057) | Flaky tests on Windows/WSL: timeouts and ENOENT in pi-tools workspace-paths & safe-bins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7057.md) | complete | Apr 25, 2026, 21:41 UTC |
| [#6625](https://github.com/openclaw/openclaw/issues/6625) | Feature: Graceful sub-agent timeout (pre-timeout warning) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6625.md) | complete | Apr 25, 2026, 21:41 UTC |
| [#6966](https://github.com/openclaw/openclaw/issues/6966) | Dynamic Model Switching Based on API Rate Limits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6966.md) | complete | Apr 25, 2026, 21:41 UTC |
| [#71648](https://github.com/openclaw/openclaw/pull/71648) | fix(mcp): bound pendingClaudePermissions / pendingApprovals via TTL sweeper + close clear | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71648.md) | complete | Apr 25, 2026, 21:40 UTC |
| [#7359](https://github.com/openclaw/openclaw/issues/7359) | [Slack] Agent lacks visibility into own channel messages from DM sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7359.md) | complete | Apr 25, 2026, 21:40 UTC |
| [#2597](https://github.com/openclaw/openclaw/issues/2597) | Context/state lost after unexpected compaction or session reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/2597.md) | complete | Apr 25, 2026, 21:40 UTC |
| [#7433](https://github.com/openclaw/openclaw/issues/7433) | Improve WhatsApp/Baileys group message reliability | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7433.md) | complete | Apr 25, 2026, 21:40 UTC |
| [#6792](https://github.com/openclaw/openclaw/issues/6792) | Feature: configPatch in plugin manifest — automatic config setup on install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6792.md) | complete | Apr 25, 2026, 21:40 UTC |
| [#71615](https://github.com/openclaw/openclaw/issues/71615) | [Bug]: 2026.4.23 tool-heavy main sessions can jump from low context to near-full within 1-2 replay turns | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71615.md) | complete | Apr 25, 2026, 21:40 UTC |
| [#7403](https://github.com/openclaw/openclaw/issues/7403) | Feature: Private Mode for demos and content creation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7403.md) | complete | Apr 25, 2026, 21:40 UTC |
| [#71495](https://github.com/openclaw/openclaw/issues/71495) | [Bug]: /subagents list returns empty in 2026.4.23 despite gateway tracking active subagents (regression from 4.22) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71495.md) | complete | Apr 25, 2026, 21:40 UTC |
| [#7312](https://github.com/openclaw/openclaw/issues/7312) | [Feature]: Support OpenTelemetry GenAI Auto-Instrumentation (OpenLLMetry / IITM) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7312.md) | complete | Apr 25, 2026, 21:40 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes during review. `apply_existing=true` is the only workflow mode that comments or closes items.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Pre-hydrates compact related issue/PR context referenced from the item body, comments, timeline, or PR review comments.
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
