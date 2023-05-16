import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';
import { SourceFile } from 'ts-morph';

import { checkFileIncludesImport } from '../../helpers/checkFileIncludesImport';
import { checkFileIncludesRenamedValue } from '../../helpers/checkFileIncludesRenamedValue';
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
const renamedPropValues = Object.keys(
  Object.values(propValueMigrations).map((val) => val.valueMap),
);

const filterSourceFiles = (path: string, sourceFile: SourceFile) => {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  const hasRenamedValue = checkFileIncludesRenamedValue(sourceContent, renamedPropValues);
  const hasImport = checkFileIncludesImport(sourceFile, importPaths);
  if (hasRenamedValue && hasImport) {
    return true;
  }
  return false;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, tree, sourceFile, path } = args;
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames: Object.keys(propValueMigrations),
  });

  if (!filterSourceFiles(path, sourceFile)) return;

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
    const migratableValues = Object.keys(updateMap.valueMap);
    const attributeToMigrate = updateMap.attribute;
    searchAndProcessComponent({
      jsx,
      componentName: component,
      callback: (propName, propValue) => {
        if (
          typeof propValue === 'string' &&
          attributeToMigrate.includes(propName) &&
          migratableValues.includes(propValue)
        ) {
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
      writeMigrationToFile({ oldValue, newValue, jsx, sourceFile, tree });
    }
  }
};

export default async function migrations(tree: Tree) {
  logDebug('Migrating deprecated prop values');
  await createJsxMigration({
    tree,
    callback,
  });
}
