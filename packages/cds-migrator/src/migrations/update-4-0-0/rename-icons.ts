import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';

import { checkFileIncludesRenamedValue } from '../../helpers/checkFileIncludesRenamedValue';
import { checkIsComponentWithMigrations } from '../../helpers/checkIsComponentWithMigrations';
import { createJsxMigration } from '../../helpers/createJsxMigration';
import { logDebug } from '../../helpers/loggingHelpers';
import { ParseJsxElementsCbParams } from '../../helpers/parseJsxElements';
import { renameJsxAttributeValue } from '../../helpers/renameJsxAttributeValue';
import { writeMigrationToFile } from '../../helpers/writeMigrationToFile';

import { iconRenames } from './data/iconRenames';

function oldImportCheck(str: string) {
  return ['web', 'mobile'].some((platform) => str.includes(`@cbhq/cds-${platform}/icons`));
}

const renamedIcons = Object.keys(Object.values(iconRenames).map((val) => val.valueMap));

const filterSourceFiles = (path: string) => {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  if (oldImportCheck(sourceContent) || checkFileIncludesRenamedValue(sourceContent, renamedIcons)) {
    return true;
  }
  return false;
};

function callback(args: ParseJsxElementsCbParams) {
  const { tree, jsx, sourceFile } = args;
  const { updateMap, isMigratable } = checkIsComponentWithMigrations({
    jsx,
    componentNames: Object.keys(iconRenames),
    attribute: 'name',
    renameMap: iconRenames,
  });

  if (isMigratable) {
    const { oldValue, newValue } = renameJsxAttributeValue({
      attribute: updateMap.attribute,
      updateMap: updateMap.valueMap,
      jsx,
    });
    if (oldValue && newValue) {
      writeMigrationToFile({ oldValue, newValue, jsx, sourceFile, tree });
    }
  }
}

export default async function migrations(tree: Tree) {
  logDebug('Migrating Icons');
  await createJsxMigration({
    tree,
    filterSourceFiles,
    callback,
  });
}
