import type { LoopGitHubClient } from "../loop/github-adapter.js";
import { GitHubLoopRepositoryAdapter } from "../loop/github-adapter.js";
import type { LoopTaskContract } from "../loop/task-contract.js";

export type LoopPublicationCommandExecutor = Readonly<{
  execute(
    input: Readonly<{ command: string; args: readonly string[]; cwd: string }>,
  ): Promise<Readonly<{ exitCode: number; stdout: string; stderr: string }>>;
}>;

export type LoopRunnerPublication = Readonly<{
  headSha: string;
  headBranch: string;
  pullRequestNumber?: number;
  pullRequestUrl?: string;
}>;

export type LoopRunnerPublisherOptions = Readonly<{
  executor: LoopPublicationCommandExecutor;
  github: LoopGitHubClient;
  contract: LoopTaskContract;
  workspaceRoot: string;
}>;

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function successful(
  result: Readonly<{ exitCode: number; stdout: string; stderr: string }>,
  operation: string,
): string {
  if (result.exitCode !== 0)
    throw new Error(`${operation} failed: ${result.stderr || result.stdout}`);
  return result.stdout;
}

function slug(value: string): string {
  const result = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return result || "task";
}

function branchName(contract: LoopTaskContract): string {
  return `loop/${slug(contract.identity.taskId)}-${slug(contract.identity.title)}`.slice(0, 96);
}

function globRegex(pattern: string): RegExp {
  const normalized = nonEmpty(pattern, "path pattern").replaceAll("\\", "/");
  let source = "^";
  for (let index = 0; index < normalized.length; index += 1) {
    const character = normalized[index]!;
    if (character === "*" && normalized[index + 1] === "*") {
      source += ".*";
      index += 1;
    } else if (character === "*") {
      source += "[^/]*";
    } else {
      source += /[\\.^$+?()[\]{}|]/.test(character) ? `\\${character}` : character;
    }
  }
  return new RegExp(`${source}$`);
}

function pathMatches(path: string, patterns: readonly string[]): boolean {
  return patterns.some((pattern) => globRegex(pattern).test(path));
}

function uniquePaths(...groups: readonly (readonly string[])[]): readonly string[] {
  return [
    ...new Set(
      groups
        .flat()
        .map((path) => path.trim())
        .filter(Boolean),
    ),
  ].sort();
}

function parseNameLines(value: string): readonly string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((path) => !path.includes("\0"));
}

function secretInDiff(diff: string): boolean {
  return [
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
    /(?:ghp|github_pat|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{20,}/,
    /xox[baprs]-[A-Za-z0-9-]{20,}/,
    /\bsk-[A-Za-z0-9_-]{20,}/,
    /(?:AUTH0_CLIENT_SECRET|LOOP_WORKFLOW_EVENT_SECRET|GITHUB_WEBHOOK_SECRET)\s*[:=]/i,
  ].some((pattern) => pattern.test(diff));
}

function validatePaths(contract: LoopTaskContract, changedPaths: readonly string[]): void {
  const forbidden = contract.forbiddenPaths;
  for (const path of changedPaths) {
    if (path.startsWith(".loop/") || path === ".loop")
      throw new Error(`publication refuses generated runner path: ${path}`);
    if (pathMatches(path, forbidden)) throw new Error(`publication path is forbidden: ${path}`);
    if (!pathMatches(path, contract.expectedPaths))
      throw new Error(`publication path is outside the approved scope: ${path}`);
  }
}

function remoteBranchSha(value: string): string | undefined {
  const line = value
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .find(Boolean);
  if (!line) return undefined;
  const sha = line.split(/\s+/)[0];
  return sha && /^[0-9a-f]{7,64}$/i.test(sha) ? sha : undefined;
}

/**
 * Deterministic publication is a host-side operation. It runs after the ACP
 * process has stopped and accepts only an already-authenticated GitHub App
 * client; the model receives neither the client nor its short-lived token.
 */
export function createLoopRunnerPublisher(
  options: LoopRunnerPublisherOptions,
): Readonly<{ publish(): Promise<LoopRunnerPublication> }> {
  const executor = options.executor;
  const contract = options.contract;
  const cwd = nonEmpty(options.workspaceRoot, "workspaceRoot");
  const branch = branchName(contract);

  async function run(command: string, args: readonly string[], operation: string): Promise<string> {
    return successful(await executor.execute({ command, args, cwd }), operation);
  }

  return {
    async publish() {
      const tracked = parseNameLines(await run("git", ["diff", "--name-only"], "read git diff"));
      const staged = parseNameLines(
        await run("git", ["diff", "--cached", "--name-only"], "read staged git diff"),
      );
      const untracked = parseNameLines(
        await run("git", ["ls-files", "--others", "--exclude-standard"], "read untracked files"),
      );
      const changedPaths = uniquePaths(tracked, staged, untracked);
      validatePaths(contract, changedPaths);
      if (changedPaths.length === 0) throw new Error("publication found no repository changes");

      const currentHead = (await run("git", ["rev-parse", "HEAD"], "read current git HEAD")).trim();
      if (!/^[0-9a-f]{7,64}$/i.test(currentHead)) throw new Error("current git HEAD is invalid");
      if (contract.repository.baseSha && currentHead !== contract.repository.baseSha) {
        const currentBranch = (
          await run("git", ["branch", "--show-current"], "read current git branch")
        ).trim();
        if (currentBranch !== branch)
          throw new Error("workspace HEAD drifted from the contract base before publication");
      }

      const branchExists = await executor.execute({
        command: "git",
        args: ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`],
        cwd,
      });
      if (branchExists.exitCode !== 0)
        await run("git", ["switch", "--create", branch], "create deterministic branch");
      else await run("git", ["switch", branch], "switch deterministic branch");

      await run("git", ["add", "--all", "--", ...changedPaths], "stage approved changes");
      const diff = await executor.execute({
        command: "git",
        args: ["diff", "--cached", "--no-ext-diff", "--unified=0"],
        cwd,
      });
      const diffText = successful(diff, "read staged diff");
      if (secretInDiff(diffText)) throw new Error("publication refused a secret-like staged diff");
      const stagedCheck = await executor.execute({
        command: "git",
        args: ["diff", "--cached", "--quiet"],
        cwd,
      });
      if (stagedCheck.exitCode === 0) throw new Error("publication found no staged changes");
      if (stagedCheck.exitCode !== 1) throw new Error("git staged-diff check failed");

      const message = `loop(${contract.identity.taskId}): ${contract.identity.title}`.slice(0, 240);
      await run("git", ["commit", "-m", message], "create deterministic commit");
      const headSha = (await run("git", ["rev-parse", "HEAD"], "read published git HEAD")).trim();
      const remote = await run(
        "git",
        ["ls-remote", "--heads", "origin", `refs/heads/${branch}`],
        "read remote branch",
      );
      const priorRemoteSha = remoteBranchSha(remote);
      await run(
        "git",
        [
          "push",
          "--set-upstream",
          "origin",
          `HEAD:refs/heads/${branch}`,
          `--force-with-lease=refs/heads/${branch}:${priorRemoteSha ?? ""}`,
        ],
        "push deterministic branch",
      );
      const published = await new GitHubLoopRepositoryAdapter(options.github).publish({
        contract,
        headBranch: branch,
      });
      if (published.headSha !== headSha)
        throw new Error(
          `GitHub PR head ${published.headSha} does not match pushed head ${headSha}`,
        );
      return { ...published, headSha, headBranch: branch };
    },
  };
}
