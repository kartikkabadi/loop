import type { JsonValue, LooseRecord } from "./json-types.js";

const FIX_ACTIONS = new Set(["fix_needed", "build_fix_artifact", "open_fix_pr"]);
const PLANNER_WRITE_LIMITATION =
  /\bread[- ]?only planner\b|\bplanner\b[^.\n]{0,80}\bread[- ]?only\b|\bread[- ]?only\b[^.\n]{0,120}\b(checkout|cache|file ?system|sandbox)\b|\b(checkout|cache|file ?system|sandbox)\b[^.\n]{0,120}\bread[- ]?only\b|\bwritable\b[^.\n]{0,80}\b(checkout|cache|file ?system)\b|\bcannot (?:write|edit|modify|patch|install|test|validate)\b[^.\n]{0,100}\b(checkout|cache|file ?system|sandbox)\b/i;
const INDEPENDENT_IMPLEMENTATION_BLOCKER =
  /\b(absent|missing|unavailable|corrupt(?:ed)?|unsafe|unreadable)\b[^.\n]{0,100}\b(repository|source tree)\b|\b(repository|source tree)\b[^.\n]{0,100}\b(absent|missing|unavailable|corrupt(?:ed)?|unsafe|unreadable)\b|\btarget repository checkout\b[^.\n]{0,100}\b(absent|missing|unavailable|corrupt(?:ed)?|unsafe|unreadable)\b|\b(absent|missing|unavailable|corrupt(?:ed)?|unsafe|unreadable)\b[^.\n]{0,100}\btarget repository checkout\b|\bmaintainer\b[^.\n]{0,100}\b(choose|decide|clarify|approve|confirm)\b|\b(product|public behavior|requirement|contract)\b[^.\n]{0,100}\b(ambiguous|ambiguity|decision|unclear|unspecified)\b|\b(?:cannot|could not|can't|unable to)\s+(?:(?:be\s+)?(?:reproduced|confirmed|verified)|reproduce|confirm|verify)\b|\balready (?:fixed|implemented|resolved|covered)\b|\b(?:nonsense|incoherent|underspecified|not applicable|obsolete|outdated)\b|\bsecurity[- ]sensitive\b|\btoo broad\b|\bcross[- ]cutting\b|\barchitectural\b/i;
const PLANNER_ONLY_CHECKOUT_UNAVAILABILITY =
  /\btarget repository checkout\b[^.\n]{0,80}\b(?:absent|missing|unavailable)\b[^.\n]{0,80}\b(?:for|to)\s+(?:writing|write|editing|edit|modifying|modify|patching|patch)\b|\b(?:absent|missing|unavailable)\b[^.\n]{0,80}\btarget repository checkout\b[^.\n]{0,80}\b(?:for|to)\s+(?:writing|write|editing|edit|modifying|modify|patching|patch)\b/gi;
const PLANNER_ONLY_VERIFICATION_LIMITATION =
  /\b(?:cannot|could not|can't|unable to)\s+(?:(?:be\s+)?(?:confirmed|verified)|confirm|verify)\b/gi;
const REPRODUCTION_LIMITATION =
  /\b(?:cannot|could not|can't|unable to)\s+(?:(?:be\s+)?reproduced|reproduce)\b/gi;
const TEST_EXECUTION_CONTEXT = /\b(?:tests?|validation commands?)\b/i;

export const ISSUE_IMPLEMENTATION_PLANNER_FAILURE =
  "issue implementation planning must not block fix artifacts on the read-only planner; emit planned fix actions and a fix_artifact for the writable executor";

export function issueImplementationPlanningFailure(
  job: LooseRecord | null,
  result: LooseRecord,
): string | null {
  const frontmatter = job?.frontmatter;
  const issueImplementation =
    frontmatter?.job_intent === "implement_issue" || frontmatter?.source === "issue_implementation";
  if (!issueImplementation || frontmatter?.allow_fix_pr !== true || result.mode !== "autonomous") {
    return null;
  }

  const actions = Array.isArray(result.actions) ? result.actions : [];
  const resultExplanation = resultText({
    summary: result.summary,
    needs_human: result.needs_human,
  });
  const actionExplanations = actions.map((action: JsonValue) => resultText(action));
  const resultHasPlannerLimitation = PLANNER_WRITE_LIMITATION.test(resultExplanation);
  const actionPlannerLimitations = actionExplanations.map((text: string) =>
    PLANNER_WRITE_LIMITATION.test(text),
  );
  const plannerLimitationContext =
    resultHasPlannerLimitation || actionPlannerLimitations.some(Boolean);
  const testExecutionContext =
    TEST_EXECUTION_CONTEXT.test(resultExplanation) ||
    actionExplanations.some((text: string) => TEST_EXECUTION_CONTEXT.test(text));
  const resultHasIndependentBlocker = hasIndependentImplementationBlocker(
    resultExplanation,
    plannerLimitationContext,
    testExecutionContext,
  );
  const actionIndependentBlockers = actionExplanations.map((text: string) =>
    hasIndependentImplementationBlocker(text, plannerLimitationContext, testExecutionContext),
  );
  const hasIndependentBlocker =
    resultHasIndependentBlocker || actionIndependentBlockers.some(Boolean);
  const hasPlannedFixAction = actions.some(
    (action: JsonValue) =>
      FIX_ACTIONS.has(String(action?.action ?? "")) && String(action?.status ?? "") === "planned",
  );
  const hasFixArtifact =
    Boolean(result.fix_artifact) &&
    typeof result.fix_artifact === "object" &&
    !Array.isArray(result.fix_artifact);
  const missingPlannerHandoff =
    plannerLimitationContext && !hasIndependentBlocker && (!hasPlannedFixAction || !hasFixArtifact);
  const blockedPlannerActions = actions.filter((action: JsonValue, index: number) => {
    const name = String(action?.action ?? "");
    const status = String(action?.status ?? "");
    const actionHasPlannerLimitation = actionPlannerLimitations[index] ?? false;
    const actionHasIndependentBlocker = actionIndependentBlockers[index] ?? false;
    const invalidStatus = (FIX_ACTIONS.has(name) && status !== "planned") || name === "needs_human";
    if (!invalidStatus) return false;
    if (actionHasPlannerLimitation) return !actionHasIndependentBlocker;
    return plannerLimitationContext && !actionHasIndependentBlocker;
  });

  return missingPlannerHandoff || blockedPlannerActions.length > 0
    ? ISSUE_IMPLEMENTATION_PLANNER_FAILURE
    : null;
}

function resultText(value: JsonValue): string {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function hasIndependentImplementationBlocker(
  value: string,
  plannerLimitationContext: boolean,
  testExecutionContext: boolean,
): boolean {
  let withoutPlannerOnlyLimitations = value.replace(PLANNER_ONLY_CHECKOUT_UNAVAILABILITY, "");
  if (plannerLimitationContext) {
    withoutPlannerOnlyLimitations = withoutPlannerOnlyLimitations.replace(
      PLANNER_ONLY_VERIFICATION_LIMITATION,
      "",
    );
    if (testExecutionContext) {
      withoutPlannerOnlyLimitations = withoutPlannerOnlyLimitations.replace(
        REPRODUCTION_LIMITATION,
        "",
      );
    }
  }
  return INDEPENDENT_IMPLEMENTATION_BLOCKER.test(withoutPlannerOnlyLimitations);
}
