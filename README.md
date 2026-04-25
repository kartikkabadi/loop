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

Last dashboard update: Apr 25, 2026, 08:56 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 08:56 UTC

State: Review publish complete

Merged review artifacts for run 24927012474. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24927012474](https://github.com/openclaw/clawsweeper/actions/runs/24927012474)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8814 |
| Fresh reviewed issues in the last 7 days | 8793 |
| Proposed issue closes | 3183 (36.2% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5231 |
| Fresh reviewed PRs in the last 7 days | 5160 |
| Proposed PR closes | 689 (13.4% of reviewed PRs) |
| Open items total | 14045 |
| Reviewed files | 13966 |
| Unreviewed open items | 79 |
| Archived closed files | 5116 |
| Fresh verified reviews in the last 7 days | 13953 |
| Proposed closes awaiting apply | 3872 (27.8% of fresh reviews) |
| Closed by Codex apply | 3457 |
| Failed or stale reviews | 13 |
| Daily cadence coverage | 10823/10898 current (75 due, 99.3%) |
| Daily PR cadence | 5097/5166 current (69 due, 98.7%) |
| Daily new issue cadence (<30d) | 5726/5732 current (6 due, 99.9%) |
| Weekly older issue cadence | 3067/3068 current (1 due, 100%) |
| Due now by cadence | 155 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71477](https://github.com/openclaw/openclaw/issues/71477) | [Bug] Config file corrupted on crash — agent disappears after restart | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71477.md) | complete | Apr 25, 2026, 08:54 UTC |
| [#71474](https://github.com/openclaw/openclaw/issues/71474) | [Bug]: Incorrect handling on LM Studio model names with \"@‘ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71474.md) | complete | Apr 25, 2026, 08:53 UTC |
| [#71489](https://github.com/openclaw/openclaw/issues/71489) | Regression: Group chat empty-body guard ignores InboundHistory, breaks Feishu requireMention | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71489.md) | complete | Apr 25, 2026, 08:53 UTC |
| [#71476](https://github.com/openclaw/openclaw/issues/71476) | Webchat HTTP 401 on __openclaw/ routes after session compaction | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71476.md) | complete | Apr 25, 2026, 08:53 UTC |
| [#53643](https://github.com/openclaw/openclaw/issues/53643) | [Bug]: 控制界面技能列表显示不稳定，点击后消失 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53643.md) | complete | Apr 25, 2026, 08:53 UTC |
| [#71418](https://github.com/openclaw/openclaw/issues/71418) | ERR_MODULE_NOT_FOUND for `subagent-registry.runtime.js` on every gateway boot | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71418.md) | complete | Apr 25, 2026, 08:53 UTC |
| [#71427](https://github.com/openclaw/openclaw/issues/71427) | RFC: pi-embedded plugin tool-event subscription \\u2014 stable seam for tool-call observation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71427.md) | complete | Apr 25, 2026, 08:53 UTC |
| [#71426](https://github.com/openclaw/openclaw/issues/71426) | RFC: sessions.patch plugin extension hook \\u2014 let plugins handle their own patch payloads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71426.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#54786](https://github.com/openclaw/openclaw/issues/54786) | skills.load.extraDirs: support recursive scanning or glob patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54786.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#71424](https://github.com/openclaw/openclaw/issues/71424) | [Bug]: npm install -g openclaw shows deprecated warning for node-domexception | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71424.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#71475](https://github.com/openclaw/openclaw/issues/71475) | Regression: Telegram topic leaks raw tool_uses JSON before final answer on 2026.4.23 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71475.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#71443](https://github.com/openclaw/openclaw/issues/71443) | Integration: AIP Agent Guard -- skill signing, capability manifests, and audit for OpenClaw | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71443.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#46193](https://github.com/openclaw/openclaw/pull/46193) | fix: add per-attempt timeout to prevent model fallback starvation (closes #41642) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46193.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#70578](https://github.com/openclaw/openclaw/issues/70578) | Silent config data loss: Zod `.strict()` strips unknown top-level fields on round-trip | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70578.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#71484](https://github.com/openclaw/openclaw/issues/71484) | [Bug]: `bundled-deps installer omits the host openclaw package; Discord channel and 7 other extensions break with `Cannot find package 'openclaw' | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71484.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#46275](https://github.com/openclaw/openclaw/pull/46275) | fix(ui): stabilize agent primary model selection on switch | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46275.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#51455](https://github.com/openclaw/openclaw/issues/51455) | bug: pdf extraction fallback renderer omits standardFontDataUrl and emits PDF.js warnings in Node | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51455.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#71485](https://github.com/openclaw/openclaw/issues/71485) | Feishu card renderMode shows unwanted `main` header/title and there is no config to disable it | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71485.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#71389](https://github.com/openclaw/openclaw/issues/71389) | SIGILL crash when sharp loads on non-AVX CPUs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71389.md) | complete | Apr 25, 2026, 08:52 UTC |
| [#71398](https://github.com/openclaw/openclaw/issues/71398) | QQ Bot channel fails with 'invalid appid or secret' after upgrade to v2026.4.23 when using secretref | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71398.md) | complete | Apr 25, 2026, 08:52 UTC |

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
