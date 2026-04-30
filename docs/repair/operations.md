# Operations

For the internal feature map across job creation, PR generation, comment
commands, finalizers, self-heal, gates, and ledgers, see
[`docs/INTERNAL_FEATURES.md`](INTERNAL_FEATURES.md).

For the trusted ClawSweeper-to-ClawSweeper PR repair loop, see
[`docs/repair/auto-update-prs.md`](auto-update-prs.md).

For commit-review findings, ClawSweeper dispatches
`clawsweeper_commit_finding` to this repository. ClawSweeper fetches the latest
markdown report, writes `results/commit-findings/<repo-slug>/<sha>.md`, and
only opens a PR when the finding is an ordinary narrow bug/regression candidate.
Security/privacy/supply-chain and broad findings are audit-only.

## Batch Flow

1. Create or export cluster job markdown files under `jobs/<repo>/`.
2. Exclude security-sensitive clusters before staging. ClawSweeper Repair does not handle vulnerability, advisory, CVE/GHSA, leaked secret, credential/token exposure, plaintext secret storage, exploitability, security-class injection, SSRF/XSS/CSRF/RCE, or sensitive-data exposure work.
3. Run local validation:

   ```bash
   pnpm run repair:validate
   ```

4. Dispatch plan jobs:

   ```bash
   pnpm run repair:dispatch -- jobs/openclaw/cluster-001.md jobs/openclaw/cluster-002.md --mode plan
   ```

5. Review artifacts from GitHub Actions.
6. Require `pnpm run repair:review-results -- <artifact-dir>` to pass before promotion.
7. Change selected jobs to `mode: execute` or `mode: autonomous`.
8. Set repo variable `CLAWSWEEPER_ALLOW_EXECUTE=1` only for the execution window.
9. Set `CLAWSWEEPER_ALLOW_FIX_PR=1` only when reviewed fix artifacts are allowed to repair branches or open credited replacement PRs.
10. Dispatch execute/autonomous jobs for reviewed clusters only. Workers still return JSON; `execute-fix-artifact` owns branch repair/replacement PR creation, and `apply-result` performs remaining safe GitHub mutations afterward.
11. Reset `CLAWSWEEPER_ALLOW_EXECUTE=0` and `CLAWSWEEPER_ALLOW_FIX_PR=0`.

## Manual Fix PR From Issue or PR Refs

Use `scripts/create-job.ts` when ClawSweeper or a maintainer has identified a
valid issue/PR cluster that should get one implementation PR. It writes one
idempotent job file and checks for an existing open PR or branch before creating
another job.

```bash
pnpm run repair:create-job -- \
  --repo openclaw/openclaw \
  --refs 123,456 \
  --prompt-file /tmp/clawsweeper-prompt.md
```

From a ClawSweeper report, reuse the stored work prompt, related refs,
validation, and likely files:

```bash
pnpm run repair:create-job -- --from-report ../clawsweeper/records/openclaw-openclaw/items/123.md
```

The generated job defaults to `mode: autonomous`, `allow_fix_pr: true`,
`allow_instant_close: false`, `allow_merge: false`, and
`require_fix_before_close: true`. `close_duplicate` actions can still consolidate
duplicate threads, but `close_fixed_by_candidate` waits for a merged candidate
fix unless a maintainer explicitly sets `allow_unmerged_fix_close: true`.
Commit and push the new job file, then dispatch it:

```bash
pnpm run repair:validate-job -- jobs/openclaw/inbox/clawsweeper-openclaw-openclaw-123.md
pnpm run repair:dispatch -- jobs/openclaw/inbox/clawsweeper-openclaw-openclaw-123.md --mode autonomous
```

To ask for a replacement PR from an existing useful but uneditable source PR,
make the prompt explicit:

```md
Treat #123 as useful source work. If the branch cannot be safely updated
because it is uneditable, stale, draft-only, or unsafe, create a narrow
ClawSweeper replacement PR instead of waiting. Preserve the source PR author as
co-author, credit the source PR in the replacement PR body, and close only that
source PR after the replacement PR is opened.
```

