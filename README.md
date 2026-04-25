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

Last dashboard update: Apr 25, 2026, 04:41 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 04:42 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24922798313](https://github.com/openclaw/clawsweeper/actions/runs/24922798313)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9625 |
| Fresh reviewed issues in the last 7 days | 9009 |
| Proposed issue closes | 3741 (41.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6237 |
| Fresh reviewed PRs in the last 7 days | 5813 |
| Proposed PR closes | 1506 (25.9% of reviewed PRs) |
| Open items total | 15862 |
| Reviewed files | 14822 |
| Archived closed files | 2805 |
| Fresh verified reviews in the last 7 days | 14822 |
| Proposed closes awaiting apply | 5247 (35.4% of fresh reviews) |
| Closed by Codex apply | 2033 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 1040 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#68615](https://github.com/openclaw/openclaw/issues/68615) | Bug: message-channel runs can still route to stale codex/openai-codex paths after Codex is disabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68615.md) | complete | Apr 25, 2026, 04:41 UTC |
| [#68632](https://github.com/openclaw/openclaw/issues/68632) | [Bug] openclaw agents list fails with unresolved SecretRef on non-default install | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68632.md) | complete | Apr 25, 2026, 04:41 UTC |
| [#68610](https://github.com/openclaw/openclaw/issues/68610) | openclaw update leaves running gateway broken: stale ESM chunk paths cause ERR_MODULE_NOT_FOUND | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68610.md) | complete | Apr 25, 2026, 04:40 UTC |
| [#68641](https://github.com/openclaw/openclaw/pull/68641) | Fix Control UI image history rendering | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68641.md) | complete | Apr 25, 2026, 04:40 UTC |
| [#68616](https://github.com/openclaw/openclaw/issues/68616) | [Bug]: | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68616.md) | complete | Apr 25, 2026, 04:40 UTC |
| [#68625](https://github.com/openclaw/openclaw/issues/68625) | sessions_send should trigger fallback on 429/quota errors | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68625.md) | complete | Apr 25, 2026, 04:40 UTC |
| [#68633](https://github.com/openclaw/openclaw/issues/68633) | [control-ui] Image attachments cleared before WebSocket send — images lost on connection failure | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68633.md) | complete | Apr 25, 2026, 04:40 UTC |
| [#68620](https://github.com/openclaw/openclaw/issues/68620) | Stuck session not auto-killed — API call hung for 49 minutes blocking Telegram session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68620.md) | complete | Apr 25, 2026, 04:40 UTC |
| [#68649](https://github.com/openclaw/openclaw/issues/68649) | pdf tool can hang indefinitely, blocking session and preventing /new /restart recovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68649.md) | complete | Apr 25, 2026, 04:39 UTC |
| [#68611](https://github.com/openclaw/openclaw/issues/68611) | [Bug]: WebChat CLI runner — assistant replies invisible + user messages erased after each turn | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68611.md) | complete | Apr 25, 2026, 04:39 UTC |
| [#68640](https://github.com/openclaw/openclaw/pull/68640) | Add Vorim AI skill — agent identity, permissions, trust & audit trails | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68640.md) | complete | Apr 25, 2026, 04:39 UTC |
| [#68604](https://github.com/openclaw/openclaw/issues/68604) | [Feature]: Agent identity persistence — SOUL.md / IDENTITY.md hot-reload without gateway restart | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68604.md) | complete | Apr 25, 2026, 04:39 UTC |
| [#68587](https://github.com/openclaw/openclaw/issues/68587) | [Bug]: MCP server: tools/list sent as notification instead of request/response (breaks Hermes Agent) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68587.md) | complete | Apr 25, 2026, 04:39 UTC |
| [#68631](https://github.com/openclaw/openclaw/issues/68631) | [Feature] Add agents.list[*].tools.deny + path.allow/deny for fine-grained tool scoping | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68631.md) | complete | Apr 25, 2026, 04:39 UTC |
| [#68578](https://github.com/openclaw/openclaw/issues/68578) | [Bug]: asking weather is being repeatedly in an infinite loop due to an error. | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68578.md) | complete | Apr 25, 2026, 04:39 UTC |
| [#68652](https://github.com/openclaw/openclaw/issues/68652) | Feature: include Telegram forum topic names in dashboard session labels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68652.md) | complete | Apr 25, 2026, 04:39 UTC |
| [#68606](https://github.com/openclaw/openclaw/issues/68606) | [Bug]: Plugin tool is exposed in TUI/webchat, but runtime invocation bypasses or corrupts installed plugin executor arguments | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68606.md) | complete | Apr 25, 2026, 04:39 UTC |
| [#68637](https://github.com/openclaw/openclaw/pull/68637) | fix(pi-tools): allow empty/whitespace-only content in write tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68637.md) | complete | Apr 25, 2026, 04:39 UTC |
| [#68613](https://github.com/openclaw/openclaw/issues/68613) | Straico API: GPT-5 Pro returns 'Missing model or smart llm selector' on /v1/chat/completions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68613.md) | complete | Apr 25, 2026, 04:39 UTC |
| [#68638](https://github.com/openclaw/openclaw/pull/68638) | fix(loader): avoid memory and compaction side effects during non-activating loads | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68638.md) | complete | Apr 25, 2026, 04:38 UTC |

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

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

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
