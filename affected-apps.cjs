#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

/**
 * Auto "affected apps" → Playwright tags for non-Nx monorepos.
 * - Scans apps/* and libs/* for package.json (workspace packages)
 * - Builds full reverse dependency graph (handles lib→lib→app chains)
 * - Detects changed packages via `git diff --name-only <BASE_REF>...HEAD`
 * - Emits JSON array of tags: ["@app:web","@app:admin"]
 *
 * Env:
 *   BASE_REF (default: origin/main)
 *
 * Assumptions:
 *   - Apps live under apps/* and contain an e2e/ folder
 *   - Internal libs live under libs/* (can depend on each other)
 *   - package.json "name" is present for each internal package
 */

const BASE_REF = process.env.BASE_REF || "origin/main";
const ROOT = process.cwd();

// ---------- utils ----------
const readJson = (p) => {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
};
const isDir = (p) => {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
};
const listDirs = (p) =>
  isDir(p)
    ? fs
        .readdirSync(p)
        .map((n) => path.join(p, n))
        .filter(isDir)
    : [];

// ---------- discover workspace packages in apps/* and libs/* ----------
function discoverPackages() {
  const groups = ["apps", "libs"];
  const pkgs = [];
  for (const g of groups) {
    const base = path.join(ROOT, g);
    for (const dir of listDirs(base)) {
      const pkgJson = path.join(dir, "package.json");
      const pkg = readJson(pkgJson);
      if (!pkg) continue;
      const relDir = path.relative(ROOT, dir).replace(/\\/g, "/");
      const isApp = relDir.startsWith("apps/") && isDir(path.join(dir, "e2e"));
      const deps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
        ...pkg.peerDependencies,
        ...pkg.optionalDependencies,
      };
      pkgs.push({
        name: pkg.name, // required to link deps
        relDir, // e.g. "libs/ui"
        isApp, // apps/* with e2e/
        slug: path.basename(dir), // "web", "admin"
        deps: Object.keys(deps || {}),
      });
    }
  }
  // Index by name
  const byName = new Map();
  for (const p of pkgs) {
    if (p.name) byName.set(p.name, p);
  }
  return { pkgs, byName };
}

// ---------- build reverse dependency graph (internal only) ----------
function buildReverseGraph(pkgs) {
  const internalNames = new Set(pkgs.map((p) => p.name).filter(Boolean));
  const reverse = new Map(); // key: internal pkg name -> Set(dependent pkg names)
  for (const name of internalNames) reverse.set(name, new Set());

  for (const p of pkgs) {
    for (const d of p.deps) {
      if (internalNames.has(d) && p.name) {
        reverse.get(d).add(p.name); // d <- p
      }
    }
  }
  return { internalNames, reverse };
}

// ---------- map changed files -> changed package names ----------
function changedFiles(baseRef) {
  try {
    const out = execSync(`git diff --name-only ${baseRef}...HEAD`, { stdio: "pipe" })
      .toString()
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    return out;
  } catch {
    // Fallback: everything since initial commit
    const out = execSync(`git diff --name-only $(git rev-list --max-parents=0 HEAD)`, {
      stdio: "pipe",
    })
      .toString()
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    return out;
  }
}

function changedPackageNames(files, pkgs) {
  const hits = new Set();
  for (const f of files) {
    for (const p of pkgs) {
      if (f.startsWith(p.relDir + "/")) {
        if (p.name) hits.add(p.name);
      }
    }
  }
  return hits;
}

// ---------- detect root-wide changes that should affect all apps ----------
function isRootWideChange(files) {
  const patterns = [
    /^playwright\.config\.(ts|js|mjs)$/,
    /^package\.json$/,
    /^pnpm-lock\.yaml$/,
    /^yarn\.lock$/,
    /^package-lock\.json$/,
    /^\.github\//,
    /^dockerfile$/i,
  ];
  return files.some((f) => patterns.some((rx) => rx.test(f)));
}

// ---------- BFS over reverse graph to find all dependents (apps included) ----------
function collectDependents(changedNames, reverse) {
  const out = new Set(changedNames);
  const queue = [...changedNames];
  while (queue.length) {
    const n = queue.shift();
    const dependents = reverse.get(n);
    if (!dependents) continue;
    for (const m of dependents) {
      if (!out.has(m)) {
        out.add(m);
        queue.push(m);
      }
    }
  }
  return out; // set of pkg names
}

// ---------- main ----------
(function main() {
  const { pkgs, byName } = discoverPackages();
  const apps = pkgs.filter((p) => p.isApp);

  const files = changedFiles(BASE_REF);

  if (isRootWideChange(files)) {
    // Affect all apps
    const tags = apps.map((a) => `@app:${a.slug}`);
    process.stdout.write(JSON.stringify(tags.sort()) + "\n");
    return;
  }

  // Seed = packages whose directories changed
  const changedPkgs = changedPackageNames(files, pkgs);

  // Build reverse graph and collect dependents
  const { reverse } = buildReverseGraph(pkgs);
  const impacted = collectDependents(changedPkgs, reverse);

  // Output only app tags
  const affectedAppSlugs = new Set();
  for (const name of impacted) {
    const pkg = byName.get(name);
    if (pkg && pkg.isApp) affectedAppSlugs.add(pkg.slug);
  }

  // Also: direct app dir changes where app lacks a "name" (rare)
  for (const f of files) {
    for (const a of apps) {
      if (f.startsWith(a.relDir + "/")) affectedAppSlugs.add(a.slug);
    }
  }

  const tags = [...affectedAppSlugs].sort().map((s) => `@app:${s}`);
  process.stdout.write(JSON.stringify(tags) + "\n");
})();
