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

Last dashboard update: Apr 25, 2026, 06:53 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 06:53 UTC

State: Apply in progress

Checkpoint 1 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 50/500. Result records in checkpoint: 52.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24924985336](https://github.com/openclaw/clawsweeper/actions/runs/24924985336)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8874 |
| Fresh reviewed issues in the last 7 days | 8563 |
| Proposed issue closes | 3193 (37.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6110 |
| Fresh reviewed PRs in the last 7 days | 6334 |
| Proposed PR closes | 1559 (24.6% of reviewed PRs) |
| Open items total | 14984 |
| Reviewed files | 14897 |
| Archived closed files | 3533 |
| Fresh verified reviews in the last 7 days | 14897 |
| Proposed closes awaiting apply | 4752 (31.9% of fresh reviews) |
| Closed by Codex apply | 2733 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 87 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#41027](https://github.com/openclaw/openclaw/pull/41027) | fix(discord): break resume loop on consecutive 1005 close failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41027.md) | complete | Apr 25, 2026, 06:47 UTC |
| [#41098](https://github.com/openclaw/openclaw/pull/41098) | fix(acpx): prefer OAuth session auth and block OpenAI key env leakage in chatgpt mode | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41098.md) | complete | Apr 25, 2026, 06:47 UTC |
| [#41037](https://github.com/openclaw/openclaw/pull/41037) | fix(config): infer auth profile providers from profile ids | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41037.md) | complete | Apr 25, 2026, 06:46 UTC |
| [#41092](https://github.com/openclaw/openclaw/pull/41092) | fix: reduce pre-dispatch latency before LLM send | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41092.md) | complete | Apr 25, 2026, 06:46 UTC |
| [#40953](https://github.com/openclaw/openclaw/pull/40953) | fix(CLI): validate gateway-facing timeout input | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40953.md) | complete | Apr 25, 2026, 06:46 UTC |
| [#39442](https://github.com/openclaw/openclaw/pull/39442) | feat: memory auto-prefetch — inject memory context before LLM sees the message | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39442.md) | complete | Apr 25, 2026, 06:46 UTC |
| [#40463](https://github.com/openclaw/openclaw/pull/40463) | fix(msteams): fix image attachment download for channel and DM messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40463.md) | complete | Apr 25, 2026, 06:46 UTC |
| [#41108](https://github.com/openclaw/openclaw/pull/41108) | fix(msteams): detect implicit mentions in thread replies via conversation.id | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41108.md) | complete | Apr 25, 2026, 06:46 UTC |
| [#39463](https://github.com/openclaw/openclaw/pull/39463) | fix: improve npm install resilience on low-memory systems | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39463.md) | complete | Apr 25, 2026, 06:46 UTC |
| [#41030](https://github.com/openclaw/openclaw/pull/41030) | fix(gateway): avoid false stuck restarts with fresh events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41030.md) | complete | Apr 25, 2026, 06:45 UTC |
| [#41031](https://github.com/openclaw/openclaw/pull/41031) | fix(heartbeat): honor explicit target session keys | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41031.md) | complete | Apr 25, 2026, 06:45 UTC |
| [#39748](https://github.com/openclaw/openclaw/pull/39748) | fix(nostr): validate relay URLs require WebSocket protocol (wss/ws) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39748.md) | complete | Apr 25, 2026, 06:45 UTC |
| [#41119](https://github.com/openclaw/openclaw/pull/41119) | Fix: Deduplicate tool call IDs in normalizeToolCallIdsInMessage | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41119.md) | complete | Apr 25, 2026, 06:45 UTC |
| [#41054](https://github.com/openclaw/openclaw/pull/41054) | Accept legacy anthropic tool payload compat config overrides | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/41054.md) | complete | Apr 25, 2026, 06:45 UTC |
| [#39653](https://github.com/openclaw/openclaw/pull/39653) | fix(security): reject hostname ws:// targets in allowPrivateWs mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39653.md) | complete | Apr 25, 2026, 06:45 UTC |
| [#41038](https://github.com/openclaw/openclaw/pull/41038) | fix(chatui): show stdout for structured tool results | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/41038.md) | complete | Apr 25, 2026, 06:45 UTC |
| [#39766](https://github.com/openclaw/openclaw/pull/39766) | fix(config): make models.providers.<id>.models optional to allow credential-only entries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39766.md) | complete | Apr 25, 2026, 06:45 UTC |
| [#40958](https://github.com/openclaw/openclaw/pull/40958) | fix(update): harden detached restart health recovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40958.md) | complete | Apr 25, 2026, 06:45 UTC |
| [#40970](https://github.com/openclaw/openclaw/pull/40970) | logging.file configuration supports wildcard characters YYYY-MM-DD | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40970.md) | complete | Apr 25, 2026, 06:45 UTC |
| [#40200](https://github.com/openclaw/openclaw/pull/40200) | fix(exec): prevent shell startup files from overriding daemon env | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40200.md) | complete | Apr 25, 2026, 06:45 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews.

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
