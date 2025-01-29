import { Tree } from '@nx/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImportedModule,
  createJsxMigration,
  generateManualMigrationOutput,
  getComponentFromJsx,
  logDebug,
  ParseJsxElementsCbParams,
  renameJsxAttribute,
  renameJsxTag,
  replaceImport,
  searchAndProcessComponent,
  writeMigrationToFile,
} from '../../helpers';

import { oneToOneMigrations, removedCardProps } from './data/componentMigrations';

const checkSourceFile = (sourceFile: SourceFile): boolean => {
  let checkSourceFileHasDeprecatedComponent = false;

  Object.values(oneToOneMigrations).forEach(({ path: componentPath, name }) => {
    const oldPath = Object.keys(componentPath)[0];
    const hasImportForDeprecatedComponent = checkFileIncludesImportedModule({
      sourceFile,
      path: oldPath,
      module: name,
    });
    if (hasImportForDeprecatedComponent) {
      checkSourceFileHasDeprecatedComponent = true;
    }
  });
  return checkSourceFileHasDeprecatedComponent;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;

  oneToOneMigrations?.forEach(({ name, path: componentPath, replacement, attributeRenameMap }) => {
    const oldPath = Object.keys(componentPath)[0];
    const newPath = Object.values(componentPath)[0];

    const { component, actualComponentName } = getComponentFromJsx({
      jsx,
      componentNames: oneToOneMigrations.map(({ name: componentName }) => componentName),
    });
    if (actualComponentName ?? component !== name) {
      return;
    }

    let requiresManualClosingTagMigration = false;

    if (actualComponentName === 'Card' || component === 'Card') {
      searchAndProcessComponent({
        jsx,
        componentName: actualComponentName ?? component,
        callback: (propName) => {
          // check if it is a pressable card and require manual migration
          if (removedCardProps.includes(propName)) {
            const pressablePropsMessage =
              ' and spread in the value for pressableProps into the PressableOpacity';
            generateManualMigrationOutput(
              `## Manual Migration Required! \n - The Card component has been removed and replaced with VStack. \n - This Card uses an onPress which is not automatically migrateable. We've converted this into a VStack, but you will need to wrap it with a PressableOpacity${
                propName === 'pressableProps' ? pressablePropsMessage : ''
              }. \n - at ${sourceFile.getFilePath()}`,
            );
          } else {
            requiresManualClosingTagMigration = true;
          }
        },
      });
    }

    replaceImport({
      sourceFile,
      oldPath,
      newPath,
      namedImport: component,
      newNamedImport: replacement,
    });
    // some components were replaced by ones with the same name, but new path and API
    // so we only want to find/replace usage if there is a replacement
    if (replacement) {
      if (attributeRenameMap) {
        if (Array.isArray(attributeRenameMap)) {
          attributeRenameMap.forEach((config) => {
            renameJsxAttribute({
              oldAttribute: config?.oldAttribute,
              newAttribute: config?.newAttribute,
              jsx,
            });
          });
        } else {
          renameJsxAttribute({
            oldAttribute: attributeRenameMap?.oldAttribute,
            newAttribute: attributeRenameMap?.newAttribute,
            jsx,
          });
        }
      }
      renameJsxTag({ jsx, value: replacement });
    }
    writeMigrationToFile({ sourceFile, oldValue: name, newValue: replacement });
    if (requiresManualClosingTagMigration) {
      generateManualMigrationOutput(
        `## Manual Migration Required! \n - The Card component has been removed and replaced with VStack. \n - We migrated this instance for you but you will need to update the closing tag manually. \n - at ${sourceFile.getFilePath()}`,
      );
    }
  });
};

export default async function migration(tree: Tree) {
  logDebug('Migrating deprecated components');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
