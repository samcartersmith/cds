import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';

import { checkFileIncludesRenamedValue } from '../../helpers/checkFileIncludesRenamedValue';
import { checkIsComponentWithMigrations } from '../../helpers/checkIsComponentWithMigrations';
import { createJsxMigration } from '../../helpers/createJsxMigration';
import { logDebug } from '../../helpers/loggingHelpers';
import { ParseJsxElementsCbParams } from '../../helpers/parseJsxElements';
import { renameJsxAttributeValue } from '../../helpers/renameJsxAttributeValue';
import { writeMigrationToFile } from '../../helpers/writeMigrationToFile';

import { illustrationRenames } from './data/illustrationRenames';

function oldImportCheck(str: string) {
  return ['web', 'mobile'].some((platform) => str.includes(`@cbhq/cds-${platform}/illustrations`));
}

const renamedIllos = Object.keys(Object.values(illustrationRenames).map((val) => val.valueMap));

const filterSourceFiles = (path: string) => {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  if (oldImportCheck(sourceContent) || checkFileIncludesRenamedValue(sourceContent, renamedIllos)) {
    return true;
  }
  return false;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, tree, sourceFile } = args;
  const { updateMap, isMigratable } = checkIsComponentWithMigrations({
    jsx,
    componentNames: Object.keys(illustrationRenames),
    attribute: 'name',
    renameMap: illustrationRenames,
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
};

export default async function migrations(tree: Tree) {
  logDebug('Migrating Illustrations');
  await createJsxMigration({
    tree,
    filterSourceFiles,
    callback,
    excludeOpeningElements: true,
    packageNames: ['@cbhq/cds-web', '@cbhq/cds-mobile'],
  });
}
