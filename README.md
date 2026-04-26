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

Last dashboard update: Apr 26, 2026, 00:01 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 23:58 UTC

State: Review in progress

Planned 250 items across 50 shards. Capacity is 250 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24943696860](https://github.com/openclaw/clawsweeper/actions/runs/24943696860)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5505 |
| Fresh reviewed issues in the last 7 days | 5462 |
| Proposed issue closes | 684 (12.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4261 |
| Fresh reviewed PRs in the last 7 days | 4172 |
| Proposed PR closes | 45 (1.1% of reviewed PRs) |
| Open items total | 9766 |
| Reviewed files | 9634 |
| Unreviewed open items | 132 |
| Archived closed files | 9663 |
| Fresh verified reviews in the last 7 days | 9634 |
| Proposed closes awaiting apply | 729 (7.6% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 0 |
| Hourly cadence coverage | 4/1085 current (1081 due, 0.4%) |
| Hourly hot item cadence (<7d) | 4/1085 current (1081 due, 0.4%) |
| Daily cadence coverage | 5237/5784 current (547 due, 90.5%) |
| Daily PR cadence | 3428/3681 current (253 due, 93.1%) |
| Daily new issue cadence (<30d) | 1809/2103 current (294 due, 86%) |
| Weekly older issue cadence | 2765/2765 current (0 due, 100%) |
| Due now by cadence | 1760 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#51055](https://github.com/openclaw/openclaw/issues/51055) | [Bug]: Onboard hardcodes contextWindow to 128k for all copilot-proxy/LiteLLM models, ignoring actual model capabilities | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51055.md) | complete | Apr 25, 2026, 23:54 UTC |
| [#50988](https://github.com/openclaw/openclaw/issues/50988) | Slack: thread replies should optionally route to parent session (thread.sessionMode) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50988.md) | complete | Apr 25, 2026, 23:54 UTC |
| [#50891](https://github.com/openclaw/openclaw/issues/50891) | Session reset hooks: idle/daily reset do not trigger session-memory save | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50891.md) | complete | Apr 25, 2026, 23:54 UTC |
| [#50872](https://github.com/openclaw/openclaw/issues/50872) | Telegram: native reply threading inconsistent + message.react fails with 'messageId required' | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50872.md) | complete | Apr 25, 2026, 23:54 UTC |
| [#50799](https://github.com/openclaw/openclaw/issues/50799) | macOS GUI attachment picker only allows image files; documents are visible but disabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50799.md) | complete | Apr 25, 2026, 23:54 UTC |
| [#50985](https://github.com/openclaw/openclaw/issues/50985) | [Feature]: Gateway-level suppression of intermediate text output (pre-tool narration) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50985.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50944](https://github.com/openclaw/openclaw/issues/50944) | WhatsApp outbound: missing quote-reply and @mention support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50944.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50795](https://github.com/openclaw/openclaw/issues/50795) | Bug: Context token count always shows 0 after compaction | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50795.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50809](https://github.com/openclaw/openclaw/issues/50809) | Add sms.read command and SMS as a messaging channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50809.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50609](https://github.com/openclaw/openclaw/issues/50609) | [Bug] Session token usage shows unknown (?%) - regression in 2026.3.13 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50609.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50606](https://github.com/openclaw/openclaw/issues/50606) | [Bug]: openclaw tui requests operator scopes without operator.read, causing scope-limited RPCs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50606.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50716](https://github.com/openclaw/openclaw/issues/50716) | [Bug]: Telegram can show typing and complete generation but still drop the final outbound reply with no clear delivery log | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50716.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50590](https://github.com/openclaw/openclaw/issues/50590) | Sandbox resolves skill SKILL.md to global path instead of sandbox-local copy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50590.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50826](https://github.com/openclaw/openclaw/issues/50826) | Docs: alphabetical ordering violations in channel and provider lists | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50826.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50797](https://github.com/openclaw/openclaw/issues/50797) | Heartbeat ACK overrides normal reply when gateway poll and user message arrive simultaneously | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50797.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50288](https://github.com/openclaw/openclaw/issues/50288) | Feature: Session continuity across restarts + Message Event System (lifecycle hooks) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50288.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50621](https://github.com/openclaw/openclaw/issues/50621) | Cron systemEvent job times out after ~960s even though agent runs in main session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50621.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50963](https://github.com/openclaw/openclaw/issues/50963) | [Feature]: Subagent session reuse for expert agents (avoid new session per spawn) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50963.md) | complete | Apr 25, 2026, 23:53 UTC |
| [#50718](https://github.com/openclaw/openclaw/issues/50718) | Security: outbound message secret sanitization — replace plaintext secrets with reference handles before channel delivery | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50718.md) | complete | Apr 25, 2026, 23:52 UTC |
| [#50770](https://github.com/openclaw/openclaw/issues/50770) | [Feature Request] WebChat: option to suppress user message re-rendering after attachment processing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50770.md) | complete | Apr 25, 2026, 23:52 UTC |

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
