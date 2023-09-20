import { Tree } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImport,
  createJsxMigration,
  getComponentFromJsx,
  logDebug,
  ParseJsxElementsCbParams,
  renameJsxAttributeValue,
  replaceKey,
  searchAndProcessComponent,
  writeMigrationToFile,
} from '../../helpers';

import { propValueMigrations } from './data/propMigrations';

const importPaths = ['@cbhq/cds-web/illustrations', '@cbhq/cds-mobile/illustrations'];

const checkSourceFile = (sourceFile: SourceFile) => {
  return checkFileIncludesImport(sourceFile, importPaths);
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames: Object.keys(propValueMigrations),
  });

  let renameMap = propValueMigrations;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: propValueMigrations,
      oldKey: component,
      newKey: actualComponentName,
    });
  }
  const updateMap = renameMap[actualComponentName ?? component];

  // gate for components that are not migratable
  let isMigratable = false;
  if (updateMap) {
    const attributeToMigrate = updateMap.attribute;
    searchAndProcessComponent({
      jsx,
      componentName: component,
      callback: (propName) => {
        if (attributeToMigrate === propName) {
          isMigratable = true;
        }
      },
    });
  }

  if (isMigratable) {
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
  logDebug('Migrating deprecated prop values');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
