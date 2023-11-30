import { Tree } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import {
  checkFileIncludesImport,
  checkFileIncludesRenamedValue,
  createJsxMigration,
  generateManualMigrationOutput,
  getComponentFromJsx,
  logDebug,
  logWarning,
  ParseJsxElementsCbParams,
  replaceKey,
  searchAndProcessComponent,
} from '../../helpers';

import { manualPropMigrations, offsetRenameMap, spacingRenameMap } from './data/propMigrations';

const importPaths = ['@cbhq/cds-web/cells', '@cbhq/cds-mobile/cells'];
const renamedProps = [...Object.keys(offsetRenameMap), ...Object.keys(spacingRenameMap)];
const componentsWithDeprecations = Object.keys(manualPropMigrations);

const checkSourceFile = (sourceFile: SourceFile) => {
  const sourceContent = sourceFile.getFullText();
  const hasRenamedValue = checkFileIncludesRenamedValue(sourceContent, renamedProps);
  const hasImport = checkFileIncludesImport(sourceFile, importPaths);
  if (hasRenamedValue && hasImport) {
    return true;
  }
  return false;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, path } = args;
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames: componentsWithDeprecations,
  });

  if (!componentsWithDeprecations.includes(actualComponentName ?? component)) {
    return;
  }

  let renameMap = manualPropMigrations;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: manualPropMigrations,
      oldKey: component,
      newKey: actualComponentName,
    });
  }
  const updateMap = renameMap[actualComponentName ?? component];

  if (!updateMap) {
    return;
  }

  // gate for components that are not migratable
  const propsWithDeprecatedValues: string[] = [];

  searchAndProcessComponent({
    jsx,
    componentName: component,
    callback: (propName) => {
      if (updateMap.props.includes(propName)) {
        propsWithDeprecatedValues.push(propName);
      }
    },
  });

  if (propsWithDeprecatedValues.length) {
    const props =
      propsWithDeprecatedValues.length > 1
        ? propsWithDeprecatedValues.join(', ')
        : propsWithDeprecatedValues[0];
    const warning = `## Warning: ${
      actualComponentName ?? component
    } is potentially using a deprecated spacing and/or offset style in the ${props} prop(s) at ${path}. \n  - You will need to manually migrate to using styles prefixed with margin > offset, and padding > spacing.  \n  - Refer to the migration guide for details: https://cds.cbhq.net/guides/migration/`;
    generateManualMigrationOutput(warning);
    logWarning(warning);
  }
};

export default async function migrations(tree: Tree) {
  logDebug('Checking for props that have to be migrated manually');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
