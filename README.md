# agy-plugin-codex

A Codex plugin that integrates **Google's Antigravity (agy) CLI** and **Antigravity IDE** developer tools into Codex CLI.

This is the Codex-native counterpart (often referred to as **Google Agy Codex Plugin** or **Antigravity Codex Plugin**) to `agy-plugin-cc`. It follows the same Codex marketplace pattern used by reverse Claude/Codex plugins, optimizing workflows for **Google Antigravity** systems:

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

Or install/update through npm:

```bash
npx -y @vit129/agy-plugin-codex@latest install
```

Opt in to automatic npm updates:

```bash
npx -y @vit129/agy-plugin-codex@latest install --auto-update
```

With auto-update enabled, `$agy setup` checks npm at most once every 24 hours. If a newer version exists, it reinstalls the Codex plugin cache and asks you to start a new Codex session. Without auto-update, `$agy setup` only prints the update command.

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

- `.agents/plugins/marketplace.json` - Codex marketplace entry
- `plugins/agy/` - nested installable plugin package
- `plugins/agy/.codex-plugin/plugin.json` - Codex plugin manifest
- `plugins/agy/skills/agy/SKILL.md` - user-facing `$agy` workflow
- `plugins/agy/skills/agy-cli-runtime/SKILL.md` - runtime contract for invoking the helper
- `plugins/agy/skills/gemini-3-prompting/SKILL.md` - prompt-shaping guidance
- `plugins/agy/scripts/agy-companion.mjs` - local wrapper around the `agy` CLI

Codex does not use Claude Code `commands/` or `agents/` directories. The equivalent behavior lives in `skills/agy/SKILL.md`, which routes setup, direct delegation, background, fresh, and continue workflows through the same companion script.

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

## Changelog

### v1.2.0 (2026-05-30)

- Added npm package metadata and `agy-plugin-codex` installer CLI.
- Added `npx -y @vit129/agy-plugin-codex@latest install` for repeatable install/update.
- Added opt-in auto-update with `install --auto-update` or `$agy setup --enable-auto-update`.
- `$agy setup` now checks npm for newer plugin versions and notifies by default.

### v1.1.0 (2026-05-28)

- **`$agy rescue`** — delegate investigation/fix work; flags: `--background`, `--resume`, `--fresh`, `--sandbox`, `--wait`
- **`$agy review`** — code review via agy; flags: `--background`, `--wait`, `--scope auto|working-tree|branch`, `--base <ref>`
- **`$agy adversarial-review [focus]`** — adversarial review mode
- **`$agy status [job-id]`** — list active/recent jobs; `--wait`, `--all`
- **`$agy result [job-id]`** — retrieve stored output for finished job
- **`$agy cancel [job-id]`** — cancel a running background job
- **SessionStart / Stop hooks** — session lifecycle management + stop-time review gate
- **Job tracking** — persistent job state (queued / running / completed / failed / cancelled)
- **Modular library** — `agy.mjs`, `args.mjs`, `fs.mjs`, `git.mjs`, `job-control.mjs`, `process.mjs`, `render.mjs`, `state.mjs`, `tracked-jobs.mjs`, `workspace.mjs`
- **Review prompts** — `review.md`, `adversarial-review.md`, `stop-review-gate.md`
- Full feature parity with `agy-plugin-cc` v1.1.0

### v1.0.0

- Initial release: `$agy setup`, `$agy task` — basic task delegation and resume

---

## Runtime State

The helper stores per-workspace job state, result payloads, and background logs under `CODEX_PLUGIN_DATA/state/` when Codex provides that directory. If `CODEX_PLUGIN_DATA` is not set, it falls back to:

```text
/tmp/agy-companion/
```
