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

Last dashboard update: Apr 25, 2026, 18:16 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 18:16 UTC

State: Apply in progress

Checkpoint 7 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 350/500. Result records in checkpoint: 51.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24936577973](https://github.com/openclaw/clawsweeper/actions/runs/24936577973)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5994 |
| Fresh reviewed issues in the last 7 days | 5907 |
| Proposed issue closes | 473 (8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4477 |
| Fresh reviewed PRs in the last 7 days | 4356 |
| Proposed PR closes | 81 (1.9% of reviewed PRs) |
| Open items total | 10471 |
| Reviewed files | 10396 |
| Unreviewed open items | 75 |
| Archived closed files | 8851 |
| Fresh verified reviews in the last 7 days | 10263 |
| Proposed closes awaiting apply | 554 (5.4% of fresh reviews) |
| Closed by Codex apply | 6957 |
| Failed or stale reviews | 133 |
| Daily cadence coverage | 7285/7617 current (332 due, 95.6%) |
| Daily PR cadence | 4268/4412 current (144 due, 96.7%) |
| Daily new issue cadence (<30d) | 3017/3205 current (188 due, 94.1%) |
| Weekly older issue cadence | 2779/2779 current (0 due, 100%) |
| Due now by cadence | 407 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#59758](https://github.com/openclaw/openclaw/issues/59758) | Mattermost DM replies go to new Thread instead of main channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59758.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:08 UTC |
| [#59618](https://github.com/openclaw/openclaw/issues/59618) | Auto-compaction during ongoing turn silently abandons task execution without resumption | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59618.md) | complete | Apr 25, 2026, 18:07 UTC |
| [#68018](https://github.com/openclaw/openclaw/issues/68018) | Bug: Subagent deliveryContext does not inherit parent group session — falls back to DM | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68018.md) | complete | Apr 25, 2026, 18:07 UTC |
| [#59661](https://github.com/openclaw/openclaw/issues/59661) | [Bug]: tool not registered | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59661.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:07 UTC |
| [#59528](https://github.com/openclaw/openclaw/issues/59528) | [Bug]: The bundled plugins openshell does not work correctly since version 2026.03.13 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59528.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:07 UTC |
| [#67891](https://github.com/openclaw/openclaw/issues/67891) | [Bug] webhooks plugin: async register() causes routes to never be registered | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67891.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:06 UTC |
| [#71689](https://github.com/openclaw/openclaw/issues/71689) | Bug: tasks registry restore fails on malformed SQLite image | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71689.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:06 UTC |
| [#59401](https://github.com/openclaw/openclaw/issues/59401) | [Feishu] 添加 ignoreAtAll/ignoreBroadcast 配置选项 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59401.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:06 UTC |
| [#59212](https://github.com/openclaw/openclaw/issues/59212) | Usage tab: bar chart tooltip clipped on tall bars (overflow:clip on .usage-left-card) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59212.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:06 UTC |
| [#69536](https://github.com/openclaw/openclaw/issues/69536) | [Bug]: memory file naming format inconsistency between session-memory hook and dreaming system | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69536.md) | complete | Apr 25, 2026, 18:06 UTC |
| [#59337](https://github.com/openclaw/openclaw/issues/59337) | [Feature]: Openclaw nodes run function hopes to be restored | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59337.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:06 UTC |
| [#59427](https://github.com/openclaw/openclaw/issues/59427) | Baseline Context Load: 40K tokens per message regardless of reply length | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59427.md) | complete | Apr 25, 2026, 18:06 UTC |
| [#59287](https://github.com/openclaw/openclaw/issues/59287) | [Bug]: openclaw health --json reports telegram.running=false while probe succeeds and status --deep shows Telegram OK | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59287.md) | complete | Apr 25, 2026, 18:06 UTC |
| [#59360](https://github.com/openclaw/openclaw/issues/59360) | Feishu card message footer causes agent name to appear at message start (Markdown definition list parsing) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59360.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:06 UTC |
| [#59744](https://github.com/openclaw/openclaw/issues/59744) | Discord inbound attachments lose original filename (saved as UUID) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59744.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:06 UTC |
| [#59601](https://github.com/openclaw/openclaw/issues/59601) | [Bug]: docker images lack of permission to run npm install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59601.md) | complete | Apr 25, 2026, 18:06 UTC |
| [#59526](https://github.com/openclaw/openclaw/issues/59526) | Feature: allow account switching from /models buttons for GPT and Claude | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59526.md) | complete | Apr 25, 2026, 18:06 UTC |
| [#66940](https://github.com/openclaw/openclaw/issues/66940) | MCP streamable-http: missing Accept header causes connection failure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66940.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:06 UTC |
| [#59703](https://github.com/openclaw/openclaw/issues/59703) | Cron/heartbeat deliveries duplicated 2-6x per trigger | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59703.md) | complete | Apr 25, 2026, 18:05 UTC |
| [#59613](https://github.com/openclaw/openclaw/issues/59613) | [Bug]: sandbox container lack of permission to read write files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59613.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:05 UTC |

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
