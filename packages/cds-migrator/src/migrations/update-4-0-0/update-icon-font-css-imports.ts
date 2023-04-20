import { output, Tree } from '@nrwl/devkit';
import glob from 'fast-glob';
import fs from 'node:fs';

import { logStartTask } from '../../helpers/logStartTask';

const OLD_IMPORT = '@cbhq/cds-web/styles/icon-font.css';
const NEW_IMPORT = '@cbhq/cds-icons/fonts/web/icon-font.css';

export default async function updateIconFontCssImports(tree: Tree) {
  logStartTask(`Updating icon-font.css usages`);

  await glob(['**/*.tsx'], {
    ignore: ['node_modules'],
    onlyFiles: true,
    cwd: tree.root,
    // Return the absolute path for entries.
    absolute: true,
  })
    .then((files) => {
      const filesWithChanges: string[] = [];
      files.forEach((file) => {
        const contents = fs.readFileSync(file, 'utf-8');
        if (contents.includes(OLD_IMPORT)) {
          const newContent = contents.replaceAll(OLD_IMPORT, NEW_IMPORT);
          fs.writeFileSync(file, newContent, 'utf-8');
          filesWithChanges.push(file);
        }
      });
      if (filesWithChanges.length) {
        output.success({
          title: `Added @cbhq/cds-icons/fonts/web/icon-font.css to the following file(s):`,
          bodyLines: filesWithChanges,
        });
      } else {
        output.warn({ title: `No icon-font.css usages found. Skipping...` });
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
