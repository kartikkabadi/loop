# Work Lane

ClawSweeper reviews remain proposal-only. A review may now mark an open item as
a `queue_fix_pr` work candidate when the report looks valid, narrow, and safe
for a single ClawSweeper repair PR.

Reports store the lane fields in frontmatter:

- `work_candidate`: `none`, `manual_review`, or `queue_fix_pr`
- `work_status`: `none`, `manual_review`, or `candidate`
- `work_priority` and `work_confidence`
- `work_cluster_refs`, `work_validation`, and `work_likely_files`

The dashboard shows fresh `queue_fix_pr` reports whose `work_status` is
`candidate`. This is a manual promotion queue for the repair lane.

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
