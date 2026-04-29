import { summarizeGhArgs } from "./github-retry.js";

export function parseGhJson<T>(text: string, args: readonly string[]): T {
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    throw new Error(
      `Failed to parse JSON from ${summarizeGhArgs(args)}: ${formatParseError(error)}`,
    );
  }
}

export function parseGhJsonLines<T>(text: string, args: readonly string[]): T[] {
  if (!text) return [];
  return text
    .split("\n")
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line) as T;
      } catch (error) {
        throw new Error(
          `Failed to parse JSON line ${index + 1} from ${summarizeGhArgs(args)}: ${formatParseError(error)}`,
        );
      }
    });
}

function formatParseError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
