---
name: agy
description: Use when the user invokes $agy, asks to run Antigravity, agy, Gemini CLI successor, agy setup, delegate work to agy, continue an agy task, or get a second coding/debugging pass through the local agy CLI.
---

# Agy for Codex

This skill is the Codex-native `$agy` command surface. It delegates bounded work to the local Antigravity (`agy`) CLI through the plugin helper script.

## Command Surface

Supported portable forms:

```text
$agy setup [--enable-review-gate|--disable-review-gate]
$agy task [--background] [--sandbox] [--continue|--resume|--fresh] <prompt>
$agy rescue [--background|--wait] [--resume|--fresh] [--sandbox] <prompt>
$agy review [--background|--wait] [--scope auto|working-tree|branch] [--base <ref>]
$agy adversarial-review [--background|--wait] [--scope auto|working-tree|branch] [--base <ref>] [focus]
$agy status [job-id] [--wait] [--all]
$agy result [job-id]
$agy cancel [job-id]
```

Slash-style aliases such as `/agy setup` may work in some Codex builds, but `$agy` is the stable form.

## Helper Resolution

The helper lives at `../../scripts/agy-companion.mjs` relative to this `SKILL.md`.

When invoking it, resolve the absolute plugin root from the skill path and run:

```bash
node "<plugin-root>/scripts/agy-companion.mjs" <subcommand>
```

## Setup

If the user asks for setup or readiness checks, or invokes `$agy setup`, run:

```bash
node "<plugin-root>/scripts/agy-companion.mjs" setup
```

Print the result. If `agy` is missing, tell the user to install and authenticate it:

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
agy auth
```

## One-Shot Delegation

For `$agy task <prompt>` or a direct agy prompt, run:

```bash
node "<plugin-root>/scripts/agy-companion.mjs" task "<user task>"
```

Return agy's output verbatim unless the user asked Codex to summarize or integrate it.

## Background and Resume Workflow

Use this for `$agy task ...`, when Codex is stuck, or when a second independent implementation/debugging pass is useful.

Supported flags:

- `--background`: start agy and return the log path immediately
- `--continue` / `--resume`: resume the most recent agy conversation
- `--fresh`: start without resume
Before a follow-up task with neither `--continue` nor `--fresh`, check:

```bash
node "<plugin-root>/scripts/agy-companion.mjs" task-resume-candidate --json
```

If a candidate exists and the user's request is clearly a follow-up, use `--continue`. If it is a new task, use `--fresh`. If unclear, make the conservative choice from the wording and state it briefly before running.

## Operating Rules

- Keep the delegated prompt scoped and concrete.
- Preserve the user's task text apart from stripping routing flags.
- Do not pass `--background`, `--fresh`, or `--continue` inside the natural-language prompt.
- Return raw agy output for pure delegation requests.
- If using agy output to make local code edits, inspect and verify the final code yourself before responding.
