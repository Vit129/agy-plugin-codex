#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const STATE_DIR = path.join(os.homedir(), ".codex", "agy-companion");
const SESSION_FILE = path.join(STATE_DIR, "last-session.json");
const FALLBACK_STATE_DIR = path.join(os.tmpdir(), "agy-companion");

function ensureDirOrFallback(primaryDir = STATE_DIR) {
  for (const candidateDir of [primaryDir, FALLBACK_STATE_DIR]) {
    try {
      fs.mkdirSync(candidateDir, { recursive: true });
      const probeFile = path.join(candidateDir, ".write-test");
      fs.writeFileSync(probeFile, "");
      fs.unlinkSync(probeFile);
      return candidateDir;
    } catch {
      // Try the next state location.
    }
  }
  return os.tmpdir();
}

function ensureStateDir() {
  return ensureDirOrFallback(STATE_DIR);
}

function readLastSession() {
  for (const file of [SESSION_FILE, path.join(FALLBACK_STATE_DIR, "last-session.json")]) {
    try {
      return JSON.parse(fs.readFileSync(file, "utf8"));
    } catch {
      // Try the next state location.
    }
  }
  return null;
}

function writeLastSession(data) {
  const stateDir = ensureStateDir();
  const sessionFile = path.join(stateDir, "last-session.json");
  try {
    fs.writeFileSync(sessionFile, JSON.stringify(data, null, 2));
    return sessionFile;
  } catch (error) {
    process.stderr.write(formatStateWarning(error, sessionFile));
    return null;
  }
}

function formatStateWarning(error, targetPath) {
  const reason = error?.code ? `${error.code}: ${error.message}` : String(error);
  return [
    "",
    `agy companion warning: could not write state file ${targetPath}`,
    `Reason: ${reason}`,
    "The agy command output above is still valid, but resume/status metadata was not saved.",
    ""
  ].join("\n");
}

function getAgyPath() {
  const result = spawnSync("which", ["agy"], { encoding: "utf8" });
  return result.stdout.trim() || null;
}

function getAgyVersion() {
  const result = spawnSync("agy", ["--version"], { encoding: "utf8" });
  return result.stdout.trim() || result.stderr.trim() || null;
}

function parseArgs(argv) {
  const opts = {
    background: false,
    continue: false,
    fresh: false,
    json: false,
    model: null,
    positionals: []
  };

  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    if (arg === "--background") {
      opts.background = true;
    } else if (arg === "--continue" || arg === "-c") {
      opts.continue = true;
    } else if (arg === "--fresh") {
      opts.fresh = true;
    } else if (arg === "--json") {
      opts.json = true;
    } else if (arg === "--model" || arg === "-m") {
      opts.model = argv[++i] ?? null;
    } else if (arg.startsWith("--model=")) {
      opts.model = arg.slice("--model=".length);
    } else {
      opts.positionals.push(arg);
    }
    i++;
  }

  return opts;
}

function buildAgyArgs(prompt, opts) {
  const args = [];
  args.push("--log-file", buildAgyLogFilePath());
  if (opts.continue) {
    args.push("--continue");
  }
  if (opts.model) {
    args.push("--model", opts.model);
  }
  args.push("--print", decoratePrompt(prompt));
  return args;
}

function buildAgyLogFilePath() {
  const stateDir = ensureStateDir();
  return path.join(stateDir, `agy-cli-${new Date().toISOString().replace(/[:.]/g, "-")}.log`);
}

function decoratePrompt(prompt) {
  const cwd = process.cwd();
  return [
    `Workspace: ${cwd}`,
    "Use this workspace as the source of truth. If a relative path is mentioned, resolve it from this workspace and do not use copied workspaces elsewhere.",
    "",
    prompt
  ].join("\n");
}

async function runAgyForeground(prompt, opts) {
  const agyPath = getAgyPath();
  if (!agyPath) {
    process.stderr.write("agy is not installed. Run: curl -fsSL https://antigravity.google/cli/install.sh | bash\n");
    process.exitCode = 1;
    return;
  }

  const args = buildAgyArgs(prompt, opts);
  const startedAt = new Date().toISOString();

  return new Promise((resolve) => {
    const child = spawn(agyPath, args, {
      cwd: process.cwd(),
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"]
    });

    let stderr = "";

    child.stdout.on("data", (chunk) => {
      process.stdout.write(chunk.toString());
    });

    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      stderr += text;
      process.stderr.write(text);
    });

    child.on("close", (code) => {
      writeLastSession({
        prompt,
        startedAt,
        completedAt: new Date().toISOString(),
        exitCode: code,
        continued: opts.continue,
        model: opts.model
      });
      if (code !== 0) {
        maybePrintSandboxHint(stderr);
        process.exitCode = code;
      }
      resolve();
    });
  });
}

