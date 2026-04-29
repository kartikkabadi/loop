# Auto-Updating ClawSweeper PRs

Read when: changing ClawSweeper PR repair automation, ClawSweeper review
integration, comment routing, duplicate dispatch guards, or generated-PR
marking.

## Goal

ClawSweeper-created PRs and maintainer-opted existing PRs should keep improving
after they are opened. When ClawSweeper reviews an opted-in PR and leaves
actionable feedback, ClawSweeper can dispatch the backing job again and update
the existing branch when safe. It must not create another PR for the same issue
cluster unless the source branch cannot be safely updated, and it must not
react to ordinary contributor comments.

The loop is intentionally small:

1. ClawSweeper opens `clawsweeper/<cluster-id>` or a maintainer comments
   `/clawsweeper automerge` on any open PR.
2. ClawSweeper dispatches ClawSweeper's item-specific `repository_dispatch` lane
   to review that PR head.
3. The comment router sees trusted ClawSweeper feedback.
4. ClawSweeper dispatches the existing or adopted job through
   `repair-cluster-worker.yml`.
5. The repair worker pushes another commit to the source branch if it finds a
   safe, narrow fix, or opens a credited replacement when the source branch
   cannot be safely updated.
6. ClawSweeper reviews the updated PR again.

## Trust Model

There are two accepted input lanes.

Maintainer commands:

- author association must be `OWNER`, `MEMBER`, or `COLLABORATOR` by default;
- when GitHub App tokens return a weaker association for a maintainer, the
  router falls back to repository collaborator permission and accepts `admin`,
  `maintain`, or `write` by default;
- supported commands are `/clawsweeper fix ci`, `/clawsweeper address review`,
  `/clawsweeper rebase`, `/clawsweeper automerge`, `/clawsweeper approve`,
  `/clawsweeper status`, `/clawsweeper explain`, and `/clawsweeper stop`;
- commands from contributors are ignored without a reply.

Trusted automation:

- author login must be in `CLAWSWEEPER_TRUSTED_BOTS`;
- default trusted bot logins are `clawsweeper[bot]` and
  `openclaw-clawsweeper[bot]`;
- the target must be a ClawSweeper PR or a PR labeled `clawsweeper:automerge`;
- the action becomes `clawsweeper_auto_repair`.

The trusted automation lane exists only for review bots we control. It does
not treat random `@clawsweeper`, `@openclaw-clawsweeper`, or contributor prose as
permission to spend workers or push commits.

## Review Comment Shape

ClawSweeper comments are meant to be readable by maintainers and parseable by
ClawSweeper. The visible text should say whether the PR needs changes, what
change is required before merge, what acceptance criteria would prove the fix,
what evidence was checked, and what risk remains.

The hidden markers at the bottom are the automation contract. The router ignores
review prose for repair dispatch. The action marker is omitted for pass,
approved, needs-human, failed, or inconclusive reviews.

## ClawSweeper PR Markers

The router considers a PR to be from ClawSweeper when any of these are true:

- branch starts with `clawsweeper/`;
- the branch maps to a committed ClawSweeper repair job.

The branch prefix is the durable identity because it maps directly back to the
cluster id and job path. Labels are state and reporting hints, not identity.

## Automerge Opt-In

Maintainers can opt any open PR into the bounded merge loop with:

```text
/clawsweeper automerge
```

The command adds `clawsweeper:automerge`, asks ClawSweeper to review the current
PR head, creates a durable adopted ClawSweeper job when the PR is not already
backed by one, and leaves an idempotent comment. The adopted job lives at
`jobs/<owner>/inbox/automerge-<owner>-<repo>-<pr>.md`; it lets the normal
repair worker update the contributor branch when GitHub says that is safe, or
open a credited replacement when it is not. `/clawsweeper stop` pauses the loop
by adding `clawsweeper:human-review`.

If the repair worker completes without an executable fix artifact, the executor
posts an idempotent outcome comment on the opted-in PR. That comment records
that no branch push, rebase, replacement PR, merge, or ClawSweeper re-review
was started, and includes the worker summary plus planned/skipped actions.

Automerge has two explicit gates:

```bash
CLAWSWEEPER_ALLOW_MERGE=1
CLAWSWEEPER_ALLOW_AUTOMERGE=1
```

If ClawSweeper passes the exact current head while either gate is closed,
ClawSweeper labels the PR `clawsweeper:merge-ready` and comments instead of
merging.

## ClawSweeper Trigger

Preferred ClawSweeper comments should include hidden verdict and action
markers:

```html
<!-- clawsweeper-verdict:needs-changes sha=<head-sha> finding=<id> -->
<!-- clawsweeper-action:fix-required sha=<head-sha> finding=<id> -->
```

Positive or human-only reviews should use a verdict marker without a repair
action:

```html
<!-- clawsweeper-verdict:pass sha=<head-sha> -->
<!-- clawsweeper-verdict:needs-human sha=<head-sha> -->
```

Accepted marker actions:

