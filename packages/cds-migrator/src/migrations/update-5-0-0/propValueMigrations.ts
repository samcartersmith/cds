import { Tree } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import { checkFileIncludesImport } from '../../helpers/checkFileIncludesImport';
import { createJsxMigration } from '../../helpers/createJsxMigration';
import { getComponentFromJsx } from '../../helpers/getComponentFromJsx';
import { logDebug } from '../../helpers/loggingHelpers';
import { ParseJsxElementsCbParams } from '../../helpers/parseJsxElements';
import { renameJsxAttributeValue } from '../../helpers/renameJsxAttributeValue';
import { replaceKey } from '../../helpers/replaceKey';
import { searchAndProcessComponent } from '../../helpers/searchAndProcessComponent';
import { writeMigrationToFile } from '../../helpers/writeMigrationToFile';

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
