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

Last dashboard update: Apr 24, 2026, 11:59 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12549 |
| Fresh reviewed issues in the last 7 days | 5221 |
| Proposed issue closes | 2895 (55.4% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6603 |
| Fresh reviewed PRs in the last 7 days | 2758 |
| Proposed PR closes | 923 (33.5% of reviewed PRs) |
| Open items total | 19152 |
| Reviewed files | 7979 |
| Fresh verified reviews in the last 7 days | 7979 |
| Proposed closes awaiting apply | 3818 (47.9% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 11173 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#51132](https://github.com/openclaw/openclaw/issues/51132) | Feishu channel: Messages not sent when Reasoning mode is enabled | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51132.md) | complete | Apr 24, 2026, 11:58 UTC |
| [#51203](https://github.com/openclaw/openclaw/issues/51203) | [Feature]: Feature Request: Immutable Approval Gate (Human-in-the-Loop execution layer) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51203.md) | complete | Apr 24, 2026, 11:58 UTC |
| [#51172](https://github.com/openclaw/openclaw/pull/51172) | fix(gateway): enable device identity for loopback probes when token SecretRef is unresolved (#51016) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51172.md) | complete | Apr 24, 2026, 11:58 UTC |
| [#51199](https://github.com/openclaw/openclaw/issues/51199) | Tarball has out-of-order entries causing TAR_ENTRY_ERROR on npm install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51199.md) | complete | Apr 24, 2026, 11:58 UTC |
| [#51186](https://github.com/openclaw/openclaw/issues/51186) | BlueBubbles routed messages can run under main-agent context via /hooks/agent (plus webhook 404 and phone-format mismatch) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51186.md) | complete | Apr 24, 2026, 11:58 UTC |
| [#51175](https://github.com/openclaw/openclaw/issues/51175) | [Bug]: openai-codex OAuth fails with 403 unsupported_country_region_territory while codex-cli works | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51175.md) | complete | Apr 24, 2026, 11:58 UTC |
| [#51182](https://github.com/openclaw/openclaw/issues/51182) | Telegram message replay after gateway restart despite offset file existing (regression from #739) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51182.md) | complete | Apr 24, 2026, 11:58 UTC |
| [#51178](https://github.com/openclaw/openclaw/issues/51178) | [Feature]: Decoupling Lane Queue and Asynchronous Transformation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51178.md) | complete | Apr 24, 2026, 11:58 UTC |
| [#51189](https://github.com/openclaw/openclaw/issues/51189) | [Bug] Feishu channel agent_end event not triggered, causing auto-capture to fail | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51189.md) | complete | Apr 24, 2026, 11:58 UTC |
| [#51166](https://github.com/openclaw/openclaw/pull/51166) | fix(sandbox): pull pre-built image from GHCR instead of plain debian:bookworm-slim | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51166.md) | complete | Apr 24, 2026, 11:57 UTC |
| [#51194](https://github.com/openclaw/openclaw/pull/51194) | fix(acpx): kill child process in runTurn finally block to prevent process leak | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51194.md) | complete | Apr 24, 2026, 11:57 UTC |
| [#51151](https://github.com/openclaw/openclaw/issues/51151) | [Bug]: CLI fails to connect to gateway despite service running and curl succeeding | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51151.md) | complete | Apr 24, 2026, 11:57 UTC |
| [#51179](https://github.com/openclaw/openclaw/pull/51179) | fix(status): show all allowFrom entries in channels --probe summary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51179.md) | complete | Apr 24, 2026, 11:57 UTC |
| [#51197](https://github.com/openclaw/openclaw/pull/51197) | fix(infra): close file handles on lock write failure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51197.md) | complete | Apr 24, 2026, 11:57 UTC |
| [#51198](https://github.com/openclaw/openclaw/pull/51198) | fix(scripts): close pipes on partial RPC client init failure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51198.md) | complete | Apr 24, 2026, 11:57 UTC |
| [#51143](https://github.com/openclaw/openclaw/issues/51143) | [Bug]: Multi-account Telegram: bot.on(\"message\") does not fire for group messages on non-default account | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51143.md) | complete | Apr 24, 2026, 11:57 UTC |
| [#51168](https://github.com/openclaw/openclaw/issues/51168) | [Bug]: AgentMail channel plugin — inbound WebSocket events received but handler silently fails (no auto-reply) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51168.md) | complete | Apr 24, 2026, 11:57 UTC |
| [#51149](https://github.com/openclaw/openclaw/issues/51149) | Bug: raw internal tool/runtime errors leak into chat as user-visible replies | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51149.md) | complete | Apr 24, 2026, 11:57 UTC |
| [#51156](https://github.com/openclaw/openclaw/pull/51156) | feat(config): add enforceFinalTag option to agent defaults | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51156.md) | complete | Apr 24, 2026, 11:56 UTC |
| [#51125](https://github.com/openclaw/openclaw/pull/51125) | fix(security): normalize Cyrillic and Greek confusable chars in boundary marker sanitization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51125.md) | complete | Apr 24, 2026, 11:56 UTC |

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
