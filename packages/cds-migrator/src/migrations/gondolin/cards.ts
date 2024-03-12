import { Tree } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import {
  addNewProp,
  checkFileIncludesImportedModule,
  createJsxMigration,
  generateManualMigrationOutput,
  getComponentFromJsx,
  logDebug,
  logWarning,
  ParseJsxElementsCbParams,
  RenameAttributeMapShape,
  renameJsxAttribute,
  renameJsxTag,
  replaceImport,
  searchAndProcessComponent,
  writeMigrationToFile,
} from '../../helpers';

import { cardMigrations, removedCardProps, removedProps } from './data/cards';

const checkSourceFile = (sourceFile: SourceFile): boolean => {
  let checkSourceFileHasDeprecatedComponent = false;

  Object.values(cardMigrations).forEach(({ path: componentPath, name }) => {
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

const componentNames = cardMigrations.map(({ name: componentName }) => componentName);

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;

  cardMigrations?.forEach(
    ({ name, path: componentPath, replacement, attributeRenameMap, newProps }) => {
      const oldPath = Object.keys(componentPath)[0];
      const newPath = Object.values(componentPath)[0];

      const { component, actualComponentName } = getComponentFromJsx({
        jsx,
        componentNames,
      });
      if (actualComponentName ?? component !== name) {
        return;
      }

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
      const renameAttribute = (attributeRenameMap: RenameAttributeMapShape) => {
        searchAndProcessComponent({
          jsx,
          componentName: actualComponentName ?? component,
          callback: (propName) => {
            if (propName === attributeRenameMap.oldAttribute) {
              renameJsxAttribute({
                oldAttribute: attributeRenameMap.oldAttribute,
                newAttribute: attributeRenameMap.newAttribute,
                jsx,
              });
            }
            if (removedProps.includes(propName)) {
              const manualMigrationWarning = `The prop ${propName} has been removed from ${
                actualComponentName ?? component
              }. Use pictogram instead.`;
              logWarning(manualMigrationWarning);
              generateManualMigrationOutput(
                `## ${manualMigrationWarning} \n - at ${sourceFile.getFilePath()}`,
              );
            }
          },
        });
      };
      // some components were replaced by ones with the same name, but new path and API
      // so we only want to find/replace usage if there is a replacement
      if (attributeRenameMap) {
        if (Array.isArray(attributeRenameMap)) {
          attributeRenameMap.forEach((config) => {
            renameAttribute(config);
          });
        } else {
          renameAttribute(attributeRenameMap);
        }
      }
      if (newProps) {
        newProps.forEach(({ attribute, value }) => addNewProp({ jsx, attribute, value }));
      }
      if (replacement) {
        renameJsxTag({ jsx, value: replacement });
      }
      writeMigrationToFile({ sourceFile, oldValue: name, newValue: replacement });
    },
  );
};

export default async function migration(tree: Tree) {
  logDebug('Migrating deprecated components');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
