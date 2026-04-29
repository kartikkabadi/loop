# PR Review Comments and Clownfish Repair Markers

Read when: changing issue/PR review comments, Clownfish repair dispatch,
comment-sync behavior, or the trusted marker contract between ClawSweeper and
Clownfish.

## Purpose

ClawSweeper keeps one durable public Codex review comment per issue or pull
request. The comment is for maintainers first: it should explain the current
verdict, the concrete required change, what evidence was checked, and any
remaining risk.

For Clownfish-generated PRs, the same comment also carries hidden HTML markers
that Clownfish can parse without relying on prose. ClawSweeper owns the review
and marker emission. Clownfish owns branch mutation, duplicate guards, audit
logging, and PR repair.

## Durable Comment Shape

Each synced comment includes the durable identity marker:

```html
<!-- clawsweeper-review item=<number> -->
```

ClawSweeper edits that comment in place instead of posting repeated comments.
Report front matter stores the synced comment id, URL, hash, and sync time.

For a PR that needs work, the visible comment starts with:

```text
Codex review: needs changes before merge.
```

The body should include the strongest actionable sections the report has:

- `Required change before merge:`
- `Best possible solution:`
- `Acceptance criteria:`
- `What I checked:`
- `Remaining risk:`

Issues can use `Required change / next step:` instead of the PR-specific
heading. Non-PR comments are never Clownfish repair triggers.

## Clownfish Markers

For an actionable PR repair request, ClawSweeper appends both markers:

```html
<!-- clawsweeper-verdict:needs-changes item=<number> sha=<pull-head-sha> confidence=<confidence> -->
<!-- clawsweeper-action:fix-required item=<number> sha=<pull-head-sha> confidence=<confidence> finding=review-feedback -->
```

The verdict marker says what the review decided. The action marker is the
permission for Clownfish to wake up. If the action marker is absent, Clownfish
must not start a repair run.

For failed reviews, ambiguous reviews, or PR comments that should stay in human
hands, ClawSweeper emits a human-only verdict:

```html
<!-- clawsweeper-verdict:needs-human item=<number> sha=<pull-head-sha> confidence=<confidence> -->
```

Clean/close-style PR verdicts also stay human-only from the Clownfish point of
view. Closing or merging remains outside the repair loop.

## Stale-Head Guard

PR reports include `pull_head_sha` in front matter when GitHub provides it.
ClawSweeper copies that SHA into the hidden markers. Clownfish compares the
marker SHA with the live PR head SHA and skips the comment if they differ.

This keeps an old review comment from repairing a branch after the PR already
moved.

## Iteration Limits

Clownfish caps trusted ClawSweeper repair dispatches:

- `CLOWNFISH_CLAWSWEEPER_MAX_REPAIRS_PER_PR=5` total automatic repair
  iterations per PR by default.
- `CLOWNFISH_CLAWSWEEPER_MAX_REPAIRS_PER_HEAD=1` repair dispatch per PR head
  SHA by default.

The per-head cap prevents duplicate workers for the same commit. The per-PR
cap stops an automatic review/repair loop after five ClawSweeper-triggered
iterations even if each repair pushes a new head SHA.

## Operational Notes

- ClawSweeper should generate actionable text for maintainers and structured
  markers for automation. Do not make Clownfish depend on exact prose when a
  marker exists.
- Existing old comments may still be routed by Clownfish's conservative prose
  fallback until ClawSweeper refreshes them.
- Sync comments without closing by running apply in comment-sync mode:

```bash
pnpm run apply-decisions -- --target-repo openclaw/openclaw --sync-comments-only --comment-sync-min-age-days 7 --processed-limit 1000 --limit 0
```

- Normal review/apply workflows also refresh missing or stale durable comments.
