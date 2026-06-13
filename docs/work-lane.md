# Work Lane

ClawSweeper reviews remain proposal-only. A review may now mark an open item as
a `queue_fix_pr` work candidate when the report looks valid, narrow, and safe
for a single ClawSweeper repair PR.

Reports store the lane fields in frontmatter:

- `item_category`
- `reproduction_status` and `reproduction_confidence`
- `requires_new_feature`, `requires_new_config_option`, and
  `requires_product_decision`
- `vision_fit`, `vision_fit_evidence`, and `implementation_complexity`
- `auto_implementation_candidate`: `none`, `strict_bug`, or `vision_fit`
- `work_candidate`: `none`, `manual_review`, or `queue_fix_pr`
- `work_status`: `none`, `manual_review`, or `candidate`
- `work_priority` and `work_confidence`
- `work_cluster_refs`, `work_validation`, and `work_likely_files`

The dashboard shows fresh `queue_fix_pr` reports whose `work_status` is
`candidate`. For `openclaw/openclaw` and `openclaw/clawhub`, this remains a
manual promotion queue. For other configured projects, complete
high-confidence candidates automatically enter the existing issue
implementation workflow after the safety gates below pass. For each fresh
candidate, apply/reconcile also generates
`records/<repo-slug>/plans/<number>.md` from the existing report fields. The
dashboard links both the source report and the generated coding plan so
maintainers can promote from a concise implementation view without editing the
durable report.

For open issues with complete, current kept-open reviews, apply/comment-sync
also projects a small owned set of advisory GitHub labels from the same
structured fields. Comments explain the evidence; labels expose routing state
for GitHub issue lists, searches, and project views. These labels do not
dispatch repair, merge, or close work, and they do not replace maintainer-owned
action labels such as `clawsweeper:autofix` or `clawsweeper:automerge`.
Failed or stale reports are skipped so outdated review conclusions do not mutate
live issue labels.
Close proposals are not label-mutated during apply, so advisory label writes do
not advance an issue's `updated_at` before close eligibility gates have finished.
When ClawSweeper does sync labels, the report frontmatter records
`labels_synced_at`. The scheduler treats `updated_at` values up to that timestamp
as ClawSweeper-owned churn, similar to durable review comment syncs, so a
label-only apply pass does not immediately queue another review of the same item.

| Label                                 | Source condition                                                                                                              |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `clawsweeper:current-main-repro`      | `type: issue`, `reproduction_status: reproduced`, and `reproduction_confidence: high`                                         |
| `clawsweeper:source-repro`            | `type: issue`, `reproduction_status: source_reproducible`, and `reproduction_confidence: high`                                |
| `clawsweeper:not-repro-on-main`       | `type: issue`, `reproduction_status: not_reproduced`, and `reproduction_confidence: high`                                     |
| `clawsweeper:needs-live-repro`        | `type: issue`, `reproduction_status: source_reproducible`, and reproduction confidence below high                             |
| `clawsweeper:needs-info`              | `type: issue`, `reproduction_status: unclear`, and reproduction confidence below high                                         |
| `clawsweeper:linked-pr-open`          | the live issue has an open GitHub closing-PR reference                                                                        |
| `clawsweeper:no-new-fix-pr`           | an open linked PR, manual-review lane, product decision, or security review means a new automated fix PR should not be queued |
| `clawsweeper:queueable-fix`           | `work_candidate: queue_fix_pr`, `work_status: candidate`, and `work_confidence: high`                                         |
| `clawsweeper:fix-shape-clear`         | high-confidence `queue_fix_pr` or `manual_review` work includes a repair prompt, likely files, or validation                  |
| `clawsweeper:needs-maintainer-review` | `work_candidate: manual_review` or `work_status: manual_review`                                                               |
| `clawsweeper:needs-product-decision`  | `requires_product_decision: true`                                                                                             |
| `clawsweeper:needs-security-review`   | `item_category: security` or a `securityReview` status of `needs_attention`                                                   |

When the advisory sync marks an issue `clawsweeper:queueable-fix`, it also adds
the target repository's durable `no-stale` exemption and removes an existing
`stale` label. Lower-confidence, manual-review, or otherwise non-queueable
advisory states do not receive stale protection from this sync. If a later sync
clears an existing `clawsweeper:queueable-fix` advisory label, it also clears
the `no-stale` exemption added for that queueable state; existing `no-stale`
labels without prior queueable advisory state are preserved as unrelated labels.

