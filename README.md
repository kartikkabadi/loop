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

Last dashboard update: Apr 24, 2026, 03:52 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19152 |
| Reviewed / proposed closes | 1386 / 615 |
| Reviewed files | 1386 |
| Fresh verified reviews in the last 7 days | 1386 |
| Proposed closes awaiting apply | 615 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 17766 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#38307](https://github.com/openclaw/openclaw/issues/38307) | BlueBubbles: periodic stale-socket restarts correlate with inbound gaps (multi-account on macOS 26.3) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38307.md) | complete | Apr 24, 2026, 03:52 UTC |
| [#38272](https://github.com/openclaw/openclaw/issues/38272) | Discord Thread Session Binding Not Working | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38272.md) | complete | Apr 24, 2026, 03:51 UTC |
| [#38298](https://github.com/openclaw/openclaw/issues/38298) | [Bug]: Config hot-reload corrupts provider adapter state — persistent 404 until gateway restart | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38298.md) | complete | Apr 24, 2026, 03:51 UTC |
| [#38309](https://github.com/openclaw/openclaw/issues/38309) | feat: support SecretRef in sandbox.docker.env | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38309.md) | complete | Apr 24, 2026, 03:51 UTC |
| [#38291](https://github.com/openclaw/openclaw/issues/38291) | bug(gemini/replies): user-visible paths can leak raw reasoning/tagged text after tool use; cleaned final payload and stored transcript diverge | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38291.md) | complete | Apr 24, 2026, 03:51 UTC |
| [#38274](https://github.com/openclaw/openclaw/pull/38274) | Plugins: parse version spec in update command | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38274.md) | complete | Apr 24, 2026, 03:50 UTC |
| [#38273](https://github.com/openclaw/openclaw/issues/38273) | [Bug] Gemini 3.1-pro-preview returns \"Unknown model\" / 404 in 2026.3.2 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38273.md) | complete | Apr 24, 2026, 03:50 UTC |
| [#38313](https://github.com/openclaw/openclaw/issues/38313) | [Feature]: Can I set multiple LLM model under Openclaw | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38313.md) | complete | Apr 24, 2026, 03:50 UTC |
| [#38275](https://github.com/openclaw/openclaw/issues/38275) | Feature: per-topic model overrides in channels.telegram.groups.*.topics.* | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38275.md) | complete | Apr 24, 2026, 03:50 UTC |
| [#38310](https://github.com/openclaw/openclaw/pull/38310) | feat(secrets): support SecretRef in sandbox.docker.env | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38310.md) | complete | Apr 24, 2026, 03:50 UTC |
| [#38303](https://github.com/openclaw/openclaw/pull/38303) | fix(gateway): reduce agent timeout and add stuck session auto-recovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38303.md) | complete | Apr 24, 2026, 03:50 UTC |
| [#38262](https://github.com/openclaw/openclaw/issues/38262) | [Bug]: session.resetByChannel does not reset Discord channel sessions (updatedAt pre-bumped before freshness check) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38262.md) | complete | Apr 24, 2026, 03:49 UTC |
| [#38223](https://github.com/openclaw/openclaw/issues/38223) | [Bug]: WebUI displays \"No output\" for all tool results even though stdout contains data | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38223.md) | complete | Apr 24, 2026, 03:49 UTC |
| [#38280](https://github.com/openclaw/openclaw/issues/38280) | Feature Request: Programmatic tool calling from workspace scripts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38280.md) | complete | Apr 24, 2026, 03:49 UTC |
| [#38260](https://github.com/openclaw/openclaw/issues/38260) | [Bug]: openclaw-gateway crashes with SIGILL (invalid opcode) in libvips-cpp during webchat image-flow repro | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38260.md) | complete | Apr 24, 2026, 03:49 UTC |
| [#38231](https://github.com/openclaw/openclaw/issues/38231) | Feature Request: Restore recursive skill scanning for better skill organization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38231.md) | complete | Apr 24, 2026, 03:49 UTC |
| [#38268](https://github.com/openclaw/openclaw/pull/38268) | fix(sessions): updateLastRoute should not bump updatedAt | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38268.md) | complete | Apr 24, 2026, 03:49 UTC |
| [#38228](https://github.com/openclaw/openclaw/pull/38228) | fix: extract text from array content in tool cards | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38228.md) | complete | Apr 24, 2026, 03:48 UTC |
| [#38279](https://github.com/openclaw/openclaw/pull/38279) | fix(feishu): drop invalid media request timeout fields | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38279.md) | complete | Apr 24, 2026, 03:48 UTC |
| [#38256](https://github.com/openclaw/openclaw/issues/38256) | [Bug]: Model ID resolution discrepancy: Documentation suggests provider/model format but NVIDIA NIM requires bare model ID | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38256.md) | complete | Apr 24, 2026, 03:48 UTC |

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
npm run plan -- --batch-size 5 --shard-count 20 --max-pages 250 --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast
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
