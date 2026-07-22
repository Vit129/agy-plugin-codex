---
description: Run an agy adversarial review that challenges implementation choices and assumptions
argument-hint: '[--wait|--background] [--dry-run] [--base <ref>] [--scope auto|working-tree|branch] [--model <name>] [--effort <low|medium|high>] [focus ...]'
---

Run the companion from the installed plugin root:

```bash
node "<plugin-root>/scripts/agy-companion.mjs" adversarial-review $ARGUMENTS
```

This command is review-only. Return agy's output verbatim and do not apply fixes in the same command.
