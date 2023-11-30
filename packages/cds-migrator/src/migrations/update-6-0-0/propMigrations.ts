import { Tree } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImport,
  checkFileIncludesRenamedValue,
  checkHasCdsDependency,
  createJsxMigration,
  getComponentFromJsx,
  logDebug,
  ParseJsxElementsCbParams,
  RenameAttributeMapShape,
  renameJsxAttribute,
  replaceKey,
  writeMigrationToFile,
} from '../../helpers';

import { renamedProps } from './data/propMigrations';

const importPaths = ['@cbhq/cds-web', '@cbhq/cds-mobile'];
const oldProps: string[] = [];

Object.values(renamedProps).map((val) =>
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
  const { jsx, sourceFile, tree, projectConfig } = args;
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames: Object.keys(renamedProps),
  });

  if (!Object.keys(renamedProps).includes(actualComponentName ?? component)) {
    return;
  }

  let renameMap = renamedProps;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: renamedProps,
      oldKey: component,
      newKey: actualComponentName,
    });
  }

  const shouldApplyRename = (corePackageDependency: string[]) => {
    // If corePackageDependency is empty, apply to all
    if (corePackageDependency.length === 0) {
      return true;
    }

    // Check if any project has a matching CDS dependency
    if (corePackageDependency?.length) {
      const { hasCoreCdsDependency } = checkHasCdsDependency({
        tree,
        project: projectConfig,
      });
      return corePackageDependency.some(() => hasCoreCdsDependency);
    }
    return false;
  };

  const renameAttribute = (config: RenameAttributeMapShape) => {
    const componentHasAttribute = jsx.getAttribute(config.oldAttribute);
    if (componentHasAttribute && shouldApplyRename(config.corePackageDependency || [])) {
      const { oldAttribute, newAttribute } = config;
      renameJsxAttribute({ oldAttribute, newAttribute, jsx });
      writeMigrationToFile({ oldValue: oldAttribute, newValue: newAttribute, jsx, sourceFile });
    }
  };

  const componentMap = renameMap[actualComponentName ?? component];
  if (Array.isArray(componentMap)) {
    componentMap.forEach((comp) => {
      renameAttribute(comp);
    });
  } else {
    renameAttribute(componentMap);
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
