const RETIRED_REPAIR_PREFIX_PATTERN = new RegExp(`\\bCLAWSWEEPER${"_REPAIR_"}`, "g");

export function normalizeRetiredTerms(value: unknown): string {
  return String(value ?? "").replace(RETIRED_REPAIR_PREFIX_PATTERN, "CLAWSWEEPER_");
}
