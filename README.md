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

Last dashboard update: Apr 24, 2026, 08:20 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12517 |
| Fresh reviewed issues in the last 7 days | 3356 |
| Proposed issue closes | 1800 (53.6% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6579 |
| Fresh reviewed PRs in the last 7 days | 1630 |
| Proposed PR closes | 547 (33.6% of reviewed PRs) |
| Open items total | 19096 |
| Reviewed files | 4986 |
| Fresh verified reviews in the last 7 days | 4986 |
| Proposed closes awaiting apply | 2347 (47.1% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 14110 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#45553](https://github.com/openclaw/openclaw/issues/45553) | systemEvent cron jobs always show skipped/disabled even when enabled | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45553.md) | complete | Apr 24, 2026, 08:20 UTC |
| [#45566](https://github.com/openclaw/openclaw/pull/45566) | docs: add bot validation marker for PR workflow test | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45566.md) | complete | Apr 24, 2026, 08:19 UTC |
| [#45554](https://github.com/openclaw/openclaw/issues/45554) | [Bug]: switching session.dmScope back to main does not reconcile stale peer-keyed direct DM sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45554.md) | complete | Apr 24, 2026, 08:19 UTC |
| [#45573](https://github.com/openclaw/openclaw/issues/45573) | Group chat sessions not persisted — only 1 session from 166+ messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45573.md) | complete | Apr 24, 2026, 08:19 UTC |
| [#45594](https://github.com/openclaw/openclaw/pull/45594) | Cron: honor server_error retries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45594.md) | complete | Apr 24, 2026, 08:19 UTC |
| [#45590](https://github.com/openclaw/openclaw/pull/45590) | fix: improve stability across gateway, cli, and channels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45590.md) | complete | Apr 24, 2026, 08:19 UTC |
| [#45540](https://github.com/openclaw/openclaw/issues/45540) | ReferenceError: Cannot access 'ANTHROPIC_MODEL_ALIASES' before initialization when using agents.defaults.model object form | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45540.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45569](https://github.com/openclaw/openclaw/issues/45569) | [Bug]: /status in the web ui needs <enter> pressed twice | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45569.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45544](https://github.com/openclaw/openclaw/issues/45544) | [Bug]: All Google Chat webhooks return 404 after 2026.3.12 update (jiti/ESM registry split) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45544.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45585](https://github.com/openclaw/openclaw/issues/45585) | Compaction corrupts thinking blocks → \"thinking blocks cannot be modified\" API error | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45585.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45597](https://github.com/openclaw/openclaw/issues/45597) | [Bug]: Recurring Ollama context overflow errors - prompt too long | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45597.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45588](https://github.com/openclaw/openclaw/pull/45588) | Auto-reply: retry interim execution acknowledgements | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45588.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45583](https://github.com/openclaw/openclaw/pull/45583) | fix(hooks): handle empty hooks update --all | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45583.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45579](https://github.com/openclaw/openclaw/pull/45579) | fix(utils): preserve indentation after stripping inline directive tags | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45579.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45535](https://github.com/openclaw/openclaw/pull/45535) | fix: robust token usage normalization for OpenAI-compatible providers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45535.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45500](https://github.com/openclaw/openclaw/issues/45500) | Duplicate Discord message delivery on LLM retry after partial delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45500.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45561](https://github.com/openclaw/openclaw/issues/45561) | [Feature]: Native Gemini Live API Support (gemini-2.5-flash-native-audio-preview) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45561.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45592](https://github.com/openclaw/openclaw/pull/45592) | feat(anthropic): migrate 1M context from beta to GA | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45592.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45480](https://github.com/openclaw/openclaw/issues/45480) | TDZ crash: ANTHROPIC_MODEL_ALIASES accessed before initialization during eager context window warmup | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45480.md) | complete | Apr 24, 2026, 08:18 UTC |
| [#45558](https://github.com/openclaw/openclaw/issues/45558) | Compaction fails: thinking/redacted_thinking blocks cannot be modified | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45558.md) | complete | Apr 24, 2026, 08:18 UTC |

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
