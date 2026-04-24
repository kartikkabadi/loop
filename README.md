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

Last dashboard update: Apr 24, 2026, 08:49 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12521 |
| Fresh reviewed issues in the last 7 days | 3610 |
| Proposed issue closes | 1961 (54.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6583 |
| Fresh reviewed PRs in the last 7 days | 1776 |
| Proposed PR closes | 609 (34.3% of reviewed PRs) |
| Open items total | 19104 |
| Reviewed files | 5386 |
| Fresh verified reviews in the last 7 days | 5386 |
| Proposed closes awaiting apply | 2570 (47.7% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 13718 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#46273](https://github.com/openclaw/openclaw/issues/46273) | [Bug] GLM-5 Image Recognition Broken After 2026.3.12 Update | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46273.md) | complete | Apr 24, 2026, 08:48 UTC |
| [#46261](https://github.com/openclaw/openclaw/issues/46261) | [Feature]: Integrate pi-multi-pass | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46261.md) | complete | Apr 24, 2026, 08:46 UTC |
| [#46351](https://github.com/openclaw/openclaw/issues/46351) | [Feature]: Per-Agent Discord Webhook Reply Override | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46351.md) | complete | Apr 24, 2026, 08:46 UTC |
| [#46267](https://github.com/openclaw/openclaw/issues/46267) | [Bug] Secondary Effect of Account Hijack - Multiple agents respond to single @mention | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46267.md) | complete | Apr 24, 2026, 08:45 UTC |
| [#46298](https://github.com/openclaw/openclaw/issues/46298) | sessions_yield terminates isolated cron sessions instead of waiting for next turn | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46298.md) | complete | Apr 24, 2026, 08:45 UTC |
| [#46309](https://github.com/openclaw/openclaw/issues/46309) | [Bug]: model fallback doesn't work at all. also this can break long tasks from running. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46309.md) | complete | Apr 24, 2026, 08:45 UTC |
| [#46320](https://github.com/openclaw/openclaw/pull/46320) | fix: validate parent dir realpath on Windows before new file creation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46320.md) | complete | Apr 24, 2026, 08:45 UTC |
| [#46317](https://github.com/openclaw/openclaw/issues/46317) | [Feature]: Pre prompt Rag Hook | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46317.md) | complete | Apr 24, 2026, 08:45 UTC |
| [#46254](https://github.com/openclaw/openclaw/issues/46254) | [Bug] Subagent Docker containers not auto-removed after completion, causing maxConcurrent slot exhaustion | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46254.md) | complete | Apr 24, 2026, 08:45 UTC |
| [#46342](https://github.com/openclaw/openclaw/pull/46342) | fix: add defense-in-depth sanitization to MEDIA directive parsing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46342.md) | complete | Apr 24, 2026, 08:45 UTC |
| [#46302](https://github.com/openclaw/openclaw/issues/46302) | Feature request: expose registerInternalHook / clearBootstrapSnapshot via plugin SDK for bootstrap hot-reload | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46302.md) | complete | Apr 24, 2026, 08:45 UTC |
| [#46165](https://github.com/openclaw/openclaw/pull/46165) | fix(dispatch): send fallback reply when agent produces zero responses (closes #32903) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46165.md) | complete | Apr 24, 2026, 08:45 UTC |
| [#46326](https://github.com/openclaw/openclaw/issues/46326) | Audio transcription stopped working after update to 2026.3.12/3.13 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46326.md) | complete | Apr 24, 2026, 08:44 UTC |
| [#46156](https://github.com/openclaw/openclaw/pull/46156) | fix: show provider/model format in /model command suggestions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46156.md) | complete | Apr 24, 2026, 08:44 UTC |
| [#46282](https://github.com/openclaw/openclaw/issues/46282) | [Bug]: Telegram media download uses native fetch instead of proxy-aware fetch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46282.md) | complete | Apr 24, 2026, 08:44 UTC |
| [#46258](https://github.com/openclaw/openclaw/pull/46258) | Add Telegram ack reaction timing control | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46258.md) | complete | Apr 24, 2026, 08:44 UTC |
| [#46274](https://github.com/openclaw/openclaw/issues/46274) | [Feature]: Support WeChat Official Account (微信公众号) Integration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46274.md) | complete | Apr 24, 2026, 08:44 UTC |
| [#46311](https://github.com/openclaw/openclaw/pull/46311) | fix: block JVM/.NET/Rust/Ansible env vars in host exec blocklist | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46311.md) | complete | Apr 24, 2026, 08:44 UTC |
| [#46297](https://github.com/openclaw/openclaw/issues/46297) | Feature: Suppress typing indicator when message matches hold pattern | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46297.md) | complete | Apr 24, 2026, 08:44 UTC |
| [#46268](https://github.com/openclaw/openclaw/pull/46268) | fix(feishu): preserve read tool image paths for auto-reply media | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46268.md) | complete | Apr 24, 2026, 08:44 UTC |

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
