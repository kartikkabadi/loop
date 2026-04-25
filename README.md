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

Last dashboard update: Apr 25, 2026, 21:58 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 21:58 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24941635518](https://github.com/openclaw/clawsweeper/actions/runs/24941635518)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5515 |
| Fresh reviewed issues in the last 7 days | 5489 |
| Proposed issue closes | 207 (3.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4271 |
| Fresh reviewed PRs in the last 7 days | 4202 |
| Proposed PR closes | 46 (1.1% of reviewed PRs) |
| Open items total | 9786 |
| Reviewed files | 9691 |
| Unreviewed open items | 95 |
| Archived closed files | 9606 |
| Fresh verified reviews in the last 7 days | 9691 |
| Proposed closes awaiting apply | 253 (2.6% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 6371/6921 current (550 due, 92.1%) |
| Daily PR cadence | 3947/4202 current (255 due, 93.9%) |
| Daily new issue cadence (<30d) | 2424/2719 current (295 due, 89.2%) |
| Weekly older issue cadence | 2770/2770 current (0 due, 100%) |
| Due now by cadence | 645 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#14389](https://github.com/openclaw/openclaw/issues/14389) | Feature Request: Auto-rollback on config change failure | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14389.md) | complete | Apr 25, 2026, 21:56 UTC |
| [#13615](https://github.com/openclaw/openclaw/issues/13615) | Add rate limiting and throttling for external API calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13615.md) | complete | Apr 25, 2026, 21:56 UTC |
| [#14076](https://github.com/openclaw/openclaw/issues/14076) | Feature request: read-only allowlist / suppress auto-reply for WhatsApp DMs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14076.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#13870](https://github.com/openclaw/openclaw/issues/13870) | Feature Request: Human-friendly device names in paired devices list | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13870.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#13616](https://github.com/openclaw/openclaw/issues/13616) | Add backup/restore utility for config, cron jobs, and session history | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13616.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#14341](https://github.com/openclaw/openclaw/issues/14341) | [Feature]: Currently, the Lark plugin does not support sending images or voice messages | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14341.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#13621](https://github.com/openclaw/openclaw/issues/13621) | [Feature]: Browser relay cannot interact with cross-origin iframe content (e.g., Salesforce Embedded Messaging) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/13621.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#13601](https://github.com/openclaw/openclaw/issues/13601) | Add persistent cron job execution history with filtering | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13601.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#15032](https://github.com/openclaw/openclaw/issues/15032) | Feature: Per-spawn tool restrictions for sub-agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/15032.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#13744](https://github.com/openclaw/openclaw/issues/13744) | Make session write lock configurable + narrow lock scope (avoid timeout=All models failed) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13744.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#14248](https://github.com/openclaw/openclaw/issues/14248) | Expose clientPingTimeout for Slack Socket Mode configuration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/14248.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#14264](https://github.com/openclaw/openclaw/issues/14264) | [Feature Request] Add clawhub uninstall command for clean skill removal | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14264.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#13736](https://github.com/openclaw/openclaw/issues/13736) | [Feature]: Support per-agent compaction settings (mode, reserveTokensFloor, memoryFlush) in agents.list[] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13736.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#14601](https://github.com/openclaw/openclaw/issues/14601) | [Feature]:  : Add MoonshotAI Kimi K2.5 (via OpenRouter) to Model Selector in onboard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/14601.md) | complete | Apr 25, 2026, 21:55 UTC |
| [#13962](https://github.com/openclaw/openclaw/issues/13962) | Feature: Per-mention model routing + context window for group mentions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13962.md) | complete | Apr 25, 2026, 21:54 UTC |
| [#14629](https://github.com/openclaw/openclaw/issues/14629) | Output sanitizer: improve duplicate detection for same-line and partial duplicates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/14629.md) | complete | Apr 25, 2026, 21:54 UTC |
| [#14206](https://github.com/openclaw/openclaw/issues/14206) | Add Message Rate Limiting for Feishu Channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/14206.md) | complete | Apr 25, 2026, 21:54 UTC |
| [#14861](https://github.com/openclaw/openclaw/issues/14861) | Gateway boot: no observability for subsystem startup failures (gmail-watcher, hooks) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/14861.md) | complete | Apr 25, 2026, 21:54 UTC |
| [#13948](https://github.com/openclaw/openclaw/issues/13948) | Feature Request: Action-Level Tool Deny | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13948.md) | complete | Apr 25, 2026, 21:54 UTC |
| [#15073](https://github.com/openclaw/openclaw/issues/15073) | Feature Request: Per-agent context/workspace on model fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/15073.md) | complete | Apr 25, 2026, 21:54 UTC |

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
