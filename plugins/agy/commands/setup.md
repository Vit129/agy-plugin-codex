---
description: Check whether the Antigravity (agy) CLI is installed and optionally toggle the stop-time review gate
argument-hint: '[--enable-review-gate|--disable-review-gate]'
---

Run the companion from the installed plugin root:

```bash
node "<plugin-root>/scripts/agy-companion.mjs" setup --json $ARGUMENTS
```

If agy is unavailable, tell the user to install it and run `agy auth`.
