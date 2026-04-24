# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 24, 2026, 09:02 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12522 |
| Fresh reviewed issues in the last 7 days | 3731 |
| Proposed issue closes | 2036 (54.6% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6588 |
| Fresh reviewed PRs in the last 7 days | 1855 |
| Proposed PR closes | 639 (34.4% of reviewed PRs) |
| Open items total | 19110 |
| Reviewed files | 5586 |
| Fresh verified reviews in the last 7 days | 5586 |
| Proposed closes awaiting apply | 2675 (47.9% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 13524 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#46768](https://github.com/openclaw/openclaw/issues/46768) | Orchestrator sessions go idle after spawning sub-agents — no progress updates without manual ping | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46768.md) | complete | Apr 24, 2026, 09:01 UTC |
| [#46740](https://github.com/openclaw/openclaw/pull/46740) | ACP: classify silent acpx exits as backend unavailable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46740.md) | complete | Apr 24, 2026, 09:01 UTC |
| [#46738](https://github.com/openclaw/openclaw/pull/46738) | fix: pass Anthropic cache control TTL through Cloudflare AI Gateway | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46738.md) | complete | Apr 24, 2026, 09:01 UTC |
| [#46741](https://github.com/openclaw/openclaw/pull/46741) | fix: defer sessions_yield announce until concurrent tool executions settle | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46741.md) | complete | Apr 24, 2026, 09:01 UTC |
| [#46772](https://github.com/openclaw/openclaw/issues/46772) | Doctor fabricates phantom accounts.default in multi-account Telegram config even with no top-level fields | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46772.md) | complete | Apr 24, 2026, 09:01 UTC |
| [#46769](https://github.com/openclaw/openclaw/issues/46769) | Gateway RPC timeout causes intermittent `openclaw cron list` failures (1000 normal closure) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46769.md) | complete | Apr 24, 2026, 09:01 UTC |
| [#46713](https://github.com/openclaw/openclaw/pull/46713) | fix(exec): fail closed for effective sandbox host | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46713.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46746](https://github.com/openclaw/openclaw/pull/46746) | fix(cron): enforce agent tool deny list at execution time | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46746.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46723](https://github.com/openclaw/openclaw/issues/46723) | Feishu: text content lost when sending image+text mixed message in group chat | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46723.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46717](https://github.com/openclaw/openclaw/issues/46717) | Gemini provider: function_response.name empty on session replay → 400 INVALID_ARGUMENT | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46717.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46765](https://github.com/openclaw/openclaw/pull/46765) | fix: map reasoning_effort minimal to low for NIM/vLLM | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46765.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46751](https://github.com/openclaw/openclaw/issues/46751) | [Feature]:Prevent clicks on occluded elements (Z-Index/Overlays) to resolve Action-State Hallucinations | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46751.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46736](https://github.com/openclaw/openclaw/issues/46736) | [Bug]: WebChat Message Injection | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46736.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46720](https://github.com/openclaw/openclaw/pull/46720) | docs(feishu): update permissions docs from official Lark guidance | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46720.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46727](https://github.com/openclaw/openclaw/pull/46727) | fix(feishu): prevent duplicate streaming cards via synchronous re-entry guard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46727.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46666](https://github.com/openclaw/openclaw/pull/46666) | fix: check interactiveReplies instead of inlineButtons in Slack system prompt | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46666.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46755](https://github.com/openclaw/openclaw/pull/46755) | feat(telegram): expose apiRoot config for custom Bot API server | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46755.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46742](https://github.com/openclaw/openclaw/pull/46742) | [AI-assisted] Plugins: keep read-only loads from replacing the active runtime registry | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46742.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46748](https://github.com/openclaw/openclaw/issues/46748) | OpenClaw logs display UTC time instead of local timezone | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46748.md) | complete | Apr 24, 2026, 09:00 UTC |
| [#46671](https://github.com/openclaw/openclaw/issues/46671) | [Bug] memory_search returns empty results in 2026.3.13 (regression from #29112 fix) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46671.md) | complete | Apr 24, 2026, 08:59 UTC |

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

Parallel workflow shards only receive planned item numbers. The final job merges artifacts and updates this README so the dashboard reflects progress. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written.

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