Keep `CLAWSWEEPER_ALLOW_MERGE=0` unless a human explicitly opens the merge gate.

## Manual Fix PR From Commit Finding

Use the `commit finding intake` workflow for a ClawSweeper commit report:

```bash
gh workflow run repair-commit-finding-intake.yml \
  --repo openclaw/clawsweeper \
  -f target_repo=openclaw/openclaw \
  -f commit_sha=<sha> \
  -f report_repo=openclaw/clawsweeper \
  -f report_path=records/openclaw-openclaw/commits/<sha>.md
```

The workflow is idempotent for the commit SHA. It updates the same audit file,
job file, branch, and PR path on rerun.

If latest `main` no longer needs a fix, the generated artifact allows a clean
no-PR outcome and the audit file records the skip.

## Security Boundary

Security-sensitive work is centrally managed outside ClawSweeper Repair by default. The importer skips those clusters by default, the job schema rejects `security_sensitive: true`, the planner marks hydrated security-sensitive items only from explicit security labels or structured ClawSweeper security markers, `review-results` fails mutating recommendations against those items unless they carry an explicit `clawsweeper:autofix` or `clawsweeper:automerge` opt-in, and live merge/close finalizers re-check those deterministic signals before mutating.

Use the central OpenClaw security path for:

- vulnerability reports, advisories, CVEs, GHSAs, exploitability, or security-class injection bugs;
- leaked secrets, credentials, tokens, API keys, private keys, plaintext secret storage, or sensitive-data exposure;
- SSRF, XSS, CSRF, RCE, auth-token leakage, or similar security-class bugs.

This boundary is intentionally conservative. If a cluster is borderline, do not stage it here.
For adopted automerge jobs, do not classify security from review prose at planning, repair, merge, or closeout time. ClawSweeper must emit a deterministic marker such as `<!-- clawsweeper-security:security-sensitive item=<pr> sha=<head-sha> -->` when the automerge loop should treat the PR as security-sensitive. If that PR, or a linked replacement PR, has an explicit maintainer automation label, bounded repair may continue, but merge still waits for a later clean exact-head review and the normal gates.

## Auto-Closure

`pnpm run repair:apply-result -- <job.md> --latest` is the deterministic mutation path.

It only applies closure actions when all of these are true:

- the job and result are both `mode: execute`;
- or the job and result are both `mode: autonomous`;
- `CLAWSWEEPER_ALLOW_EXECUTE=1`;
- the job allows both `comment` and `close`;
- the action is `close_duplicate`, `close_superseded`, or `close_fixed_by_candidate`;
- the action includes a canonical/candidate fix ref and live `target_updated_at`;
- GitHub still reports the same `updated_at`;
- the target is open and not maintainer-authored.
- the target is not security-sensitive.
- `close_fixed_by_candidate` has a merged candidate fix unless
  `allow_unmerged_fix_close: true` was set by a maintainer.

The applicator writes an idempotency marker into the close comment before closing. Re-runs skip already-applied comments/closures instead of posting twice.

## Autonomous Flow

`pnpm run repair:build-fix-artifact -- <job.md>` hydrates the job refs, linked refs, current `main`, PR files, commits, and checks, then writes:

- `cluster-plan.json`: live cluster inventory and canonical candidates;
- `fix-artifact.json`: drive plan, gates, permissions, and per-item matrix.

Autonomous workers receive those artifacts in the prompt. They can emit instant close actions for high-confidence duplicate/superseded/fixed-by-candidate items, and they can emit `build_fix_artifact` when a canonical fix PR is needed.

They still must not mutate GitHub directly. Missing checkout, failing checks, conflicts, unclear canonical choice, or stale item state means `needs_human`.

When a canonical PR exists, autonomous follow-through must not skip the maintainer loop. The required path is: review current PR state, clear security-sensitive concerns, inspect actionable review comments, inspect review-bot comments from Greptile, Codex, Asile, CodeRabbit, Copilot, and similar reviewers, address findings or mark them blocked, run Codex `/review`, address every Codex review finding, rebase/refactor to the narrowest safe change, run targeted validation, confirm changelog/credit, then only recommend merge after checks and review state are clean. After the PR lands, rerun duplicate classification against the landed PR/commit before recommending closeout.

