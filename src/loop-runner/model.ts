/** The only model permitted for Loop-owned Devin execution. */
export const LOOP_DEVIN_MODEL = "SWE-1.7" as const;

export type LoopDevinModel = typeof LOOP_DEVIN_MODEL;

/**
 * Canonicalize the Devin CLI arguments at the Loop boundary.
 *
 * Devin's model flag is global and must appear before the `acp` subcommand.
 * Callers may omit it, but they may not select a different model.
 */
export function normalizeLoopDevinArgs(input: readonly string[] | undefined): readonly string[] {
  const source = input === undefined ? ["acp"] : [...input];
  if (source.length === 0) throw new Error("Execution provider ACP arguments cannot be empty");

  const withoutModel: string[] = [];
  for (let index = 0; index < source.length; index += 1) {
    const arg = source[index];
    if (arg === undefined)
      throw new Error("Execution provider ACP arguments contain an empty entry");
    if (arg === "--model") {
      const selected = source[index + 1];
      if (selected !== LOOP_DEVIN_MODEL)
        throw new Error(
          `Loop only permits the configured execution provider model ${LOOP_DEVIN_MODEL}`,
        );
      index += 1;
      continue;
    }
    if (arg.startsWith("--model=")) {
      if (arg.slice("--model=".length) !== LOOP_DEVIN_MODEL)
        throw new Error(
          `Loop only permits the configured execution provider model ${LOOP_DEVIN_MODEL}`,
        );
      continue;
    }
    withoutModel.push(arg);
  }

  const acpIndex = withoutModel.indexOf("acp");
  if (acpIndex < 0)
    throw new Error("Loop execution provider command must invoke the acp subcommand");
  return ["--model", LOOP_DEVIN_MODEL, ...withoutModel];
}
