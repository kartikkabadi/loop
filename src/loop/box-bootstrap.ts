import { LOOP_DEVIN_MODEL } from "../loop-runner/model.js";

export const LOOP_BOX_BOOTSTRAP_VERSION = "loop-box-bootstrap.v2" as const;
export const LOOP_REQUIRED_PNPM_VERSION = "11.10.0" as const;
export const LOOP_REQUIRED_AGENT_BROWSER_VERSION = "0.31.1" as const;
export const LOOP_REQUIRED_SFW_VERSION = "1.13.1" as const;
export const LOOP_DEVIN_INSTALL_URL = "https://cli.devin.ai/install.sh" as const;
export const LOOP_DEVIN_INSTALL_SHA256 =
  "9069067ff1d1937e0c8d5d0ce65c89ee0cc8b5e99920ac1b3a9174218614c8d6" as const;

const LOOP_SFW_ASSETS = {
  x86_64: {
    url: "https://github.com/SocketDev/sfw-free/releases/download/v1.13.1/sfw-free-linux-x86_64",
    sha256: "4dc46b626a7c5b81c0b54e1984ee53be5a628dbfb2f55ab14e9b04c8a134db6a",
  },
  amd64: {
    url: "https://github.com/SocketDev/sfw-free/releases/download/v1.13.1/sfw-free-linux-x86_64",
    sha256: "4dc46b626a7c5b81c0b54e1984ee53be5a628dbfb2f55ab14e9b04c8a134db6a",
  },
  aarch64: {
    url: "https://github.com/SocketDev/sfw-free/releases/download/v1.13.1/sfw-free-linux-arm64",
    sha256: "f87bbbca2192fca9740f9bdb115e7cfaa22e957a8f5234d5f97fce1383aa1d66",
  },
  arm64: {
    url: "https://github.com/SocketDev/sfw-free/releases/download/v1.13.1/sfw-free-linux-arm64",
    sha256: "f87bbbca2192fca9740f9bdb115e7cfaa22e957a8f5234d5f97fce1383aa1d66",
  },
} as const;

export type LoopBoxCommandResult = Readonly<{
  exitCode: number;
  stdout: string;
  stderr: string;
}>;

export type LoopBoxBootstrapExecutor = Readonly<{
  execute(
    input: Readonly<{ command: string; args: readonly string[] }>,
  ): Promise<LoopBoxCommandResult>;
}>;

export type LoopBoxToolStatus = Readonly<{
  name: string;
  command: string;
  status: "verified" | "installed" | "repaired" | "failed";
  version?: string;
  detail?: string;
}>;

export type LoopBoxBootstrapReport = Readonly<{
  manifest: typeof LOOP_BOX_BOOTSTRAP_VERSION;
  model: typeof LOOP_DEVIN_MODEL;
  ready: boolean;
  tools: readonly LoopBoxToolStatus[];
}>;

export type LoopBoxBootstrapOptions = Readonly<{
  executor: LoopBoxBootstrapExecutor;
  allowSystemPackageInstall?: boolean;
  devinFallbackPath?: string;
}>;

const MAX_OUTPUT_CHARS = 4_096;
const DEVIN_FALLBACK_PATH = "/home/user/.local/share/devin/cli/_versions/current/bin/devin";

function nonEmpty(value: string, label: string): string {
  if (!value || value.includes("\0")) throw new Error(`${label} must be non-empty and NUL-free`);
  return value;
}

function safeOutput(value: string): string {
  const bounded = value.slice(0, MAX_OUTPUT_CHARS).trim();
  if (bounded.includes("encrypted") || bounded.includes("ciphertext"))
    return "remote Box transport error";
  return bounded;
}

function firstLine(value: string): string | undefined {
  const line = safeOutput(value)
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .find(Boolean);
  return line ? line.slice(0, 256) : undefined;
}

function commandResult(output: LoopBoxCommandResult, label: string): LoopBoxToolStatus {
  const version = firstLine(output.stdout) ?? firstLine(output.stderr);
  return {
    name: label,
    command: label,
    status: output.exitCode === 0 ? "verified" : "failed",
    ...(version ? { version } : {}),
    ...(output.exitCode === 0 ? {} : { detail: safeOutput(output.stderr || output.stdout) }),
  };
}

async function execute(
  executor: LoopBoxBootstrapExecutor,
  command: string,
  args: readonly string[],
): Promise<LoopBoxCommandResult> {
  nonEmpty(command, "bootstrap command");
  args.forEach((arg) => nonEmpty(arg, "bootstrap argument"));
  return executor.execute({ command, args });
}

async function verify(
  executor: LoopBoxBootstrapExecutor,
  name: string,
  command: string,
  args: readonly string[],
): Promise<LoopBoxToolStatus> {
  return commandResult(await execute(executor, command, args), name);
}

async function installGlobal(
  executor: LoopBoxBootstrapExecutor,
  packageSpec: string,
): Promise<LoopBoxCommandResult> {
  return execute(executor, "sfw", ["npm", "install", "--global", packageSpec]);
}

