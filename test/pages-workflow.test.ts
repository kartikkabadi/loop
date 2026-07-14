import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("Pages reruns upload and deploy a run-attempt-scoped artifact", () => {
  const workflow = readFileSync(".github/workflows/pages.yml", "utf8").replace(/\r\n/g, "\n");

  assert.match(workflow, /PAGES_ARTIFACT_NAME: github-pages-\$\{\{ github\.run_attempt \}\}/);
  assert.equal(workflow.match(/\$\{\{ env\.PAGES_ARTIFACT_NAME \}\}/g)?.length, 2);
  assert.match(
    workflow,
    /uses: actions\/upload-pages-artifact@fc324d3547104276b827a68afc52ff2a11cc49c9\n\s+with:\n\s+name: \$\{\{ env\.PAGES_ARTIFACT_NAME \}\}/,
  );
  assert.match(
    workflow,
    /uses: actions\/deploy-pages@cd2ce8fcbc39b97be8ca5fce6e763baed58fa128\n\s+with:\n\s+artifact_name: \$\{\{ env\.PAGES_ARTIFACT_NAME \}\}/,
  );
});
