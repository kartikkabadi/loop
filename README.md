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

Last dashboard update: Apr 24, 2026, 20:17 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 11941 |
| Fresh reviewed issues in the last 7 days | 8818 |
| Proposed issue closes | 4655 (52.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6539 |
| Fresh reviewed PRs in the last 7 days | 4731 |
| Proposed PR closes | 1373 (29% of reviewed PRs) |
| Open items total | 18480 |
| Reviewed files | 13549 |
| Archived closed files | 719 |
| Fresh verified reviews in the last 7 days | 13549 |
| Proposed closes awaiting apply | 6028 (44.5% of fresh reviews) |
| Closed by Codex apply | 429 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 4931 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#62835](https://github.com/openclaw/openclaw/issues/62835) | Webchat: NO_REPLY silent responses are displayed to user | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62835.md) | complete | Apr 24, 2026, 20:17 UTC |
| [#62830](https://github.com/openclaw/openclaw/issues/62830) | Cron isolated session exec tool result not delivered to parent model after upgrade to 2026.4.5 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62830.md) | complete | Apr 24, 2026, 20:17 UTC |
| [#62823](https://github.com/openclaw/openclaw/issues/62823) | [Bug]: updated from 2026.4.2 to 2026.4.5,google-vertex doesn't work anymore | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62823.md) | complete | Apr 24, 2026, 20:16 UTC |
| [#62806](https://github.com/openclaw/openclaw/issues/62806) | [Bug]: 2026.4.5 — bundled provider plugins still hit stack overflow despite facade recursion guard | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62806.md) | complete | Apr 24, 2026, 20:15 UTC |
| [#62803](https://github.com/openclaw/openclaw/issues/62803) | CLI hangs indefinitely on 'openclaw memory index --force' and 'openclaw cron list' after gateway restart (v2026.4.5) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62803.md) | complete | Apr 24, 2026, 20:15 UTC |
| [#62848](https://github.com/openclaw/openclaw/issues/62848) | [Bug] Main lane failover is too slow for provider transport failures, allowing TUI/Telegram degradation before fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62848.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62836](https://github.com/openclaw/openclaw/pull/62836) | Add Slack Block Kit support for agent messages render blocks/buttons/sections | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62836.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62773](https://github.com/openclaw/openclaw/pull/62773) | feat: add `list` tool for directory enumeration (group:fs) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62773.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62833](https://github.com/openclaw/openclaw/issues/62833) | Webchat: ephemeral prependContext from plugins leaks into user-visible messages | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62833.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62805](https://github.com/openclaw/openclaw/issues/62805) | FEATURE: Add a same-session corpus ingest primitive for text files | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62805.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62840](https://github.com/openclaw/openclaw/issues/62840) | [Bug]:  Agent listener invoked outside active run - Gateway crashes on WhatsApp message | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62840.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62854](https://github.com/openclaw/openclaw/issues/62854) | Bug: update_plan tool causes problems on OpenAI/Codex providers in v2026.4.5 (regression vs 2026.4.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62854.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62767](https://github.com/openclaw/openclaw/issues/62767) | [Bug]: Gateway 1008 \"pairing required\" — exec bloqueado, persiste después de restart y redeploy | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62767.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62839](https://github.com/openclaw/openclaw/issues/62839) | [Bug]: openclaw update persists HTTP_PROXY into systemd service, breaking Feishu integration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62839.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62791](https://github.com/openclaw/openclaw/issues/62791) | [Bug]: Gateway crashes on Node 24.14.0 — two distinct causes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62791.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62807](https://github.com/openclaw/openclaw/pull/62807) | fix: harden heartbeat transcript rollback edge cases | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62807.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62814](https://github.com/openclaw/openclaw/issues/62814) | sessions_send A2A flow ping-pong causes duplicate messages in persistent sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62814.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62764](https://github.com/openclaw/openclaw/issues/62764) | openclaw doctor --fix regenerates user-systemd unit even when system unit owns the gateway, causing dual-instance deadlock | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62764.md) | complete | Apr 24, 2026, 20:14 UTC |
| [#62754](https://github.com/openclaw/openclaw/issues/62754) | Gateway: unhandled promise rejection from pi-agent-core Agent.processEvents after run abort/timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62754.md) | complete | Apr 24, 2026, 20:13 UTC |
| [#62793](https://github.com/openclaw/openclaw/issues/62793) | [Bug]: Subagent residual output causes \"Agent listener invoked outside active run\" → Gateway crash | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62793.md) | complete | Apr 24, 2026, 20:13 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. In workflow apply mode, the dashboard is left to the proposal publisher so apply and review lanes can push concurrently without racing on `README.md`. Apply runs also cap total processed items separately from fresh closes, which keeps recovery-heavy runs bounded. Apply mode defaults to `apply_min_age_days=30`, so new items are not auto-closed.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

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