- `fix-required`
- `repair-required`
- `address-review`
- `fix-ci`

Accepted repair verdicts:

- `needs-changes`
- `changes-requested`
- `needs-repair`
- `fix-required`
- `repair-required`

`pass`, `approved`, and `no-changes` verdicts never repair. On a PR opted into
`clawsweeper:automerge`, a pass verdict for the exact current head can merge only
after required checks, mergeability, review state, and both merge gates are
green. `needs-human`, `human-review`, and `/clawsweeper stop` pause automerge by
adding `clawsweeper:human-review`. If ClawSweeper wants the bounded
repair/rebase loop to continue, it must emit an accepted repair verdict or action
marker.

After a `needs-human` pause, `/clawsweeper approve` is a maintainer-only exact-head
approval. It clears pause labels and uses the same merge readiness checks and
merge gates as a trusted ClawSweeper pass marker.

## Duplicate Guards

ClawSweeper has three layers of duplicate protection:

- job creation checks for an existing open PR or branch before writing a new
  job;
- the comment router writes an idempotency marker in its reply and records
  processed comment versions in `results/comment-router.json`;
- trusted ClawSweeper repairs are capped per PR and per PR head SHA.

The default caps are five automatic repair iterations per PR and one
auto-repair dispatch per PR head SHA:

```bash
CLAWSWEEPER_MAX_REPAIRS_PER_PR=5
CLAWSWEEPER_MAX_REPAIRS_PER_HEAD=1
```

That means many ClawSweeper comments on the same commit trigger at most one
repair run. If ClawSweeper pushes a new commit, the PR head SHA changes and a
new ClawSweeper finding can trigger one more repair run, until the PR reaches
five automatic ClawSweeper-triggered repair iterations. The per-PR cap is total
across all head SHAs and stops the automatic review/repair loop even when every
iteration produces a new commit.

Runs for the same job path and mode share the `repair-cluster-worker.yml` concurrency
group, so repeated dispatches queue instead of racing the same branch.

ClawSweeper edits one durable review comment in place. The router keys its
ledger by comment id plus `updated_at`, and response markers include the target
PR head SHA, so an edited ClawSweeper comment can trigger a new repair after
ClawSweeper has pushed a new commit while unchanged comment versions remain
idempotent.

## Failure Behavior

The router does not dispatch when:

- the comment author is not trusted automation and is not a maintainer;
- the issue or PR is closed;
- the target is not a PR;
- the PR is neither a ClawSweeper PR nor labeled `clawsweeper:automerge`;
- the PR cannot be mapped to or adopted into a job file;
- the same comment version was already processed;
- the same PR already reached the total auto-repair cap;
- the same PR head SHA already reached the per-head auto-repair cap;
- the ClawSweeper marker names a stale PR head SHA.

Automerge also refuses to merge when:

- `clawsweeper:automerge` is missing;
- `clawsweeper:human-review` is present;
- the pass marker does not name the reviewed head SHA;
- the PR is draft, not based on `main`, not mergeable, or has non-green checks;
- GitHub reports requested changes or required review;
- `CLAWSWEEPER_ALLOW_MERGE` or `CLAWSWEEPER_ALLOW_AUTOMERGE` is not `1`.

For trusted automation comments, these blocked cases are silent skips. That
keeps ClawSweeper from replying to every ordinary contributor PR that
ClawSweeper reviews.

Security-sensitive reports stay out of this lane. Those should be routed to the
central OpenClaw security process rather than auto-repaired from review
comments. The automerge planner does not infer security status from prose; it
uses explicit security labels or structured ClawSweeper security markers such
as:

```html
<!-- clawsweeper-security:security-sensitive item=<pr> sha=<head-sha> -->
```

## Implementation Map

Workflow:

- `.github/workflows/repair-comment-router.yml`

Scripts:

- `src/repair/comment-router.ts`
- `src/repair/comment-router-core.ts`
- `src/repair/comment-router-utils.ts`

Durable state:

- `results/comment-router.json`
- `results/comment-router-latest.json`

Important knobs:

- `CLAWSWEEPER_COMMENT_ROUTER_EXECUTE=1` enables scheduled writes and dispatches;
- `CLAWSWEEPER_TRUSTED_BOTS` controls trusted automation authors;
- `CLAWSWEEPER_MAX_REPAIRS_PER_PR` controls total automatic repair
  iterations per PR; default `5`.
- `CLAWSWEEPER_MAX_REPAIRS_PER_HEAD` controls per-head repair caps;
  default `1`.

## Verification

Syntax and workflow checks:

```bash
pnpm run check
actionlint .github/workflows/repair-comment-router.yml
```

Dry-run the router against live recent comments:

```bash
pnpm run repair:comment-router -- \
  --repo openclaw/openclaw \
  --lookback-minutes 180 \
  --max-comments 100
```

The scheduled workflow remains dry unless `CLAWSWEEPER_COMMENT_ROUTER_EXECUTE=1`
is set or a maintainer manually dispatches the workflow with `execute=true`.
