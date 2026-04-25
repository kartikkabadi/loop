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

Last dashboard update: Apr 25, 2026, 05:15 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 05:15 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24923386463](https://github.com/openclaw/clawsweeper/actions/runs/24923386463)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9356 |
| Fresh reviewed issues in the last 7 days | 8980 |
| Proposed issue closes | 3569 (39.7% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6211 |
| Fresh reviewed PRs in the last 7 days | 5983 |
| Proposed PR closes | 1528 (25.5% of reviewed PRs) |
| Open items total | 15567 |
| Reviewed files | 14963 |
| Archived closed files | 3064 |
| Fresh verified reviews in the last 7 days | 14963 |
| Proposed closes awaiting apply | 5097 (34.1% of fresh reviews) |
| Closed by Codex apply | 2283 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 604 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#69255](https://github.com/openclaw/openclaw/issues/69255) | [Bug]: Feishu WebSocket fails to reconnect after token timeout during gateway restart/bootstrap | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69255.md) | complete | Apr 25, 2026, 05:09 UTC |
| [#69290](https://github.com/openclaw/openclaw/issues/69290) | [Bug]: /new and /reset reply \"ACP session reset in place\" for non-ACP sessions, misleading users and agents | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69290.md) | complete | Apr 25, 2026, 05:09 UTC |
| [#69246](https://github.com/openclaw/openclaw/issues/69246) | [Bug]: OpenClaw website keeps loading indefinitely instead of showing custom MCP install errors | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69246.md) | complete | Apr 25, 2026, 05:08 UTC |
| [#69300](https://github.com/openclaw/openclaw/issues/69300) | [Bug]: Agent harness compaction short-circuits OpenClaw memory flush and session bookkeeping, leaving session state unbounded | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69300.md) | complete | Apr 25, 2026, 05:08 UTC |
| [#69296](https://github.com/openclaw/openclaw/issues/69296) | [Bug]: openclaw acp client hangs on slash commands and normal prompts in 2026.4.15 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69296.md) | complete | Apr 25, 2026, 05:08 UTC |
| [#69260](https://github.com/openclaw/openclaw/issues/69260) | Harden Gemini ACP integration against ambient API-key fallback and add generic auth-contract hooks for ACP agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69260.md) | complete | Apr 25, 2026, 05:08 UTC |
| [#69274](https://github.com/openclaw/openclaw/issues/69274) | Qwen: qwen3.6-plus is blocked on Coding Plan Pro endpoint despite being officially supported | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69274.md) | complete | Apr 25, 2026, 05:08 UTC |
| [#69279](https://github.com/openclaw/openclaw/issues/69279) | Feature request: Kokoro TTS as native provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69279.md) | complete | Apr 25, 2026, 05:08 UTC |
| [#69287](https://github.com/openclaw/openclaw/issues/69287) | Bug: Session token count not reset after compaction | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69287.md) | complete | Apr 25, 2026, 05:08 UTC |
| [#69298](https://github.com/openclaw/openclaw/issues/69298) | [Bug]: Codex harness usage inflates session context accounting by double-counting cached input | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69298.md) | complete | Apr 25, 2026, 05:08 UTC |
| [#69292](https://github.com/openclaw/openclaw/pull/69292) | fix(doctor): skip plugins.entries for installed plugins already auto-loaded via manifest channels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69292.md) | complete | Apr 25, 2026, 05:08 UTC |
| [#69244](https://github.com/openclaw/openclaw/pull/69244) | feat(github-copilot): add missing Copilot models to defaults | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69244.md) | complete | Apr 25, 2026, 05:07 UTC |
| [#69216](https://github.com/openclaw/openclaw/issues/69216) | openclaw doctor and upgrade should backup .env and openclaw.json before modifying | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69216.md) | complete | Apr 25, 2026, 05:07 UTC |
| [#69286](https://github.com/openclaw/openclaw/issues/69286) | Bug: session totalTokens not reset after compaction causes infinite safeguard loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69286.md) | complete | Apr 25, 2026, 05:07 UTC |
| [#69262](https://github.com/openclaw/openclaw/pull/69262) | fix(qqbot): allow outbound and inbound media paths in resolveQQBotPayloadLocalFilePath | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69262.md) | complete | Apr 25, 2026, 05:07 UTC |
| [#69303](https://github.com/openclaw/openclaw/issues/69303) | [Bug] Inbound dedupe released on error path can replay same message_id after provider failure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69303.md) | complete | Apr 25, 2026, 05:07 UTC |
| [#69268](https://github.com/openclaw/openclaw/pull/69268) | fix(anthropic): Opus 4.7 thinking.type leak + assistant-prefill short-circuit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69268.md) | complete | Apr 25, 2026, 05:07 UTC |
| [#69297](https://github.com/openclaw/openclaw/pull/69297) | fix(whatsapp): Add group admin privacy controls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69297.md) | complete | Apr 25, 2026, 05:07 UTC |
| [#69270](https://github.com/openclaw/openclaw/pull/69270) | fix(compaction): restore session invariants across compaction and reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69270.md) | complete | Apr 25, 2026, 05:07 UTC |
| [#69278](https://github.com/openclaw/openclaw/pull/69278) | fix(agents): stop injecting heartbeat system prompt on non-heartbeat runs (#69079) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69278.md) | complete | Apr 25, 2026, 05:07 UTC |

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

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews.

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