async function installSfwFromOfficialRelease(
  executor: LoopBoxBootstrapExecutor,
): Promise<LoopBoxCommandResult> {
  const architecture = firstLine((await execute(executor, "uname", ["-m"])).stdout);
  const asset =
    architecture === undefined
      ? undefined
      : LOOP_SFW_ASSETS[architecture as keyof typeof LOOP_SFW_ASSETS];
  if (!asset)
    return {
      exitCode: 1,
      stdout: architecture ?? "",
      stderr: "unsupported Box architecture for the pinned Socket Firewall release",
    };

  const directory = await execute(executor, "mkdir", ["-p", "/home/user/.local/bin"]);
  if (directory.exitCode !== 0) return directory;
  const temporaryPath = "/home/user/.local/bin/.sfw-1.13.1.tmp";
  const targetPath = "/home/user/.local/bin/sfw";
  const download = await execute(executor, "curl", [
    "--fail",
    "--silent",
    "--show-error",
    "--location",
    "--proto",
    "=https",
    "--tlsv1.2",
    asset.url,
    "--output",
    temporaryPath,
  ]);
  if (download.exitCode !== 0) return download;
  const digest = await execute(executor, "sha256sum", [temporaryPath]);
  if (digest.exitCode !== 0 || !digest.stdout.startsWith(asset.sha256))
    return {
      exitCode: 1,
      stdout: digest.stdout,
      stderr: "Socket Firewall checksum did not match the pinned Loop manifest",
    };
  const executable = await execute(executor, "chmod", ["0755", temporaryPath]);
  if (executable.exitCode !== 0) return executable;
  return execute(executor, "mv", ["-f", temporaryPath, targetPath]);
}

async function repairDevinLink(
  executor: LoopBoxBootstrapExecutor,
  fallbackPath: string,
): Promise<boolean> {
  const candidate = await execute(executor, "test", ["-x", fallbackPath]);
  if (candidate.exitCode !== 0) return false;
  const directory = fallbackPath.slice(0, fallbackPath.lastIndexOf("/"));
  const mkdir = await execute(executor, "mkdir", ["-p", "/home/user/.local/bin"]);
  if (mkdir.exitCode !== 0) return false;
  const link = await execute(executor, "ln", ["-sfn", fallbackPath, "/home/user/.local/bin/devin"]);
  return link.exitCode === 0 && directory.length > 0;
}

async function repairNpmGlobalLink(
  executor: LoopBoxBootstrapExecutor,
  executable: string,
): Promise<boolean> {
  const prefix = await execute(executor, "npm", ["prefix", "--global"]);
  const root = firstLine(prefix.stdout);
  if (prefix.exitCode !== 0 || !root) return false;
  const candidate = `${root}/bin/${executable}`;
  const present = await execute(executor, "test", ["-x", candidate]);
  if (present.exitCode !== 0) return false;
  const mkdir = await execute(executor, "mkdir", ["-p", "/home/user/.local/bin"]);
  if (mkdir.exitCode !== 0) return false;
  return (
    (await execute(executor, "ln", ["-sfn", candidate, `/home/user/.local/bin/${executable}`]))
      .exitCode === 0
  );
}

async function installDevinFromOfficialScript(
  executor: LoopBoxBootstrapExecutor,
): Promise<LoopBoxCommandResult> {
  const scriptPath = "/home/user/.cache/loop-bootstrap/devin-install.sh";
  const directory = await execute(executor, "mkdir", ["-p", "/home/user/.cache/loop-bootstrap"]);
  if (directory.exitCode !== 0) return directory;
  const download = await execute(executor, "curl", [
    "--fail",
    "--silent",
    "--show-error",
    "--location",
    "--proto",
    "=https",
    "--tlsv1.2",
    LOOP_DEVIN_INSTALL_URL,
    "--output",
    scriptPath,
  ]);
  if (download.exitCode !== 0) return download;
  const digest = await execute(executor, "sha256sum", [scriptPath]);
  if (digest.exitCode !== 0 || !digest.stdout.startsWith(LOOP_DEVIN_INSTALL_SHA256))
    return {
      exitCode: 1,
      stdout: digest.stdout,
      stderr: "Devin installer checksum did not match the pinned Loop manifest",
    };
  return execute(executor, "bash", [scriptPath]);
}

/**
 * Idempotent Box setup. Devin is expected from the managed Box image; the
 * bootstrap verifies it and repairs the known post-resume symlink failure.
 * Other tools are installed from pinned package specifications and verified
 * after installation. No arbitrary shell or model-provided command is used.
 */
