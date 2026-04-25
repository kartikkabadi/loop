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

Last dashboard update: Apr 25, 2026, 12:48 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 12:48 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24931256467](https://github.com/openclaw/clawsweeper/actions/runs/24931256467)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 7696 |
| Fresh reviewed issues in the last 7 days | 7652 |
| Proposed issue closes | 2089 (27.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4879 |
| Fresh reviewed PRs in the last 7 days | 4810 |
| Proposed PR closes | 438 (9.1% of reviewed PRs) |
| Open items total | 12575 |
| Reviewed files | 12486 |
| Unreviewed open items | 89 |
| Archived closed files | 6648 |
| Fresh verified reviews in the last 7 days | 12462 |
| Proposed closes awaiting apply | 2527 (20.3% of fresh reviews) |
| Closed by Codex apply | 4807 |
| Failed or stale reviews | 24 |
| Daily cadence coverage | 9568/9714 current (146 due, 98.5%) |
| Daily PR cadence | 4688/4813 current (125 due, 97.4%) |
| Daily new issue cadence (<30d) | 4880/4901 current (21 due, 99.6%) |
| Weekly older issue cadence | 2772/2772 current (0 due, 100%) |
| Due now by cadence | 235 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#51858](https://github.com/openclaw/openclaw/pull/51858) | Modified sentence on codex reviews in CONTRIBUTING.md | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51858.md) | complete | Apr 25, 2026, 12:45 UTC |
| [#51548](https://github.com/openclaw/openclaw/pull/51548) | test(config): add regression test for telegram topic agentId (#50574) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51548.md) | complete | Apr 25, 2026, 12:45 UTC |
| [#51673](https://github.com/openclaw/openclaw/pull/51673) | fix(core): preserve totalTokens on zero usage reports (Consolidated v2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51673.md) | complete | Apr 25, 2026, 12:45 UTC |
| [#51556](https://github.com/openclaw/openclaw/pull/51556) | fix(pairing): propagate non-ENOENT errors in sync allowlist reader | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51556.md) | complete | Apr 25, 2026, 12:45 UTC |
| [#51546](https://github.com/openclaw/openclaw/pull/51546) | UI: add progressive disclosure for long markdown messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51546.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51701](https://github.com/openclaw/openclaw/pull/51701) | fix(agents): avoid stale CLI session resume after /new | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51701.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51471](https://github.com/openclaw/openclaw/pull/51471) | Refresh skill prompts inside sandbox workspaces | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51471.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51581](https://github.com/openclaw/openclaw/pull/51581) | feat(cron): add --thread-id flag to cron create/edit for Telegram forum topics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51581.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51448](https://github.com/openclaw/openclaw/pull/51448) | fix(agent): forward configured tool choice into stream params | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51448.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51547](https://github.com/openclaw/openclaw/pull/51547) | fix(exec): default to GBK encoding on Windows (#50519) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51547.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51623](https://github.com/openclaw/openclaw/pull/51623) | fix: persist pending followup queues across gateway restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51623.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51603](https://github.com/openclaw/openclaw/pull/51603) | feat(config): add llm shorthand config key for custom model providers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51603.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51668](https://github.com/openclaw/openclaw/pull/51668) | feat(outbound): gateway-layer secret sanitization with named reference handles | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51668.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51584](https://github.com/openclaw/openclaw/pull/51584) | fix(sandbox): fall back to static channel registry for sandbox explain channel resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51584.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51653](https://github.com/openclaw/openclaw/pull/51653) | fix(outbound): strip inbound metadata in normalizeReplyPayloadsForDelivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51653.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51513](https://github.com/openclaw/openclaw/pull/51513) | docs(channels): add connection architecture overview and transport notes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51513.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51339](https://github.com/openclaw/openclaw/pull/51339) | fix(gateway): block mode=none auth with tailscale serve remote exposure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51339.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51166](https://github.com/openclaw/openclaw/pull/51166) | fix(sandbox): pull pre-built image from GHCR instead of plain debian:bookworm-slim | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51166.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51706](https://github.com/openclaw/openclaw/pull/51706) | Agents: show runtime model in session status | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51706.md) | complete | Apr 25, 2026, 12:44 UTC |
| [#51672](https://github.com/openclaw/openclaw/pull/51672) | ci: add missing extension and channel labels to labeler.yml | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51672.md) | complete | Apr 25, 2026, 12:44 UTC |

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
