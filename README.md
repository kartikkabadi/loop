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

Last dashboard update: Apr 24, 2026, 10:47 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12537 |
| Fresh reviewed issues in the last 7 days | 4582 |
| Proposed issue closes | 2520 (55% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6598 |
| Fresh reviewed PRs in the last 7 days | 2401 |
| Proposed PR closes | 821 (34.2% of reviewed PRs) |
| Open items total | 19135 |
| Reviewed files | 6983 |
| Fresh verified reviews in the last 7 days | 6983 |
| Proposed closes awaiting apply | 3341 (47.8% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 12152 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#49437](https://github.com/openclaw/openclaw/pull/49437) | fix(control-ui): show tool call arguments in sidebar | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49437.md) | complete | Apr 24, 2026, 10:47 UTC |
| [#49352](https://github.com/openclaw/openclaw/issues/49352) | [Feature]: Tool Output summary log cut off | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49352.md) | complete | Apr 24, 2026, 10:45 UTC |
| [#49449](https://github.com/openclaw/openclaw/issues/49449) | ： gateway status command hangs indefinitely | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49449.md) | complete | Apr 24, 2026, 10:44 UTC |
| [#49438](https://github.com/openclaw/openclaw/issues/49438) | Bug: 模型的 Think/Reasoning 内容被错误泄露给用户 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49438.md) | complete | Apr 24, 2026, 10:43 UTC |
| [#49394](https://github.com/openclaw/openclaw/pull/49394) | feat: improve Chinese model reliability and add AIsa provider plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49394.md) | complete | Apr 24, 2026, 10:43 UTC |
| [#49405](https://github.com/openclaw/openclaw/issues/49405) | [CLI] Gateway connection fails with \"gateway closed (1000)\" in non-JSON mode (Potential race condition with `withProgress` spinner) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49405.md) | complete | Apr 24, 2026, 10:43 UTC |
| [#49286](https://github.com/openclaw/openclaw/pull/49286) | fix(discord): treat native system messages as queued system events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49286.md) | complete | Apr 24, 2026, 10:43 UTC |
| [#49398](https://github.com/openclaw/openclaw/issues/49398) | Sub-agent embedded run timeout does not release CommandLane, causing all subsequent webchat messages to be queued indefinitely | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49398.md) | complete | Apr 24, 2026, 10:43 UTC |
| [#49408](https://github.com/openclaw/openclaw/issues/49408) | [Bug]: Symbolic links for skill directories under ~/.openclaw/skills/ are not consistently resolved | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49408.md) | complete | Apr 24, 2026, 10:43 UTC |
| [#49422](https://github.com/openclaw/openclaw/pull/49422) | feat(gateway): add static file serving endpoint | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49422.md) | complete | Apr 24, 2026, 10:42 UTC |
| [#49450](https://github.com/openclaw/openclaw/pull/49450) | ui: show tool call request arguments in sidebar | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49450.md) | complete | Apr 24, 2026, 10:42 UTC |
| [#49412](https://github.com/openclaw/openclaw/issues/49412) | [Bug]: Feishu plugin - duplicate plugin id warning on startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49412.md) | complete | Apr 24, 2026, 10:42 UTC |
| [#49321](https://github.com/openclaw/openclaw/issues/49321) | [Bug]: Session store lock timeout causes dropped Telegram messages | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49321.md) | complete | Apr 24, 2026, 10:42 UTC |
| [#49418](https://github.com/openclaw/openclaw/issues/49418) | [Bug]: [Bug]: Windows: Missing changelog.js causes CLI failure (pi-coding-agent module) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49418.md) | complete | Apr 24, 2026, 10:42 UTC |
| [#49440](https://github.com/openclaw/openclaw/issues/49440) | [Bug]: Fallback model does not trigger for api_error responses with non-standard message text (e.g. MiniMax 520) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49440.md) | complete | Apr 24, 2026, 10:42 UTC |
| [#49368](https://github.com/openclaw/openclaw/pull/49368) | Revise CHANGELOG for recent updates and fixes | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49368.md) | complete | Apr 24, 2026, 10:42 UTC |
| [#49432](https://github.com/openclaw/openclaw/issues/49432) | Control UI model switcher prepends active provider to new model ID on provider change | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49432.md) | complete | Apr 24, 2026, 10:41 UTC |
| [#49396](https://github.com/openclaw/openclaw/pull/49396) | fix(ui): use precise hourly message counts for Peak Error Hours | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49396.md) | complete | Apr 24, 2026, 10:41 UTC |
| [#49382](https://github.com/openclaw/openclaw/issues/49382) | Allow custom agent name display in webchat control UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49382.md) | complete | Apr 24, 2026, 10:41 UTC |
| [#49457](https://github.com/openclaw/openclaw/pull/49457) | fix: suppress drain error replies to prevent chat flooding | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49457.md) | complete | Apr 24, 2026, 10:41 UTC |

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
