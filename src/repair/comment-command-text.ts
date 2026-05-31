export type ClawSweeperCommandTrigger = "slash" | "mention";

export type ClawSweeperCommandLine = {
  trigger: ClawSweeperCommandTrigger;
  commandText: string;
  rest: string;
  supportsContinuation: boolean;
};

const MENTION_COMMAND_PATTERN =
  /^\s*@(?:clawsweeper|openclaw-clawsweeper)(?:\[bot\])?(?:(?:\s*[:,]\s*|\s+)(.+))?\s*$/i;
const RE_REVIEW_COMMAND_PATTERN =
  /^(?:review(?:\s+again)?|re-?review|rereview|re-?run(?:\s+review)?|rerun(?:\s+review)?|run\s+(?:review|again))\b[:\s-]+\S/i;
const RE_REVIEW_PROMPT_PREFIX_PATTERN =
  /^(?:review(?:\s+again)?|re-?review|rereview|re-?run(?:\s+review)?|rerun(?:\s+review)?|run\s+(?:review|again))\b[:\s-]*/i;

export function extractClawSweeperCommandLine(body: unknown): ClawSweeperCommandLine | null {
  const lines = String(body ?? "").split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (/^\s*\/auto(?:-|\s+)?merge\s*$/i.test(line)) {
      return commandLine("slash", "automerge", "", false);
    }
    const autoclose = line.match(/^\s*\/autoclose(?:\s+(.+))?\s*$/i);
    if (autoclose) return commandLine("slash", `autoclose ${autoclose[1] ?? ""}`.trim(), "", false);
    const review = line.match(/^\s*\/review(?:\s+(.+))?\s*$/i);
    if (review)
      return commandLine("slash", review[1] ? `review ${review[1]}` : "review", "", false);
    const slash = line.match(/^\s*\/clawsweeper(?:\s+(.+))?\s*$/i);
    if (slash) {
      return commandLine("slash", slash[1] ?? "status", followingLines(lines, index), true);
    }
    const mention = line.match(MENTION_COMMAND_PATTERN);
    if (mention) {
      return commandLine("mention", mention[1] ?? "status", followingLines(lines, index), true);
    }
  }
  return null;
}

export function commandTextForClawSweeperFastAck(body: unknown) {
  const command = extractClawSweeperCommandLine(body);
  if (!command) return "";
  if (command.trigger === "mention" && command.commandText === "status" && command.rest) {
    return command.rest;
  }
  return command.commandText;
}

export function isClawSweeperReReviewCommandText(commandText: unknown) {
  const command = String(commandText ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/[.!]+$/g, "");
  return (
    command === "review" ||
    command === "re-review" ||
    command === "rereview" ||
    command === "review again" ||
    command === "rerun" ||
    command === "re-run" ||
    command === "rerun review" ||
    command === "re-run review" ||
    command === "run review" ||
    command === "run again" ||
    RE_REVIEW_COMMAND_PATTERN.test(command)
  );
}

export function reviewPromptFromClawSweeperCommandText(commandText: unknown) {
  return String(commandText ?? "")
    .trim()
    .replace(RE_REVIEW_PROMPT_PREFIX_PATTERN, "")
    .trim();
}

function commandLine(
  trigger: ClawSweeperCommandTrigger,
  commandText: string,
  rest: string,
  supportsContinuation: boolean,
): ClawSweeperCommandLine {
  return { trigger, commandText, rest, supportsContinuation };
}

function followingLines(lines: string[], index: number) {
  return lines
    .slice(index + 1)
    .join("\n")
    .trim();
}
