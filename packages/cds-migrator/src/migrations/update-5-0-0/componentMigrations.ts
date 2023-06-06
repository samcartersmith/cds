import { Tree } from '@nrwl/devkit';
import chalk from 'chalk';
import { SourceFile } from 'ts-morph';

import { checkFileIncludesImportedModule } from '../../helpers/checkFileIncludesImportedModule';
import { createJsxMigration } from '../../helpers/createJsxMigration';
import { generateManualMigrationOutput } from '../../helpers/generateManualMigrationOutput';
import { getComponentFromJsx } from '../../helpers/getComponentFromJsx';
import { logDebug, logWarning } from '../../helpers/loggingHelpers';
import { ParseJsxElementsCbParams } from '../../helpers/parseJsxElements';
import { renameJsxTag } from '../../helpers/renameJsxTag';
import { replaceImportedModule } from '../../helpers/replaceImportedModule';
import { replaceImportPath } from '../../helpers/replaceImportPath';
import { writeMigrationToFile } from '../../helpers/writeMigrationToFile';

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
        `The ${name} component was replaced with ${replacement} at ${chalk.underline(
          path,
        )}. Manual migration is required since the API has changed. Refer to go/cds-deprecations for API migration guidance.`,
      );
    }
  });
  return checkSourceFileHasDeprecatedComponent;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { tree, jsx, sourceFile } = args;

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
    writeMigrationToFile({ sourceFile, tree, oldValue: name, newValue: replacement });

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
