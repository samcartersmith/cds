import { Tree } from '@nx/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImport,
  checkFileIncludesRenamedValue,
  checkForSpreadProps,
  createJsxMigration,
  generateManualMigrationOutput,
  getComponentFromJsx,
  logDebug,
  objectKeys,
  ParseJsxElementsCbParams,
  replaceKey,
  searchAndProcessComponent,
} from '../../helpers';

import { attributeValueToBooleanMigrations } from './data/propMigrations';

const importPaths = Object.values(attributeValueToBooleanMigrations).map((val) => val.path);
const componentNames = objectKeys(attributeValueToBooleanMigrations);
const renamedProps = Object.values(attributeValueToBooleanMigrations).map(
  (val) => val.oldAttribute,
);

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
  const { jsx } = args;
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames,
  });

  let renameMap = attributeValueToBooleanMigrations;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: attributeValueToBooleanMigrations,
      oldKey: component,
      newKey: actualComponentName,
    });
  }

  const updateMap = renameMap[actualComponentName ?? component];
  if (!updateMap) {
    return;
  }

  checkForSpreadProps(jsx);

  const { oldAttribute, newAttribute } = updateMap;
  // gate for components that are not migratable
  let isMigratable = false;
  const attributeToMigrate = updateMap.oldAttribute;
  searchAndProcessComponent({
    jsx,
    componentName: component,
    callback: (propName) => {
      if (attributeToMigrate === propName) {
        isMigratable = true;
      }
    },
  });

  if (isMigratable) {
    generateManualMigrationOutput(
      `The ${oldAttribute} prop in the ${
        actualComponentName ?? component
      } has been deprecated and replaced with ${newAttribute}. \n  - You will need to manually migrate all instances.  \n  - Refer to the migration guide for details: https://cds.cbhq.net/guides/migration/`,
    );
  }
};

export default async function migrations(tree: Tree) {
  logDebug('Migrating deprecated attribute + value pairs to boolean props');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
