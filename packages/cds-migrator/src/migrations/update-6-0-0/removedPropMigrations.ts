import { Tree } from '@nx/devkit';
import fs from 'node:fs';

import {
  checkForSpreadProps,
  createJsxMigration,
  generateManualMigrationOutput,
  getComponentFromJsx,
  logDebug,
  ParseJsxElementsCbParams,
  removeJsxAttribute,
  saveChangesToFile,
  searchAndProcessComponent,
} from '../../helpers';

import { removedProps } from './data/propMigrations';

const filterSourceFiles = (path: string) => {
  const sourceFile = fs.readFileSync(path, 'utf-8');
  const pathsForRemovedProps: string[] = [];
  const removedPropsList: string[] = [];

  Object.values(removedProps).forEach(({ path: removedPropPath, props }) => {
    removedPropsList.push(...props);
    if (Array.isArray(removedPropPath)) {
      removedPropPath.forEach((p) => pathsForRemovedProps.push(p));
    } else {
      pathsForRemovedProps.push(removedPropPath);
    }
  });

  const hasImportForRemovedProp = pathsForRemovedProps.some((p) => sourceFile.includes(p));
  const hasRemovedProp = removedPropsList.some((p) => sourceFile.includes(p));
  return hasImportForRemovedProp && hasRemovedProp;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames: Object.keys(removedProps),
  });
  const removedPropConfig = removedProps[actualComponentName ?? component];
  if (!removedPropConfig) return;
  const { props, replacement } = removedPropConfig;
  checkForSpreadProps(jsx);

  searchAndProcessComponent({
    jsx,
    componentName: component,
    callback: (propName) => {
      if (Array.isArray(props)) {
        props.forEach((prop) => {
          if (prop === propName) {
            removeJsxAttribute(propName, jsx);
          }
        });
      } else if (props === propName) {
        removeJsxAttribute(propName, jsx);
      }
    },
  });

  if (jsx.getAttributes().length === 0) {
    generateManualMigrationOutput(
      `## Manual Migration Recommended \n- All props have been removed from ${
        actualComponentName ?? component
      }. We recommend that you remove usage of this component manually.\n- at ${sourceFile.getFilePath()}`,
    );
  }

  saveChangesToFile(sourceFile, replacement);
};

export default async function migration(tree: Tree) {
  logDebug('Migrating removed props');
  await createJsxMigration({
    tree,
    callback,
    filterSourceFiles,
  });
}
