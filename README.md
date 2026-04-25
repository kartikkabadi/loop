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

Last dashboard update: Apr 25, 2026, 19:49 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 19:49 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24939211295](https://github.com/openclaw/clawsweeper/actions/runs/24939211295)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5523 |
| Fresh reviewed issues in the last 7 days | 5412 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4346 |
| Fresh reviewed PRs in the last 7 days | 4282 |
| Proposed PR closes | 13 (0.3% of reviewed PRs) |
| Open items total | 9869 |
| Reviewed files | 9780 |
| Unreviewed open items | 89 |
| Archived closed files | 9479 |
| Fresh verified reviews in the last 7 days | 9694 |
| Proposed closes awaiting apply | 13 (0.1% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 86 |
| Daily cadence coverage | 6436/7011 current (575 due, 91.8%) |
| Daily PR cadence | 4141/4283 current (142 due, 96.7%) |
| Daily new issue cadence (<30d) | 2295/2728 current (433 due, 84.1%) |
| Weekly older issue cadence | 2769/2769 current (0 due, 100%) |
| Due now by cadence | 664 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#61413](https://github.com/openclaw/openclaw/pull/61413) | fix: web_search fails with transparent proxies when no proxy env vars are set | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61413.md) | complete | Apr 25, 2026, 19:47 UTC |
| [#61105](https://github.com/openclaw/openclaw/pull/61105) | fix(config): apply tools.exec.pathPrepend to process.env.PATH at startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61105.md) | complete | Apr 25, 2026, 19:46 UTC |
| [#61345](https://github.com/openclaw/openclaw/pull/61345) | Control UI: keep slow reconnects out of the login gate | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61345.md) | complete | Apr 25, 2026, 19:46 UTC |
| [#60844](https://github.com/openclaw/openclaw/pull/60844) | Heartbeat: isolate session runs by default | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60844.md) | complete | Apr 25, 2026, 19:46 UTC |
| [#60508](https://github.com/openclaw/openclaw/pull/60508) | test: add coverage for Ollama thinking + tool_calls streaming | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60508.md) | complete | Apr 25, 2026, 19:45 UTC |
| [#61331](https://github.com/openclaw/openclaw/pull/61331) | docs(zh-CN): encode Control UI gatewayUrl examples | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61331.md) | complete | Apr 25, 2026, 19:45 UTC |
| [#61396](https://github.com/openclaw/openclaw/pull/61396) | fix(i18n): add device/node pairing terms to zh-CN glossary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61396.md) | complete | Apr 25, 2026, 19:45 UTC |
| [#61335](https://github.com/openclaw/openclaw/pull/61335) | fix(usage): handle Daylight saving time (DST) hour boundaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61335.md) | complete | Apr 25, 2026, 19:45 UTC |
| [#61016](https://github.com/openclaw/openclaw/pull/61016) | fix(media): anchor sanitizeMimeType regex and make case-insensitive per RFC 2045 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61016.md) | complete | Apr 25, 2026, 19:45 UTC |
| [#61374](https://github.com/openclaw/openclaw/pull/61374) | fix(slack): wake sessions for interactive block actions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61374.md) | complete | Apr 25, 2026, 19:44 UTC |
| [#61151](https://github.com/openclaw/openclaw/pull/61151) | fix(agents): drop partialJson streaming artifacts from session history repair | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61151.md) | complete | Apr 25, 2026, 19:44 UTC |
| [#59798](https://github.com/openclaw/openclaw/pull/59798) | fix(acp): avoid locally caught exception on turn failure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59798.md) | complete | Apr 25, 2026, 19:44 UTC |
| [#61092](https://github.com/openclaw/openclaw/pull/61092) | UI: localize skills hardcoded labels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61092.md) | complete | Apr 25, 2026, 19:44 UTC |
| [#61473](https://github.com/openclaw/openclaw/pull/61473) | fix(discord): persist model picker override fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61473.md) | complete | Apr 25, 2026, 19:44 UTC |
| [#61245](https://github.com/openclaw/openclaw/pull/61245) | fix(docker): exclude CI, docs metadata, and test files from build con… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61245.md) | complete | Apr 25, 2026, 19:44 UTC |
| [#61247](https://github.com/openclaw/openclaw/pull/61247) | fix(utils): add missing test coverage for sliceUtf16Safe and truncateUtf16Safe | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61247.md) | complete | Apr 25, 2026, 19:44 UTC |
| [#61130](https://github.com/openclaw/openclaw/pull/61130) | UI: localize command palette labels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61130.md) | complete | Apr 25, 2026, 19:44 UTC |
| [#60718](https://github.com/openclaw/openclaw/pull/60718) | fix: resolve startedAt timestamp inversion in task registry | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60718.md) | complete | Apr 25, 2026, 19:44 UTC |
| [#61075](https://github.com/openclaw/openclaw/pull/61075) | fix:add abort messages mostly in other languages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61075.md) | complete | Apr 25, 2026, 19:44 UTC |
| [#61422](https://github.com/openclaw/openclaw/pull/61422) | fix: move context files after cache boundary to prevent invalidation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61422.md) | complete | Apr 25, 2026, 19:44 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Pre-hydrates compact related issue/PR context referenced from the item body, comments, timeline, or PR review comments.
5. Runs Codex with `gpt-5.5`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
6. Writes `items/<number>.md` with the decision, proposed close comment, review runtime (`review_model`, `review_reasoning_effort`, sandbox, service tier), and a GitHub snapshot hash.
7. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, runs Codex without the nested Linux sandbox that blocks shell inspection on GitHub runners, checks the checkout again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews. The dashboard reports local cadence coverage for daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 40 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
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

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI, Codex, or GitHub token environment variables. Parent ClawSweeper code uses `OPENCLAW_GH_TOKEN` to gather target and related GitHub context before invoking Codex. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. It uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
