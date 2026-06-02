import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { normalizeRepo } from "../repository-profiles.js";

export type TargetPackageManager = "pnpm" | "bun" | "npm";

export interface TargetChangedGate {
  /** Full command string the gate should resolve to, e.g. "pnpm check:changed". */
  command: string;
  /** package.json#scripts key the command shells out to, e.g. "check:changed". */
  requiredScript: string;
}

export interface TargetRepoToolchain {
  packageManager: TargetPackageManager;
  /** Base validation commands to always include before fixArtifact-supplied ones. */
  baseValidationCommands: readonly string[];
  /** Optional incremental gate (e.g. OpenClaw's pnpm check:changed). */
  changedGate: TargetChangedGate | null;
}

interface ToolchainConfigEntry {
  packageManager?: unknown;
  validation_commands?: unknown;
  changed_gate?: unknown;
}

const SUPPORTED_PACKAGE_MANAGERS: ReadonlySet<TargetPackageManager> = new Set([
  "pnpm",
  "bun",
  "npm",
]);

const DEFAULT_TOOLCHAIN: TargetRepoToolchain = {
  packageManager: "pnpm",
  baseValidationCommands: [],
  changedGate: null,
};

const OPENCLAW_OPENCLAW_FALLBACK_TOOLCHAIN: TargetRepoToolchain = {
  packageManager: "pnpm",
  baseValidationCommands: [],
  changedGate: { command: "pnpm check:changed", requiredScript: "check:changed" },
};

interface ResolvedToolchainTable {
  byRepo: Map<string, TargetRepoToolchain>;
  byOwner: Map<string, TargetRepoToolchain>;
}

let cached: ResolvedToolchainTable | null = null;
let cachedFilePath: string | null = null;

export function resolveTargetRepoToolchain(
  targetRepo: string,
  filePath: string = defaultConfigPath(),
): TargetRepoToolchain {
  const table = loadTable(filePath);
  const normalized = normalizeRepo(targetRepo);
  const explicit = table.byRepo.get(normalized);
  if (explicit) return explicit;

  const [owner] = normalized.split("/");
  const ownerFallback = owner ? table.byOwner.get(owner) : undefined;
  if (ownerFallback) return ownerFallback;

  if (normalized === "openclaw/openclaw") return OPENCLAW_OPENCLAW_FALLBACK_TOOLCHAIN;
  return DEFAULT_TOOLCHAIN;
}

/** Test-only: drop the in-memory cache so a fresh config can be observed. */
export function __resetTargetRepoToolchainCache(): void {
  cached = null;
  cachedFilePath = null;
}

function loadTable(filePath: string): ResolvedToolchainTable {
  if (cached && cachedFilePath === filePath) return cached;
  const table = readToolchainTable(filePath);
  cached = table;
  cachedFilePath = filePath;
  return table;
}

function readToolchainTable(filePath: string): ResolvedToolchainTable {
  const byRepo = new Map<string, TargetRepoToolchain>();
  const byOwner = new Map<string, TargetRepoToolchain>();

  if (!existsSync(filePath)) {
    return { byRepo, byOwner };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(filePath, "utf8"));
  } catch {
    return { byRepo, byOwner };
  }

  if (!isObject(parsed)) return { byRepo, byOwner };

  const repositories = arrayValue(parsed.repositories);
  for (const entry of repositories) {
    if (!isObject(entry)) continue;
    const repo = stringOrEmpty(entry.target_repo);
    if (!repo) continue;
    const toolchain = parseToolchainEntry(entry, DEFAULT_TOOLCHAIN);
    byRepo.set(normalizeRepo(repo), toolchain);
  }

  const fallbacks = arrayValue(parsed.generic_fallbacks);
  for (const entry of fallbacks) {
    if (!isObject(entry)) continue;
    const owner = stringOrEmpty(entry.owner);
    if (!owner) continue;
    byOwner.set(owner.toLowerCase(), parseToolchainEntry(entry, DEFAULT_TOOLCHAIN));
  }

  if (isObject(parsed.core_target_overrides)) {
    for (const [repo, value] of Object.entries(parsed.core_target_overrides)) {
      if (!isObject(value)) continue;
      byRepo.set(normalizeRepo(repo), parseToolchainEntry(value, DEFAULT_TOOLCHAIN));
    }
  }

  return { byRepo, byOwner };
}

function parseToolchainEntry(
  entry: ToolchainConfigEntry,
  defaults: TargetRepoToolchain,
): TargetRepoToolchain {
  const packageManager = parsePackageManager(entry.package_manager) ?? defaults.packageManager;
  const baseValidationCommands = stringArray(entry.validation_commands);
  const changedGate = parseChangedGate(entry.changed_gate);
  return {
    packageManager,
    baseValidationCommands,
    changedGate,
  };
}

function parsePackageManager(value: unknown): TargetPackageManager | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase() as TargetPackageManager;
  return SUPPORTED_PACKAGE_MANAGERS.has(normalized) ? normalized : null;
}

function parseChangedGate(value: unknown): TargetChangedGate | null {
  if (value === null || value === undefined) return null;
  if (!isObject(value)) return null;
  const command = stringOrEmpty(value.command);
  const requiredScript = stringOrEmpty(value.required_script);
  if (!command || !requiredScript) return null;
  return { command, requiredScript };
}

function stringArray(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string" && entry.trim() !== "");
}

function arrayValue(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function stringOrEmpty(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function defaultConfigPath(): string {
  return join(repoRoot(), "config", "target-repositories.json");
}

function repoRoot(): string {
  return dirname(dirname(fileURLToPath(import.meta.url)));
}
