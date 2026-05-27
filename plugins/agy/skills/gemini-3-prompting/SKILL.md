---
name: gemini-3-prompting
description: Guidance for writing effective prompts for Antigravity (agy) / Gemini 3 models.
user-invocable: false
---

# Gemini 3 Prompting for Agy

Use this only to tighten a user's request before forwarding it to `agy`.

## Prompt Structure

1. State the goal clearly.
2. Provide the relevant context, files, errors, or constraints.
3. Specify scope and non-goals.
4. State acceptance criteria.

## Do

- Be specific about files, functions, components, and error messages.
- Include the tech stack if it is relevant and not obvious.
- Keep the prompt concise and direct.
- Ask for a specific output format when Codex needs to consume the result.

## Do Not

- Do not ask agy to "look at everything" without scope.
- Do not include Codex-side speculation as fact.
- Do not include `--background`, `--continue`, or `--fresh` inside the natural-language prompt.
- Do not ask agy to make irreversible changes without a clear verification plan.
