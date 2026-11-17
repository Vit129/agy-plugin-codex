# Graph Report - agy-plugin-codex  (2026-11-17)

## Corpus Check
- 68 files · ~27,610 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 433 nodes · 817 edges · 51 communities (42 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `22dcf199`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## God Nodes (most connected - your core abstractions)
1. `handleTask()` - 21 edges
2. `handleReviewCommand()` - 19 edges
3. `resolveWorkspaceRoot()` - 17 edges
4. `parseCommandInput()` - 16 edges
5. `resolveCommandCwd()` - 15 edges
6. `main()` - 15 edges
7. `outputCommandResult()` - 13 edges
8. `handleCancel()` - 13 edges
9. `saveState()` - 12 edges
10. `What You Must Do When Invoked` - 12 edges

## Cross-Cutting Nodes (span the most distinct areas of the codebase)
A high-degree node isn't always architecturally central - a widely-used
utility/config file can rack up more edges than a real coupler while only
ever touching one area. This ranks by how many DIFFERENT communities a
node's neighbors span, not by raw edge count.
1. `handleCancel()` - bridges 4 areas (13 edges)
2. `executeTaskRun()` - bridges 4 areas (9 edges)
3. `resolveWorkspaceRoot()` - bridges 3 areas (17 edges)
4. `executeReviewRun()` - bridges 3 areas (10 edges)
5. `handleTaskWorker()` - bridges 3 areas (10 edges)
6. `handleSetup()` - bridges 3 areas (9 edges)
7. `getAgyAvailability()` - bridges 3 areas (9 edges)
8. `binaryAvailable()` - bridges 3 areas (7 edges)
9. `handleStatus()` - bridges 2 areas (11 edges)
10. `listJobs()` - bridges 2 areas (11 edges)

## Surprising Connections (you probably didn't know these)
- `parseCommandInput()` --calls--> `parseArgs()`  [EXTRACTED]
  plugins/agy/scripts/agy-companion.mjs → plugins/agy/scripts/lib/args.mjs
- `resolveCommandWorkspace()` --calls--> `resolveWorkspaceRoot()`  [EXTRACTED]
  plugins/agy/scripts/agy-companion.mjs → plugins/agy/scripts/lib/workspace.mjs
- `ensureAgyAvailable()` --calls--> `getAgyAvailability()`  [EXTRACTED]
  plugins/agy/scripts/agy-companion.mjs → plugins/agy/scripts/lib/agy.mjs
- `handleSetup()` --calls--> `renderSetupReport()`  [EXTRACTED]
  plugins/agy/scripts/agy-companion.mjs → plugins/agy/scripts/lib/render.mjs
- `handleSetup()` --calls--> `setConfig()`  [EXTRACTED]
  plugins/agy/scripts/agy-companion.mjs → plugins/agy/scripts/lib/state.mjs

## Import Cycles
- None detected.

## Communities (51 total, 9 thin omitted)

### Community 0 - "agy-companion.mjs"
Cohesion: 0.09
Nodes (65): buildAgyRunOptions(), buildDoctorReport(), buildDryRunReport(), buildHostDoctor(), buildQuotaLines(), buildReviewPrompt(), buildStopGatePrompt(), buildTaskJob() (+57 more)

### Community 1 - "state.mjs"
Cohesion: 0.16
Nodes (30): createTrackedProgress(), defaultState(), ensureStateDir(), FALLBACK_STATE_ROOT_DIR, loadState(), nowIso(), pruneJobs(), readJobFile() (+22 more)

### Community 2 - "job-control.mjs"
Cohesion: 0.13
Nodes (35): buildSetupReport(), getAgyAuthStatus(), getAgyAvailability(), buildSingleJobSnapshot(), buildStatusSnapshot(), enrichJob(), filterJobsForCurrentSession(), findLatestResumableTaskJob() (+27 more)

### Community 3 - "install.mjs"
Cohesion: 0.06
Nodes (31): [1.0.0] - 2026-05-27, [1.1.0] - 2026-05-28, [1.4.0] - 2026-07-22, [1.5.0] - 2026-08-23, [1.5.1] - 2026-09-15, Added, Added, Added (+23 more)

### Community 4 - "git.mjs"
Cohesion: 0.11
Nodes (32): executeReviewRun(), firstMeaningfulLine(), getCodexBarAvailability(), detectDefaultBranch(), ensureGitRepository(), getCurrentBranch(), git(), gitChecked() (+24 more)

### Community 5 - "update-check.mjs"
Cohesion: 0.24
Nodes (11): appendActiveJobsTable(), escapeMarkdownCell(), formatJobLine(), pushJobDetails(), renderCancelReport(), renderJobStatusReport(), renderReviewResult(), renderSetupReport() (+3 more)

### Community 6 - "package.json"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 7 - "agy.mjs"
Cohesion: 0.10
Nodes (22): normalizeArgv(), buildAgyArgs(), runAgyAgents(), runAgyChangelog(), runAgyTask(), runAgyTaskSync(), parseArgs(), splitRawArgumentString() (+14 more)

### Community 8 - "agy.mjs"
Cohesion: 0.11
Nodes (17): description, engines, node, files, license, name, private, scripts (+9 more)

### Community 9 - "agy-plugin-codex"
Cohesion: 0.18
Nodes (10): Agent Memory, agy-plugin-codex — Agent Instructions, Global-First Rule, graphify, Project Context (auto-loaded every session), Project Summary, Session Start, Skill Routing (domain-based, not keyword-based) (+2 more)

### Community 10 - "Agy for Codex"
Cohesion: 0.20
Nodes (9): Agy for Codex, Background and Resume Workflow, Command Surface, Extended agy CLI Passthrough, Git-Clone Update Check, Helper Resolution, One-Shot Delegation, Operating Rules (+1 more)

### Community 11 - "agy-plugin-codex — Claude Code Guide"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 12 - "agy-plugin-codex"
Cohesion: 0.33
Nodes (5): agy-plugin-codex — System Architecture, Constraints & Objectives, Structure deviations, Subsystems, Verification Invariants

### Community 13 - "Context"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 14 - "Gemini 3 Prompting for Agy"
Cohesion: 0.33
Nodes (5): agy-plugin-codex, Contents, Prerequisites, Runtime State, Usage

### Community 15 - "state.mjs"
Cohesion: 0.33
Nodes (5): Do, Do Not, Gemini 3 Prompting for Agy, Prompt Structure, Research / Audit / Comparison Tasks (exception to "scope it")

### Community 16 - "What You Must Do When Invoked"
Cohesion: 0.33
Nodes (5): Reporting a Vulnerability, Response Expectations, Scope Notes, Security Policy, Supported Versions

### Community 17 - "Agy Runtime"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 18 - "adversarial-review.md"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 19 - "agy.md"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 44 - "changelog.md"
Cohesion: 0.22
Nodes (8): jobs, check, name, on, pull_request, push, permissions, contents

### Community 45 - "agy-plugin-codex — Agent Instructions"
Cohesion: 0.50
Nodes (3): Design, Interaction model, Principles

### Community 46 - "agy-plugin-codex — System Architecture"
Cohesion: 0.50
Nodes (3): Delivery, Product, Users and interface

### Community 47 - "CONTEXT.md"
Cohesion: 0.29
Nodes (4): changelog, root, surfaces, updater

### Community 48 - "set-release-version.mjs"
Cohesion: 0.47
Nodes (4): scriptPath, setVersion(), updateReleaseVersion(), release metadata updates semver and build surfaces together

### Community 49 - "README.md"
Cohesion: 0.50
Nodes (3): Answer, Outcome, Q: sandbox|approval|spawn

## Knowledge Gaps
- **158 isolated node(s):** `name`, `pull_request`, `push`, `contents`, `check` (+153 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `resolveWorkspaceRoot()` connect `job-control.mjs` to `agy-companion.mjs`, `state.mjs`, `git.mjs`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `checkGitCloneUpdate()` connect `git.mjs` to `agy-companion.mjs`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `runAgyTask()` connect `agy.mjs` to `agy-companion.mjs`, `git.mjs`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `name`, `pull_request`, `push` to the rest of the system?**
  _158 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `agy-companion.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.08604038630377524 - nodes in this community are weakly interconnected._
- **Should `job-control.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.12802275960170698 - nodes in this community are weakly interconnected._
- **Should `install.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._