export async function bootstrapLoopBox(
  options: LoopBoxBootstrapOptions,
): Promise<LoopBoxBootstrapReport> {
  const executor = options.executor;
  const statuses: LoopBoxToolStatus[] = [];
  const fallbackPath = options.devinFallbackPath ?? DEVIN_FALLBACK_PATH;
  nonEmpty(fallbackPath, "Devin fallback path");

  statuses.push(await verify(executor, "node", "node", ["--version"]));
  statuses.push(await verify(executor, "npm", "npm", ["--version"]));
  statuses.push(await verify(executor, "git", "git", ["--version"]));

  let sfw = await verify(executor, "sfw", "sfw", ["--version"]);
  if (sfw.status === "failed" || !sfw.version?.includes(LOOP_REQUIRED_SFW_VERSION)) {
    const install = await installSfwFromOfficialRelease(executor);
    sfw = {
      name: "sfw",
      command: "sfw",
      status: install.exitCode === 0 ? "installed" : "failed",
      ...(install.exitCode === 0
        ? { version: LOOP_REQUIRED_SFW_VERSION }
        : { detail: safeOutput(install.stderr || install.stdout) }),
    };
    if (install.exitCode === 0) {
      const verified = await verify(executor, "sfw", "sfw", ["--version"]);
      sfw = { ...verified, status: verified.status === "verified" ? "installed" : "failed" };
    }
  }
  statuses.push(sfw);

  let pnpm = await verify(executor, "pnpm", "pnpm", ["--version"]);
  if (pnpm.status === "failed" || pnpm.version !== LOOP_REQUIRED_PNPM_VERSION) {
    const install = await installGlobal(executor, `pnpm@${LOOP_REQUIRED_PNPM_VERSION}`);
    pnpm = {
      name: "pnpm",
      command: "pnpm",
      status: install.exitCode === 0 ? "installed" : "failed",
      ...(install.exitCode === 0
        ? { version: LOOP_REQUIRED_PNPM_VERSION }
        : { detail: safeOutput(install.stderr || install.stdout) }),
    };
    if (install.exitCode === 0) {
      const verified = await verify(executor, "pnpm", "pnpm", ["--version"]);
      pnpm = { ...verified, status: verified.status === "verified" ? "installed" : "failed" };
    }
  }
  statuses.push(pnpm);

  let devin = await verify(executor, "devin", "devin", ["version"]);
  if (devin.status === "failed") {
    const install = await installDevinFromOfficialScript(executor);
    const installedVersion = firstLine(install.stdout);
    if (install.exitCode === 0)
      devin = {
        name: "devin",
        command: "devin",
        status: "installed",
        ...(installedVersion === undefined ? {} : { version: installedVersion }),
      };
  }
  if (devin.status === "failed" && (await repairDevinLink(executor, fallbackPath))) {
    const verified = await verify(executor, "devin", "devin", ["version"]);
    devin = { ...verified, status: verified.status === "verified" ? "repaired" : "failed" };
  }
  statuses.push(devin);

  let browser = await verify(executor, "agent-browser", "agent-browser", ["--version"]);
  if (browser.status === "failed") {
    const install = await installGlobal(
      executor,
      `agent-browser@${LOOP_REQUIRED_AGENT_BROWSER_VERSION}`,
    );
    browser = {
      name: "agent-browser",
      command: "agent-browser",
      status: install.exitCode === 0 ? "installed" : "failed",
      ...(install.exitCode === 0
        ? { version: LOOP_REQUIRED_AGENT_BROWSER_VERSION }
        : { detail: safeOutput(install.stderr || install.stdout) }),
    };
    if (browser.status !== "failed" && (await repairNpmGlobalLink(executor, "agent-browser")))
      browser = { ...browser, status: "repaired" };
  }
  if (browser.status === "failed" && (await repairNpmGlobalLink(executor, "agent-browser"))) {
    const verified = await verify(executor, "agent-browser", "agent-browser", ["--version"]);
    browser = { ...verified, status: verified.status === "verified" ? "repaired" : "failed" };
  }
  if (browser.status !== "failed") {
    const chrome = await execute(executor, "agent-browser", ["install"]);
    if (chrome.exitCode !== 0 && options.allowSystemPackageInstall) {
      const withDeps = await execute(executor, "agent-browser", ["install", "--with-deps"]);
      if (withDeps.exitCode !== 0) {
        browser = {
          ...browser,
          status: "failed",
          detail: safeOutput(withDeps.stderr || withDeps.stdout),
        };
      }
    } else if (chrome.exitCode !== 0) {
      browser = {
        ...browser,
        status: "failed",
        detail: safeOutput(chrome.stderr || chrome.stdout),
      };
    }
  }
  if (browser.status !== "failed") {
    const doctor = await execute(executor, "agent-browser", ["doctor", "--offline", "--quick"]);
    if (doctor.exitCode !== 0)
      browser = {
        ...browser,
        status: "failed",
        detail: safeOutput(doctor.stderr || doctor.stdout),
      };
  }
  statuses.push(browser);

  return {
    manifest: LOOP_BOX_BOOTSTRAP_VERSION,
    model: LOOP_DEVIN_MODEL,
    ready: statuses.every((status) => status.status !== "failed"),
    tools: statuses,
  };
}
