// Cross-workspace test orchestrator for the Angular versions course.
// Usage: node tools/run.mjs test <ng14|ng16|ng18|ng20|ng22|all> [--strict] [--dry-run]
// Each workspace needs a specific Node major: switch via `nvm use <node>`,
// run `npm test` there, then always restore Node 24 (try/finally + exit hook).
// Node built-ins only; commands go through the shell so nvm.cmd/npm.cmd resolve.
//
// Note: nvm-windows 1.1.9 cannot be trusted for success detection — `nvm use`
// exits 0 even for uninstalled versions and can print bogus errors. Success is
// therefore verified by STATE via `nvm current` (read-only introspection).
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const NODE_FOR = { ng14: 16, ng16: 18, ng18: 20, ng20: 22, ng22: 24 };
const RESTORE_NODE = 24;
// ng14-ng18 (node 16-20) use the old karma runner: needs ChromeHeadless.
const HEADLESS_MODULES = new Set(["ng14", "ng16", "ng18"]);
const USAGE =
  "usage: node tools/run.mjs test <ng14|ng16|ng18|ng20|ng22|all> [--strict] [--dry-run]";

function parseArgs(argv) {
  if (argv[0] !== "test") return { error: `expected "test" subcommand\n${USAGE}` };
  const rest = argv.slice(1);
  const flags = new Set(rest.filter((a) => a.startsWith("--")));
  const positional = rest.filter((a) => !a.startsWith("--"));
  for (const f of flags) {
    if (f !== "--strict" && f !== "--dry-run") {
      return { error: `unknown flag ${f}\n${USAGE}` };
    }
  }
  if (positional.length !== 1) {
    return { error: `expected exactly one target\n${USAGE}` };
  }
  const target = positional[0];
  if (target !== "all" && !(target in NODE_FOR)) {
    return { error: `unknown target "${target}"\n${USAGE}` };
  }
  return { target, strict: flags.has("--strict"), dryRun: flags.has("--dry-run") };
}

// Run one command synchronously; capture=quiet (for checks), else inherit stdio.
function runShell(command, { cwd, capture = false } = {}) {
  const res = spawnSync(command, {
    shell: true,
    cwd,
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });
  if (res.error) return { ok: false, reason: res.error.message, out: "" };
  const out = `${(res.stdout || "").trim()}\n${(res.stderr || "").trim()}`.trim();
  if (res.signal) return { ok: false, reason: `killed by ${res.signal}`, out };
  return { ok: res.status === 0, reason: `exit code ${res.status}`, out };
}

// Ground truth for the active Node major: `nvm current` (e.g. "v24.20.0").
function nvmCurrent() {
  const r = runShell("nvm current", { capture: true });
  const raw = r.out.replace(/\s+/g, " ").trim() || r.reason;
  const m = raw.match(/v?(\d+)\./);
  return { major: m ? Number(m[1]) : null, raw };
}

function plan(command, cwd) {
  if (cwd) console.log(`[dry-run] cwd: ${cwd}`);
  console.log(`[dry-run] ${command}`);
}

const args = parseArgs(process.argv.slice(2));
if (args.error) {
  console.error(args.error);
  process.exit(1);
}

const { target, strict, dryRun } = args;
const modules = target === "all" ? Object.keys(NODE_FOR) : [target];

// Global nvm state: set when we switch away from 24, cleared by restore.
let needsRestore = false;
let restoreFailed = false;

function restoreNode() {
  if (dryRun || !needsRestore) return;
  needsRestore = false; // clear first so the exit hook cannot recurse
  console.log(`[restore] nvm use ${RESTORE_NODE}`);
  runShell(`nvm use ${RESTORE_NODE}`, { capture: true });
  const cur = nvmCurrent();
  if (cur.major === RESTORE_NODE) {
    console.log(`[restore] active node ${cur.raw}`);
    return;
  }
  restoreFailed = true;
  console.error(
    `error: restore failed — nvm current is ${cur.raw}, expected node ${RESTORE_NODE}.\n` +
      `run manually: nvm use ${RESTORE_NODE}`
  );
}

process.on("exit", restoreNode);
for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    restoreNode();
    process.exit(130);
  });
}

// Switch to the module's Node major; returns active version string or null.
function switchTo(module, node) {
  const use = runShell(`nvm use ${node}`, { capture: true });
  const cur = nvmCurrent();
  if (cur.major === node) return cur.raw;
  if (use.out) console.error(use.out);
  console.error(
    `${module}: failed to switch to node ${node} — nvm current: ${cur.raw}` +
      (cur.major === null ? "" : ` (is node ${node} installed? Try: nvm install ${node})`)
  );
  if (!use.ok && !use.out) console.error(`nvm use ${node}: ${use.reason}`);
  return null;
}

function testModule(module) {
  const node = NODE_FOR[module];
  const cwd = join(root, module);
  const testCmd =
    "npm test -- --watch=false" +
    (HEADLESS_MODULES.has(module) ? " --browsers=ChromeHeadless" : "");

  console.log(`\n=== ${module} (node ${node}) ===`);

  if (dryRun) {
    plan(`nvm use ${node}`);
    plan(testCmd, cwd);
    plan(`nvm use ${RESTORE_NODE}`);
    return true;
  }

  needsRestore = true;
  const active = switchTo(module, node);
  if (!active) {
    restoreNode();
    return false;
  }
  console.log(`${module}: active node ${active}`);

  const t = runShell(testCmd, { cwd });
  restoreNode();
  if (!t.ok) {
    const why = existsSync(cwd) ? t.reason : `workspace missing: ${cwd}`;
    console.error(`${module}: tests failed (${why})`);
  }
  return t.ok;
}

const results = {};
let failed = false;
try {
  for (const module of modules) {
    const ok = testModule(module);
    results[module] = ok;
    if (!ok) {
      failed = true;
      if (strict) break;
    }
  }
} finally {
  restoreNode();
}

const summary = modules
  .map((m) => `${m}=${m in results ? (results[m] ? "pass" : "fail") : "skipped"}`)
  .join(" ");
console.log(`\nsummary: ${summary}`);
if (dryRun) console.log("dry-run: no commands executed");

process.exitCode = failed || restoreFailed ? 1 : 0;
