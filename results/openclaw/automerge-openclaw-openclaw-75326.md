---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75326"
mode: "autonomous"
run_id: "25198065928"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25198065928"
head_sha: "99759ba2ce029ba942e3c6c26b236ba46be0cf97"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T01:43:38.442Z"
canonical: "https://github.com/openclaw/openclaw/pull/75326"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75326"
actions_total: 6
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75326

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25198065928](https://github.com/openclaw/clawsweeper/actions/runs/25198065928)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75326

## Summary

PR #75326 is the canonical repair path, but it is not merge-ready in this run: the hydrated PR is dirty/unmergeable and has an actionable Codex review finding about preserving catalog load errors. Because the same-repo branch is writable and the diff is narrow, plan a contributor-branch repair rather than replacement. Linked security-sensitive issue #72338 must be routed to central security handling only; the other linked issues remain related broader gateway performance reports and should stay open.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 6 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75326 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75326 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75326 | fix_needed | planned | canonical | Repair the existing writable contributor branch, rebase/resolve dirty state, preserve catalog load failures while keeping the slow-catalog fallback, and rerun exact-head validation. |
| cluster:automerge-openclaw-openclaw-75326 | build_fix_artifact | planned |  | Build an executable repair plan for the canonical PR branch. |
| #72338 | route_security | planned | security_sensitive | Security-sensitive linked issue is out of ClawSweeper Repair scope and should go to central OpenClaw security triage. |
| #74404 | keep_related | planned | related | Related gateway performance regression; keep open outside this PR repair lane. |
| #75287 | keep_related | planned | related | Related but not duplicate; keep open for a separate focused repair path. |
| #75297 | keep_related | planned | related | Related broader performance report; keep open until a canonical tracker/fix proves coverage. |

## Needs Human

- none