Except for that queueable-issue stale transition, the advisory-label sync owns
only this label group. Reruns add labels that match the latest report, remove
stale labels from this group, and preserve unrelated labels plus action/proof
labels such as `clawsweeper:autofix`,
`clawsweeper:automerge`, `clawsweeper:human-review`,
`clawsweeper:merge-ready`, `proof: sufficient`, and
`mantis: telegram-visible-proof`.

Plan artifacts are generated state. They are removed when the item closes,
archives, becomes stale, or is reclassified away from `queue_fix_pr`; regenerate
them from the source report instead of editing them by hand.

## Automatic Issue Implementation

The automatic issue implementation lane is disabled for `openclaw/openclaw`
and `openclaw/clawhub`. In other configured projects, it can create a PR only
for reviewed issues that are:

- open with a complete current report
- kept open with no close reason
- `work_candidate: queue_fix_pr`
- `work_confidence: high`
- free of protected or security signals
- free of product-decision blockers
- backed by a repair prompt and validation commands
- not already covered by an open PR or ClawSweeper implementation branch

The older strict bug lane remains available and can create a PR only for
reviewed issues that are exactly:

- `item_category: bug`
- `reproduction_status: reproduced`
- `reproduction_confidence: high`
- `auto_implementation_candidate: strict_bug` when the report has this newer
  field
- `work_candidate: queue_fix_pr`
- `work_confidence: high`
- `requires_new_feature: false`
- `requires_new_config_option: false`
- `requires_product_decision: false`

This intentionally excludes mixed feature/config/product work. If a fix would
add a flag, setting, new mode, provider support, broad UX behavior, dependency,
or maintainer policy choice, the review must not classify it as an automatic
bug implementation candidate.

The sibling vision-fit lane is opt-in with
`CLAWSWEEPER_AUTO_IMPLEMENT_VISION_FIT=1`. It may create a PR only for reviewed
issues that are exactly:

- `auto_implementation_candidate: vision_fit`
- `vision_fit: aligned`
- `implementation_complexity: small`
- `work_candidate: queue_fix_pr`
- `work_confidence: high`
- no security/protected signal
- no product-decision blocker
- complete repair prompt, likely files, validation commands, and VISION.md
  evidence

This lane allows small feature/docs/cleanup work when it fits `VISION.md`, but
still stops before broad product or architecture work. Medium-or-larger aligned
items remain manual work-lane candidates.

After review publish, `sweep.yml` scans the just-produced artifacts and
dispatches `repair-issue-implementation-intake.yml` for eligible reports. The
intake workflow re-fetches the live issue, rejects protected/security/locked
items, skips issues that already have an open PR reference or existing
ClawSweeper implementation PR, writes the normal
`source: issue_implementation` job, commits the ledger, then dispatches
`repair-cluster-worker.yml` in autonomous mode. Jobs use
`trigger_source: review_viable_issue`, `trigger_source:
review_reproducible_bug`, or `trigger_source: review_vision_fit` to preserve
which lane queued the PR.

Comment-triggered issue implementation uses the same durable job format. If a
worker starts before the new state commit is visible in its checkout, the worker
reconstructs the minimal `source: issue_implementation` job from the job path
and continues instead of treating the dispatch as stale.

PRs created from the automatic viable-review path are labeled `clawsweeper`,
`clawsweeper:autogenerated`, and `clawsweeper:automerge`, which enters the
existing bounded review/fix/merge loop. The generated PR closes the source
issue only through its normal closing reference after merge. When a worker
opens the PR from a maintainer command, it edits the existing ClawSweeper
command status comment with the generated PR link so the same comment moves
from queued to opened.

Promote a candidate from this checkout:

```bash
cd ~/Projects/clawsweeper
pnpm run repair:create-job -- \
  --from-report records/openclaw-openclaw/items/123.md
pnpm run repair:validate-job -- jobs/openclaw/inbox/clawsweeper-openclaw-openclaw-123.md
```

Commit and push the generated job, then dispatch `mode: autonomous` when the
execution window is intentionally open. The repair lane checks for an existing
open PR/body match and the `clawsweeper/<cluster-id>` branch before creating a
duplicate job.
