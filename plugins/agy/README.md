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

`$agy task` is the supported command for one-shot, background, fresh, and continued runs. Older examples may mention `$agy rescue`; that subcommand is not implemented by the current companion script.

## Contents

- `.codex-plugin/plugin.json` - Codex plugin manifest
- `skills/agy/SKILL.md` - user-facing agy workflow
- `skills/agy-cli-runtime/SKILL.md` - runtime contract for invoking the helper
- `skills/gemini-3-prompting/SKILL.md` - prompt-shaping guidance
- `scripts/agy-companion.mjs` - local wrapper around the `agy` CLI

Codex does not expose a documented custom slash-command API equivalent to Claude Code `commands/` and `agents/`. `$agy` is the portable skill command form.

The helper script itself exposes:

```text
node scripts/agy-companion.mjs setup [--json]
node scripts/agy-companion.mjs task [--background] [--continue|--fresh] [--model <model>] [prompt]
node scripts/agy-companion.mjs task-resume-candidate [--json]
```

## Runtime State

The helper stores resumable task metadata and background logs under:

```text
~/.codex/agy-companion/
```

If that directory is not writable in the current sandbox, the helper falls back to:

```text
/tmp/agy-companion/
```

The helper also passes an explicit `--log-file` path to `agy` so sandboxed runs do not fail just because the default Antigravity log directory is unavailable.
