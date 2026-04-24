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

Last dashboard update: Apr 24, 2026, 00:39 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19149 |
| Reviewed files | 73 |
| Fresh verified reviews in the last 7 days | 73 |
| Proposed closes awaiting apply | 32 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 19076 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#7450](https://github.com/openclaw/openclaw/issues/7450) | Feature: Interrupt tool execution on priority message | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7450.md) | complete | Apr 24, 2026, 00:39 UTC |
| [#7322](https://github.com/openclaw/openclaw/issues/7322) | [Feature]: Support new openrouter/stepfun/step-3.5-flash:free model | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7322.md) | complete | Apr 24, 2026, 00:37 UTC |
| [#7403](https://github.com/openclaw/openclaw/issues/7403) | Feature: Private Mode for demos and content creation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7403.md) | complete | Apr 24, 2026, 00:37 UTC |
| [#7297](https://github.com/openclaw/openclaw/issues/7297) | Feature: Wire up after_tool_call hook + exec auto-retry on failure | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7297.md) | complete | Apr 24, 2026, 00:37 UTC |
| [#7284](https://github.com/openclaw/openclaw/issues/7284) | [Feature Request] Per-model tool policies for safe fallback behavior | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7284.md) | complete | Apr 24, 2026, 00:36 UTC |
| [#7359](https://github.com/openclaw/openclaw/issues/7359) | [Slack] Agent lacks visibility into own channel messages from DM sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7359.md) | complete | Apr 24, 2026, 00:36 UTC |
| [#7281](https://github.com/openclaw/openclaw/issues/7281) | Feature: fallbackChannel for hook mappings when primary delivery fails | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7281.md) | complete | Apr 24, 2026, 00:36 UTC |
| [#7302](https://github.com/openclaw/openclaw/issues/7302) | feat(whatsapp): Add voice note waveform/duration metadata for transcription support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7302.md) | complete | Apr 24, 2026, 00:35 UTC |
| [#7309](https://github.com/openclaw/openclaw/issues/7309) | [Feature]: Support DeepSeek API as a first-class LLM provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7309.md) | complete | Apr 24, 2026, 00:35 UTC |
| [#7227](https://github.com/openclaw/openclaw/issues/7227) | [Security] Accessibility permissions requested for 'node' exposes all npm packages to GUI automation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7227.md) | complete | Apr 24, 2026, 00:35 UTC |
| [#7414](https://github.com/openclaw/openclaw/issues/7414) | Feature Request: Bundle NoChat encrypted channel plugin | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7414.md) | complete | Apr 24, 2026, 00:34 UTC |
| [#7200](https://github.com/openclaw/openclaw/issues/7200) | Feature Request: Real-time Voice Conversation Support | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7200.md) | complete | Apr 24, 2026, 00:34 UTC |
| [#6975](https://github.com/openclaw/openclaw/issues/6975) | [Feature] Configurable reply context length for Telegram | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6975.md) | complete | Apr 24, 2026, 00:34 UTC |
| [#7249](https://github.com/openclaw/openclaw/issues/7249) | [Feature]: Support Claude Models via Azure service | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7249.md) | complete | Apr 24, 2026, 00:34 UTC |
| [#6890](https://github.com/openclaw/openclaw/issues/6890) | [Feature]: Add Ralph Loop feature and add max iteration number into the agent configuration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6890.md) | complete | Apr 24, 2026, 00:34 UTC |
| [#7095](https://github.com/openclaw/openclaw/issues/7095) | Feature Request: Support multimodal content blocks (images) in gateway agent method | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7095.md) | complete | Apr 24, 2026, 00:34 UTC |
| [#7034](https://github.com/openclaw/openclaw/issues/7034) | [RFC] WhatsApp Security Proxy: Process-Isolated 'Dumb Proxy' Pattern for External Channels 🦞 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7034.md) | complete | Apr 24, 2026, 00:34 UTC |
| [#7057](https://github.com/openclaw/openclaw/issues/7057) | Flaky tests on Windows/WSL: timeouts and ENOENT in pi-tools workspace-paths & safe-bins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7057.md) | complete | Apr 24, 2026, 00:34 UTC |
| [#7080](https://github.com/openclaw/openclaw/issues/7080) | Feature Request: Enable Processing of WhatsApp Emotion and Poll Responses by Agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7080.md) | complete | Apr 24, 2026, 00:34 UTC |
| [#7234](https://github.com/openclaw/openclaw/issues/7234) | Feature: Granular Discord action gates (split actions.messages into read/edit/delete) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7234.md) | complete | Apr 24, 2026, 00:33 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that selects the next open items once, starting from `#1`, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The final job merges artifacts and updates this README so the dashboard reflects progress.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 2 --shard-count 10 --max-pages 250 --codex-model gpt-5.4 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 2 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.4 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
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