Every merge action must carry `merge_preflight`. Missing security clearance, unresolved human or bot comments, missing/failed Codex `/review`, unaddressed findings, or missing validation commands blocks merge. The fix executor runs the agentic prep loop before pushing: edit, validation, Codex `/review`, address findings, revalidate, then resolve review threads when `CLAWSWEEPER_RESOLVE_REVIEW_THREADS=1`. The applicator also checks live GitHub review threads immediately before squash merge.

## Runner Strategy

Use `ubuntu-latest` for ClawSweeper parity and correctness smoke tests.
Use `openclaw/clawsweeper` as the target repo when you need a self-contained
event, review, comment-router, or automerge smoke that should not touch product
repositories.

Use Blacksmith labels only when you intentionally want a non-parity hosted runner for bulk planning/execution:

```bash
pnpm run repair:dispatch -- jobs/openclaw/cluster-*.md --mode plan --runner blacksmith-4vcpu-ubuntu-2404
```

The workflow uses Node 24 and logs Codex in with `OPENAI_API_KEY`, while also passing `CODEX_API_KEY` to `codex exec`. Set `CODEX_API_KEY` to the same value unless you intentionally separate CI auth.

Codex runs in a read-only sandbox for classification and receives no GitHub token. GitHub read access is scoped to deterministic preflight scripts. For reviewed fix artifacts, `execute-fix-artifact` gives Codex a temporary target checkout without GitHub credentials, then the deterministic executor commits, pushes, opens the replacement PR, and closes uneditable source PRs only after the replacement exists. When a replacement carries contributor work forward, non-bot source PR authors are added as `Co-authored-by` trailers and named in the replacement PR body and source close comment. Remaining write access is scoped to `apply-result`.

Runs for the same job path and mode share a concurrency group. Different cluster jobs can still run in parallel.

Live preflight hydrates job-provided refs by default and records linked refs without expanding them. Set repo variables `CLAWSWEEPER_MAX_LINKED_REFS` above `0` only for small clusters that need first-hop context and `CLAWSWEEPER_HYDRATE_COMMENTS=1` when comment bodies are necessary evidence; normal scale runs use issue/PR metadata, body excerpts, PR files, and PR checks.

## Maintainer Comment Routing

`pnpm run repair:comment-router` scans recent issue and PR comments in the target repo.
It accepts only maintainer-authored commands, gated by GitHub
`author_association` values `OWNER`, `MEMBER`, or `COLLABORATOR` by default.
Contributor comments are ignored without a reply.

Supported triggers:

```text
/review
/clawsweeper status
/clawsweeper re-review
/clawsweeper fix ci
/clawsweeper address review
/clawsweeper rebase
/clawsweeper autofix
/clawsweeper automerge
/clawsweeper approve
/clawsweeper explain
/clawsweeper stop
@clawsweeper re-review
@clawsweeper review
@openclaw-clawsweeper fix ci
```

`review` and `re-review` dispatch ClawSweeper review again for an open issue or PR.
Repair commands apply to existing ClawSweeper PRs and to PRs opted into
`clawsweeper:autofix` or `clawsweeper:automerge`. Existing ClawSweeper PRs are
identified by the `clawsweeper/*` branch prefix. Opted-in non-ClawSweeper PRs
get an adopted job at `jobs/<owner>/inbox/automerge-<owner>-<repo>-<pr>.md`.
The router posts one idempotent reply with a hidden marker and dispatches the
normal `repair-cluster-worker.yml` repair path. It records processed comment versions
in `results/comment-router.json`. For durable ClawSweeper comments,
idempotency is per comment id plus GitHub `updated_at`, and response markers
include the target PR head SHA. That lets edited ClawSweeper comments wake
ClawSweeper again after the PR branch changes while unchanged comment versions
remain idempotent.

