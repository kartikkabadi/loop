import { AUTOFIX_LABEL, AUTOMERGE_LABEL } from "./comment-router-core.js";

export function replacementAutomationLabel(
  sourceLabelSets: Iterable<Iterable<string>>,
): string | null {
  const labels = new Set<string>();
  for (const sourceLabels of sourceLabelSets) {
    for (const label of sourceLabels) {
      labels.add(label.toLowerCase());
    }
  }
  if (labels.has(AUTOMERGE_LABEL)) return AUTOMERGE_LABEL;
  if (labels.has(AUTOFIX_LABEL)) return AUTOFIX_LABEL;
  return null;
}
