import assert from "node:assert/strict";
import test from "node:test";

import {
  clawsweeperGitIdentityEnv,
  clawsweeperGitUserName,
  codexSubprocessEnv,
} from "../../dist/repair/process-env.js";

test("codexSubprocessEnv forces ClawSweeper git identity and strips tokens", () => {
  withEnv(
    {
      CLAWSWEEPER_GIT_USER_NAME: "clawsweeper-repair",
      CLAWSWEEPER_GIT_USER_EMAIL: "bot@example.invalid",
      CLAWSWEEPER_TARGET_GH_TOKEN: "secret",
      GH_TOKEN: "secret",
      GITHUB_TOKEN: "secret",
    },
    () => {
      const env = codexSubprocessEnv();

      assert.equal(env.GIT_AUTHOR_NAME, "clawsweeper");
      assert.equal(env.GIT_AUTHOR_EMAIL, "bot@example.invalid");
      assert.equal(env.GIT_COMMITTER_NAME, "clawsweeper");
      assert.equal(env.GIT_COMMITTER_EMAIL, "bot@example.invalid");
      assert.equal(env.GH_TOKEN, undefined);
      assert.equal(env.GITHUB_TOKEN, undefined);
      assert.equal(env.CLAWSWEEPER_TARGET_GH_TOKEN, undefined);
    },
  );
});

test("clawsweeper git identity defaults to avatar-friendly bot name", () => {
  withEnv({ CLAWSWEEPER_GIT_USER_NAME: "", CLAWSWEEPER_GIT_USER_EMAIL: "" }, () => {
    assert.equal(clawsweeperGitUserName(), "clawsweeper");
    assert.deepEqual(clawsweeperGitIdentityEnv(), {
      GIT_AUTHOR_NAME: "clawsweeper",
      GIT_AUTHOR_EMAIL: "274271284+clawsweeper[bot]@users.noreply.github.com",
      GIT_COMMITTER_NAME: "clawsweeper",
      GIT_COMMITTER_EMAIL: "274271284+clawsweeper[bot]@users.noreply.github.com",
    });
  });
});

function withEnv(values: Record<string, string>, callback: () => void) {
  const previous: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(values)) {
    previous[key] = process.env[key];
    if (value) process.env[key] = value;
    else delete process.env[key];
  }
  try {
    callback();
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}
