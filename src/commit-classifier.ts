import { runText } from "./command.js";

export interface SkippedCommitMetadata {
  parents: string[];
  authorName: string;
  authorEmail: string;
  committerName: string;
  committerEmail: string;
  authoredAt: string;
  committedAt: string;
  coAuthors: string[];
  githubAuthor: string;
  githubCommitter: string;
}

const REVIEWABLE_EXTENSIONS = new Set([
  ".c",
  ".cc",
  ".cjs",
  ".cpp",
  ".cs",
  ".css",
  ".go",
  ".h",
  ".hpp",
  ".html",
  ".java",
  ".js",
  ".json",
  ".jsx",
  ".kt",
  ".kts",
  ".lua",
  ".mjs",
  ".mm",
  ".mts",
  ".php",
  ".pl",
  ".proto",
  ".py",
  ".rb",
  ".rs",
  ".sh",
  ".sql",
  ".swift",
  ".toml",
  ".ts",
  ".tsx",
  ".vue",
  ".xml",
  ".yaml",
  ".yml",
  ".zig",
]);

const REVIEWABLE_BASENAMES = new Set([
  ".dockerignore",
  ".env.example",
  ".gitignore",
  "Dockerfile",
  "Gemfile",
  "Gemfile.lock",
  "Makefile",
  "Pipfile",
  "Pipfile.lock",
  "Rakefile",
  "bun.lock",
  "bun.lockb",
  "cargo.lock",
  "go.mod",
  "go.sum",
  "package-lock.json",
  "package.json",
  "pnpm-lock.yaml",
  "pyproject.toml",
  "requirements.txt",
  "tsconfig.json",
  "yarn.lock",
]);

function run(command: string, commandArgs: string[], options: { cwd?: string } = {}): string {
  return runText(command, commandArgs, { cwd: options.cwd });
}

function yamlScalar(value: string): string {
  return JSON.stringify(value);
}

function yamlArray(values: string[]): string {
  if (!values.length) return "[]";
  return values.map((value) => `\n  - ${yamlScalar(value)}`).join("");
}

function stripEmailIdentity(value: string): string {
  return value
    .replace(/\s*<[^>\n]*@[^>\n]*>\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function personLabel(name: string, githubLogin: string): string {
  const login = githubLogin.trim();
  if (login && login !== "unknown") return `@${login}`;
  return stripEmailIdentity(name) || "unknown";
}

function shortSha(sha: string): string {
  return sha.slice(0, 12);
}

export function isReviewableCommitPath(path: string): boolean {
  const normalized = path.replaceAll("\\", "/");
  const name = normalized.split("/").pop() ?? normalized;
  const lowerName = name.toLowerCase();
  const lowerPath = normalized.toLowerCase();
  if (REVIEWABLE_BASENAMES.has(name) || REVIEWABLE_BASENAMES.has(lowerName)) return true;
  if (lowerPath.startsWith(".github/workflows/")) return true;
  if (lowerPath.startsWith("scripts/") || lowerPath.startsWith("bin/")) return true;
  if (/^changelog(?:\.[^.]+)?$/i.test(name)) return false;
  if (/^(readme|license|notice|authors|contributors)(?:\.[^.]+)?$/i.test(name)) return false;
  if (/(^|\/)(docs?|documentation|changesets?|\.changeset)\//i.test(normalized)) return false;
  const extensionMatch = lowerName.match(/(\.[a-z0-9]+)$/);
  if (!extensionMatch) return false;
  const extension = extensionMatch[1] ?? "";
  if (
    [
      ".adoc",
      ".gif",
      ".ico",
      ".jpeg",
      ".jpg",
      ".md",
      ".mdx",
      ".mov",
      ".mp4",
      ".pdf",
      ".png",
      ".rst",
      ".svg",
      ".txt",
      ".webp",
    ].includes(extension)
  ) {
    return false;
  }
  return REVIEWABLE_EXTENSIONS.has(extension);
}

export function changedFilesForCommit(targetDir: string, sha: string, parents: string[]): string[] {
  const args = parents[0]
    ? ["diff", "--name-only", `${parents[0]}..${sha}`]
    : ["diff-tree", "--root", "--no-commit-id", "--name-only", "-r", sha];
  return run("git", args, { cwd: targetDir })
    .split("\n")
    .map((file) => file.trim())
    .filter(Boolean);
}

export function skippedNonCodeReport(options: {
  targetRepo: string;
  sha: string;
  metadata: SkippedCommitMetadata;
  changedFiles: string[];
}): string {
  const parent = options.metadata.parents[0] ?? "unknown";
  const changedFiles = options.changedFiles.length
    ? options.changedFiles.map((file) => `- \`${file}\``).join("\n")
    : "- none";
  return `---
sha: ${options.sha}
parent: ${parent}
repository: ${options.targetRepo}
author: ${yamlScalar(personLabel(options.metadata.authorName, options.metadata.githubAuthor))}
committer: ${yamlScalar(personLabel(options.metadata.committerName, options.metadata.githubCommitter))}
github_author: ${yamlScalar(options.metadata.githubAuthor || "unknown")}
github_committer: ${yamlScalar(options.metadata.githubCommitter || "unknown")}
co_authors: ${options.metadata.coAuthors.length ? yamlArray(options.metadata.coAuthors.map(stripEmailIdentity)) : "[]"}
commit_authored_at: ${yamlScalar(options.metadata.authoredAt)}
commit_committed_at: ${yamlScalar(options.metadata.committedAt)}
result: skipped_non_code
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: ${new Date().toISOString()}
---

# Commit ${shortSha(options.sha)}

Skipped: non-code-only commit.

## Reviewed

- Classification: cheap pre-Codex path filter
- Changed files:
${changedFiles}

## Limitations

- Codex review was not started because the commit only changed documentation, changelog, asset, or other non-code files.
`;
}
