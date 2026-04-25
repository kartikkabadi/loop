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

Last dashboard update: Apr 25, 2026, 03:04 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 03:04 UTC

State: Review publish complete

Merged review artifacts for run 24920836188. Dashboard reflects the latest files and proposed closes from completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24920836188](https://github.com/openclaw/clawsweeper/actions/runs/24920836188)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 10177 |
| Fresh reviewed issues in the last 7 days | 8592 |
| Proposed issue closes | 3786 (44.1% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6337 |
| Fresh reviewed PRs in the last 7 days | 5294 |
| Proposed PR closes | 1429 (27% of reviewed PRs) |
| Open items total | 16514 |
| Reviewed files | 13886 |
| Archived closed files | 2341 |
| Fresh verified reviews in the last 7 days | 13886 |
| Proposed closes awaiting apply | 5215 (37.6% of fresh reviews) |
| Closed by Codex apply | 1583 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 2628 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#66195](https://github.com/openclaw/openclaw/issues/66195) | memory-lancedb-pro v1.0.32: plugin tool fails with TypeError: stringEnum is not a function (OpenClaw 2026.4.12) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66195.md) | complete | Apr 25, 2026, 03:03 UTC |
| [#66197](https://github.com/openclaw/openclaw/pull/66197) | security: wrap Telegram inbound DM body via wrapExternalContent | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66197.md) | complete | Apr 25, 2026, 03:03 UTC |
| [#66187](https://github.com/openclaw/openclaw/issues/66187) | Bug: subagents list shows endedAt-set entries as active, blocking maxConcurrent quota | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66187.md) | complete | Apr 25, 2026, 03:03 UTC |
| [#66168](https://github.com/openclaw/openclaw/pull/66168) | feat(gateway): add MCP Apps protocol extension (tools, resources, UI meta) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66168.md) | complete | Apr 25, 2026, 03:03 UTC |
| [#66203](https://github.com/openclaw/openclaw/issues/66203) | [Bug]:  Cron Tool Corrupts Model IDs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66203.md) | complete | Apr 25, 2026, 03:03 UTC |
| [#66204](https://github.com/openclaw/openclaw/issues/66204) | [Bug]: zai provider baseUrl ignored on v2026.4.11 — coding endpoint requests routed to standard endpoint | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66204.md) | complete | Apr 25, 2026, 03:02 UTC |
| [#66176](https://github.com/openclaw/openclaw/issues/66176) | [Bug]: WebChat briefly hides newly sent message before it reappears | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66176.md) | complete | Apr 25, 2026, 03:02 UTC |
| [#66174](https://github.com/openclaw/openclaw/pull/66174) | Fix session transcript path canonicalization on save | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66174.md) | complete | Apr 25, 2026, 03:02 UTC |
| [#66215](https://github.com/openclaw/openclaw/issues/66215) | Telegram image delivery race condition: tool-images resizes file but LocalMediaAccessError on send | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66215.md) | complete | Apr 25, 2026, 03:02 UTC |
| [#66156](https://github.com/openclaw/openclaw/pull/66156) | [codex] fix exec completion system-event history leak | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66156.md) | complete | Apr 25, 2026, 03:02 UTC |
| [#66200](https://github.com/openclaw/openclaw/pull/66200) | security: wrap BlueBubbles inbound DM body via wrapExternalContent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66200.md) | complete | Apr 25, 2026, 03:02 UTC |
| [#66201](https://github.com/openclaw/openclaw/issues/66201) | [Feature]: Feature Request: Add confirmation dialog or toggle for \"Reset Agent\" button in Control UI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66201.md) | complete | Apr 25, 2026, 03:02 UTC |
| [#66188](https://github.com/openclaw/openclaw/pull/66188) | fix(channels): prevent internal assistant scratch messages from leaking to Telegram | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66188.md) | complete | Apr 25, 2026, 03:02 UTC |
| [#66186](https://github.com/openclaw/openclaw/issues/66186) | Agent turn hangs indefinitely when image tool fails (no error propagation to turn) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66186.md) | complete | Apr 25, 2026, 03:02 UTC |
| [#66194](https://github.com/openclaw/openclaw/issues/66194) | Feature Request: Slack Socket Mode slash command event handling | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66194.md) | complete | Apr 25, 2026, 03:02 UTC |
| [#66157](https://github.com/openclaw/openclaw/issues/66157) | [Bug]: Active Memory still times out in Discord channel sessions on v2026.4.12 even with message/strict tuning | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66157.md) | complete | Apr 25, 2026, 03:02 UTC |
| [#66222](https://github.com/openclaw/openclaw/issues/66222) | [Feature]: Multi-Agent Collaboration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66222.md) | complete | Apr 25, 2026, 03:01 UTC |
| [#66185](https://github.com/openclaw/openclaw/issues/66185) | [Bug] memory-core dreaming cron reports success but produces no artifacts and exits in ~6-8ms | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66185.md) | complete | Apr 25, 2026, 03:01 UTC |
| [#66119](https://github.com/openclaw/openclaw/issues/66119) | [Bug] Signal: update to 2026.4.12 sets registered=false in signal-cli account file, causing account deletion | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66119.md) | complete | Apr 25, 2026, 03:01 UTC |
| [#66100](https://github.com/openclaw/openclaw/issues/66100) | [Bug]:   Title: [Android] Bootstrap token not cleared after successful spend on plain LAN ws:// — causes permanent auth loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66100.md) | complete | Apr 25, 2026, 03:01 UTC |

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
