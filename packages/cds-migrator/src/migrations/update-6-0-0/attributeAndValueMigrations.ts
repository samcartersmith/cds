import { Tree } from '@nx/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImport,
  checkFileIncludesRenamedValue,
  createJsxMigration,
  getComponentFromJsx,
  logDebug,
  mobilePackage,
  ParseJsxElementsCbParams,
  RenameAttributeAndValueMapShape,
  renameJsxAttribute,
  renameJsxAttributeValue,
  replaceKey,
  searchAndProcessComponent,
  webPackage,
  writeMigrationToFile,
} from '../../helpers';

import { renamedAttributeAndValueMigrations } from './data/propMigrations';

const importPaths = [webPackage, mobilePackage];
const oldProps: string[] = [];

Object.values(renamedAttributeAndValueMigrations).map((val) =>
  Array.isArray(val)
    ? val.forEach(({ oldAttribute }) => oldProps.push(oldAttribute))
    : oldProps.push(val.oldAttribute),
);

const checkSourceFile = (sourceFile: SourceFile) => {
  const sourceContent = sourceFile.getFullText();
  const hasRenamedValue = checkFileIncludesRenamedValue(sourceContent, oldProps);
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
    componentNames: Object.keys(renamedAttributeAndValueMigrations),
  });

  if (!Object.keys(renamedAttributeAndValueMigrations).includes(actualComponentName ?? component)) {
    return;
  }

  let renameMap = renamedAttributeAndValueMigrations;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: renamedAttributeAndValueMigrations,
      oldKey: component,
      newKey: actualComponentName,
    });
  }

  const renameValue = (config: RenameAttributeAndValueMapShape) => {
    const { valueMap, oldAttribute, newAttribute } = config;
    searchAndProcessComponent({
      jsx,
      componentName: actualComponentName ?? component,
      callback: (propName, propValue) => {
        if (propName === oldAttribute && valueMap[propValue as string]) {
          renameJsxAttributeValue({ updateMap: valueMap, attribute: oldAttribute, jsx });
          renameJsxAttribute({ oldAttribute, newAttribute, jsx });
          writeMigrationToFile({ oldValue: oldAttribute, newValue: newAttribute, jsx, sourceFile });
        }
      },
    });
  };
  const componentMap = renameMap[actualComponentName ?? component];

  if (Array.isArray(componentMap)) {
    componentMap.forEach((comp) => {
      renameValue(comp);
    });
  } else {
    renameValue(componentMap);
  }
};

export default async function migrations(tree: Tree) {
  logDebug('Migrating deprecated props');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
