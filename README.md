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

Last dashboard update: Apr 25, 2026, 10:50 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 10:50 UTC

State: Review in progress

Planned 91 items across 40 shards. Capacity is 200 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24929175235](https://github.com/openclaw/clawsweeper/actions/runs/24929175235)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8416 |
| Fresh reviewed issues in the last 7 days | 8378 |
| Proposed issue closes | 2806 (33.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5081 |
| Fresh reviewed PRs in the last 7 days | 5014 |
| Proposed PR closes | 594 (11.8% of reviewed PRs) |
| Open items total | 13497 |
| Reviewed files | 13408 |
| Unreviewed open items | 89 |
| Archived closed files | 5692 |
| Fresh verified reviews in the last 7 days | 13392 |
| Proposed closes awaiting apply | 3400 (25.4% of fresh reviews) |
| Closed by Codex apply | 3907 |
| Failed or stale reviews | 16 |
| Daily cadence coverage | 10528/10637 current (109 due, 99%) |
| Daily PR cadence | 4921/5014 current (93 due, 98.1%) |
| Daily new issue cadence (<30d) | 5607/5623 current (16 due, 99.7%) |
| Weekly older issue cadence | 2771/2771 current (0 due, 100%) |
| Due now by cadence | 198 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#48819](https://github.com/openclaw/openclaw/pull/48819) | fix: suppress false-positive duplicate plugin warning for npm installs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48819.md) | complete | Apr 25, 2026, 10:46 UTC |
| [#48868](https://github.com/openclaw/openclaw/pull/48868) | fix(infra): respect OPENCLAW_LOG_DIR and OPENCLAW_TMP_DIR environment variablesFix log dir env | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48868.md) | complete | Apr 25, 2026, 10:45 UTC |
| [#48883](https://github.com/openclaw/openclaw/pull/48883) | Cron: constrain main-session system events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48883.md) | complete | Apr 25, 2026, 10:45 UTC |
| [#48834](https://github.com/openclaw/openclaw/pull/48834) | feat(feishu): enable /focus and /unfocus commands + fix ACP block delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48834.md) | complete | Apr 25, 2026, 10:45 UTC |
| [#48757](https://github.com/openclaw/openclaw/pull/48757) | Fix google-vertex ADC runtime auth handling | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48757.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48593](https://github.com/openclaw/openclaw/pull/48593) | Fix Gemini final tags leaking into delivered messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48593.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48792](https://github.com/openclaw/openclaw/pull/48792) | fix(tools): strip arg_value XML suffix from exec/read args | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48792.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48993](https://github.com/openclaw/openclaw/pull/48993) | feat(ui): render remote http/https images in markdown messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48993.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48946](https://github.com/openclaw/openclaw/pull/48946) | feat: Feishu message recovery module | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48946.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48914](https://github.com/openclaw/openclaw/pull/48914) | Fix false warning for core tool groups in allowlists | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48914.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#49058](https://github.com/openclaw/openclaw/pull/49058) | Fix Mattermost DM reply session splitting and preserve reply context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49058.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48764](https://github.com/openclaw/openclaw/pull/48764) | feat(discord): expand allowed directories for file uploads | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48764.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48815](https://github.com/openclaw/openclaw/pull/48815) | fix: suppress welcome state when context warning is active (#44869) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48815.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48592](https://github.com/openclaw/openclaw/pull/48592) | CLI: improve Codex OAuth callback fallback | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48592.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48976](https://github.com/openclaw/openclaw/pull/48976) | fix(feishu): normalize @mentions in quoted message content | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48976.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48960](https://github.com/openclaw/openclaw/pull/48960) | fix(skills): add detailed loading diagnostics for silent failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48960.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48795](https://github.com/openclaw/openclaw/pull/48795) | Memory chunking phase1 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48795.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48911](https://github.com/openclaw/openclaw/pull/48911) | feat: add logging.dir config for custom log directory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48911.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48845](https://github.com/openclaw/openclaw/pull/48845) | fix(feishu): support reaction synthetic events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48845.md) | complete | Apr 25, 2026, 10:44 UTC |
| [#48904](https://github.com/openclaw/openclaw/pull/48904) | feat(thinking): allow custom model compat to opt into xhigh | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48904.md) | complete | Apr 25, 2026, 10:44 UTC |

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
