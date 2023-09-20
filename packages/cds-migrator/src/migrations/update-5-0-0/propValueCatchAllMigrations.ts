import { Tree } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesRenamedValue,
  createJsxMigration,
  logDebug,
  ParseJsxElementsCbParams,
  renameJsxAttributeValue,
  writeMigrationToFile,
} from '../../helpers';

import { catchAllPropValueMigrations } from './data/propMigrations';

const renamedPropValues = catchAllPropValueMigrations
  .map((val) => Object.keys(val.valueMap))
  .flat();

const checkSourceFile = (sourceFile: SourceFile) => {
  const sourceContent = sourceFile.getFullText();
  const hasRenamedValue = checkFileIncludesRenamedValue(sourceContent, renamedPropValues);
  return hasRenamedValue;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;

  catchAllPropValueMigrations.forEach((migration) => {
    const { oldValue, newValue } = renameJsxAttributeValue({
      attribute: migration.attribute,
      updateMap: migration.valueMap,
      jsx,
    });
    if (oldValue && newValue) {
      writeMigrationToFile({ oldValue, newValue, jsx, sourceFile });
    }
  });
};

export default async function migrations(tree: Tree) {
  logDebug(
    'Migrating deprecated prop values. Warning this is a catch all migration that will rename all deprecated prop values in all JSX elements.',
  );
  await createJsxMigration({
    tree,
    checkSourceFile,
    callback,
  });
}
