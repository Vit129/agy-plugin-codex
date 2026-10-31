# Graph Summary — graphify-refresh
_Auto-generated from GRAPH_REPORT.md · do not edit manually_
_Regen: `graphify update .`_

## Summary
- 388 nodes · 773 edges · 44 communities (36 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output


## Graph Freshness
- Built from commit: `140a0c8e`
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
1. `resolveWorkspaceRoot()` - bridges 4 areas (17 edges)
2. `handleCancel()` - bridges 4 areas (13 edges)
3. `handleReviewCommand()` - bridges 3 areas (19 edges)
4. `parseCommandInput()` - bridges 3 areas (16 edges)
5. `listJobs()` - bridges 3 areas (11 edges)
6. `handleTaskWorker()` - bridges 3 areas (10 edges)
7. `handleResult()` - bridges 3 areas (8 edges)
8. `readStoredJob()` - bridges 3 areas (7 edges)
9. `handleTask()` - bridges 2 areas (21 edges)

## Surprising Connections (you probably didn't know these)
- `parseCommandInput()` --calls--> `parseArgs()`  [EXTRACTED]
  plugins/agy/scripts/agy-companion.mjs → plugins/agy/scripts/lib/args.mjs
- `resolveCommandWorkspace()` --calls--> `resolveWorkspaceRoot()`  [EXTRACTED]
  plugins/agy/scripts/agy-companion.mjs → plugins/agy/scripts/lib/workspace.mjs
- `buildSetupReport()` --calls--> `getConfig()`  [EXTRACTED]
  plugins/agy/scripts/agy-companion.mjs → plugins/agy/scripts/lib/state.mjs
- `buildSetupReport()` --calls--> `resolveWorkspaceRoot()`  [EXTRACTED]
  plugins/agy/scripts/agy-companion.mjs → plugins/agy/scripts/lib/workspace.mjs
- `handleSetup()` --calls--> `setConfig()`  [EXTRACTED]
  plugins/agy/scripts/agy-companion.mjs → plugins/agy/scripts/lib/state.mjs


_Full map → GRAPH_REPORT.md · query: `graphify query "..."`_
