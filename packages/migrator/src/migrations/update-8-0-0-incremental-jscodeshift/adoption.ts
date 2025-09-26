import fs from 'node:fs';
import path from 'node:path';

type AdoptionSummary = {
  targetDir: string;
  version: string;
  cds: number;
  v7Cds: number;
  total: number;
  v8MigrationPercent: number | null;
};

function isTextFile(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  return ['.ts', '.tsx', '.jsx', '.js'].includes(ext);
}

function listFilesRecursiveSync(
  dir: string,
  ignore: string[] = ['node_modules', 'dist', 'build', '.nx', '.yarn'],
) {
  const results: string[] = [];
  const stack: string[] = [dir];
  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;
    let entries: fs.Dirent[] = [];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith('.')) continue;
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

function escapeForRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseImportBindings(importClause: string) {
  const info: { defaultName?: string; named: string[]; namespace?: string } = { named: [] };
  if (!importClause) return info;
  const nsMatch = importClause.match(/\*\s+as\s+([A-Za-z_$][\w$]*)/);
  if (nsMatch) info.namespace = nsMatch[1];
  const defMatch = importClause.match(/^\s*([A-Za-z_$][\w$]*)\s*(,|$)/);
  if (defMatch) info.defaultName = defMatch[1];
  const namedMatch = importClause.match(/\{([^}]*)\}/);
  if (namedMatch && namedMatch[1]) {
    const parts = namedMatch[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const asMatch = s.match(/^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/);
        if (asMatch) return asMatch[2];
        const simple = s.match(/^([A-Za-z_$][\w$]*)$/);
        return simple ? simple[1] : undefined;
      })
      .filter(Boolean) as string[];
    info.named = parts;
  }
  return info;
}

function countJsxUsages(source: string, identifiers: string[], namespace?: string) {
  let count = 0;
  for (const name of identifiers) {
    const re = new RegExp(`<${escapeForRegex(name)}(?:\\s|>|\\/>)`, 'g');
    const matches = source.match(re);
    count += matches ? matches.length : 0;
  }
  if (namespace) {
    const reNs = new RegExp(
      `<${escapeForRegex(namespace)}\\.[A-Z][A-Za-z0-9_]*(?:\\s|>|\\/>)`,
      'g',
    );
    const matches = source.match(reNs);
    count += matches ? matches.length : 0;
  }
  return count;
}

function analyzeFile(filePath: string, cdsAliases: string[] = []) {
  const content = fs.readFileSync(filePath, 'utf8');
  let cdsInstances = 0;
  let v7Instances = 0;

  const importRe = /import\s+([^;]+?)\s+from\s+["']([^"']+)["'];?/g;
  let m: RegExpExecArray | null;
  while ((m = importRe.exec(content)) !== null) {
    const clause = m[1];
    const source = m[2];
    const isCds = /^@cbhq\/cds-/.test(source) || cdsAliases.some((a) => source.startsWith(a));
    if (!isCds) continue;
    const isV7 = source.includes('/v7');
    const { defaultName, named, namespace } = parseImportBindings(clause);
    const identifiers = [defaultName, ...named].filter(Boolean) as string[];
    const count = countJsxUsages(content, identifiers, namespace);
    if (isV7) v7Instances += count;
    else cdsInstances += count;
  }

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

function pickPackageVersion(pkgJson: any, name: string) {
  const order = ['dependencies', 'devDependencies', 'peerDependencies', 'resolutions', 'overrides'];
  for (const key of order) {
    const depMap = pkgJson?.[key];
    if (depMap && typeof depMap === 'object' && depMap[name] && depMap[name] !== '*') {
      return depMap[name] as string;
    }
  }
  return '';
}

const CDS_PACKAGE_NAMES = ['@cbhq/cds-common', '@cbhq/cds-web', '@cbhq/cds-mobile'];

function findCdsVersion(pkgJson: any) {
  for (const pkg of CDS_PACKAGE_NAMES) {
    const v = pickPackageVersion(pkgJson, pkg);
    if (v) return v;
  }
  return '';
}

function tryFindVersionInWorkspaceSync(baseDir: string) {
  const candidateDirs = ['.', 'apps', 'packages', 'workspaces'];
  for (const dir of candidateDirs) {
    const abs = path.resolve(baseDir, dir);
    if (!fs.existsSync(abs)) continue;
    try {
      if (dir === '.') {
        const rootPkgPath = path.join(abs, 'package.json');
        if (fs.existsSync(rootPkgPath)) {
          const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));
          const v = findCdsVersion(rootPkg);
          if (v) return v;
        }
      }
      const entries = fs.readdirSync(abs, { withFileTypes: true });
      for (const e of entries) {
        if (!e.isDirectory()) continue;
        const pj = path.join(abs, e.name, 'package.json');
        if (!fs.existsSync(pj)) continue;
        const pkg = JSON.parse(fs.readFileSync(pj, 'utf8'));
        const v = findCdsVersion(pkg);
        if (v) return v;
      }
    } catch {
      console.error(`Error reading package.json in ${abs}`);
    }
  }
  return '';
}

function extractMajor(versionSpec?: string | null) {
  if (!versionSpec || typeof versionSpec !== 'string') return null;
  const cleaned = versionSpec
    .replace(/^workspace:/, '')
    .replace(/^[><=~^\s]*/, '')
    .trim();
  const m = cleaned.match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

export function computeV8AdoptionSync(targetDir: string, options?: { cdsAliases?: string[] }) {
  const cdsAliases = options?.cdsAliases ?? [];
  const files = listFilesRecursiveSync(targetDir);
  let cds = 0;
  let v7Cds = 0;
  for (const f of files) {
    const { cdsInstances, v7Instances } = analyzeFile(f, cdsAliases);
    cds += cdsInstances;
    v7Cds += v7Instances;
  }
  const total = cds + v7Cds;
  let v8MigrationPercent: number | null = total > 0 ? cds / total : null;

  // find version nearby
  let version = '';
  const directPkg = path.join(targetDir, 'package.json');
  if (fs.existsSync(directPkg)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(directPkg, 'utf8'));
      version = findCdsVersion(pkg);
    } catch {
      console.error(`Error reading package.json in ${targetDir}`);
    }
  }
  if (!version) version = tryFindVersionInWorkspaceSync(targetDir);

  const major = extractMajor(version);
  if (typeof major === 'number' && major < 8) {
    v8MigrationPercent = 0;
  }

  const summary: AdoptionSummary = {
    targetDir,
    version,
    cds,
    v7Cds,
    total,
    v8MigrationPercent,
  };
  return summary;
}
