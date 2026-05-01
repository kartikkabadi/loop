export type GitHubRef = {
  repo: string;
  number: number;
  url: string;
};

export function parsePullRequestUrl(value: unknown): GitHubRef | null {
  const match = String(value ?? "")
    .trim()
    .match(/^https:\/\/github\.com\/([^/\s]+\/[^/\s]+)\/pull\/(\d+)(?:[/?#].*)?$/i);
  if (!match) return null;
  const repo = match[1]!;
  const numberText = match[2]!;
  return {
    repo,
    number: Number(numberText),
    url: `https://github.com/${repo}/pull/${numberText}`,
  };
}

export function pullRequestNumberFromUrl(value: unknown): number {
  return parsePullRequestUrl(value)?.number ?? 0;
}

export function parseIssueOrPullRef(value: unknown, defaultRepo = ""): GitHubRef | null {
  const text = String(value ?? "").trim();
  const urlMatch = text.match(
    /^https:\/\/github\.com\/([^/]+\/[^/]+)\/(?:issues|pull)\/(\d+)(?:[/?#].*)?$/i,
  );
  if (urlMatch) {
    const repo = urlMatch[1]!;
    const numberText = urlMatch[2]!;
    return {
      repo,
      number: Number(numberText),
      url: `https://github.com/${repo}/issues/${numberText}`,
    };
  }

  const shorthand = text.match(/^#?(\d+)$/);
  if (!shorthand || !defaultRepo) return null;
  const numberText = shorthand[1]!;
  return {
    repo: defaultRepo,
    number: Number(numberText),
    url: `https://github.com/${defaultRepo}/issues/${numberText}`,
  };
}

export function issueNumberFromRef(value: unknown, expectedRepo = ""): number {
  const shorthand = String(value ?? "")
    .trim()
    .match(/^#?(\d+)$/);
  if (shorthand) return Number(shorthand[1]!);

  const parsed = parseIssueOrPullRef(value);
  if (!parsed) return 0;
  if (expectedRepo && parsed.repo.toLowerCase() !== expectedRepo.toLowerCase()) return 0;
  return parsed.number;
}
