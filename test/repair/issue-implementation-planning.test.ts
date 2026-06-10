import assert from "node:assert/strict";
import test from "node:test";

import {
  ISSUE_IMPLEMENTATION_PLANNER_FAILURE,
  issueImplementationPlanningFailure,
} from "../../dist/repair/issue-implementation-planning.js";

const issueJob = {
  frontmatter: {
    job_intent: "implement_issue",
    source: "issue_implementation",
    allow_fix_pr: true,
  },
};

test("rejects blocked fix artifact caused by the read-only planning checkout", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "The issue is viable, but this checkout is read-only.",
    actions: [
      {
        action: "build_fix_artifact",
        status: "blocked",
        reason: "Implementation is blocked by the read-only checkout.",
      },
    ],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects blocked PR creation caused by a writable checkout or cache requirement", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "A focused fix artifact is ready.",
    actions: [
      {
        action: "build_fix_artifact",
        status: "planned",
        reason: "The fix is small and safe.",
      },
      {
        action: "open_fix_pr",
        status: "blocked",
        reason: "A writable checkout and writable module cache are required.",
      },
    ],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects failed or skipped fix actions caused by planner write limits", () => {
  for (const status of ["failed", "skipped"]) {
    const failure = issueImplementationPlanningFailure(issueJob, {
      mode: "autonomous",
      status: "failed",
      fix_artifact: {
        summary: "Implement the viable issue.",
      },
      actions: [
        {
          action: "build_fix_artifact",
          status,
          reason: "The read-only checkout prevents implementation.",
        },
      ],
    });

    assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
  }
});

test("rejects planner limitation split between summary and blocked fix action", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "A writable checkout is required before implementation can continue.",
    actions: [
      {
        action: "open_fix_pr",
        status: "blocked",
        reason: "Implementation could not continue.",
      },
    ],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects planner limitation split between summary and generic needs-human action", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "The checkout is read-only, so implementation cannot continue.",
    actions: [
      {
        action: "needs_human",
        status: "blocked",
        reason: "Implementation cannot continue in this run.",
      },
    ],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects needs-human escalation caused only by the read-only planner", () => {
  for (const status of ["planned", "blocked"]) {
    const failure = issueImplementationPlanningFailure(issueJob, {
      mode: "autonomous",
      status: "blocked",
      actions: [
        {
          action: "needs_human",
          status,
          reason: "A writable checkout is required before implementation can continue.",
        },
      ],
    });

    assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
  }
});

test("rejects actionless blocked results caused by the read-only planner", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "The checkout is read-only, so implementation cannot continue.",
    actions: [],
    needs_human: [],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects actionless failed results caused by the read-only planner", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "failed",
    summary: "The checkout is read-only, so implementation failed.",
    actions: [],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects actionless planned results caused by the read-only planner", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "planned",
    summary: "The checkout is read-only, so the writable executor must continue.",
    actions: [],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects planner checkout unavailability as a planner-only blocker", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "The writable checkout is unavailable in this read-only planner.",
    actions: [],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects target checkout unavailability limited to planner writes", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "The target repository checkout is unavailable for writing in this read-only planner.",
    actions: [],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects planner-caused inability to verify by running tests", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "The checkout is read-only, so I am unable to verify by running tests.",
    actions: [],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects planner-caused test verification split across sentences", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "The checkout is read-only. I cannot verify the fix by running tests.",
    actions: [],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects planner-caused test verification with reversed causal order", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "Tests cannot run in the read-only checkout, so I cannot verify the fix.",
    actions: [],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects planner-caused inability to reproduce by running tests", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "The checkout is read-only, so I cannot reproduce the issue by running tests.",
    actions: [],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects planner-caused test verification split across result and action", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "The checkout is read-only.",
    actions: [
      {
        action: "build_fix_artifact",
        status: "blocked",
        reason: "I cannot verify the fix by running tests.",
      },
    ],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects planner-caused reproduction split across result and action", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "Tests cannot run in the read-only checkout.",
    actions: [
      {
        action: "build_fix_artifact",
        status: "blocked",
        reason: "Unable to reproduce the issue.",
      },
    ],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects planner limitation hidden behind non-fix keep actions", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "The checkout is read-only, so implementation cannot continue.",
    actions: [
      {
        action: "keep_independent",
        status: "planned",
        reason: "Leave the viable issue open.",
      },
    ],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects planner handoffs missing the fix artifact", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "planned",
    summary: "The planner is read-only by design; the writable executor will implement the fix.",
    actions: [
      {
        action: "build_fix_artifact",
        status: "planned",
        reason: "Emit the executable handoff.",
      },
      {
        action: "open_fix_pr",
        status: "planned",
        reason: "The executor will open the PR after validation.",
      },
    ],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("rejects missing fix artifacts caused by the read-only planner", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "blocked",
    summary: "The fix artifact is unavailable because this checkout is read-only.",
    actions: [],
  });

  assert.equal(failure, ISSUE_IMPLEMENTATION_PLANNER_FAILURE);
});

