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

Last dashboard update: Apr 25, 2026, 03:33 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 03:33 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24921620285](https://github.com/openclaw/clawsweeper/actions/runs/24921620285)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 10028 |
| Fresh reviewed issues in the last 7 days | 8762 |
| Proposed issue closes | 3810 (43.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6316 |
| Fresh reviewed PRs in the last 7 days | 5422 |
| Proposed PR closes | 1453 (26.8% of reviewed PRs) |
| Open items total | 16344 |
| Reviewed files | 14184 |
| Archived closed files | 2443 |
| Fresh verified reviews in the last 7 days | 14184 |
| Proposed closes awaiting apply | 5263 (37.1% of fresh reviews) |
| Closed by Codex apply | 1683 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 2160 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#66942](https://github.com/openclaw/openclaw/issues/66942) | [Bug]: TypeError: Cannot read properties of undefined (reading 'trim') | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66942.md) | complete | Apr 25, 2026, 03:33 UTC |
| [#66953](https://github.com/openclaw/openclaw/issues/66953) | [Bug]: delivery-mirror transcript written to wrong agent session in multi-account multi-agent config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66953.md) | complete | Apr 25, 2026, 03:32 UTC |
| [#66952](https://github.com/openclaw/openclaw/issues/66952) | [Bug]: openai-codex OAuth refresh race can invalidate shared refresh token; models status misreports expired Codex profiles as OK | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66952.md) | complete | Apr 25, 2026, 03:31 UTC |
| [#66945](https://github.com/openclaw/openclaw/issues/66945) | [Bug]: TypeError: Cannot read properties of undefined (reading 'trim') | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66945.md) | complete | Apr 25, 2026, 03:31 UTC |
| [#66944](https://github.com/openclaw/openclaw/issues/66944) | [Feature]: Plugin UI Extension System — Allow Plugins to Contribute Native Pages to Control UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66944.md) | complete | Apr 25, 2026, 03:31 UTC |
| [#66924](https://github.com/openclaw/openclaw/pull/66924) | fix(google): do not inherit template 1M context window for gemma models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66924.md) | complete | Apr 25, 2026, 03:31 UTC |
| [#66868](https://github.com/openclaw/openclaw/pull/66868) | fix: drain system events on session reset to prevent cross-session leak | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66868.md) | complete | Apr 25, 2026, 03:31 UTC |
| [#66960](https://github.com/openclaw/openclaw/pull/66960) | ne4w | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66960.md) | complete | Apr 25, 2026, 03:31 UTC |
| [#66925](https://github.com/openclaw/openclaw/issues/66925) | [Bug] registerMemoryCapability is overwrite-only — active-memory overrides memory-core's publicArtifacts, breaking wiki bridge import | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66925.md) | complete | Apr 25, 2026, 03:31 UTC |
| [#66947](https://github.com/openclaw/openclaw/issues/66947) | Dreaming system pollutes daily memory files, causing heartbeat agents to skip memory logging | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66947.md) | complete | Apr 25, 2026, 03:30 UTC |
| [#66951](https://github.com/openclaw/openclaw/issues/66951) | Bug: Main agent falls back to 3rd-priority model (claude-sonnet) instead of 2nd (gpt-5.4-mini) on Ollama init failure | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66951.md) | complete | Apr 25, 2026, 03:30 UTC |
| [#66966](https://github.com/openclaw/openclaw/pull/66966) | fix(mcp): add required Accept header for streamable-http transport | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66966.md) | complete | Apr 25, 2026, 03:30 UTC |
| [#66936](https://github.com/openclaw/openclaw/issues/66936) | CLI: `openclaw agents list` fails with unresolved SecretRef; CLI process hangs after completion | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66936.md) | complete | Apr 25, 2026, 03:30 UTC |
| [#66937](https://github.com/openclaw/openclaw/issues/66937) | [Bug]: lmstudio provider does not allow to skip api key | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66937.md) | complete | Apr 25, 2026, 03:30 UTC |
| [#66844](https://github.com/openclaw/openclaw/pull/66844) | fix(memory): recognize ollama as valid embedding provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66844.md) | complete | Apr 25, 2026, 03:30 UTC |
| [#66963](https://github.com/openclaw/openclaw/issues/66963) | openclaw agent crashes on startup with ReferenceError in buildPollSchema | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66963.md) | complete | Apr 25, 2026, 03:30 UTC |
| [#66938](https://github.com/openclaw/openclaw/issues/66938) | Feature request: per-account and per-peer sendPolicy matching for shadow mode DM handling | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66938.md) | complete | Apr 25, 2026, 03:30 UTC |
| [#66933](https://github.com/openclaw/openclaw/pull/66933) | feat(tools): per-sender tool capability tiers via toolsBySender | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66933.md) | complete | Apr 25, 2026, 03:30 UTC |
| [#66875](https://github.com/openclaw/openclaw/issues/66875) | Webchat race: chat final / session.message / sessions.changed triggers eager chat.history reload, causing flicker, collapse, or duplicate bubbles | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66875.md) | complete | Apr 25, 2026, 03:30 UTC |
| [#66888](https://github.com/openclaw/openclaw/issues/66888) | Reasoning/thinking content leaked into assistant reply as visible output (heartbeat loop) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66888.md) | complete | Apr 25, 2026, 03:30 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that selects the next open items once, starting from `#1`, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically.

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
