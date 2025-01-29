import { Tree } from '@nx/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImport,
  checkFileIncludesRenamedValue,
  checkForSpreadProps,
  createJsxMigration,
  getComponentFromJsx,
  logDebug,
  ParseJsxElementsCbParams,
  renameJsxAttributeWithAttributeAndValue,
  replaceKey,
  searchAndProcessComponent,
  writeMigrationToFile,
} from '../../helpers';

import { migrateBooleanPropToAttributeAndValueMigrations } from './data/propMigrations';

const importPaths = Object.values(migrateBooleanPropToAttributeAndValueMigrations).flatMap(
  (mig) => mig.paths,
);

const renamedProp = Object.values(migrateBooleanPropToAttributeAndValueMigrations).map(
  (val) => val.oldAttribute,
);

const checkSourceFile = (sourceFile: SourceFile) => {
  const sourceContent = sourceFile.getFullText();
  const hasRenamedValue = checkFileIncludesRenamedValue(sourceContent, renamedProp);
  const hasImport = checkFileIncludesImport(sourceFile, importPaths);
  if (hasRenamedValue && hasImport) {
    return true;
  }
  return false;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames: Object.keys(migrateBooleanPropToAttributeAndValueMigrations),
  });

  let renameMap = migrateBooleanPropToAttributeAndValueMigrations;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: migrateBooleanPropToAttributeAndValueMigrations,
      oldKey: component,
      newKey: actualComponentName,
    });
  }
  const updateMap = renameMap[actualComponentName ?? component];

  // gate for components that are not migratable
  let isMigratable = false;
  if (updateMap) {
    checkForSpreadProps(jsx);
    const attributeToMigrate = updateMap.oldAttribute;
    searchAndProcessComponent({
      jsx,
      componentName: component,
      callback: (propName) => {
        if (attributeToMigrate.includes(propName)) {
          isMigratable = true;
        }
      },
    });
  }

  if (isMigratable) {
    const { oldValue, newValue } = renameJsxAttributeWithAttributeAndValue({
      oldAttribute: updateMap.oldAttribute,
      newAttribute: updateMap.newAttribute,
      value: updateMap.value,
      jsx,
    });
    if (oldValue && newValue) {
      writeMigrationToFile({ oldValue, newValue, jsx, sourceFile });
    }
  }
};

export default async function migrations(tree: Tree) {
  logDebug('Migrating deprecated boolean props -> attribute + values');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
