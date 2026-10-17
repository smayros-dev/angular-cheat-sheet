// Cross-workspace test orchestrator for the Angular versions course.
// Usage: node tools/run.mjs test <ng14|ng16|ng18|ng20|ng22|all> [--strict] [--dry-run]
// Each workspace needs a specific Node major. Instead of `nvm use` (unreliable
// on Windows and a global mutation), the required version's node.exe is
// resolved under %APPDATA%\nvm\v<major>.* and npm is run through it directly —
// the global Node version never changes.
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nvmRoot = process.env.APPDATA ? join(process.env.APPDATA, "nvm") : null;

const NODE_FOR = { ng14: 16, ng16: 18, ng18: 20, ng20: 22, ng22: 24 };
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

function versionParts(name) {
  return name.replace(/^v/, "").split(".").map((p) => parseInt(p, 10) || 0);
}

function compareVersionsDesc(a, b) {
  const pa = versionParts(a);
  const pb = versionParts(b);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pb[i] || 0) - (pa[i] || 0);
    if (d !== 0) return d;
  }
  return 0;
}

// Highest v<major>.* directory under the nvm root (e.g. major 18 -> v18.20.8).
function resolveNodeDir(major) {
  if (!nvmRoot || !existsSync(nvmRoot)) return null;
  const re = new RegExp(`^v${major}\\.\\d+`);
  const names = readdirSync(nvmRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && re.test(e.name))
    .map((e) => e.name)
    .sort(compareVersionsDesc);
  return names.length ? join(nvmRoot, names[0]) : null;
}

// 16 MiB for buffered spawns — well above the 1 MiB default that can SIGTERM
// a verbose run (ENOBUFS) and misreport it as a test failure.
const MAX_BUFFER = 16 * 1024 * 1024;

// Direct invocation of a specific node.exe — never touches global state.
// inherit=true streams output live with no buffer cap (for test runs);
// otherwise output is buffered (fine for tiny output like `node -v`).
function runNode(exe, args, { cwd, inherit = false } = {}) {
  const res = inherit
    ? spawnSync(exe, args, { cwd, stdio: "inherit" })
    : spawnSync(exe, args, { cwd, encoding: "utf8", maxBuffer: MAX_BUFFER });
  return {
    ok: !res.error && !res.signal && res.status === 0,
    status: res.status,
    reason: res.error
      ? res.error.message
      : res.signal
        ? `killed by ${res.signal}`
        : `exit code ${res.status}`,
    stdout: res.stdout || "",
    stderr: res.stderr || "",
  };
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

function testModule(module) {
  const major = NODE_FOR[module];
  const cwd = join(root, module);
  const testArgs = ["test", "--", "--watch=false"];
  if (HEADLESS_MODULES.has(module)) testArgs.push("--browsers=ChromeHeadless");

  console.log(`\n=== ${module} (node ${major}) ===`);

  const dir = resolveNodeDir(major);
  const dirName = dir ? basename(dir) : null;

  if (!dir) {
    const where = nvmRoot || "(APPDATA not set)";
    const msg = `no node ${major} install under ${where} — run: nvm install ${major}`;
    if (dryRun) {
      console.log(`[dry-run] ${module}: would fail — ${msg}`);
      return { ok: true, dirName };
    }
    console.error(`${module}: ${msg}`);
    return { ok: false, dirName };
  }

  const exe = join(dir, "node.exe");
  const npmCli = join(dir, "node_modules", "npm", "bin", "npm-cli.js");
  const cmdLine = `${exe} ${npmCli} ${testArgs.join(" ")}`;

  if (dryRun) {
    plan(`${exe} -v`);
    plan(cmdLine, cwd);
    return { ok: true, dirName };
  }

  if (!existsSync(exe)) {
    console.error(`${module}: node.exe not found at ${exe} — reinstall with: nvm install ${major}`);
    return { ok: false, dirName };
  }

  // Verify the resolved binary really is the required major.
  const v = runNode(exe, ["-v"]);
  const reported = v.stdout.trim();
  if (!new RegExp(`^v${major}\\.`).test(reported)) {
    console.error(`${module}: ${exe} -v → ${reported || v.reason} — expected v${major}.x`);
    return { ok: false, dirName };
  }
  console.log(`${module}: ${exe} -v → ${reported}`);

  if (!existsSync(npmCli)) {
    console.error(`${module}: npm not found at ${npmCli}`);
    return { ok: false, dirName };
  }
  if (!existsSync(cwd)) {
    console.error(`${module}: workspace missing: ${cwd}`);
    return { ok: false, dirName };
  }

  console.log(`[run] ${cmdLine}`);
  const t = runNode(exe, [npmCli, ...testArgs], { cwd, inherit: true });
  if (!t.ok) console.error(`${module}: tests failed (${t.reason})`);
  return { ok: t.ok, dirName };
}

const results = {};
let failed = false;
for (const module of modules) {
  const r = testModule(module);
  results[module] = r;
  if (!r.ok) {
    failed = true;
    if (strict) break;
  }
}

const summary = modules
  .map((m) => `${m}=${m in results ? (results[m].ok ? "pass" : "fail") : "skipped"}`)
  .join(" ");
console.log(`\nsummary: ${summary}`);
for (const m of modules) {
  if (m in results && results[m].dirName) {
    console.log(`${m}: node: ${results[m].dirName} (no global switch)`);
  }
}
if (dryRun) console.log("dry-run: no commands executed");

process.exitCode = failed ? 1 : 0;
