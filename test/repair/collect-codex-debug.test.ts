import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { collectCodexDebug, redactSecrets } from "../../dist/repair/collect-codex-debug.js";

test("collectCodexDebug copies recent Codex session logs and excludes auth files", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-codex-debug-"));
  const codexHome = path.join(tmp, ".codex");
  const outDir = path.join(tmp, "out");
  fs.mkdirSync(path.join(codexHome, "sessions", "2026", "05", "02"), { recursive: true });
  fs.mkdirSync(path.join(codexHome, "log"), { recursive: true });

  const sessionPath = path.join(codexHome, "sessions", "2026", "05", "02", "session.jsonl");
  const logPath = path.join(codexHome, "log", "codex-tui.log");
  fs.writeFileSync(sessionPath, "prompt sk-proj-abcdefghijklmnopqrstuvwxyz\n");
  fs.writeFileSync(logPath, "GH_TOKEN=ghp_abcdefghijklmnopqrstuvwxyz123456\n");
  fs.writeFileSync(path.join(codexHome, "auth.json"), '{"OPENAI_API_KEY":"sk-secret"}\n');
  fs.writeFileSync(path.join(codexHome, "config.toml"), "model = 'gpt-5.5'\n");

  try {
    const result = collectCodexDebug({
      outDir,
      label: "test",
      sinceMinutes: 60,
      maxBytes: 1024 * 1024,
      homeDir: tmp,
      codexHome,
    });

    assert.equal(result.manifest.length, 2);
    assert.equal(
      fs.existsSync(path.join(outDir, "sessions", "2026", "05", "02", "session.jsonl")),
      true,
    );
    assert.equal(fs.existsSync(path.join(outDir, "log", "codex-tui.log")), true);
    assert.equal(fs.existsSync(path.join(outDir, "auth.json")), false);
    assert.equal(fs.existsSync(path.join(outDir, "config.toml")), false);
    assert.match(
      fs.readFileSync(path.join(outDir, "sessions", "2026", "05", "02", "session.jsonl"), "utf8"),
      /\[REDACTED_OPENAI_KEY\]/,
    );
    assert.match(
      fs.readFileSync(path.join(outDir, "log", "codex-tui.log"), "utf8"),
      /GH_TOKEN=\[REDACTED\]/,
    );
    const manifest = JSON.parse(fs.readFileSync(path.join(outDir, "manifest.json"), "utf8"));
    assert.equal(manifest.label, "test");
    assert.equal(manifest.files.length, 2);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("collectCodexDebug backs up Codex JSONL from repair run artifacts", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-codex-debug-runs-"));
  const codexHome = path.join(tmp, ".codex");
  const repairRunsDir = path.join(tmp, ".clawsweeper-repair", "runs");
  const runDir = path.join(repairRunsDir, "run-1", "fix-execution");
  const outDir = path.join(tmp, "out");
  fs.mkdirSync(path.join(codexHome, "sessions"), { recursive: true });
  fs.mkdirSync(path.join(codexHome, "log"), { recursive: true });
  fs.mkdirSync(runDir, { recursive: true });
  fs.writeFileSync(
    path.join(runDir, "adopted-codex-1.jsonl"),
    "GH_TOKEN=ghp_abcdefghijklmnopqrstuvwxyz123456\n",
  );
  fs.writeFileSync(path.join(runDir, "adopted-codex-review-1.json"), '{"ok":true}\n');
  fs.writeFileSync(path.join(runDir, "result.json"), '{"status":"ignored"}\n');

  try {
    const result = collectCodexDebug({
      outDir,
      label: "runs",
      sinceMinutes: 60,
      maxBytes: 1024 * 1024,
      homeDir: tmp,
      codexHome,
      repairRunsDir,
    });

    assert.equal(result.manifest.length, 2);
    assert.equal(
      fs.existsSync(
        path.join(outDir, "repair-runs", "run-1", "fix-execution", "adopted-codex-1.jsonl"),
      ),
      true,
    );
    assert.equal(
      fs.existsSync(
        path.join(outDir, "repair-runs", "run-1", "fix-execution", "adopted-codex-review-1.json"),
      ),
      true,
    );
    assert.equal(
      fs.existsSync(path.join(outDir, "repair-runs", "run-1", "fix-execution", "result.json")),
      false,
    );
    assert.match(
      fs.readFileSync(
        path.join(outDir, "repair-runs", "run-1", "fix-execution", "adopted-codex-1.jsonl"),
        "utf8",
      ),
      /GH_TOKEN=\[REDACTED\]/,
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("redactSecrets masks common token shapes", () => {
  assert.equal(
    redactSecrets(
      [
        "OPENAI_API_KEY=sk-proj-abcdefghijklmnopqrstuvwxyz",
        '"GITHUB_TOKEN":"github_pat_abcdefghijklmnopqrstuvwxyz123456"',
        "token ghp_abcdefghijklmnopqrstuvwxyz123456",
      ].join("\n"),
    ),
    [
      "OPENAI_API_KEY=[REDACTED]",
      '"GITHUB_TOKEN":"[REDACTED]"',
      "token [REDACTED_GITHUB_TOKEN]",
    ].join("\n"),
  );
});
