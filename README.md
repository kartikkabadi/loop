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

Last dashboard update: Apr 25, 2026, 20:21 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 20:21 UTC

State: Review in progress

Planned 200 items across 40 shards. Capacity is 200 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24939788010](https://github.com/openclaw/clawsweeper/actions/runs/24939788010)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5512 |
| Fresh reviewed issues in the last 7 days | 5501 |
| Proposed issue closes | 59 (1.1% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4282 |
| Fresh reviewed PRs in the last 7 days | 4214 |
| Proposed PR closes | 26 (0.6% of reviewed PRs) |
| Open items total | 9794 |
| Reviewed files | 9717 |
| Unreviewed open items | 77 |
| Archived closed files | 9569 |
| Fresh verified reviews in the last 7 days | 9715 |
| Proposed closes awaiting apply | 85 (0.9% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 2 |
| Daily cadence coverage | 6590/6952 current (362 due, 94.8%) |
| Daily PR cadence | 4105/4216 current (111 due, 97.4%) |
| Daily new issue cadence (<30d) | 2485/2736 current (251 due, 90.8%) |
| Weekly older issue cadence | 2765/2765 current (0 due, 100%) |
| Due now by cadence | 439 |

Recently reviewed:

| Item | Title | Outcome | Status | Review Runtime | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [#61179](https://github.com/openclaw/openclaw/issues/61179) | [Bug]: Windows: repeated gateway/ws 1008 device-required from cli probe on loopback (closed before connect spam) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61179.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:18 UTC |
| [#61026](https://github.com/openclaw/openclaw/issues/61026) | [Bug]: Manual session stop triggers false timeout error and cascading model failover | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61026.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:17 UTC |
| [#61193](https://github.com/openclaw/openclaw/issues/61193) | Bug: exec approvals allowlist glob pattern not matching commands | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61193.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:17 UTC |
| [#60908](https://github.com/openclaw/openclaw/issues/60908) | ClawHub capability tags are false positives: Crypto, Can make purchases, Requires OAuth | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60908.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:16 UTC |
| [#61009](https://github.com/openclaw/openclaw/issues/61009) | [Bug]: docs/tools/exec says host=node override is allowed from auto, but runtime rejects it | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61009.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:16 UTC |
| [#60987](https://github.com/openclaw/openclaw/issues/60987) | MiniMax OAuth onboard writes empty models array, blocking model resolution | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60987.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:16 UTC |
| [#61135](https://github.com/openclaw/openclaw/issues/61135) | Agent often said tool but not use tool | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61135.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:16 UTC |
| [#61128](https://github.com/openclaw/openclaw/issues/61128) | [Feature]: Improve skill loading performance with safe cache-based reuse | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61128.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:16 UTC |
| [#61237](https://github.com/openclaw/openclaw/issues/61237) | Agent repeatedly acts autonomously despite explicit rules in memory/context files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61237.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |
| [#61334](https://github.com/openclaw/openclaw/issues/61334) | [Bug]: cron: timer armed fires ~4x/second in gateway logs (v2026.4.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61334.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |
| [#61076](https://github.com/openclaw/openclaw/issues/61076) | Bad control character in JSON at fixed position when parsing Anthropic streaming response (embedded agent runtime) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61076.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |
| [#60847](https://github.com/openclaw/openclaw/issues/60847) | acpx: completed sessions accumulate indefinitely — no auto-cleanup or TTL mechanism | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60847.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |
| [#61229](https://github.com/openclaw/openclaw/issues/61229) | [Bug]: stale exec node display name survives rebinding and triggers \"exec node not allowed\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61229.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |
| [#61153](https://github.com/openclaw/openclaw/issues/61153) | Discord DM channel stops responding after WebSocket disconnect (code 1005) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61153.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |
| [#60747](https://github.com/openclaw/openclaw/issues/60747) | fix(gateway): stale device repair request blocks all RPC operations (1008 pairing required) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60747.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |
| [#61235](https://github.com/openclaw/openclaw/issues/61235) | fix: claude-cli backend config guide — 3 pitfalls that prevent CLI dispatch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61235.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |
| [#60897](https://github.com/openclaw/openclaw/issues/60897) | Cache hit rate shows 28.5% in Control UI after upgrading to 2026.4.2 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60897.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |
| [#61182](https://github.com/openclaw/openclaw/issues/61182) | openclaw memory search CLI hangs indefinitely | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61182.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |
| [#60653](https://github.com/openclaw/openclaw/issues/60653) | CLI: cron and non-direct invocations can fail with 1006 while direct gateway call remains the only stable path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60653.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |
| [#61192](https://github.com/openclaw/openclaw/issues/61192) | [Bug]: Telegram forum topic: 400 invalid_request_body with OpenAI models due to unsanitized name field in chat history | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61192.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:15 UTC |

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
