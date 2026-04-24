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

Last dashboard update: Apr 24, 2026, 06:41 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12497 |
| Fresh reviewed issues in the last 7 days | 2491 |
| Proposed issue closes | 1298 (52.1% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6579 |
| Fresh reviewed PRs in the last 7 days | 1095 |
| Proposed PR closes | 354 (32.3% of reviewed PRs) |
| Open items total | 19076 |
| Reviewed files | 3586 |
| Fresh verified reviews in the last 7 days | 3586 |
| Proposed closes awaiting apply | 1652 (46.1% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 15490 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#42945](https://github.com/openclaw/openclaw/pull/42945) | feat(ui): add mouse-based drag scrolling for horizontal navigation bar | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42945.md) | complete | Apr 24, 2026, 06:41 UTC |
| [#42936](https://github.com/openclaw/openclaw/pull/42936) | fix(feishu): streaming config support boolean and object formats | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42936.md) | complete | Apr 24, 2026, 06:40 UTC |
| [#42967](https://github.com/openclaw/openclaw/pull/42967) | feat(tts): add optional voiceId parameter for per-agent voice overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42967.md) | complete | Apr 24, 2026, 06:40 UTC |
| [#42850](https://github.com/openclaw/openclaw/issues/42850) | [Bug] Token usage 统计在 2026.3.8 版本中始终返回 0 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42850.md) | complete | Apr 24, 2026, 06:40 UTC |
| [#42940](https://github.com/openclaw/openclaw/pull/42940) | fix(feishu): prevent streaming card duplication on multi-final replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42940.md) | complete | Apr 24, 2026, 06:39 UTC |
| [#42980](https://github.com/openclaw/openclaw/issues/42980) | [Feature]: Dashboard - browse archived/historical session transcripts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42980.md) | complete | Apr 24, 2026, 06:39 UTC |
| [#42971](https://github.com/openclaw/openclaw/pull/42971) | feat(Pulaoecho-voice-assistant): Implement WSS connection with passwo… | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42971.md) | complete | Apr 24, 2026, 06:39 UTC |
| [#42839](https://github.com/openclaw/openclaw/issues/42839) | [Bug] Windows: openclaw agent --local returns 401 Missing Authentication header after clean reset and fresh onboarding | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42839.md) | complete | Apr 24, 2026, 06:39 UTC |
| [#42987](https://github.com/openclaw/openclaw/pull/42987) | cron: add procedural playbook memory v0 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42987.md) | complete | Apr 24, 2026, 06:38 UTC |
| [#42960](https://github.com/openclaw/openclaw/issues/42960) | [Bug]: Cron jobs enqueued but never execute — lane never dispatches, runningAtMs written on enqueue causes permanent stale marker loop | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42960.md) | complete | Apr 24, 2026, 06:38 UTC |
| [#42963](https://github.com/openclaw/openclaw/issues/42963) | Anthropic extended thinking: 'thinking blocks cannot be modified' error on session replay | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42963.md) | complete | Apr 24, 2026, 06:38 UTC |
| [#42864](https://github.com/openclaw/openclaw/issues/42864) | Feature: Session-level circuit breaker (pause after N consecutive model errors) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42864.md) | complete | Apr 24, 2026, 06:38 UTC |
| [#42993](https://github.com/openclaw/openclaw/issues/42993) | [Feature Request] Telegram: Support user interrupt during long-running agent tasks | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42993.md) | complete | Apr 24, 2026, 06:38 UTC |
| [#42947](https://github.com/openclaw/openclaw/issues/42947) | contextTokens shows 0% even when session has substantial content | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42947.md) | complete | Apr 24, 2026, 06:38 UTC |
| [#42995](https://github.com/openclaw/openclaw/pull/42995) | feat: cross-channel memory sharing for unified agent experience | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42995.md) | complete | Apr 24, 2026, 06:38 UTC |
| [#42843](https://github.com/openclaw/openclaw/pull/42843) | fix(whatsapp): never permanently stop reconnect monitor loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42843.md) | complete | Apr 24, 2026, 06:38 UTC |
| [#42933](https://github.com/openclaw/openclaw/pull/42933) | feat: session-level circuit breaker (pause after N consecutive model errors) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42933.md) | complete | Apr 24, 2026, 06:38 UTC |
| [#42903](https://github.com/openclaw/openclaw/issues/42903) | [Bug]: WebChat does not send images to non-default agents (e.g., m2) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42903.md) | complete | Apr 24, 2026, 06:38 UTC |
| [#42978](https://github.com/openclaw/openclaw/pull/42978) | fix(auth): add bailian to PROVIDER_ENV_API_KEY_CANDIDATES | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42978.md) | complete | Apr 24, 2026, 06:38 UTC |
| [#42954](https://github.com/openclaw/openclaw/pull/42954) | fix(auth): add bailian env api key mapping | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42954.md) | complete | Apr 24, 2026, 06:38 UTC |

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
