---
description: Run an agy code review against local git state
argument-hint: '[--wait|--background] [--dry-run] [--base <ref>] [--scope auto|working-tree|branch] [--model <name>] [--effort <low|medium|high>]'
---

Run the companion from the installed plugin root:

```bash
node "<plugin-root>/scripts/agy-companion.mjs" review $ARGUMENTS
```

This command is review-only. Return agy's output verbatim and do not apply fixes in the same command.
