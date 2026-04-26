# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per open item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- duplicate or superseded by a canonical issue/PR
- concrete but not actionable in this source repo
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 26, 2026, 00:10 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 26, 2026, 00:10 UTC

State: Review publish complete

Merged review artifacts for run 24943696860. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24943696860](https://github.com/openclaw/clawsweeper/actions/runs/24943696860)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5499 |
| Fresh reviewed issues in the last 7 days | 5457 |
| Proposed issue closes | 773 (14.2% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4256 |
| Fresh reviewed PRs in the last 7 days | 4164 |
| Proposed PR closes | 44 (1.1% of reviewed PRs) |
| Open items total | 9755 |
| Reviewed files | 9621 |
| Unreviewed open items | 134 |
| Archived closed files | 9676 |
| Fresh verified reviews in the last 7 days | 9621 |
| Proposed closes awaiting apply | 817 (8.5% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 6311/6856 current (545 due, 92.1%) |
| Daily PR cadence | 3912/4164 current (252 due, 93.9%) |
| Daily new issue cadence (<30d) | 2399/2692 current (293 due, 89.1%) |
| Weekly older issue cadence | 2765/2765 current (0 due, 100%) |
| Due now by cadence | 679 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#52565](https://github.com/openclaw/openclaw/issues/52565) | [Bug]: # Bug Report - OpenClaw Control UI Buttons Non-Functional    ## Event listener registration failure in OpenClaw 2026.3.13 UI code. | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52565.md) | complete | Apr 26, 2026, 00:09 UTC |
| [#52873](https://github.com/openclaw/openclaw/issues/52873) | ClawHub publish fails: Convex pagination error after 8+ skills | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52873.md) | complete | Apr 26, 2026, 00:09 UTC |
| [#52527](https://github.com/openclaw/openclaw/issues/52527) | [Bug]: 2026.3.13 Breaks Slack Socket Mode - needed to roll back to 2026.3.8 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52527.md) | complete | Apr 26, 2026, 00:08 UTC |
| [#52842](https://github.com/openclaw/openclaw/issues/52842) | Undocumented breaking change: stringEnum removed from plugin-sdk exports | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52842.md) | complete | Apr 26, 2026, 00:08 UTC |
| [#52775](https://github.com/openclaw/openclaw/issues/52775) | feat: per-agent session maintenance config overrides | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52775.md) | complete | Apr 26, 2026, 00:08 UTC |
| [#52632](https://github.com/openclaw/openclaw/issues/52632) | Channel removal incomplete: WhatsApp credentials cause channel to reappear on restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52632.md) | complete | Apr 26, 2026, 00:08 UTC |
| [#52802](https://github.com/openclaw/openclaw/issues/52802) | openai-node streaming: event-only SSE flush causes JSON.parse('') crash (Unexpected end of JSON input) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52802.md) | complete | Apr 26, 2026, 00:08 UTC |
| [#52618](https://github.com/openclaw/openclaw/issues/52618) | fix(feishu): WebSocket connection not recovered after network disruption | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52618.md) | complete | Apr 26, 2026, 00:08 UTC |
| [#52789](https://github.com/openclaw/openclaw/issues/52789) | Feature: Add delivery.mode=\"session\" for cron jobs (internal agent-to-agent delivery via sessions_send) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52789.md) | complete | Apr 26, 2026, 00:08 UTC |
| [#52767](https://github.com/openclaw/openclaw/issues/52767) | boot-md hook re-runs BOOT.md on every gateway restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52767.md) | complete | Apr 26, 2026, 00:07 UTC |
| [#52663](https://github.com/openclaw/openclaw/issues/52663) | [Bug]: Response service status awareness | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52663.md) | complete | Apr 26, 2026, 00:07 UTC |
| [#52353](https://github.com/openclaw/openclaw/issues/52353) | Feature Request: Emit Agent Event on Embedded Run Timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52353.md) | complete | Apr 26, 2026, 00:07 UTC |
| [#52665](https://github.com/openclaw/openclaw/issues/52665) | [Feature]: Optimization for Dockerfile.sandbox-common # add retries and fix-missings for apt-get | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52665.md) | complete | Apr 26, 2026, 00:07 UTC |
| [#52218](https://github.com/openclaw/openclaw/issues/52218) | [Feature]: Disable /help commands in certain channels | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52218.md) | complete | Apr 26, 2026, 00:07 UTC |
| [#52648](https://github.com/openclaw/openclaw/issues/52648) | google-vertex provider authentication fails when running through proxychains | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52648.md) | complete | Apr 26, 2026, 00:07 UTC |
| [#52772](https://github.com/openclaw/openclaw/issues/52772) | [Feature]: Cron scheduler should reload jobs.json after startup (fs.watch or periodic re-read) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52772.md) | complete | Apr 26, 2026, 00:07 UTC |
| [#52849](https://github.com/openclaw/openclaw/issues/52849) | [Feature]: Add before_tool_result_emit hook for live tool-result mutation before same-turn model consumption | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52849.md) | complete | Apr 26, 2026, 00:07 UTC |
| [#52997](https://github.com/openclaw/openclaw/issues/52997) | Forum groups: option for shared main session with topic metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52997.md) | complete | Apr 26, 2026, 00:07 UTC |
| [#52585](https://github.com/openclaw/openclaw/issues/52585) | [Bug]: failed to extract archive: SafeOpenError: path is not a regular file under root | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52585.md) | complete | Apr 26, 2026, 00:07 UTC |
| [#52706](https://github.com/openclaw/openclaw/issues/52706) | Bug: Cron Job delivery channel defaults to 'last' instead of valid channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52706.md) | complete | Apr 26, 2026, 00:07 UTC |

## How It Works

The normal review workflow is proposal-only. It runs configurable parallel shards and never comments or closes during review. The apply/comment-sync workflow is separate; it updates the durable Codex automated review comment in place and closes only unchanged high-confidence proposals.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Pre-hydrates compact related issue/PR context referenced from the item body, comments, timeline, or PR review comments, plus a small best-effort local title search over existing reports for likely duplicates/superseded work.
5. Runs Codex with `gpt-5.5`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout. The review prompt requires source/docs/tests/history inspection, adjacent-code reading, and reason-specific evidence before Codex can mark a close as high-confidence.
6. Writes `items/<number>.md` with the decision, best possible solution, proposed review comment, review runtime (`review_model`, `review_reasoning_effort`, sandbox, service tier), and a GitHub snapshot hash.
7. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, runs Codex without the nested Linux sandbox that blocks shell inspection on GitHub runners, checks the checkout again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is hourly for items with activity since the last stored snapshot and for anything created in the last 7 days, daily for older PRs and issues younger than 30 days, and weekly for older inactive issues. A review policy change, including model, reasoning effort, sandbox, service tier, prompt, or schema changes, also makes old reports due again. When more items are due than fit in a run, the planner prioritizes active items first, then policy-stale reports, then hot new items, then PRs, then recent issues, then older weekly reviews. The dashboard reports local cadence coverage for hourly hot items, daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To sync comments or close later without rerunning Codex, dispatch the workflow with `apply_existing=true` or let the scheduled apply lane run at minute 37 each hour. That mode reads existing `items/*.md`, refetches the issue/PR context, updates the single marker-backed Codex automated review comment in place, and only closes if nothing except that review comment changed since the proposal was written. It never posts a second close comment; closing reuses the durable review comment and then closes the item. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Transient GitHub API/network failures use shorter retries so long scans can survive connection resets or gateway errors. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

`npm run audit` compares live open GitHub items with the generated `items/` and `closed/` records without moving files. It reports missing open records, open records still archived under `closed/`, stale `items/` records that no longer appear open, duplicate markdown records, protected-label proposed closes, and stale review-status records. Use `--output audit-report.json` for the full report, `--sample-limit N` to control console samples, and `--strict` to exit non-zero when state drift is present.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 50 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run audit -- --max-pages 250 --sample-limit 25
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later.

## Checks

```bash
npm run check
npm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` npm package.

## GitHub Actions Setup

Required secrets:

- `OPENAI_API_KEY`: OpenAI API key used to log Codex in before review shards run.
- `CODEX_API_KEY`: optional compatibility alias for the same key during the login check.
- `OPENCLAW_GH_TOKEN`: GitHub token with write access to `openclaw/openclaw` issues and PRs.
- `CLAWSWEEPER_APP_ID`: optional GitHub App ID for the read-only OpenClaw scan token. Currently `3306130` for `openclaw-ci`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: optional private key for `openclaw-ci`; when present, plan/review jobs use a short-lived GitHub App installation token for read-heavy `openclaw/openclaw` API calls.

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI or Codex token environment variables. Parent ClawSweeper code uses the `openclaw-ci` GitHub App installation token for read-heavy target and related GitHub context before invoking Codex, falling back to `OPENCLAW_GH_TOKEN` only if the App secrets are absent. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. Apply mode still uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
