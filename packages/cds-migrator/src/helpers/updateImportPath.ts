import { output } from '@nrwl/devkit';
import fs from 'node:fs';

export function updateImportPath({
  filePath,
  oldImport,
  newImport,
}: {
  filePath: string;
  oldImport: string;
  newImport: string;
}) {
  const contents = fs.readFileSync(filePath, 'utf-8');
  const filesWithChanges: string[] = [];

  if (contents.includes(oldImport)) {
    const newContent = contents.replaceAll(oldImport, newImport);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    filesWithChanges.push(filePath);

    if (filesWithChanges.length) {
      output.success({
        title: `Updated ${oldImport} to ${newImport} in the following file(s):`,
        bodyLines: filesWithChanges,
      });
    } else {
      output.warn({ title: `Could not find any usages of ${oldImport}. Skipping...` });
    }
  }
}
