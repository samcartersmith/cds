import { Tree } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImport,
  checkFileIncludesRenamedValue,
  createJsxMigration,
  generateManualMigrationOutput,
  getComponentFromJsx,
  logDebug,
  logWarning,
  ParseJsxElementsCbParams,
  replaceKey,
  searchAndProcessComponent,
} from '../../helpers';

import { manualPropMigrations } from './data/propMigrations';

const importPaths = ['@cbhq/cds-web/layout', '@cbhq/cds-mobile/layout'];

const renamedProps = Object.values(manualPropMigrations)
  .map((val) => val.map((v) => v.oldAttribute))
  .flat()
  .filter((v, i, a) => a.indexOf(v) === i);

const checkSourceFile = (sourceFile: SourceFile) => {
  const sourceContent = sourceFile.getFullText();
  const hasRenamedValue = checkFileIncludesRenamedValue(sourceContent, renamedProps);
  const hasImport = checkFileIncludesImport(sourceFile, importPaths);
  if (hasRenamedValue && hasImport) {
    return true;
  }
  return false;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, path } = args;
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames: Object.keys(manualPropMigrations),
  });

  let renameMap = manualPropMigrations;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: manualPropMigrations,
      oldKey: component,
      newKey: actualComponentName,
    });
  }
  const updateMap = renameMap[actualComponentName ?? component];

  // gate for components that are not migratable
  let isMigratable = false;
  if (updateMap) {
    updateMap.forEach(({ oldAttribute, newAttribute, value }) => {
      searchAndProcessComponent({
        jsx,
        componentName: component,
        callback: (propName) => {
          if (oldAttribute.includes(propName)) {
            isMigratable = true;
          }
        },
      });
      if (isMigratable) {
        const warning = `## Warning: ${component} has deprecated prop ${oldAttribute} at ${path}. \n  - Please use ${newAttribute} with a value of ${value} instead.`;
        generateManualMigrationOutput(warning);
        logWarning(warning);
      }
    });
  }
};

export default async function migrations(tree: Tree) {
  logDebug('Checking for manual prop migrations');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
