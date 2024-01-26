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
  mobilePackage,
  ParseJsxElementsCbParams,
  renameJsxAttributeValue,
  webPackage,
  writeMigrationToFile,
} from '../../helpers';

import { iconRenames } from './data/iconRenames';

const renamedIcons = Object.keys(Object.values(iconRenames).map((val) => val.valueMap));
// unique values for all directories where migratable component would live
const importPaths = [...new Set(Object.values(iconRenames).flatMap((obj) => obj.paths))];

const checkSourceFile = (sourceFile: SourceFile) => {
  const sourceContent = fs.readFileSync(sourceFile.getFilePath(), 'utf-8');
  const hasOldImport = checkFileIncludesImport(sourceFile, importPaths);
  if (hasOldImport || checkFileIncludesRenamedValue(sourceContent, renamedIcons)) {
    return true;
  }
  return false;
};

function callback(args: ParseJsxElementsCbParams) {
  const { jsx, sourceFile } = args;
  const { updateMap, isMigratable } = checkIsComponentWithMigrations({
    jsx,
    componentNames: Object.keys(iconRenames),
    attribute: 'name',
    renameMap: iconRenames,
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
}

export default async function migrations(tree: Tree) {
  logDebug('Migrating Icons');
  await createJsxMigration({
    tree,
    checkSourceFile,
    callback,
    excludeOpeningElements: true,
    packageNames: [webPackage, mobilePackage],
  });
}
