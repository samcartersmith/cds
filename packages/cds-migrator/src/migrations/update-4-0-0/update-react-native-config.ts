import { output, Tree } from '@nrwl/devkit';
import glob from 'fast-glob';
import fs from 'node:fs';

import { logStartTask } from '../../helpers/logStartTask';

export default async function updateReactNativeConfig(tree: Tree) {
  logStartTask(`Updating react-native.config.js to use @cbhq/cds-icons font`);

  await glob(['**/react-native.config.js'], {
    ignore: ['node_modules'],
    onlyFiles: true,
    cwd: tree.root,
    // Return the absolute path for entries.
    absolute: true,
  })
    .then((files) => {
      if (files.length === 0) {
        output.warn({ title: `No react-native.config.js file(s) found. Skipping...` });
      } else {
        files.forEach((file) => {
          const contents = fs.readFileSync(file, 'utf-8');
          const newContent = contents.replaceAll(
            '@cbhq/cds-mobile/icons/font',
            '@cbhq/cds-icons/fonts/native',
          );
          fs.writeFileSync(file, newContent, 'utf-8');
        });
        output.success({
          title: `Added @cbhq/cds-icons/fonts/native to the following react-native.config.js file(s):`,
          bodyLines: files,
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
