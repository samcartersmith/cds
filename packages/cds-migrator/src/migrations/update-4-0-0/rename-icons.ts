import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';

import { fileIncludesRenamedValue } from '../../helpers/fileIncludesRenamedValue';
import { findReplaceInComponent } from '../../helpers/findReplaceInComponent';
import { getComponentName } from '../../helpers/getComponentName';
import { logStartTask } from '../../helpers/logStartTask';
import parseJsxElements from '../../helpers/parseJsxElements';
import parseSourceFiles, { TransformFnType } from '../../helpers/parseSourceFiles';
import { updateJsxAttributeValue } from '../../helpers/updateJsxAttributeValue';

import { iconRenames } from './data/iconRenames';

const packageNameToLog = '@cbhq/cds-icons';

function oldImportCheck(str: string) {
  return ['web', 'mobile'].some((platform) => str.includes(`@cbhq/cds-${platform}/icons`));
}

function migrateAttributeValues(args: TransformFnType) {
  const components: string[] = [];
  const { project, path, tree } = args;
  const sourceContent = fs.readFileSync(path, 'utf-8');

  if (!oldImportCheck(sourceContent) || !fileIncludesRenamedValue(sourceContent, iconRenames)) {
    return;
  }

  logStartTask('Parsing source files for JSX elements and getting component names for migrations');
  parseJsxElements({
    ...args,
    callback: (jsx) => {
      components.push(getComponentName({ renameMap: iconRenames, jsx }));
    },
  });

  if (components.length) {
    components.forEach((component) => {
      findReplaceInComponent({
        component,
        renameMap: iconRenames,
        callback: updateJsxAttributeValue,
        project,
        path,
        tree,
      });
    });
  }
}

export default async function migrations(tree: Tree) {
  logStartTask(`Updating renames required for ${packageNameToLog}`);
  await parseSourceFiles(tree, migrateAttributeValues);
}
