# agy-plugin-codex

> Unofficial community project. Not affiliated with, sponsored or endorsed by Google. "Antigravity" and "Google" are trademarks of Google LLC.

A Codex plugin that integrates **Google's Antigravity (agy) CLI** and **Antigravity IDE** developer tools into Codex CLI.

This is the Codex-native counterpart to [`agy-plugin-cc`](https://github.com/Vit129/agy-plugin-cc). It follows the same Codex marketplace pattern used by reverse Claude/Codex plugins, optimizing workflows for **Google Antigravity** systems:

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

## Installation & Usage

Install from GitHub:

```bash
codex plugin marketplace add Vit129/agy-plugin-codex
codex plugin add agy@agy-plugin-codex
```

Update: Codex has no automatic plugin updates; run `codex plugin marketplace upgrade` to refresh the marketplace, then start a new Codex session.

## Commands & Usage

After installing the plugin in Codex, start a new Codex thread and use:

### `$agy setup`

Check whether `agy` is installed and optionally toggle the stop-time review gate.

```text
$agy setup
$agy setup --enable-review-gate
$agy setup --disable-review-gate
```

---

### `$agy task [prompt]`

Run a one-shot `agy` task directly.

```text
$agy task "Explain how the authentication flow works in this repo"
$agy task --continue "Keep going"
$agy task --sandbox "What files changed in the last commit?"
```

---

### `$agy rescue [task]`

Delegate investigation, fixes, or follow-up work to `agy`. Checks for a resumable previous session before starting.

```text
$agy rescue "Fix the memory leak in the WebSocket connection handler"
$agy rescue "Triage the slow query logs" --background
$agy rescue "Keep going" --resume
$agy rescue "Start over from scratch" --fresh
$agy rescue "Read-only audit of the auth module" --sandbox
```

**Flags:**

| Flag | Description |
|------|-------------|
| `--background` | Run in the background; check progress with `$agy status` |
| `--resume` / `--continue` | Continue the most recent agy conversation |
| `--fresh` | Force a new conversation, ignoring previous context |
| `--sandbox` | Run agy with terminal restrictions (read-only mode) |
| `--model <name>` | Select specific Gemini / Antigravity model |
| `--effort <level>` | Reasoning effort (`low`, `medium`, `high`) |

---

### `$agy review`

Run a code review — agy examines the current git changes and reports findings.

```text
$agy review
$agy review --wait
$agy review --background
$agy review --scope branch
$agy review --base main
```

**Scopes:** `auto` (default), `working-tree`, `branch`

---

### `$agy adversarial-review [focus]`

Run an adversarial review — agy tries to find the strongest reasons the change should *not* ship.

```text
$agy adversarial-review
$agy adversarial-review "focus on the auth boundary"
$agy adversarial-review --base main --wait
```

---

### `$agy status [job-id]`

Show active and recent agy jobs for this repository.

```text
$agy status
$agy status task-abc123
$agy status task-abc123 --wait
$agy status --all
```

---

### `$agy result [job-id]`

Show the stored output for a finished job.

```text
$agy result
$agy result task-abc123
```

---

### `$agy cancel [job-id]`

Cancel an active background job.

```text
$agy cancel
$agy cancel task-abc123
```

---

## Stop-Time Review Gate

When enabled, `agy` runs a review before each session ends and blocks if it finds issues.

```text
$agy setup --enable-review-gate   # turn on
$agy setup --disable-review-gate  # turn off
```

When a session ends with the gate enabled:
- `agy` reviews the previous response
- If it responds `ALLOW:` — the session closes normally
- If it responds `BLOCK:` — the session is blocked with the reason

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
node scripts/agy-companion.mjs update [--pull|--dismiss] [--json]
```

`update` checks `version.json` on this repo's `main` branch against the version this checkout was built from. It never pulls on its own: it only reports what it finds, `--pull` re-checks the working tree is clean and then runs `git pull origin main`, and `--dismiss` silences the notice until a newer version ships. The same check runs (read-only) at session start via `plugins/agy/scripts/session-lifecycle-hook.mjs`.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Runtime State

The helper stores per-workspace job state, result payloads, and background logs under `CODEX_PLUGIN_DATA/state/` when Codex provides that directory. If `CODEX_PLUGIN_DATA` is not set, it falls back to:

```text
/tmp/agy-companion/
```

## Contributors

Developed and maintained by **Vit129** and **Claude** (Anthropic).

## License

Apache License 2.0 — see [LICENSE](./LICENSE) and [NOTICE](./NOTICE). Parts of the design
and scripts are derived from [`codex-plugin-cc`](https://github.com/openai/codex-plugin-cc) (Copyright 2026 OpenAI,
Apache-2.0), credited in `NOTICE`. Earlier releases were published under MIT and remain
available under those terms (`LICENSE-MIT`). Keep `LICENSE` and `NOTICE` when you
redistribute, and mark the files you change.
