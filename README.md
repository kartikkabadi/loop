# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable

Everything else stays open.

## Dashboard

Last dashboard update: 2026-04-23T22:50:38.262Z

Open items in `openclaw/openclaw`: 19165

Freshly reviewed in the last 7 days: 0

Todo for weekly coverage: 19165

Total local review files: 4

Recently reviewed:

- #1210: Images from Discord stored as base64 in session transcripts - keep_open, kept_open, failed, 2026-04-23T22:50:05.252Z
- #147: feat: Brabble as Clawdis node for distributed voice wake - keep_open, kept_open, failed, 2026-04-23T22:49:49.185Z
- #75: Linux/Windows Clawdbot Apps - keep_open, kept_open, failed, 2026-04-23T22:49:32.150Z
- #1691: Add option to disable prompt_cache_key for local models - keep_open, kept_open, failed, 2026-04-23T22:46:00.019Z

## How It Works

The normal workflow is proposal-only. It runs in batches of 4 and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Checks out a full `openclaw/openclaw` working tree.
3. Selects the next open item by issue number, starting from `#1`.
4. Runs Codex with `gpt-5.4`, high reasoning, and fast service tier inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Parallel workflow shards each own a different slice of the open-item list. The final job merges artifacts and updates this README so the dashboard reflects progress.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run review -- --openclaw-dir ../openclaw --batch-size 4 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.4 --codex-reasoning-effort high --codex-service-tier fast
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
