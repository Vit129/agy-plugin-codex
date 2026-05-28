---
description: Delegate a one-shot prompt to the Antigravity (agy) CLI agent
argument-hint: '[--sandbox] [--continue|--resume|--fresh] [--background] [prompt]'
---

Run the companion from the installed plugin root:

```bash
node "<plugin-root>/scripts/agy-companion.mjs" task $ARGUMENTS
```

Return stdout verbatim. If agy is not installed, ask the user to run `$agy setup`.
