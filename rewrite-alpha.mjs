import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

const pkg = process.argv[2];

if (!pkg) throw Error('Missing package argument!!!!!!!!!');

const dependencies = [
  'cds-common',
  'cds-mobile',
  'cds-web',
  'cds-mobile-visualization',
  'cds-web-visualization',
  'cds-lottie-files',
  'ui-mobile-playground',
];

const dts = globSync(`${root}/packages/${pkg}/dts/**/*`, { nodir: true });
const esm = globSync(`${root}/packages/${pkg}/esm/**/*`, { nodir: true });

const pkgJson = `${root}/packages/${pkg}/package.json`;

for (const filepath of [pkgJson, ...dts, ...esm]) {
  let newContents = fs.readFileSync(filepath, 'utf-8');
  for (const dep of dependencies) {
    newContents = newContents.replaceAll(`@cbhq/${dep}2`, `@cbhq/${dep}`);
  }
  fs.writeFileSync(filepath, newContents, { encoding: 'utf-8' });
}
