---
name: agy-cli-runtime
description: Internal helper contract for invoking the agy-companion runtime from Codex.
user-invocable: false
---

# Agy Runtime

Use this helper contract only from the `agy` skill.

Primary helper:

```bash
node "<plugin-root>/scripts/agy-companion.mjs" task "<raw task>"
```

Subcommands:

- `setup [--enable-review-gate|--disable-review-gate] [--json]`
- `task [--background] [--sandbox] [--continue|--resume|--fresh] [prompt]`
- `task-worker --job-id <id>`
- `task-resume-candidate [--json]`
- `review [--background|--wait] [--scope auto|working-tree|branch] [--base <ref>]`
- `adversarial-review [--background|--wait] [--scope auto|working-tree|branch] [--base <ref>] [focus]`
- `status [job-id] [--wait] [--all] [--json]`
- `result [job-id] [--json]`
- `cancel [job-id] [--json]`

Rules:

- Use `task` for coding, debugging, diagnosis, planning, and explicit fix delegation.
- Use `setup` only when the user asks to verify installation/readiness.
- Use `task-resume-candidate` before ambiguous rescue continuation.
- Preserve user task text except routing flags.
- If the user explicitly asks for `--continue`, pass `--continue`.
- If the user explicitly asks for `--fresh`, omit `--continue`.
- If the request is a follow-up such as "continue", "keep going", "resume", "apply the top fix", or "dig deeper", prefer `--continue`.
