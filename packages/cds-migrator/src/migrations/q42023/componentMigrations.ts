import { output, Tree } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImportedModule,
  createJsxMigration,
  generateManualMigrationOutput,
  getComponentFromJsx,
  logDebug,
  logWarning,
  ParseJsxElementsCbParams,
  renameJsxTag,
  replaceImport,
  writeMigrationToFile,
} from '../../helpers';

import { oneToOneMigrations } from './data/componentMigrations';

const checkSourceFile = (sourceFile: SourceFile): boolean => {
  let checkSourceFileHasDeprecatedComponent = false;
  const path = sourceFile.getFilePath();

  Object.values(oneToOneMigrations).forEach(({ path: componentPath, name, replacement }) => {
    const oldPath = Object.keys(componentPath)[0];
    const hasImportForDeprecatedComponent = checkFileIncludesImportedModule({
      sourceFile,
      path: oldPath,
      module: name,
    });
    if (hasImportForDeprecatedComponent) {
      checkSourceFileHasDeprecatedComponent = true;
      generateManualMigrationOutput(
        `## The ${name} component was replaced with ${replacement} at ${output.underline(
          path,
        )}. \n - Manual migration is required since the API has changed. Refer to go/cds-deprecations for API migration guidance.`,
      );
    }
  });
  return checkSourceFileHasDeprecatedComponent;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;

  oneToOneMigrations?.forEach(({ name, path: componentPath, replacement, warning }) => {
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
      renameJsxTag({ jsx, value: replacement });
    }
    writeMigrationToFile({ sourceFile, oldValue: name, newValue: replacement });

    if (warning) {
      logWarning(`Please check all instances of ${name}. ${warning}`);
    }
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
