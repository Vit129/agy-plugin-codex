# agy-plugin-codex

A Codex plugin that integrates the Antigravity (`agy`) CLI into Codex CLI.

This is the Codex-native counterpart to `agy-plugin-cc`. It follows the same Codex marketplace pattern used by reverse Claude/Codex plugins:

- repo-local marketplace metadata at `.agents/plugins/marketplace.json`
- nested installable plugin at `plugins/agy`
- Codex-facing skill entrypoint using `$agy`
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

Add the local marketplace from this checkout:

```bash
codex plugin marketplace add ./
```

Then install `Agy` from the `Agy Plugin Codex` marketplace in Codex.

After installing the plugin in Codex, start a new Codex thread and use:

```text
$agy setup
$agy task explain how authentication works in this repo
$agy rescue --background Investigate the flaky portfolio test
$agy rescue --continue Apply the top fix
$agy rescue --fresh Start a new investigation of the DCA state bug
```

## Contents

- `.agents/plugins/marketplace.json` - Codex marketplace entry
- `plugins/agy/` - nested installable plugin package
- `plugins/agy/.codex-plugin/plugin.json` - Codex plugin manifest
- `plugins/agy/skills/agy/SKILL.md` - user-facing `$agy` workflow
- `plugins/agy/skills/agy-cli-runtime/SKILL.md` - runtime contract for invoking the helper
- `plugins/agy/skills/gemini-3-prompting/SKILL.md` - prompt-shaping guidance
- `plugins/agy/scripts/agy-companion.mjs` - local wrapper around the `agy` CLI

Codex does not use Claude Code `commands/` or `agents/` directories. The equivalent behavior lives in `skills/agy/SKILL.md`, which routes setup, direct delegation, rescue, background, fresh, and continue workflows through the same companion script.

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
