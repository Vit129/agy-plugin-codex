# Design

## Interaction model

The product is a Codex plugin and conversational skill, not a graphical application. The design surface is the command vocabulary, prompts, status output, and lifecycle behavior.

## Principles

- Keep the plugin interface explicit about foreground and background execution.
- Keep status and result retrieval available through the documented `$agy` commands.
- Make update checks read-only unless the user explicitly requests a pull.
- Keep runtime review isolated in a separate test Codex profile.

There is no visual UI, so a graphical layout specification does not apply.
