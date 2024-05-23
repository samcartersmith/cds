import { Tree } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImport,
  checkFileIncludesRenamedValue,
  checkForSpreadProps,
  createJsxMigration,
  getComponentFromJsx,
  logDebug,
  ParseJsxElementsCbParams,
  renameJsxAttributeValue,
  replaceKey,
  searchAndProcessComponent,
  writeMigrationToFile,
} from '../../helpers';

import { propValueMigrations } from './data/migrations';

const renamedValues = Object.values(propValueMigrations).flatMap((obj) =>
  Object.keys(obj.valueMap),
);
// unique values for all directories where migratable component would live
const importPaths = [...new Set(Object.values(propValueMigrations).flatMap((obj) => obj.paths))];

const checkSourceFile = (sourceFile: SourceFile) => {
  const sourceContent = sourceFile.getFullText();
  const hasRenamedValue = checkFileIncludesRenamedValue(sourceContent, renamedValues);
  const hasImport = checkFileIncludesImport(sourceFile, importPaths);
  return hasRenamedValue && hasImport;
};

const componentNames = Object.keys(propValueMigrations);

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;

  // parse JSX for the component we want
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames,
  });

  // if the component is aliased on import, we want to update our map to look for the alias JSX name
  let renameMap = propValueMigrations;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: propValueMigrations,
      oldKey: component,
      newKey: actualComponentName,
    });
  }
  const updateMap = renameMap[actualComponentName ?? component];

  // check if component contains migratable values for given prop
  let isMigratable = false;
  if (updateMap) {
    checkForSpreadProps(jsx);
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

  // migrate!
  if (isMigratable) {
    const { oldValue, newValue } = renameJsxAttributeValue({
      attribute: updateMap.attribute,
      updateMap: updateMap.valueMap,
      jsx,
    });
    // save the file
    if (oldValue && newValue) {
      writeMigrationToFile({ oldValue, newValue, jsx, sourceFile });
    }
  }
};

export default async function migration(tree: Tree) {
  logDebug('Migrating alpha banner prop value');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
