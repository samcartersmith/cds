import path from 'node:path';
import fs from 'node:fs';
import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';
import { diffLines } from 'diff';

const root = path.dirname(fileURLToPath(import.meta.url));

// Edit the values below to configure the audit
const OLD_PACKAGE = 'web';
const NEW_PACKAGE = 'cds-web2';
const RESULTS_FILE = 'barrel-files.md';

// NOTE: Files in __figma__ directories are automatically whitelisted
const WHITE_LIST = [];

const whitelistLowercase = WHITE_LIST.map((s) => s.toLowerCase());

const oldPackagePath = path.resolve(root, `packages/${OLD_PACKAGE}/src`);
const oldFiles = globSync(`${oldPackagePath}/**/*/index.{ts,tsx}`, { nodir: true });
const relativeOldFiles = oldFiles.map((p) => p.replace(oldPackagePath, ''));
const relativeOldFilesLowerCase = relativeOldFiles.map((p) => p.toLowerCase());

const newPackagePath = path.resolve(root, `packages/${NEW_PACKAGE}/src`);
const newFiles = globSync(`${newPackagePath}/**/*/index.{ts,tsx}`, { nodir: true });
const relativeNewFiles = newFiles.map((p) => p.replace(newPackagePath, ''));
const relativeNewFilesLowerCase = relativeNewFiles.map((p) => p.toLowerCase());

// Finds all old filenames that are not present in the new library or whitelisted
const missingFiles = relativeOldFilesLowerCase
  .map((file, index) =>
    !relativeNewFilesLowerCase.includes(file) &&
    !whitelistLowercase.includes(file) &&
    !file.includes('__figma__')
      ? index
      : undefined,
  )
  .filter((item) => item !== undefined)
  .map((index) => relativeOldFiles[index]);

const barrelFileResults = {};

for (const oldBarrelFile of oldFiles) {
  const relativeOldFile = oldBarrelFile.replace(oldPackagePath, '');
  const relativeOldFileLowerCase = relativeOldFile.toLowerCase();
  if (missingFiles.includes(relativeOldFile)) continue;
  const oldContent = fs.readFileSync(oldBarrelFile, 'utf-8');
  const newBarrelFileIndex = relativeNewFilesLowerCase.findIndex(
    (p) => p.replace(newPackagePath, '').toLowerCase() === relativeOldFileLowerCase,
  );
  const relativeNewBarrelFile = relativeNewFilesLowerCase[newBarrelFileIndex];
  const newBarrelFile = newFiles[newBarrelFileIndex];
  const newContent = fs.readFileSync(newBarrelFile, 'utf-8');
  const contentDiff = diffLines(oldContent, newContent);

  // contentDiff.forEach(({ value, added, removed }, index) => {
  //   const nextDiff = contentDiff[index + 1];
  //   const nextChanged = Boolean(nextDiff?.added || nextDiff?.removed);
  //   const message = added || nextChanged ? value.slice(0, -1) : value;
  //   if (added) return console.log(green(message));
  //   if (removed) return console.log(red(message));
  //   return console.log(message);
  // });

  let changed = false;

  const diff = contentDiff
    .map(({ value, added, removed }, index) => {
      const nextDiff = contentDiff[index + 1];
      const nextChanged = Boolean(nextDiff?.added || nextDiff?.removed);
      const message = added || nextChanged ? value.slice(0, -1) : value;
      if (added) {
        changed = true;
        return `\n+++ ${message}`;
      }
      if (removed) {
        changed = true;
        return `\n--- ${message}`;
      }
      return `\n${message}`;
    })
    .reduce((acc, cur) => (acc += cur), '');

  if (changed) barrelFileResults[relativeNewBarrelFile] = diff;
}

const results = `# MISSING FILES:
${missingFiles.map((s) => '  - ' + s).join('\n')}



# CHANGED FILES:

${Object.entries(barrelFileResults)
  .map(([filepath, diff]) => `### ${filepath}\n${diff}`)
  .join('\n\n\n\n')}
`;

const resultsPath = path.resolve(root, RESULTS_FILE);

fs.writeFileSync(resultsPath, results);

console.log(`Audit complete, wrote results to ${resultsPath}`);
