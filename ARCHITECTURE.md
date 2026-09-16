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
   - Detects Antigravity CLI binary availability and outputs setup guidance if missing or unauthenticated.

## Verification Invariants

- Codex plugin discovery must cleanly load the `$agy` entrypoint from `.agents/plugins/marketplace.json`.
- Task delegation must capture exit status and communicate errors back to Codex without crashing the agent session.
