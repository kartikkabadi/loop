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

Last dashboard update: Apr 25, 2026, 08:43 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 08:43 UTC

State: Review publish complete

Merged review artifacts for run 24926747847. Dashboard reflects the latest files and proposed closes from completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24926747847](https://github.com/openclaw/clawsweeper/actions/runs/24926747847)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8812 |
| Fresh reviewed issues in the last 7 days | 8766 |
| Proposed issue closes | 3174 (36.2% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5348 |
| Fresh reviewed PRs in the last 7 days | 5332 |
| Proposed PR closes | 829 (15.5% of reviewed PRs) |
| Open items total | 14160 |
| Reviewed files | 14098 |
| Unreviewed open items | 62 |
| Archived closed files | 4953 |
| Fresh verified reviews in the last 7 days | 14098 |
| Proposed closes awaiting apply | 4003 (28.4% of fresh reviews) |
| Closed by Codex apply | 3357 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 10959/11034 current (75 due, 99.3%) |
| Daily PR cadence | 5257/5332 current (75 due, 98.6%) |
| Daily new issue cadence (<30d) | 5702/5702 current (0 due, 100%) |
| Weekly older issue cadence | 3064/3064 current (0 due, 100%) |
| Due now by cadence | 137 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71350](https://github.com/openclaw/openclaw/issues/71350) | [Feature]: per-agent thinking level, temperature, and adaptive thinking strategies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71350.md) | complete | Apr 25, 2026, 08:42 UTC |
| [#71234](https://github.com/openclaw/openclaw/issues/71234) | Gateway OOM crash: sessions.json (31MB / 1,407 sessions) causes heap exhaustion during every sessions.list/chat.history poll | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71234.md) | complete | Apr 25, 2026, 08:42 UTC |
| [#71233](https://github.com/openclaw/openclaw/issues/71233) | [Bug]: jiti plugin loader fails to resolve typebox barrel re-exports ('./else.mjs', './el_GR.mjs') — breaks anthropic/google/lmstudio/xai/memory-core on 2026.4.22/4.23 Linux | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71233.md) | complete | Apr 25, 2026, 08:42 UTC |
| [#71251](https://github.com/openclaw/openclaw/issues/71251) | [Bug]: Post Update , version number not being updated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71251.md) | complete | Apr 25, 2026, 08:41 UTC |
| [#71349](https://github.com/openclaw/openclaw/issues/71349) | memory-lancedb: autoCapture rarely fires; only 2 entries persisted across many sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71349.md) | complete | Apr 25, 2026, 08:41 UTC |
| [#71133](https://github.com/openclaw/openclaw/issues/71133) | memory-core: narrative session cleanup fails with missing scope: operator.admin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71133.md) | complete | Apr 25, 2026, 08:41 UTC |
| [#71335](https://github.com/openclaw/openclaw/issues/71335) | Feature: sync.watch should default to false in gateway mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71335.md) | complete | Apr 25, 2026, 08:41 UTC |
| [#71330](https://github.com/openclaw/openclaw/issues/71330) | Feature: Configurable memory promotion target file | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71330.md) | complete | Apr 25, 2026, 08:41 UTC |
| [#71210](https://github.com/openclaw/openclaw/issues/71210) | [Bug]: openclaw memory status fails with 'Unknown memory embedding provider: local' | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71210.md) | complete | Apr 25, 2026, 08:40 UTC |
| [#71348](https://github.com/openclaw/openclaw/issues/71348) | [BUG] Node.js v24 compile cache causes ERR_MODULE_NOT_FOUND after package update | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71348.md) | complete | Apr 25, 2026, 08:40 UTC |
| [#71295](https://github.com/openclaw/openclaw/issues/71295) | v2026.4.23 stable release published with zero macOS assets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71295.md) | complete | Apr 25, 2026, 08:40 UTC |
| [#71258](https://github.com/openclaw/openclaw/issues/71258) | [Guide] nginx reverse proxy + internal TLS + token auth — fully working self-hosted config | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71258.md) | complete | Apr 25, 2026, 08:40 UTC |
| [#71200](https://github.com/openclaw/openclaw/issues/71200) | Google Veo video generation succeeds, but OpenClaw fails with 404 when downloading MLDev result URI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71200.md) | complete | Apr 25, 2026, 08:40 UTC |
| [#71211](https://github.com/openclaw/openclaw/issues/71211) | Security: exec tool returns raw stdout/stderr to agent without secret redaction | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71211.md) | complete | Apr 25, 2026, 08:40 UTC |
| [#70982](https://github.com/openclaw/openclaw/issues/70982) | [Bug]:  Ollama remote host autodiscovery impossible — schema validation contradicts documentation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70982.md) | complete | Apr 25, 2026, 08:40 UTC |
| [#71326](https://github.com/openclaw/openclaw/issues/71326) | Cross-exec stale file reads (cross-process vnode/dentry cache race) — regression in 2026.4.20 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71326.md) | complete | Apr 25, 2026, 08:39 UTC |
| [#71216](https://github.com/openclaw/openclaw/issues/71216) | Config schema: add `sandbox`, `routing.rules`, `instances`, and `gateway.nodes.denyPaths` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71216.md) | complete | Apr 25, 2026, 08:39 UTC |
| [#71058](https://github.com/openclaw/openclaw/issues/71058) | [Feature]: Support for multiple Azure/Teams bots on a single Openclaw Gateway | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71058.md) | complete | Apr 25, 2026, 08:39 UTC |
| [#71059](https://github.com/openclaw/openclaw/issues/71059) | [Bug]: Gateway restart strips channel credentials during config hydration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71059.md) | complete | Apr 25, 2026, 08:39 UTC |
| [#71166](https://github.com/openclaw/openclaw/issues/71166) | [Feature]: [IMP] true read-only mode for whatsapp (no outbound messages) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71166.md) | complete | Apr 25, 2026, 08:39 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

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
