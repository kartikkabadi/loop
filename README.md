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

Last dashboard update: Apr 24, 2026, 05:46 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19093 |
| Reviewed / proposed closes | 2786 / 1290 |
| Reviewed files | 2786 |
| Fresh verified reviews in the last 7 days | 2786 |
| Proposed closes awaiting apply | 1290 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 16307 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#41355](https://github.com/openclaw/openclaw/issues/41355) | Discord: ThreadStarterBody re-injected on every turn (echo contamination) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41355.md) | complete | Apr 24, 2026, 05:45 UTC |
| [#41277](https://github.com/openclaw/openclaw/pull/41277) | fix(gateway): run before_reset hooks for sessions.reset | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41277.md) | complete | Apr 24, 2026, 05:44 UTC |
| [#41423](https://github.com/openclaw/openclaw/issues/41423) | [Bug]: Network drop leads to cascading sessions, leads to degraded gateway state | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41423.md) | complete | Apr 24, 2026, 05:44 UTC |
| [#41353](https://github.com/openclaw/openclaw/issues/41353) | From @Krill: `openclaw gateway restart` should attempt bootstrap when plist exists but service isn’t loaded (macOS launchd) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41353.md) | complete | Apr 24, 2026, 05:44 UTC |
| [#41410](https://github.com/openclaw/openclaw/pull/41410) | telegram: add forum topic deletion support to message delete action | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41410.md) | complete | Apr 24, 2026, 05:43 UTC |
| [#41394](https://github.com/openclaw/openclaw/issues/41394) | [Feature]: add config validation mode (strict vs tolerant) for different operations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41394.md) | complete | Apr 24, 2026, 05:43 UTC |
| [#41363](https://github.com/openclaw/openclaw/issues/41363) | Native Voice Input for Control UI (ChatGPT-style) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41363.md) | complete | Apr 24, 2026, 05:43 UTC |
| [#41369](https://github.com/openclaw/openclaw/issues/41369) | [Bug]: \"Update now\" button does not work | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41369.md) | complete | Apr 24, 2026, 05:43 UTC |
| [#41397](https://github.com/openclaw/openclaw/issues/41397) | voice-call: initial message uses Twilio <Say> fallback instead of ElevenLabs when media stream not yet active | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41397.md) | complete | Apr 24, 2026, 05:43 UTC |
| [#41408](https://github.com/openclaw/openclaw/pull/41408) | Retry LanceDB initialization after failures | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41408.md) | complete | Apr 24, 2026, 05:43 UTC |
| [#41375](https://github.com/openclaw/openclaw/pull/41375) | fix(hooks): deliver internal hook replies on replyable surfaces | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41375.md) | complete | Apr 24, 2026, 05:43 UTC |
| [#41372](https://github.com/openclaw/openclaw/issues/41372) | Field Report: 25 findings from 4 weeks of self-hosted production use (config crashes, CLI docs, Discord, cron) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41372.md) | complete | Apr 24, 2026, 05:42 UTC |
| [#41389](https://github.com/openclaw/openclaw/pull/41389) | fix(memory-lancedb): clear cached rejected promise on import failure | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41389.md) | complete | Apr 24, 2026, 05:42 UTC |
| [#41412](https://github.com/openclaw/openclaw/issues/41412) | write tool rejects symlinks with 'sandbox root' error even when sandbox: off | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41412.md) | complete | Apr 24, 2026, 05:42 UTC |
| [#41382](https://github.com/openclaw/openclaw/pull/41382) | docs(plugins): add Memory-Munch to community plugin list | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41382.md) | complete | Apr 24, 2026, 05:42 UTC |
| [#41434](https://github.com/openclaw/openclaw/pull/41434) | Bootstrap unloaded launchd gateway on restart | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41434.md) | complete | Apr 24, 2026, 05:42 UTC |
| [#41416](https://github.com/openclaw/openclaw/pull/41416) | feat(chutes): add OAuth and API key authentication for Chutes provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41416.md) | complete | Apr 24, 2026, 05:42 UTC |
| [#41350](https://github.com/openclaw/openclaw/pull/41350) | fix(security): detect Gemini/Grok/Kimi env-var web search keys in audit | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41350.md) | complete | Apr 24, 2026, 05:42 UTC |
| [#41403](https://github.com/openclaw/openclaw/pull/41403) | docs: define hook surface ownership and middleware guidance | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41403.md) | complete | Apr 24, 2026, 05:42 UTC |
| [#41420](https://github.com/openclaw/openclaw/pull/41420) | fix(discord): Discord WebSocket disconnects every 10-35 minutes conti… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41420.md) | complete | Apr 24, 2026, 05:42 UTC |

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
