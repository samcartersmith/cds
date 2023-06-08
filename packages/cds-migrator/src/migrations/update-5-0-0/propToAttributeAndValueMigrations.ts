import { Tree } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import { checkFileIncludesImport } from '../../helpers/checkFileIncludesImport';
import { checkFileIncludesRenamedValue } from '../../helpers/checkFileIncludesRenamedValue';
import { createJsxMigration } from '../../helpers/createJsxMigration';
import { getComponentFromJsx } from '../../helpers/getComponentFromJsx';
import { logDebug } from '../../helpers/loggingHelpers';
import { ParseJsxElementsCbParams } from '../../helpers/parseJsxElements';
import { renameJsxAttributeWithAttributeAndValue } from '../../helpers/renameJsxAttributeWithAttributeAndValue';
import { replaceKey } from '../../helpers/replaceKey';
import { searchAndProcessComponent } from '../../helpers/searchAndProcessComponent';
import { writeMigrationToFile } from '../../helpers/writeMigrationToFile';

import { migrateBooleanPropToAttributeAndValueMigrations } from './data/propMigrations';

const importPaths = ['@cbhq/cds-web/layout', '@cbhq/cds-mobile/layout'];

const renamedProp = Object.keys(
  Object.values(migrateBooleanPropToAttributeAndValueMigrations).map((val) => val.oldAttribute),
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
  const { jsx, tree, sourceFile } = args;
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
      writeMigrationToFile({ oldValue, newValue, jsx, sourceFile, tree });
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
