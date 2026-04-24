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

Last dashboard update: Apr 24, 2026, 09:17 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12523 |
| Fresh reviewed issues in the last 7 days | 3855 |
| Proposed issue closes | 2108 (54.7% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6590 |
| Fresh reviewed PRs in the last 7 days | 1931 |
| Proposed PR closes | 664 (34.4% of reviewed PRs) |
| Open items total | 19113 |
| Reviewed files | 5786 |
| Fresh verified reviews in the last 7 days | 5786 |
| Proposed closes awaiting apply | 2772 (47.9% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 13327 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#47238](https://github.com/openclaw/openclaw/issues/47238) | Per-thread agent routing for Telegram DM threads | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47238.md) | complete | Apr 24, 2026, 09:17 UTC |
| [#47241](https://github.com/openclaw/openclaw/issues/47241) | [Feature]: Sub Agents should know if a chat message is from a Human or my main AI agent | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47241.md) | complete | Apr 24, 2026, 09:17 UTC |
| [#47229](https://github.com/openclaw/openclaw/issues/47229) | [Bug]: Anthropic SDK path missing large-integer precision guard (tool_use input) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47229.md) | complete | Apr 24, 2026, 09:16 UTC |
| [#47268](https://github.com/openclaw/openclaw/issues/47268) | [msteams] FileConsentCard not updated after user accepts — consent card remains frozen | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47268.md) | complete | Apr 24, 2026, 09:16 UTC |
| [#47277](https://github.com/openclaw/openclaw/pull/47277) | feat: add user-specific memory isolation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47277.md) | complete | Apr 24, 2026, 09:16 UTC |
| [#47266](https://github.com/openclaw/openclaw/issues/47266) | [Bug]: Logfile rotation ineffective | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47266.md) | complete | Apr 24, 2026, 09:16 UTC |
| [#47259](https://github.com/openclaw/openclaw/issues/47259) | [Feature]: Feature Request: 强制知识库检查 (Force Knowledge Base Only Mode) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47259.md) | complete | Apr 24, 2026, 09:16 UTC |
| [#47255](https://github.com/openclaw/openclaw/pull/47255) | feat: add async parameter to sessions_send | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47255.md) | complete | Apr 24, 2026, 09:16 UTC |
| [#47239](https://github.com/openclaw/openclaw/pull/47239) | fix(acpx): preserve macOS system admin paths for spawned children | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47239.md) | complete | Apr 24, 2026, 09:15 UTC |
| [#47282](https://github.com/openclaw/openclaw/issues/47282) | [Bug] Heartbeat only fires once, then stops | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47282.md) | complete | Apr 24, 2026, 09:15 UTC |
| [#47123](https://github.com/openclaw/openclaw/issues/47123) | Webchat: messages silently truncated at ~4000 chars with no config override | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47123.md) | complete | Apr 24, 2026, 09:15 UTC |
| [#47225](https://github.com/openclaw/openclaw/pull/47225) | feat(context-engine): add toolsOverride to AssembleResult for selective tool schema injection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47225.md) | complete | Apr 24, 2026, 09:15 UTC |
| [#47172](https://github.com/openclaw/openclaw/pull/47172) | fix(skills): show correct source for workspace-installed skills | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47172.md) | complete | Apr 24, 2026, 09:15 UTC |
| [#47263](https://github.com/openclaw/openclaw/pull/47263) | Improve macOS onboarding UX and gateway setup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47263.md) | complete | Apr 24, 2026, 09:15 UTC |
| [#47243](https://github.com/openclaw/openclaw/pull/47243) | feat(ui): add timestamp and preview to session list | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47243.md) | complete | Apr 24, 2026, 09:15 UTC |
| [#47144](https://github.com/openclaw/openclaw/issues/47144) | [bug]：WWeb UI Conversation Display Error | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47144.md) | complete | Apr 24, 2026, 09:15 UTC |
| [#47200](https://github.com/openclaw/openclaw/issues/47200) | [Bug]: Telegram channel broken when using Mistral API | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47200.md) | complete | Apr 24, 2026, 09:15 UTC |
| [#47207](https://github.com/openclaw/openclaw/pull/47207) | fix(agents): use max_tokens for Mistral API compatibility | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47207.md) | complete | Apr 24, 2026, 09:15 UTC |
| [#47222](https://github.com/openclaw/openclaw/pull/47222) | fix(gateway): prevent spurious SIGTERM shutdown on CLI disconnect under systemd | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47222.md) | complete | Apr 24, 2026, 09:14 UTC |
| [#47252](https://github.com/openclaw/openclaw/pull/47252) | feat(channels): add KakaoTalk channel via Kakao i Open Builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47252.md) | complete | Apr 24, 2026, 09:14 UTC |

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