If the adopted automerge worker returns no executable fix artifact, the
executor posts one idempotent outcome comment on the opted-in PR. That status
comment is the audit trail for no-op repair passes: it says no branch update,
replacement PR, merge, or new ClawSweeper review was started, then lists the
worker summary and actions.

The router also has a trusted automation path for ClawSweeper comments on
ClawSweeper PRs and PRs labeled `clawsweeper:autofix` or
`clawsweeper:automerge`. Default trusted authors are `clawsweeper[bot]` and
`openclaw-clawsweeper[bot]`; override with
`CLAWSWEEPER_TRUSTED_BOTS`. Preferred
ClawSweeper comments include `clawsweeper-verdict:*` markers plus a
`clawsweeper-action:fix-required` marker when ClawSweeper should wake up. The
router dispatches at most ten automatic repair iterations per PR and at most
one auto-repair per PR head SHA by default, controlled by
`CLAWSWEEPER_MAX_REPAIRS_PER_PR` and
`CLAWSWEEPER_MAX_REPAIRS_PER_HEAD`. The per-PR cap is total across
head SHA changes, so the automatic loop stops after ten ClawSweeper-triggered
repair passes.

Maintainers can start the bounded review/fix loop on any open PR with
`/clawsweeper autofix`, or the bounded review/fix/merge loop with
`/clawsweeper automerge`. The router adds `clawsweeper:autofix` or
`clawsweeper:automerge`, creates an adopted job when needed, dispatches
ClawSweeper for the current head, and then reacts to trusted ClawSweeper
markers. `needs-changes` repairs the source branch when safe or opens a credited
replacement when it is not. `pass`, `approved`, or `no-changes` never merge
autofix or draft PRs. Automerge may merge only when the marker SHA matches the
current head, checks and mergeability are clean, no human-review label is
present, the PR is not draft, and both `CLAWSWEEPER_ALLOW_MERGE=1` and
`CLAWSWEEPER_ALLOW_AUTOMERGE=1` are set. A trusted `needs-human` or
`human-review` verdict on an opted-in PR adds `clawsweeper:human-review` and
pauses the loop. ClawSweeper must emit an accepted repair verdict or action
marker to dispatch the repair/rebase loop.

After a pause, `/clawsweeper approve` is maintainer-only exact-head approval. It
clears `clawsweeper:human-review`, then merges through the same readiness checks
and merge gates as a trusted ClawSweeper pass marker.

Repair workers do one final latest-`main` sync before pushing a repaired branch.
If `main` advanced after validation, the worker rebases again; any conflicts are
handed back to Codex for resolution, then validation and Codex `/review` rerun
before push.

The scheduled workflow is dry by default. Set
`CLAWSWEEPER_COMMENT_ROUTER_EXECUTE=1` in repo variables to let scheduled runs
post replies and dispatch workers. Manual workflow dispatch can also pass
`execute=true`. Branch mutation still requires the downstream execution gates,
including `CLAWSWEEPER_ALLOW_EXECUTE=1` and `CLAWSWEEPER_ALLOW_FIX_PR=1`.

## Token Strategy

CI mints one short-lived GitHub App token and passes it to deterministic repair steps as `GH_TOKEN`.

Minimum useful app permissions depend on action tier:

- classification/preflight: metadata read, issues read, pull requests read, contents read
- comments and closeout: issues write, pull requests write
- merge/automerge: contents write, pull requests write, issues write
- fix PRs: contents write, pull requests write, issues write

Do not put tokens in job files. Codex receives no GitHub token; the read token is scoped to preflight, and the write token is scoped to the deterministic apply step.

## Promotion Rules

Promote from `plan` to `execute` or `autonomous` only when:

- the canonical item is clear;
- `pnpm run repair:review-results` passes for the exact artifact;
- no unique reports are being closed;
- comments preserve contributor credit;
- idempotency keys are present;
- `target_updated_at` was fetched from live GitHub state;
- merge actions include passing `merge_preflight` with security clearance, resolved comments, resolved bot comments, passed Codex `/review`, addressed findings, and validation commands;
- high-risk work is marked `needs_human`.
