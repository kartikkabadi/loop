# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable

Everything else stays open.

## Dashboard

Last dashboard update: Apr 24, 2026, 00:00 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19148 |
| Fresh verified reviews in the last 7 days | 4 |
| Todo for weekly coverage | 19144 |
| Local review files | 22 |

Recently reviewed:

| Item | Report | Title | Decision | Action | Status | Reviewed |
| --- | --- | --- | --- | --- | --- | --- |
| [#75](https://github.com/openclaw/openclaw/issues/75) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/75.md) | Linux/Windows Clawdbot Apps | keep_open | kept_open | complete | Apr 23, 2026, 23:53 UTC |
| [#6662](https://github.com/openclaw/openclaw/issues/6662) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6662.md) | [UX] SubAgent results should display as Tool Output instead of user message | keep_open | kept_open | complete | Apr 23, 2026, 23:47 UTC |
| [#1691](https://github.com/openclaw/openclaw/issues/1691) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/1691.md) | Add option to disable prompt_cache_key for local models | close | proposed_close | complete | Apr 23, 2026, 23:45 UTC |
| [#6599](https://github.com/openclaw/openclaw/issues/6599) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6599.md) | Feature: Add /models test-fallback command to verify fallback chain | keep_open | kept_open | complete | Apr 23, 2026, 23:45 UTC |
| [#6946](https://github.com/openclaw/openclaw/issues/6946) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6946.md) | Feature: Processing indicator message for Telegram (send ⌛️ while thinking, delete on reply) | keep_open | kept_open | failed | Apr 23, 2026, 23:44 UTC |
| [#1210](https://github.com/openclaw/openclaw/issues/1210) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/1210.md) | Images from Discord stored as base64 in session transcripts | keep_open | kept_open | failed | Apr 23, 2026, 23:44 UTC |
| [#6633](https://github.com/openclaw/openclaw/issues/6633) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6633.md) | [Feature]: Cryptographic envelope (\"brain protection\") | keep_open | kept_open | failed | Apr 23, 2026, 23:43 UTC |
| [#147](https://github.com/openclaw/openclaw/issues/147) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/147.md) | feat: Brabble as Clawdis node for distributed voice wake | keep_open | kept_open | failed | Apr 23, 2026, 23:43 UTC |
| [#6654](https://github.com/openclaw/openclaw/issues/6654) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6654.md) | [Feature]: Use zerobrew instead of homebrew | keep_open | kept_open | failed | Apr 23, 2026, 23:43 UTC |
| [#6808](https://github.com/openclaw/openclaw/issues/6808) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6808.md) | [Feature]: More efficient cron job management on Web UI | keep_open | kept_open | failed | Apr 23, 2026, 23:43 UTC |
| [#6615](https://github.com/openclaw/openclaw/issues/6615) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6615.md) | Feature: Add denylist support for exec-approvals | keep_open | kept_open | stale_local_checkout_blocked | Apr 23, 2026, 23:36 UTC |
| [#8920](https://github.com/openclaw/openclaw/issues/8920) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/8920.md) | [Feature]: Better UI for configuration | keep_open | kept_open | stale_local_checkout_blocked | Apr 23, 2026, 23:36 UTC |
| [#7021](https://github.com/openclaw/openclaw/issues/7021) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/7021.md) | [Feature]: integrate PowerMem as a Memory backend (semantic recall + long‑term memory) | close | proposed_close | stale_local_checkout_blocked | Apr 23, 2026, 23:36 UTC |
| [#6717](https://github.com/openclaw/openclaw/issues/6717) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6717.md) | [Feature Request] Natural language model switching in conversation | keep_open | kept_open | stale_local_checkout_blocked | Apr 23, 2026, 23:35 UTC |
| [#6722](https://github.com/openclaw/openclaw/issues/6722) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6722.md) | WhatsApp: Add link preview support (generateHighQualityLinkPreview) | keep_open | kept_open | stale_local_checkout_blocked | Apr 23, 2026, 23:34 UTC |
| [#6617](https://github.com/openclaw/openclaw/issues/6617) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6617.md) | [Feature]: Control UI agent reply supports inline image | keep_open | kept_open | stale_local_checkout_blocked | Apr 23, 2026, 23:33 UTC |
| [#6820](https://github.com/openclaw/openclaw/issues/6820) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6820.md) | Add openai-codex/gpt-5.2 to xhigh thinking whitelist | close | proposed_close | stale_local_checkout_blocked | Apr 23, 2026, 23:33 UTC |
| [#6457](https://github.com/openclaw/openclaw/pull/6457) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6457.md) | fix(telegram): register commands for group scope + preserve topic thread params | keep_open | kept_open | stale_local_checkout_unverified | Apr 23, 2026, 23:24 UTC |
| [#7052](https://github.com/openclaw/openclaw/issues/7052) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/7052.md) | Feature Request: Auto-summarize/compress context before hitting token limit to prevent brain freeze | keep_open | kept_open | stale_local_checkout_unverified | Apr 23, 2026, 23:23 UTC |
| [#2597](https://github.com/openclaw/openclaw/issues/2597) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/2597.md) | Context/state lost after unexpected compaction or session reset | keep_open | kept_open | stale_local_checkout_blocked | Apr 23, 2026, 23:23 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Checks out a full `openclaw/openclaw` working tree.
3. Selects the next open item by issue number, starting from `#1`.
4. Runs Codex with `gpt-5.4`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before and after every review and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards each own a different slice of the open-item list. The final job merges artifacts and updates this README so the dashboard reflects progress.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run review -- --openclaw-dir ../openclaw --batch-size 1 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.4 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
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
