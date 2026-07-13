import assert from "node:assert/strict";
import test from "node:test";
import { loopMcpToolDefinitions } from "../dist/loop/mcp.js";

const READ_TOOLS = new Set([
  "loop.workday.get",
  "loop.tasks.list",
  "loop.capacity.get",
  "loop.tasks.get",
  "loop.review.get",
  "loop.evidence.list",
  "loop.evidence.get",
]);

const WRITE_TOOLS = new Set([
  "loop.tasks.create_draft",
  "loop.issues.create",
  "loop.tasks.validate",
  "loop.tasks.approve",
  "loop.runs.advance",
  "loop.runs.start",
  "loop.runs.pause",
  "loop.runs.resume",
  "loop.runs.cancel",
  "loop.runs.recover",
  "loop.runs.escalate",
  "loop.issues.mark_ready",
  "loop.runs.request_repair",
  "loop.runs.set_head",
  "loop.review.submit",
  "loop.tasks.approve_completion",
  "loop.tasks.complete",
]);

function definitions(): readonly Record<string, any>[] {
  return loopMcpToolDefinitions() as readonly Record<string, any>[];
}

test("MCP tool registry is explicit, complete, and partitioned by intent", () => {
  const tools = definitions();
  const names = new Set(tools.map((tool) => tool.name));
  assert.deepEqual(names, new Set([...READ_TOOLS, ...WRITE_TOOLS]));
  assert.equal(tools.length, READ_TOOLS.size + WRITE_TOOLS.size);

  for (const tool of tools) {
    assert.equal(tool.inputSchema.type, "object", tool.name);
    assert.equal(tool.inputSchema.additionalProperties, false, tool.name);
    assert.equal(typeof tool.description, "string", tool.name);
    assert.match(tool.description, /\S/, tool.name);
    assert.equal(tool.securitySchemes[0]?.type, "oauth2", tool.name);
    assert.equal(
      tool._meta["io.modelcontextprotocol/required-scope"],
      tool.securitySchemes[0]?.scopes[0],
    );
    if (READ_TOOLS.has(tool.name)) {
      assert.equal(tool.annotations.readOnlyHint, true, tool.name);
      assert.equal(tool.annotations.destructiveHint, false, tool.name);
    } else {
      assert.equal(WRITE_TOOLS.has(tool.name), true, tool.name);
      assert.equal(tool.annotations.readOnlyHint, false, tool.name);
      assert.equal(tool.inputSchema.properties.expectedVersion.type, "integer", tool.name);
      assert.equal(tool.inputSchema.properties.idempotencyKey.type, "string", tool.name);
    }
  }
});

test("MCP write descriptions preserve the human approval boundary", () => {
  const tools = definitions();
  const text = tools
    .filter((tool) => WRITE_TOOLS.has(tool.name))
    .map((tool) => `${tool.name}: ${tool.description}`)
    .join("\n");
  assert.match(text, /Draft issues stay inert/);
  assert.match(text, /Approve a validated task/);
  assert.match(text, /structured review verdict/);
  assert.doesNotMatch(text, /merge pull request|execute arbitrary shell|raw provider/);
});
