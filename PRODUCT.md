# Product

The Codex plugin integrates the Antigravity `agy` CLI and IDE workflow with Codex. It provides plugin metadata, the `$agy` skill, a local companion wrapper, and lifecycle support.

## Users and interface

The users are developers running Codex with Antigravity installed and authenticated. The interface is the Codex plugin command and skill conversation. This repository does not ship a graphical application.

## Delivery

`npm test` runs the Node test suite, `npm run check` validates JavaScript syntax, and `npm run build` combines those checks with `npm pack --dry-run`. `make start` runs the safe preview gate. Runtime review requires a separate test Codex profile.
