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

Last dashboard update: Apr 24, 2026, 16:42 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12538 |
| Fresh reviewed issues in the last 7 days | 7707 |
| Proposed issue closes | 4316 (56% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6622 |
| Fresh reviewed PRs in the last 7 days | 4040 |
| Proposed PR closes | 1281 (31.7% of reviewed PRs) |
| Open items total | 19160 |
| Reviewed files | 11747 |
| Archived closed files | 32 |
| Fresh verified reviews in the last 7 days | 11747 |
| Proposed closes awaiting apply | 5597 (47.6% of fresh reviews) |
| Closed by Codex apply | 20 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 7413 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#58306](https://github.com/openclaw/openclaw/issues/58306) | [Bug]: Gateway process storm: KeepAlive + ThrottleInterval=1 causes 30+ zombie processes when port isn't released before restart | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58306.md) | complete | Apr 24, 2026, 16:42 UTC |
| [#58286](https://github.com/openclaw/openclaw/issues/58286) | [Bug]: Build-time plugin deps bypass lockfile, vulnerable to supply chain attacks (axios incident) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58286.md) | complete | Apr 24, 2026, 16:41 UTC |
| [#58248](https://github.com/openclaw/openclaw/pull/58248) | add token expiry warning and auth rotate CLI (non-breaking) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58248.md) | complete | Apr 24, 2026, 16:41 UTC |
| [#58254](https://github.com/openclaw/openclaw/issues/58254) | [Bug]: gateway fails to restart after auto-update on macOS (launchd ThrottleInterval race) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58254.md) | complete | Apr 24, 2026, 16:41 UTC |
| [#58307](https://github.com/openclaw/openclaw/issues/58307) | Cron payload model field ignored — LiveSessionModelSwitchError overrides job-level model with agent default | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58307.md) | complete | Apr 24, 2026, 16:41 UTC |
| [#58308](https://github.com/openclaw/openclaw/issues/58308) | Fallback mechanism incorrectly requests primary model switch instead of using fallback model | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58308.md) | complete | Apr 24, 2026, 16:40 UTC |
| [#58291](https://github.com/openclaw/openclaw/pull/58291) | fix(build): add lockfiles for bundled plugin runtime deps | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58291.md) | complete | Apr 24, 2026, 16:40 UTC |
| [#58221](https://github.com/openclaw/openclaw/issues/58221) | [Bug]: Chrome extension browser relay unavailable on macOS 2026.3.28 — browser.request missing, port 18792 not listening, docs/CLI out of sync | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58221.md) | complete | Apr 24, 2026, 16:40 UTC |
| [#58305](https://github.com/openclaw/openclaw/issues/58305) | Regression v2026.3.28: LiveSessionModelSwitchError when spawning subagent with different model than parent | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58305.md) | complete | Apr 24, 2026, 16:40 UTC |
| [#58235](https://github.com/openclaw/openclaw/issues/58235) | [Bug]:  Gemini 3.1 Pro Preview via OpenAI-compatible API missing thought_signature in tool_calls | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58235.md) | complete | Apr 24, 2026, 16:40 UTC |
| [#58255](https://github.com/openclaw/openclaw/issues/58255) | Gemini memory indexing fails with fetch failed in WSL2/OpenClaw 2026.3.28, while direct Node fetch to Gemini embeddings succeeds | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58255.md) | complete | Apr 24, 2026, 16:40 UTC |
| [#58290](https://github.com/openclaw/openclaw/issues/58290) | Discord bot never reaches ready state — stuck at awaiting gateway readiness (v2026.3.28) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58290.md) | complete | Apr 24, 2026, 16:39 UTC |
| [#58256](https://github.com/openclaw/openclaw/issues/58256) | [Bug]: browser.server not starting after upgrade to v2026.3.28 - \"openclaw browser start\" command not found | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58256.md) | complete | Apr 24, 2026, 16:39 UTC |
| [#58304](https://github.com/openclaw/openclaw/issues/58304) | [Bug]: Cron job with non-isolated sessionTarget causes sessionId/sessionFile mismatch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58304.md) | complete | Apr 24, 2026, 16:39 UTC |
| [#58279](https://github.com/openclaw/openclaw/pull/58279) | test(sessions): add unit tests for session-key-utils | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58279.md) | complete | Apr 24, 2026, 16:39 UTC |
| [#58252](https://github.com/openclaw/openclaw/issues/58252) | QClaw Helper (GPU) process idle high CPU usage | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58252.md) | complete | Apr 24, 2026, 16:39 UTC |
| [#58187](https://github.com/openclaw/openclaw/pull/58187) | fix(config): DATABASE_URL missing warning fires 3310+ times per run causing log spam and stack overflow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58187.md) | complete | Apr 24, 2026, 16:39 UTC |
| [#58244](https://github.com/openclaw/openclaw/pull/58244) | fix(process): prune idle dynamic lanes from command queue Map to prevent memory leak | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58244.md) | complete | Apr 24, 2026, 16:39 UTC |
| [#58287](https://github.com/openclaw/openclaw/issues/58287) | Bug: Heartbeat prompt visible as user message in Control UI chat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58287.md) | complete | Apr 24, 2026, 16:39 UTC |
| [#58147](https://github.com/openclaw/openclaw/issues/58147) | Control UI / WebChat: Respect agents.defaults.timeFormat for session duration display | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58147.md) | complete | Apr 24, 2026, 16:39 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking.

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
