import { Tree } from '@nrwl/devkit';
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
  replaceImportedModule,
  replaceImportPath,
  writeMigrationToFile,
} from '../../helpers';

import { oneToOneMigrations } from './data/componentMigrations';

const componentNames = oneToOneMigrations.map((config) => config.name);

const checkSourceFile = (sourceFile: SourceFile): boolean => {
  let checkSourceFileHasDeprecatedComponent = false;
  componentNames.forEach((component) => {
    const pathConfig = oneToOneMigrations.find(({ name }) => name === component)?.path;
    if (pathConfig) {
      const hasImportForDeprecatedComponent = checkFileIncludesImportedModule({
        sourceFile,
        path: Object.keys(pathConfig)[0],
        module: component,
      });

      if (hasImportForDeprecatedComponent) {
        checkSourceFileHasDeprecatedComponent = true;
      }
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

    replaceImportPath({ sourceFile, oldPath, newPath });
    //   some components were replaced by ones with the same name, but new path and API
    // so we only want to find/replace usage if there is a replacement
    if (replacement) {
      replaceImportedModule({
        sourceFile,
        oldValue: name,
        newValue: replacement,
        path: newPath,
      });
      renameJsxTag({ jsx, value: replacement });
    }
    writeMigrationToFile({ sourceFile, oldValue: name, newValue: replacement });

    if (warning) {
      generateManualMigrationOutput(
        `## Warning: ${name} was replaced with ${replacement} at ${sourceFile.getFilePath()}, manual migration required. \n - The APIs are different, so you will need to manually migrate. Refer to go/cds-deprecations for API migration guidance.`,
      );
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
