import { exec as _exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const exec = promisify(_exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, 'config.json');
const WORK_ROOT = path.resolve(__dirname, '../../.tmp/v8-adoption');
const OUTPUT_ROOT = path.join(__dirname, 'output');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJSON(filePath, fallback = undefined) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    if (fallback !== undefined) return fallback;
    throw e;
  }
}

function writeJSON(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { encoding: 'utf8', flag: 'w' });
}

function writeText(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, data, { encoding: 'utf8', flag: 'w' });
}

async function cleanupWorkdir() {
  try {
    await exec(`rm -rf ${JSON.stringify(WORK_ROOT)}`);
  } catch (e) {
    console.error('Failed to remove temp directory:', WORK_ROOT);
  }
}

function isTextFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.ts', '.tsx', '.jsx', '.js'].includes(ext);
}

function listFilesRecursive(dir, ignore = ['node_modules', 'dist', 'build']) {
  const results = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        // Ignore any directory whose name starts with a dot (e.g. .git, .cache, .next)
        if (entry.name.startsWith('.')) {
          continue;
        }
        if (
          ignore.some(
            (i) => full.includes(`${path.sep}${i}${path.sep}`) || full.endsWith(`${path.sep}${i}`),
          )
        ) {
          continue;
        }
        stack.push(full);
      } else if (entry.isFile()) {
        if (isTextFile(full)) results.push(full);
      }
    }
  }
  return results;
}

function escapeForRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseImportBindings(importClause) {
  // Returns { defaultName?: string, named: string[], namespace?: string }
  const info = { named: [] };
  if (!importClause) return info;
  // Namespace: import * as NS from '...'
  const nsMatch = importClause.match(/\*\s+as\s+([A-Za-z_$][\w$]*)/);
  if (nsMatch) {
    info.namespace = nsMatch[1];
  }
  // Default: import Default, { A as B, C } from '...'
  const defMatch = importClause.match(/^\s*([A-Za-z_$][\w$]*)\s*(,|$)/);
  if (defMatch) {
    info.defaultName = defMatch[1];
  }
  // Named: { A as B, C }
  const namedMatch = importClause.match(/\{([^}]*)\}/);
  if (namedMatch && namedMatch[1]) {
    const parts = namedMatch[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const asMatch = s.match(/^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/);
        if (asMatch) return asMatch[2]; // local binding name after 'as'
        const simple = s.match(/^([A-Za-z_$][\w$]*)$/);
        return simple ? simple[1] : undefined;
      })
      .filter(Boolean);
    info.named = parts;
  }
  return info;
}

function countJsxUsages(source, identifiers, namespace) {
  let count = 0;
  for (const name of identifiers) {
    const re = new RegExp(`<${escapeForRegex(name)}(?:\\s|>|\\/>)`, 'g');
    const matches = source.match(re);
    count += matches ? matches.length : 0;
  }
  if (namespace) {
    // Count tags like <NS.Component ...>
    const reNs = new RegExp(
      `<${escapeForRegex(namespace)}\\.[A-Z][A-Za-z0-9_]*(?:\\s|>|\\/>)`,
      'g',
    );
    const matches = source.match(reNs);
    count += matches ? matches.length : 0;
  }
  return count;
}

function analyzeFile(filePath, cdsAliases = []) {
  const content = fs.readFileSync(filePath, 'utf8');
  let cdsInstances = 0;
  let v7Instances = 0;

  // import ... from 'module'
  const importRe = /import\s+([^;]+?)\s+from\s+["']([^"']+)["'];?/g;
  let m;
  while ((m = importRe.exec(content)) !== null) {
    const clause = m[1]; // e.g. "Button"
    const source = m[2]; // e.g. "@cbhq/cds-web/v7/button"
    const isCds = /^@cbhq\/cds-/.test(source) || cdsAliases.some((a) => source.startsWith(a));
    if (!isCds) continue;
    const isV7 = source.includes('/v7');
    const { defaultName, named, namespace } = parseImportBindings(clause);
    const identifiers = [defaultName, ...named].filter(Boolean);
    const count = countJsxUsages(content, identifiers, namespace);
    if (isV7) v7Instances += count;
    else cdsInstances += count;
  }

  // require('module') — we can't reliably get identifiers; skip counting usages
  // Still, if someone uses namespace require and JSX as <NS.Button>, we could catch via heuristic
  // Pattern: const NS = require('module')
  const requireRe = /const\s+([A-Za-z_$][\w$]*)\s*=\s*require\(["']([^"']+)["']\)/g;
  while ((m = requireRe.exec(content)) !== null) {
    const ns = m[1];
    const source = m[2];
    const isCds = /^@cbhq\/cds-/.test(source) || cdsAliases.some((a) => source.startsWith(a));
    if (!isCds) continue;
    const isV7 = source.includes('/v7');
    const count = countJsxUsages(content, [], ns);
    if (isV7) v7Instances += count;
    else cdsInstances += count;
  }

  return { cdsInstances, v7Instances };
}

function pickPackageVersion(pkgJson, name) {
  const order = ['dependencies', 'devDependencies', 'peerDependencies', 'resolutions', 'overrides'];
  for (const key of order) {
    const depMap = pkgJson?.[key];
    if (depMap && typeof depMap === 'object' && depMap[name] && depMap[name] !== '*') {
      return depMap[name];
    }
  }
  return '';
}

const CDS_PACKAGE_NAMES = ['@cbhq/cds-common', '@cbhq/cds-web', '@cbhq/cds-mobile'];

