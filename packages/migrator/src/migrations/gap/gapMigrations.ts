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
  RenameAttributeMapShape,
  renameJsxAttribute,
  replaceKey,
  webPackage,
  writeMigrationToFile,
} from '../../helpers';

import { gapMigrations } from './data/migrations';

// Only migrate Stack components imported from layout directory
const importPaths = [`${webPackage}/layout`];
const oldProps: string[] = [];

Object.values(gapMigrations).map((val) =>
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
    componentNames: Object.keys(gapMigrations),
  });

  if (!Object.keys(gapMigrations).includes(actualComponentName ?? component)) {
    return;
  }

  let renameMap = gapMigrations;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: gapMigrations,
      oldKey: component,
      newKey: actualComponentName,
    });
  }

  const renameAttribute = (config: RenameAttributeMapShape) => {
    const { oldAttribute, newAttribute } = config;
    const componentHasAttribute = jsx.getAttribute(oldAttribute);
    if (componentHasAttribute) {
      renameJsxAttribute({ oldAttribute, newAttribute, jsx });
      writeMigrationToFile({ oldValue: oldAttribute, newValue: newAttribute, jsx, sourceFile });
    }
    checkForSpreadProps(jsx);
  };

  const componentMap = renameMap[actualComponentName ?? component];

  if (Array.isArray(componentMap)) {
    componentMap.forEach((comp) => {
      if (
        !comp.corePackageDependency ||
        (comp.corePackageDependency &&
          checkFileIncludesImport(sourceFile, comp.corePackageDependency))
      ) {
        renameAttribute(comp);
      }
    });
  } else if (
    !componentMap.corePackageDependency ||
    (componentMap.corePackageDependency &&
      checkFileIncludesImport(sourceFile, componentMap.corePackageDependency))
  ) {
    renameAttribute(componentMap);
  }
};

export default async function migrations(tree: Tree) {
  logDebug('Migrating deprecated gap prop');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
