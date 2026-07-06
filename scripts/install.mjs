#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const PACKAGE_NAME = "@vit129/agy-plugin-codex";
const MARKETPLACE_NAME = "agy-plugin-codex";
const PLUGIN_NAME = "agy";
const RELOAD_HINT = "Start a new Codex session, then run: $agy setup";
const GLOBAL_CONFIG_PATH = path.join(os.homedir(), ".config", "agy-plugin-codex", "config.json");

const packageRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function pluginManifest() {
  return readJson(path.join(packageRoot, "plugins", PLUGIN_NAME, ".codex-plugin", "plugin.json"));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyPlugin(version) {
  const source = path.join(packageRoot, "plugins", PLUGIN_NAME);
  const target = path.join(
    os.homedir(),
    ".codex",
    "plugins",
    "cache",
    MARKETPLACE_NAME,
    PLUGIN_NAME,
    version
  );

  fs.rmSync(target, { recursive: true, force: true });
  ensureDir(path.dirname(target));
  fs.cpSync(source, target, { recursive: true });
  return target;
}

function tomlString(value) {
  return JSON.stringify(String(value));
}

function skillConfigBlock(skillPath) {
  return `[[skills.config]]\npath = ${tomlString(skillPath)}\nenabled = true\n`;
}

function pluginSkillPaths(version) {
  const skillRoot = path.join(
    os.homedir(),
    ".codex",
    "plugins",
    "cache",
    MARKETPLACE_NAME,
    PLUGIN_NAME,
    version,
    "skills"
  );

  return [
    path.join(skillRoot, "agy", "SKILL.md"),
    path.join(skillRoot, "agy-cli-runtime", "SKILL.md"),
    path.join(skillRoot, "gemini-3-prompting", "SKILL.md")
  ];
}

function upsertPluginSkillConfig(text, version) {
  const expectedPaths = pluginSkillPaths(version);
  const expected = new Set(expectedPaths);
  const pluginSkillPathPattern = new RegExp(
    `^path = "${path
      .join(
        os.homedir(),
        ".codex",
        "plugins",
        "cache",
        MARKETPLACE_NAME,
        PLUGIN_NAME
      )
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/[^"]+/skills/[^"]+/SKILL\\.md"$`,
    "m"
  );

  const seen = new Set();
  let next = text.replace(
    /\n*\[\[skills\.config\]\]\npath = "([^"]+)"\nenabled = (?:true|false)\n?/g,
    (block, skillPath) => {
      if (!pluginSkillPathPattern.test(`path = ${tomlString(skillPath)}`)) {
        return block;
      }

      if (!expected.has(skillPath)) {
        return "";
      }

      seen.add(skillPath);
      return `\n\n${skillConfigBlock(skillPath)}`;
    }
  );

  for (const skillPath of expectedPaths) {
    if (!seen.has(skillPath)) {
      next = `${next.trimEnd()}\n\n${skillConfigBlock(skillPath)}`;
    }
  }

  return next;
}

function upsertCodexConfig(version) {
  const configPath = path.join(os.homedir(), ".codex", "config.toml");
  ensureDir(path.dirname(configPath));
  let text = fs.existsSync(configPath) ? fs.readFileSync(configPath, "utf8") : "";

  if (!text.includes("[marketplaces.agy-plugin-codex]")) {
    text = `${text.trimEnd()}\n\n[marketplaces.agy-plugin-codex]\nsource_type = "local"\nsource = ${tomlString(packageRoot)}\n`;
  } else {
    text = text.replace(
      /(\[marketplaces\.agy-plugin-codex\][\s\S]*?)(?=\n\[|$)/,
      (_match, section) => {
        let next = section;
        next = next.includes("source_type =")
          ? next.replace(/^source_type = .*$/m, 'source_type = "local"')
          : `${next.trimEnd()}\nsource_type = "local"`;
        next = next.includes("source =")
          ? next.replace(/^source = .*$/m, `source = ${tomlString(packageRoot)}`)
          : `${next.trimEnd()}\nsource = ${tomlString(packageRoot)}`;
        return next;
      }
    );
  }

  if (!text.includes('[plugins."agy@agy-plugin-codex"]')) {
    text = `${text.trimEnd()}\n\n[plugins."agy@agy-plugin-codex"]\nenabled = true\n`;
  } else {
    text = text.replace(
      /(\[plugins\."agy@agy-plugin-codex"\][\s\S]*?)(?=\n\[|$)/,
      (_match, section) =>
        section.includes("enabled =")
          ? section.replace(/^enabled = .*$/m, "enabled = true")
          : `${section.trimEnd()}\nenabled = true`
    );
  }

  text = upsertPluginSkillConfig(text, version);

  fs.writeFileSync(configPath, `${text.trimEnd()}\n`, "utf8");
  return configPath;
}

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32"
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function parseFlags(args) {
  return new Set(args.filter((arg) => arg.startsWith("--")));
}

function writeGlobalAutoUpdate(enabled) {
  ensureDir(path.dirname(GLOBAL_CONFIG_PATH));
  fs.writeFileSync(
    GLOBAL_CONFIG_PATH,
    `${JSON.stringify({ autoUpdate: enabled, updatedAt: new Date().toISOString() }, null, 2)}\n`,
    "utf8"
  );
  return GLOBAL_CONFIG_PATH;
}

function install(args) {
  const flags = parseFlags(args);
  const manifest = pluginManifest();
  const target = copyPlugin(manifest.version);
  const configPath = upsertCodexConfig(manifest.version);
  const globalConfigPath = flags.has("--auto-update") ? writeGlobalAutoUpdate(true) : null;

  console.log(`Installed agy@agy-plugin-codex v${manifest.version}.`);
  console.log(`Plugin cache: ${target}`);
  console.log(`Codex config: ${configPath}`);
  if (flags.has("--auto-update")) {
    console.log(`Auto-update config: ${globalConfigPath}`);
    console.log("Auto-update is enabled. The plugin will update during $agy setup when a newer npm version exists.");
  }
  console.log(RELOAD_HINT);
}

function update(args) {
  run("npm", ["install", "-g", `${PACKAGE_NAME}@latest`]);
  run("npx", ["-y", `${PACKAGE_NAME}@latest`, "install", ...args]);
}

function doctor() {
  const manifest = pluginManifest();
  const target = path.join(
    os.homedir(),
    ".codex",
    "plugins",
    "cache",
    MARKETPLACE_NAME,
    PLUGIN_NAME,
    manifest.version
  );

  console.log(`package: ${PACKAGE_NAME}`);
  console.log(`version: ${manifest.version}`);
  console.log(`package root: ${packageRoot}`);
  console.log(`cache exists: ${fs.existsSync(target) ? "yes" : "no"}`);
  console.log(`config exists: ${fs.existsSync(path.join(os.homedir(), ".codex", "config.toml")) ? "yes" : "no"}`);
}

function printUsage() {
  console.log(
    [
      "Usage:",
      "  agy-plugin-codex install [--auto-update]",
      "  agy-plugin-codex update [--auto-update]",
      "  agy-plugin-codex doctor"
    ].join("\n")
  );
}

const [command = "help", ...args] = process.argv.slice(2);

switch (command) {
  case "install":
    install(args);
    break;
  case "update":
    update(args);
    break;
  case "doctor":
    doctor();
    break;
  case "help":
  case "--help":
  case "-h":
    printUsage();
    break;
  default:
    throw new Error(`Unknown command: ${command}`);
}