test("accepts planned handoff from the read-only planner to the writable executor", () => {
  const failure = issueImplementationPlanningFailure(issueJob, {
    mode: "autonomous",
    status: "planned",
    summary: "The planner is read-only by design; the writable executor will implement the fix.",
    fix_artifact: {
      summary: "Implement the focused viable issue.",
    },
    actions: [
      {
        action: "build_fix_artifact",
        status: "planned",
        reason: "Emit the executable handoff.",
      },
      {
        action: "open_fix_pr",
        status: "planned",
        reason: "The executor will open the PR after validation.",
      },
    ],
  });

  assert.equal(failure, null);
});

test("does not reject genuine product blockers or unrelated repair jobs", () => {
  assert.equal(
    issueImplementationPlanningFailure(issueJob, {
      mode: "autonomous",
      status: "blocked",
      actions: [
        {
          action: "build_fix_artifact",
          status: "blocked",
          reason: "A maintainer must choose the public behavior.",
        },
      ],
    }),
    null,
  );
  assert.equal(
    issueImplementationPlanningFailure(issueJob, {
      mode: "autonomous",
      status: "blocked",
      actions: [
        {
          action: "needs_human",
          status: "blocked",
          reason:
            "The read-only checkout is expected, but a maintainer must choose the public behavior.",
        },
      ],
    }),
    null,
  );
  assert.equal(
    issueImplementationPlanningFailure(issueJob, {
      mode: "autonomous",
      status: "blocked",
      summary: "The planner is read-only by design.",
      actions: [
        {
          action: "build_fix_artifact",
          status: "blocked",
          reason: "The issue cannot be reproduced on the latest default branch.",
        },
      ],
    }),
    null,
  );
  assert.equal(
    issueImplementationPlanningFailure(issueJob, {
      mode: "autonomous",
      status: "blocked",
      summary:
        "The planner is read-only by design, and the issue cannot be reproduced on the latest default branch.",
      actions: [],
    }),
    null,
  );
  assert.equal(
    issueImplementationPlanningFailure(issueJob, {
      mode: "autonomous",
      status: "blocked",
      summary: "The planner is read-only by design, but the product behavior is ambiguous.",
      actions: [
        {
          action: "needs_human",
          status: "blocked",
          reason: "A maintainer must choose the public behavior.",
        },
      ],
    }),
    null,
  );
  assert.equal(
    issueImplementationPlanningFailure(issueJob, {
      mode: "autonomous",
      status: "blocked",
      summary: "The planner is read-only by design, but inspection found a separate blocker.",
      actions: [
        {
          action: "build_fix_artifact",
          status: "blocked",
          reason: "The target repository checkout is absent or corrupt.",
        },
      ],
    }),
    null,
  );
  assert.equal(
    issueImplementationPlanningFailure(
      {
        frontmatter: {
          job_intent: "repair_cluster",
          allow_fix_pr: true,
        },
      },
      {
        mode: "autonomous",
        status: "blocked",
        summary: "The checkout is read-only.",
        actions: [],
      },
    ),
    null,
  );
});
