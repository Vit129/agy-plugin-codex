---
description: Delegate investigation, an explicit fix request, or follow-up rescue work to agy
argument-hint: '[--background|--wait] [--resume|--fresh] [--sandbox] [what agy should investigate, solve, or continue]'
---

Run the companion from the installed plugin root:

```bash
node "<plugin-root>/scripts/agy-companion.mjs" task $ARGUMENTS
```

Rules:
- Preserve `--background`, `--wait`, `--resume`, `--fresh`, and `--sandbox` as runtime flags.
- If neither `--resume` nor `--fresh` is supplied and the request is ambiguous, check `task-resume-candidate --json` first.
- Return agy output verbatim.
