/**
 * Reads the display version from src/constants.ts and applies it to dist artifacts
 * so the header badge stays in sync. Run via `npm run sync-version`.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function readPluginVersion() {
  const constantsPath = path.join(root, 'src', 'constants.ts');
  const text = fs.readFileSync(constantsPath, 'utf8');
  const m = text.match(/CDS_REVIEW_PLUGIN_VERSION\s*=\s*['"]([^'"]+)['"]/);
  if (!m) {
    throw new Error('Could not parse CDS_REVIEW_PLUGIN_VERSION from src/constants.ts');
  }
  return m[1];
}

function semverFromDisplay(display) {
  const m = display.match(/(\d+\.\d+\.\d+)/);
  return m ? m[1] : display;
}

const displayVersion = readPluginVersion();
const semver = semverFromDisplay(displayVersion);

fs.writeFileSync(path.join(root, 'VERSION'), `${semver}\n`, 'utf8');

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.version = semver;
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');

const uiHtml = path.join(root, 'dist', 'ui.html');
const assetFiles = [];
const assetsDir = path.join(root, 'dist', 'assets');
if (fs.existsSync(assetsDir)) {
  for (const name of fs.readdirSync(assetsDir)) {
    if (name.endsWith('.js')) assetFiles.push(path.join(assetsDir, name));
  }
}

function patchFile(filePath, { setWindowGlobal }) {
  let s = fs.readFileSync(filePath, 'utf8');
  const before = s;
  if (setWindowGlobal) {
    s = s.replace(
      /window\.__CDS_REVIEW_VERSION__=['"][^'"]*['"]/,
      `window.__CDS_REVIEW_VERSION__=${JSON.stringify(displayVersion)}`,
    );
  }
  s = s.replace(/children:`Beta [\d.]+`/g, 'children:window.__CDS_REVIEW_VERSION__');
  if (s !== before) {
    fs.writeFileSync(filePath, s, 'utf8');
    console.log('updated:', path.relative(root, filePath));
  }
}

if (fs.existsSync(uiHtml)) {
  patchFile(uiHtml, { setWindowGlobal: true });
}
for (const f of assetFiles) {
  patchFile(f, { setWindowGlobal: false });
}

console.log('CDS Review plugin version:', displayVersion);
