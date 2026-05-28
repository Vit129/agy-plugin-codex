# agy-plugin-codex

A Codex plugin that integrates the Antigravity (`agy`) CLI into Codex CLI.

This is the nested installable `agy` package for `agy-plugin-codex`. It keeps the same runtime ideas as `agy-plugin-cc` where Codex supports them:

- setup verification for the local `agy` binary
- one-shot prompt delegation
- foreground or background task execution
- fresh or continued conversations
- lightweight prompt-shaping guidance for Gemini 3 / Antigravity models

## Prerequisites

The Antigravity CLI must be installed on your system and authenticated before using this plugin.

1. **Install agy CLI:**

   **Mac/Linux:**
   ```bash
   curl -fsSL https://antigravity.google/cli/install.sh | bash
   ```

   **Windows PowerShell:**
   ```powershell
   irm https://antigravity.google/cli/install.ps1 | iex
   ```

   **Windows CMD:**
   ```cmd
   curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd && del install.cmd
   ```

2. **Authenticate with your Google account:**
   ```bash
   agy auth
   ```

## Usage

After installing the plugin in Codex, start a new Codex thread and use:

```text
$agy setup
$agy task explain how authentication works in this repo
$agy task --background Investigate the flaky portfolio test
$agy task --continue Apply the top fix
$agy task --fresh Start a new investigation of the DCA state bug
```

`$agy task`, `$agy rescue`, `$agy review`, `$agy adversarial-review`, `$agy status`, `$agy result`, and `$agy cancel` are implemented by the companion script.

## Contents

- `.codex-plugin/plugin.json` - Codex plugin manifest
- `skills/agy/SKILL.md` - user-facing agy workflow
- `skills/agy-cli-runtime/SKILL.md` - runtime contract for invoking the helper
- `skills/gemini-3-prompting/SKILL.md` - prompt-shaping guidance
- `scripts/agy-companion.mjs` - local wrapper around the `agy` CLI

Codex does not expose a documented custom slash-command API equivalent to Claude Code `commands/` and `agents/`. `$agy` is the portable skill command form.

The helper script itself exposes:

```text
node scripts/agy-companion.mjs setup [--enable-review-gate|--disable-review-gate] [--json]
node scripts/agy-companion.mjs task [--background] [--sandbox] [--continue|--resume|--fresh] [prompt]
node scripts/agy-companion.mjs task-resume-candidate [--json]
node scripts/agy-companion.mjs review [--background|--wait] [--scope auto|working-tree|branch] [--base <ref>]
node scripts/agy-companion.mjs adversarial-review [--background|--wait] [--scope auto|working-tree|branch] [--base <ref>] [focus]
node scripts/agy-companion.mjs status [job-id] [--wait] [--all] [--json]
node scripts/agy-companion.mjs result [job-id] [--json]
node scripts/agy-companion.mjs cancel [job-id] [--json]
```

## Runtime State

The helper stores per-workspace job state, result payloads, and background logs under `CODEX_PLUGIN_DATA/state/` when Codex provides that directory. If `CODEX_PLUGIN_DATA` is not set, it falls back to:

```text
/tmp/agy-companion/
```