function runAgyBackground(prompt, opts) {
  const agyPath = getAgyPath();
  if (!agyPath) {
    process.stderr.write("agy is not installed. Run: curl -fsSL https://antigravity.google/cli/install.sh | bash\n");
    process.exitCode = 1;
    return;
  }

  ensureStateDir();
  const jobId = `agy-${Date.now()}`;
  const logFile = path.join(ensureStateDir(), `${jobId}.log`);
  const args = buildAgyArgs(prompt, opts);

  const child = spawn(agyPath, args, {
    cwd: process.cwd(),
    env: process.env,
    detached: true,
    stdio: ["ignore", fs.openSync(logFile, "w"), fs.openSync(logFile, "a")]
  });
  child.unref();

  const session = {
    jobId,
    prompt,
    startedAt: new Date().toISOString(),
    pid: child.pid,
    logFile,
    status: "running",
    continued: opts.continue,
    model: opts.model
  };

  writeLastSession(session);
  process.stdout.write(`agy task started in background as ${jobId}. Log: ${logFile}\n`);
}

function maybePrintSandboxHint(stderr) {
  if (!/operation not permitted|listen tcp|bind|Failed to redirect output/i.test(stderr)) {
    return;
  }
  process.stderr.write(
    [
      "",
      "agy companion hint: agy needs permissions that this sandbox may block.",
      "It starts a local language server and writes CLI state/log files.",
      "Run this command outside the sandbox, or approve the Codex escalation prompt when offered.",
      ""
    ].join("\n")
  );
}

function handleSetup() {
  const agyPath = getAgyPath();
  const version = agyPath ? getAgyVersion() : null;
  const ready = Boolean(agyPath);

  const report = {
    ready,
    agy: { available: ready, path: agyPath, version },
    nextSteps: ready ? [] : ["Install agy with: curl -fsSL https://antigravity.google/cli/install.sh | bash"]
  };

  if (ready) {
    process.stdout.write(`agy is ready.\n  Path: ${agyPath}\n  Version: ${version ?? "unknown"}\n`);
  } else {
    process.stdout.write("agy is NOT installed.\n  Install with: curl -fsSL https://antigravity.google/cli/install.sh | bash\n");
    process.exitCode = 1;
  }

  return report;
}

function handleTaskResumeCandidate(opts) {
  const last = readLastSession();
  const available = Boolean(last && (last.completedAt || last.status === "running") && last.prompt);

  const payload = {
    available,
    candidate: available
      ? {
          prompt: last.prompt,
          completedAt: last.completedAt ?? null,
          status: last.status ?? "completed",
          exitCode: last.exitCode ?? null,
          logFile: last.logFile ?? null
        }
      : null
  };

  if (opts.json) {
    process.stdout.write(JSON.stringify(payload, null, 2) + "\n");
  } else {
    process.stdout.write(
      available
        ? `Resumable agy session found (${payload.candidate.status}).\n`
        : "No resumable agy session found.\n"
    );
  }
}

async function handleTask(argv) {
  const opts = parseArgs(argv);
  const prompt = opts.positionals.join(" ").trim();

  if (!prompt && !opts.continue) {
    process.stderr.write("Provide a prompt or use --continue to resume.\n");
    process.exitCode = 1;
    return;
  }

  if (opts.background) {
    runAgyBackground(prompt, opts);
  } else {
    await runAgyForeground(prompt, opts);
  }
}

async function main() {
  const [subcommand, ...argv] = process.argv.slice(2);

  if (!subcommand || subcommand === "help" || subcommand === "--help") {
    process.stdout.write(
      [
        "Usage:",
        "  node scripts/agy-companion.mjs setup [--json]",
        "  node scripts/agy-companion.mjs task [--background] [--continue|--fresh] [--model <model>] [prompt]",
        "  node scripts/agy-companion.mjs task-resume-candidate [--json]"
      ].join("\n") + "\n"
    );
    return;
  }

  switch (subcommand) {
    case "setup":
      handleSetup();
      break;
    case "task":
      await handleTask(argv);
      break;
    case "task-resume-candidate": {
      const opts = parseArgs(argv);
      handleTaskResumeCandidate(opts);
      break;
    }
    default:
      process.stderr.write(`Unknown subcommand: ${subcommand}\n`);
      process.exitCode = 1;
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error.message}\n`);
  process.exitCode = 1;
});
