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

Last dashboard update: Apr 24, 2026, 02:40 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19127 |
| Reviewed / proposed closes | 786 / 352 |
| Reviewed files | 786 |
| Fresh verified reviews in the last 7 days | 786 |
| Proposed closes awaiting apply | 352 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 18341 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#23906](https://github.com/openclaw/openclaw/issues/23906) | [Feature]: feat(sessions_spawn): per-spawn tool profile override | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/23906.md) | complete | Apr 24, 2026, 02:40 UTC |
| [#23096](https://github.com/openclaw/openclaw/pull/23096) | feat(secrets): add Bitwarden/Vaultwarden secret provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/23096.md) | complete | Apr 24, 2026, 02:40 UTC |
| [#23014](https://github.com/openclaw/openclaw/issues/23014) | [Feature]: Add .m2a audio format support for Telegram and media handling | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/23014.md) | complete | Apr 24, 2026, 02:40 UTC |
| [#23500](https://github.com/openclaw/openclaw/issues/23500) | [Feature]: ISSUE_WHATSAPP_PROXY | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/23500.md) | complete | Apr 24, 2026, 02:39 UTC |
| [#22724](https://github.com/openclaw/openclaw/issues/22724) | [Feature]: Skill usage telemetry & ratings on ClawhHub | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/22724.md) | complete | Apr 24, 2026, 02:39 UTC |
| [#23451](https://github.com/openclaw/openclaw/issues/23451) | [Feature]: Tool-level confirmation gate before execution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/23451.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#23653](https://github.com/openclaw/openclaw/issues/23653) | [Feature Request] Improving Usability and \"Software-style\" Experience | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/23653.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#23208](https://github.com/openclaw/openclaw/issues/23208) | TTS tool ignores messages.tts.elevenlabs.voiceId config | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/23208.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#22073](https://github.com/openclaw/openclaw/issues/22073) | [Feature]: Build an SEO-optimized advertising website for OpenClaw | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/22073.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#22676](https://github.com/openclaw/openclaw/issues/22676) | [Bug]: Signal daemon stop() race condition on SIGUSR1 restart — orphaned processes and send failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/22676.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#22060](https://github.com/openclaw/openclaw/issues/22060) | Security: Indirect prompt injection via URL link preview metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/22060.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#22631](https://github.com/openclaw/openclaw/issues/22631) | [Feature]: Make Model Configuration Provider-Aware | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/22631.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#22927](https://github.com/openclaw/openclaw/issues/22927) | [Feature]:  Add Postgres/pgvector store driver for memorySearch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/22927.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#22438](https://github.com/openclaw/openclaw/issues/22438) | feat: Tiered bootstrap file loading for progressive context control | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/22438.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#22603](https://github.com/openclaw/openclaw/issues/22603) | [Feature]: the Gemini new models from anti-gravity are not in the model section, and I can't use the Gemini 3 models as well, so pls fix the anti-gravity models and update it to the latest. | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/22603.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#23097](https://github.com/openclaw/openclaw/issues/23097) | [Feature]: [Discord] Agent receives history_count: 0 in Threads - can't see original message or conversation history | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/23097.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#23353](https://github.com/openclaw/openclaw/issues/23353) | [Feature]: Support Anthropic native server-side tools (web_search, web_fetch, code_execution) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/23353.md) | complete | Apr 24, 2026, 02:38 UTC |
| [#23718](https://github.com/openclaw/openclaw/issues/23718) | [Feature]: Fallback chain support for heartbeat.model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/23718.md) | complete | Apr 24, 2026, 02:37 UTC |
| [#22770](https://github.com/openclaw/openclaw/issues/22770) | [Feature]: Add $EDITOR compose mode in TUI (external editor handoff) for multiline prompts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/22770.md) | complete | Apr 24, 2026, 02:37 UTC |
| [#21844](https://github.com/openclaw/openclaw/issues/21844) | [Feature]: Discord Components v2 Interaction Handling | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/21844.md) | complete | Apr 24, 2026, 02:37 UTC |

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