function findCdsVersion(pkgJson) {
  for (const pkg of CDS_PACKAGE_NAMES) {
    const v = pickPackageVersion(pkgJson, pkg);
    if (v) return v;
  }
  return '';
}

function tryFindVersionInWorkspace(repoPath) {
  const candidateDirs = ['.', 'apps', 'packages', 'workspaces'];
  for (const dir of candidateDirs) {
    const abs = path.resolve(repoPath, dir);
    if (!fs.existsSync(abs)) continue;
    try {
      // direct package.json
      if (dir === '.') {
        const rootPkg = readJSON(path.join(abs, 'package.json'), null);
        const v = rootPkg ? findCdsVersion(rootPkg) : '';
        if (v) return v;
      }
      // one level deep packages
      const entries = fs.readdirSync(abs, { withFileTypes: true });
      for (const e of entries) {
        if (!e.isDirectory()) continue;
        const pj = path.join(abs, e.name, 'package.json');
        if (!fs.existsSync(pj)) continue;
        const pkg = readJSON(pj, null);
        const v = pkg ? findCdsVersion(pkg) : '';
        if (v) return v;
      }
    } catch {
      console.error(`Error reading package.json in ${abs}`);
    }
  }
  return '';
}

async function cloneRepo(workDir, github, branch = 'master') {
  const target = path.join(workDir, github);
  // fresh clone (remove existing)
  await exec(`rm -rf ${JSON.stringify(target)}`);
  ensureDir(workDir);
  const cmd = `git clone --depth=1 --branch=${branch} git@github.cbhq.net:${github} ${JSON.stringify(
    target,
  )} && rm -rf ${JSON.stringify(path.join(target, '.git'))}`;
  await exec(cmd);
  return target;
}

async function run() {
  const config = readJSON(CONFIG_PATH, null);
  if (!config) {
    console.error(`Missing config at ${CONFIG_PATH}. See README for setup.`);
    process.exit(1);
  }

  const summary = [];
  ensureDir(WORK_ROOT);
  ensureDir(OUTPUT_ROOT);

  for (const repo of config.repos) {
    const {
      github,
      id,
      label,
      paths = ['.'],
      dependencyPath = '.',
      branch = 'master',
      cdsAliases = [],
    } = repo;
    console.log(`\n=== Processing ${id} (${github}) ===`);
    const repoPath = await cloneRepo(WORK_ROOT, github, branch);

    // Resolve dependency path for package.json
    const depPath = path.resolve(repoPath, dependencyPath);
    const pkgJson = readJSON(path.join(depPath, 'package.json'), {});
    let cdsVersion = findCdsVersion(pkgJson);
    if (!cdsVersion) {
      // Fallback: look in repo root and common workspaces
      cdsVersion = tryFindVersionInWorkspace(repoPath);
    }

    let cdsTotal = 0;
    let v7Total = 0;

    for (const p of paths) {
      const abs = path.resolve(repoPath, p);
      if (!fs.existsSync(abs)) continue;
      const files = listFilesRecursive(abs);
      for (const f of files) {
        const { cdsInstances, v7Instances } = analyzeFile(f, cdsAliases);
        cdsTotal += cdsInstances;
        v7Total += v7Instances;
      }
    }

    const total = cdsTotal + v7Total;
    let v8MigrationPercent = total > 0 ? cdsTotal / total : NaN;

    // If CDS version is < 8, force migration percent to 0
    function extractMajor(versionSpec) {
      if (!versionSpec || typeof versionSpec !== 'string') return null;
      // strip common range prefixes and workspace spec
      const cleaned = versionSpec
        .replace(/^workspace:/, '')
        .replace(/^[><=~^\s]*/, '')
        .trim();
      const m = cleaned.match(/^(\d+)/);
      return m ? parseInt(m[1], 10) : null;
    }
    const major = extractMajor(cdsVersion);
    if (typeof major === 'number' && major < 8) {
      v8MigrationPercent = 0;
    }

    summary.push({
      id,
      label,
      github,
      v8MigrationPercent,
      cds: cdsTotal,
      v7Cds: v7Total,
      version: cdsVersion,
      total,
    });
  }

  // Also write Markdown summary for easy sharing (bullet points)
  const mdLines = [];
  mdLines.push(`# CDS v8 Adoption Summary`);
  mdLines.push('');
  mdLines.push(`Generated at: ${new Date().toISOString()}`);
  mdLines.push('');
  for (const item of summary) {
    const percent =
      typeof item.v8MigrationPercent === 'number' && !Number.isNaN(item.v8MigrationPercent)
        ? `${(item.v8MigrationPercent * 100).toFixed(2)}%`
        : 'N/A';
    const repoLink = `https://github.cbhq.net/${item.github}`;
    mdLines.push(`- ${item.label}`);
    mdLines.push(`  - Repo: [${item.github}](${repoLink})`);
    mdLines.push(`  - Version: ${item.version || ''}`);
    mdLines.push(`  - v8 Migration %: ${percent}`);
    mdLines.push(`  - CDS: ${item.cds}`);
    mdLines.push(`  - v7 CDS: ${item.v7Cds}`);
    mdLines.push(`  - Total: ${item.total}`);
    mdLines.push('');
  }
  writeText(path.join(OUTPUT_ROOT, 'summary.md'), mdLines.join('\n'));
  await cleanupWorkdir();
  console.log(`\nDone. Results written to ${OUTPUT_ROOT}`);
}

run().catch(async (err) => {
  console.error(err?.stack || err?.message || err);
  await cleanupWorkdir();
  process.exit(1);
});
