import { Tree } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImportedModule,
  createJsxMigration,
  getComponentFromJsx,
  logDebug,
  ParseJsxElementsCbParams,
  renameJsxAttribute,
  renameJsxTag,
  replaceImport,
  writeMigrationToFile,
} from '../../helpers';

import { oneToOneMigrations } from './data/componentMigrations';

const checkSourceFile = (sourceFile: SourceFile): boolean => {
  let checkSourceFileHasDeprecatedComponent = false;

  Object.values(oneToOneMigrations).forEach(({ path: componentPath, name }) => {
    const oldPath = Object.keys(componentPath)[0];
    const hasImportForDeprecatedComponent = checkFileIncludesImportedModule({
      sourceFile,
      path: oldPath,
      module: name,
    });
    if (hasImportForDeprecatedComponent) {
      checkSourceFileHasDeprecatedComponent = true;
    }
  });
  return checkSourceFileHasDeprecatedComponent;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;

  oneToOneMigrations?.forEach(({ name, path: componentPath, replacement, attributeRenameMap }) => {
    const oldPath = Object.keys(componentPath)[0];
    const newPath = Object.values(componentPath)[0];

    const { component, actualComponentName } = getComponentFromJsx({
      jsx,
      componentNames: oneToOneMigrations.map(({ name: componentName }) => componentName),
    });
    if (actualComponentName ?? component !== name) {
      return;
    }

    replaceImport({ sourceFile, oldPath, newPath, namedImport: component });
    // some components were replaced by ones with the same name, but new path and API
    // so we only want to find/replace usage if there is a replacement
    if (replacement) {
      if (attributeRenameMap) {
        renameJsxAttribute({
          oldAttribute: attributeRenameMap?.oldAttribute,
          newAttribute: attributeRenameMap?.newAttribute,
          jsx,
        });
      }
      renameJsxTag({ jsx, value: replacement });
    }
    writeMigrationToFile({ sourceFile, oldValue: name, newValue: replacement });
  });
};

export default async function migration(tree: Tree) {
  logDebug('Migrating deprecated components');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
