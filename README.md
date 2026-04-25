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

Last dashboard update: Apr 25, 2026, 07:31 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 07:31 UTC

State: Apply in progress

Checkpoint 7 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 350/500. Result records in checkpoint: 51.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24924985336](https://github.com/openclaw/clawsweeper/actions/runs/24924985336)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8844 |
| Fresh reviewed issues in the last 7 days | 8622 |
| Proposed issue closes | 3214 (37.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5811 |
| Fresh reviewed PRs in the last 7 days | 6034 |
| Proposed PR closes | 1278 (21.2% of reviewed PRs) |
| Open items total | 14655 |
| Reviewed files | 14656 |
| Archived closed files | 3843 |
| Fresh verified reviews in the last 7 days | 14656 |
| Proposed closes awaiting apply | 4492 (30.6% of fresh reviews) |
| Closed by Codex apply | 2957 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 0 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#69466](https://github.com/openclaw/openclaw/issues/69466) | Bug: `openclaw security audit` hangs indefinitely (no output) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69466.md) | complete | Apr 25, 2026, 07:26 UTC |
| [#69384](https://github.com/openclaw/openclaw/issues/69384) | [Bug]: Assistant can answer a previous user question after a long multi-tool turn | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69384.md) | complete | Apr 25, 2026, 07:26 UTC |
| [#69436](https://github.com/openclaw/openclaw/issues/69436) | Feature: enforce response invariants against same-turn tool evidence (block unsupported blocker/safety claims) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69436.md) | complete | Apr 25, 2026, 07:26 UTC |
| [#69409](https://github.com/openclaw/openclaw/issues/69409) | Feature request: Approval gate for restart-required config changes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69409.md) | complete | Apr 25, 2026, 07:26 UTC |
| [#69390](https://github.com/openclaw/openclaw/issues/69390) | [Bug]: Ollama local model still hits ~5 minute \"Headers Timeout Error\" on 2026.4.15 despite increased OpenClaw timeouts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69390.md) | complete | Apr 25, 2026, 07:26 UTC |
| [#69374](https://github.com/openclaw/openclaw/issues/69374) | Expose WhatsApp forwardingScore / isForwarded to plugin inbound_claim hook | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69374.md) | complete | Apr 25, 2026, 07:25 UTC |
| [#69423](https://github.com/openclaw/openclaw/issues/69423) | [Bug]: A single broken plugin's malformed tool schema crashes every Anthropic agent run | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69423.md) | complete | Apr 25, 2026, 07:25 UTC |
| [#69406](https://github.com/openclaw/openclaw/issues/69406) | [Bug]: Chat history disappears from control UI on re-render — only most recent message reappears -- still having this issue 4.24.26 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69406.md) | complete | Apr 25, 2026, 07:25 UTC |
| [#69364](https://github.com/openclaw/openclaw/issues/69364) | [Feature]: Control UI: no cross-agent view when configuring or debugging multi-agent teams | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69364.md) | complete | Apr 25, 2026, 07:25 UTC |
| [#69371](https://github.com/openclaw/openclaw/issues/69371) | [Enhancement] Improve stability on ARM64 edge devices (Raspberry Pi 5 / Rock5) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69371.md) | complete | Apr 25, 2026, 07:25 UTC |
| [#69451](https://github.com/openclaw/openclaw/issues/69451) | Memory: Session files loaded entirely into memory via readFileSync | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69451.md) | complete | Apr 25, 2026, 07:25 UTC |
| [#69460](https://github.com/openclaw/openclaw/issues/69460) | Auto-compaction fails on Claude Opus 4.7 — thinking.type.enabled unsupported (use adaptive + output_config.effort) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69460.md) | complete | Apr 25, 2026, 07:25 UTC |
| [#69440](https://github.com/openclaw/openclaw/issues/69440) | [Bug]: startup race can downgrade agent thinkingDefault=xhigh to high and persist the downgrade into the session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69440.md) | complete | Apr 25, 2026, 07:25 UTC |
| [#43670](https://github.com/openclaw/openclaw/pull/43670) | fix: treat transient network errors as retryable for failover | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43670.md) | complete | Apr 25, 2026, 07:25 UTC |
| [#69400](https://github.com/openclaw/openclaw/issues/69400) | Feature: honor OPENCLAW_WRAPPER (or --wrapper) when generating LaunchAgent ProgramArguments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69400.md) | complete | Apr 25, 2026, 07:24 UTC |
| [#69386](https://github.com/openclaw/openclaw/issues/69386) | CRITICAL: Agent ignores stop commands during exec denial - infinite retry loop, delayed command flood, and queue overflow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69386.md) | complete | Apr 25, 2026, 07:24 UTC |
| [#69445](https://github.com/openclaw/openclaw/issues/69445) | Feature: per-agent status card field suppression (hide usage/billing from specific agents) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69445.md) | complete | Apr 25, 2026, 07:24 UTC |
| [#69410](https://github.com/openclaw/openclaw/issues/69410) | [Bug]: Custom OpenAI-compatible provider returns valid assistant content, but embedded agent ends with `payloads=0` / \"Agent couldn't generate a response\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69410.md) | complete | Apr 25, 2026, 07:24 UTC |
| [#69350](https://github.com/openclaw/openclaw/issues/69350) | [Bug]: OpenRouter API key is configured and validated (works with curl), but OpenClaw returns empty responses when using openrouter/google/gemma-4-26b-a4b-it | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69350.md) | complete | Apr 25, 2026, 07:24 UTC |
| [#69434](https://github.com/openclaw/openclaw/issues/69434) | Heartbeat: support model fallbacks (single point of failure when provider quota is exhausted) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69434.md) | complete | Apr 25, 2026, 07:24 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

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
