import { diffLines } from 'diff';
import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

// Edit the values below to configure the audit
const RESULTS_FILE = 'base-props.json';

const commonPackagePath = path.resolve(root, `packages/cds-common2/src`);
const commonFiles = globSync(`${commonPackagePath}/**/*`, { nodir: true });

const webPackagePath = path.resolve(root, 'packages/cds-web2/src');
const webFiles = globSync(`${webPackagePath}/**/*`, { nodir: true });

const mobilePackagePath = path.resolve(root, 'packages/cds-mobile2/src');
const mobileFiles = globSync(`${mobilePackagePath}/**/*`, { nodir: true });

const results = { common: [], web: [], mobile: [] };

commonFiles.forEach((filepath, index) => {
  const relativeFilepath = filepath.replace(commonPackagePath, '');
  const content = fs.readFileSync(filepath, 'utf-8');
  if (content.includes('BaseProps')) results.common.push(filepath);
});

const basePropsDefinitionRegex = /type ([a-zA-Z\d]*BaseProps) =/g;

webFiles.forEach((filepath, index) => {
  const relativeFilepath = filepath.replace(webPackagePath, '');
  const content = fs.readFileSync(filepath, 'utf-8');
  const filename = path.basename(filepath).replace(path.extname(filepath), '');
  const basePropsMatches = [...content.matchAll(basePropsDefinitionRegex)].map((i) => i[1]);
  if (basePropsMatches.length && basePropsMatches.some((name) => name !== `${filename}BaseProps`))
    results.web.push(filepath);
});

mobileFiles.forEach((filepath, index) => {
  const relativeFilepath = filepath.replace(mobilePackagePath, '');
  const content = fs.readFileSync(filepath, 'utf-8');
  const filename = path.basename(filepath).replace(path.extname(filepath), '');
  const basePropsMatches = [...content.matchAll(basePropsDefinitionRegex)].map((i) => i[1]);
  if (basePropsMatches.length && basePropsMatches.some((name) => name !== `${filename}BaseProps`))
    results.mobile.push(filepath);
});

const resultsPath = path.resolve(root, RESULTS_FILE);

fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

console.log(`Audit complete, wrote results to ${resultsPath}`);
