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

Last dashboard update: Apr 24, 2026, 04:34 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19098 |
| Reviewed / proposed closes | 1786 / 811 |
| Reviewed files | 1786 |
| Fresh verified reviews in the last 7 days | 1786 |
| Proposed closes awaiting apply | 811 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 17312 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#39222](https://github.com/openclaw/openclaw/issues/39222) | CLI can leave orphan openclaw-gateway processes on Linux/systemd when gateway.mode=local | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39222.md) | complete | Apr 24, 2026, 04:33 UTC |
| [#39259](https://github.com/openclaw/openclaw/issues/39259) | [Feature]: add gpt 5.4 in github copilot provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39259.md) | complete | Apr 24, 2026, 04:33 UTC |
| [#39285](https://github.com/openclaw/openclaw/issues/39285) | bug: voice-call TTS speed config uses \|\| instead of ?? (same class as #39191) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39285.md) | complete | Apr 24, 2026, 04:33 UTC |
| [#39274](https://github.com/openclaw/openclaw/issues/39274) | Discord: MESSAGE_CREATE listener times out (80+ seconds) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39274.md) | complete | Apr 24, 2026, 04:33 UTC |
| [#39320](https://github.com/openclaw/openclaw/pull/39320) | UI: fix agent settings save button for auto-discovered agents | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39320.md) | complete | Apr 24, 2026, 04:32 UTC |
| [#39306](https://github.com/openclaw/openclaw/pull/39306) | fix(ui): enable Save when editing agents without existing config entries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39306.md) | complete | Apr 24, 2026, 04:32 UTC |
| [#39269](https://github.com/openclaw/openclaw/pull/39269) | fix: batch bug fixes — routing, delivery, errors, plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39269.md) | complete | Apr 24, 2026, 04:32 UTC |
| [#39253](https://github.com/openclaw/openclaw/issues/39253) | Gemini OpenAI-compatible API regression: provider/model format sent to Google instead of bare model ID | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39253.md) | complete | Apr 24, 2026, 04:32 UTC |
| [#39242](https://github.com/openclaw/openclaw/pull/39242) | fix(gateway): honor service marker and explicit port for stale pid cleanup | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39242.md) | complete | Apr 24, 2026, 04:32 UTC |
| [#39303](https://github.com/openclaw/openclaw/issues/39303) | [Bug]: health-monitor stale-socket breaks webhook mode with self-signed certs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39303.md) | complete | Apr 24, 2026, 04:32 UTC |
| [#39250](https://github.com/openclaw/openclaw/issues/39250) | [Config] Migrate legacy gateway.bind to new bind mode format | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39250.md) | complete | Apr 24, 2026, 04:31 UTC |
| [#39323](https://github.com/openclaw/openclaw/pull/39323) | feat(pairing): add owner notification on new pairing requests | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39323.md) | complete | Apr 24, 2026, 04:31 UTC |
| [#39297](https://github.com/openclaw/openclaw/issues/39297) | Feature Request: Built-in Agent Cost & Usage Analytics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39297.md) | complete | Apr 24, 2026, 04:31 UTC |
| [#39307](https://github.com/openclaw/openclaw/issues/39307) | feat: surface mid-thread context reset/compaction to users | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39307.md) | complete | Apr 24, 2026, 04:31 UTC |
| [#39156](https://github.com/openclaw/openclaw/issues/39156) | [Bug]: diagnostics-otel plugin: OTLP log export doesn't work — module isolation between gateway and plugin-sdk | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39156.md) | complete | Apr 24, 2026, 04:31 UTC |
| [#39322](https://github.com/openclaw/openclaw/pull/39322) | feat(imessage): add tapback reaction support as inbound agent events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39322.md) | complete | Apr 24, 2026, 04:31 UTC |
| [#39261](https://github.com/openclaw/openclaw/issues/39261) | Bug: Mattermost intercepts slash commands — /model, /new, /status, etc. never reach OpenClaw | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39261.md) | complete | Apr 24, 2026, 04:31 UTC |
| [#39265](https://github.com/openclaw/openclaw/issues/39265) | Feature request: compaction.suffix — inject custom text into compaction summaries | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39265.md) | complete | Apr 24, 2026, 04:31 UTC |
| [#39117](https://github.com/openclaw/openclaw/pull/39117) | fix: recover busy sessions and improve queued handling | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39117.md) | complete | Apr 24, 2026, 04:31 UTC |
| [#39296](https://github.com/openclaw/openclaw/issues/39296) | Feature Request: Native Heartbeat Pre-Check / Gatekeeper Pattern | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39296.md) | complete | Apr 24, 2026, 04:31 UTC |

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
