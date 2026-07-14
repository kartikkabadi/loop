# ChatGPT Project setup for Loop

The simplest setup is one ChatGPT Project for your software work and one small
set of Loop source files inside it. Projects keep chats, uploaded files, and
project instructions together, so ChatGPT can use the same operating context
across sessions. See the [official Projects guide](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt).

## One-time setup

1. Create a ChatGPT Project named `Loop` or another name you will recognize.
2. Add the stable sources from `chatgpt-project/`:
   `LOOP-OPERATING-INSTRUCTIONS.md`, `LOOP-CONTEXT-TEMPLATE.md`,
   `LOOP-WORKFLOW.md`, and `LOOP-TOOL-CARD.md`.
3. Generate and add `LOOP-REPO-CONTEXT.md` for each repository you want to
   work on. Keep that file compact and refresh it when the repo contract
   changes.
4. Put the content of `LOOP-OPERATING-INSTRUCTIONS.md` into the Project
   instructions when there is enough room. Keep the uploaded copy too, so the
   source remains versioned with Loop.
5. Connect the authenticated Loop MCP endpoint in the ChatGPT surface you use.
   The MCP server is the live action surface. Project files are guidance and
   repository context, not a replacement for authenticated state.

## First conversation

Start with:

> Read the Loop Project Kit and the repository context. Summarize what you
> know, list the important unknowns, and do not create or change anything.

Then use short commands:

- `Plan the smallest safe way to add [feature]. Ask only high-impact questions.`
- `Show me the draft issue and the acceptance criteria. Do not create it yet.`
- `Create the draft issue exactly as shown.`
- `Validate the task and tell me what would happen next. Do not dispatch it.`
- `Dispatch this approved task.`
- `Review the current Loop tasks and PRs. Tell me what needs my attention.`

## Multiple repositories

Do not put full source trees into the Project. For a repository, add its
generated `LOOP-REPO-CONTEXT.md` and let Loop's live tools resolve current task,
capacity, review, and evidence state. If the request changes repositories, say
which repository is in scope and regenerate or replace the context file.

For an unfamiliar repository, ChatGPT should discover its README, instruction
files, plans, package manifest, CI, and verification commands before creating a
contract. The six setup questions in `docs/SELF-HOSTING-SETUP.md` are the
fallback questions when inspection cannot answer them.

## What this setup does not promise

Project sources improve consistency. They do not give ChatGPT access to a
repository, GitHub account, Box, or Loop state by themselves. Live data and
mutations require the connected MCP tools and their scopes. If a source or tool
is missing, ChatGPT should say that it is missing rather than guessing.
