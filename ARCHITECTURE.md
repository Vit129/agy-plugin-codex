# agy-plugin-codex — System Architecture

> Status: **active**. Companion to `README.md` and `CLAUDE.md`.

## Constraints & Objectives

- **Codex Native Marketplace Architecture:** Implements the Codex marketplace structure (`.agents/plugins/marketplace.json`, nested `plugins/agy/`) to integrate Antigravity into Codex CLI workflows.
- **Skill Entrypoint (`$agy`):** Exposes Antigravity prompt delegation natively within Codex sessions without external runtime overhead.
- **Environment Parity:** Mirrors the execution semantics of `agy-plugin-cc` for unified cross-agent behavior on the host machine.

## Subsystems

1. **Codex Marketplace & Plugin Metadata (`.agents/`, `plugins/agy/`):**
   - Defines plugin registration, capabilities, and `$agy` skill dispatch bindings.
2. **Execution & Delegation Engine (`scripts/`):**
   - Handles background task execution, output artifact collection, and session continuation using the host `agy` binary.
3. **Verification & Diagnostics:**
   - Detects Antigravity CLI binary availability and outputs setup guidance if missing.
   - Accepted limit (owner decision, 2026-11-22): agy 1.5.x has no auth status command, so login is not verified. `ready` means the binary is available; `auth` reports "not verified". If a task fails with an auth error, the user runs `agy` once interactively to log in.

## Verification Invariants

- Codex plugin discovery must cleanly load the `$agy` entrypoint from `.agents/plugins/marketplace.json`.
- Task delegation must capture exit status and communicate errors back to Codex without crashing the agent session.

## Structure deviations

- §1 one dir = one role (MUST) — `plugins/agy/` is the Codex plugin layout (commands, hooks, prompts, scripts, skills) mandated by the plugin system, not the role layout — revisit only if the plugin spec changes.
