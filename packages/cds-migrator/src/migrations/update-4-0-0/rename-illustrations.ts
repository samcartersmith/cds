import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImport,
  checkFileIncludesRenamedValue,
  checkForSpreadProps,
  checkIsComponentWithMigrations,
  createJsxMigration,
  logDebug,
  ParseJsxElementsCbParams,
  renameJsxAttributeValue,
  writeMigrationToFile,
} from '../../helpers';

import { illustrationRenames } from './data/illustrationRenames';

// unique values for all directories where migratable component would live
const importPaths = [...new Set(Object.values(illustrationRenames).flatMap((obj) => obj.paths))];

const renamedIllos = Object.keys(Object.values(illustrationRenames).map((val) => val.valueMap));

const checkSourceFile = (sourceFile: SourceFile) => {
  const sourceContent = fs.readFileSync(sourceFile.getFilePath(), 'utf-8');
  const hasOldImport = checkFileIncludesImport(sourceFile, importPaths);
  if (hasOldImport || checkFileIncludesRenamedValue(sourceContent, renamedIllos)) {
    return true;
  }
  return false;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;
  const { updateMap, isMigratable } = checkIsComponentWithMigrations({
    jsx,
    componentNames: Object.keys(illustrationRenames),
    attribute: 'name',
    renameMap: illustrationRenames,
  });

  if (isMigratable) {
    checkForSpreadProps(jsx);
    const { oldValue, newValue } = renameJsxAttributeValue({
      attribute: updateMap.attribute,
      updateMap: updateMap.valueMap,
      jsx,
    });
    if (oldValue && newValue) {
      writeMigrationToFile({ oldValue, newValue, jsx, sourceFile });
    }
  }
};

export default async function migrations(tree: Tree) {
  logDebug('Migrating Illustrations');
  await createJsxMigration({
    tree,
    checkSourceFile,
    callback,
    excludeOpeningElements: true,
    packageNames: ['@cbhq/cds-web', '@cbhq/cds-mobile'],
  });
}
