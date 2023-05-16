import { output, Tree } from '@nrwl/devkit';
import fs from 'node:fs';

import { createJsxMigration } from '../../helpers/createJsxMigration';
import { generateManualMigrationOutput } from '../../helpers/generateManualMigrationOutput';
import { getComponentFromJsx } from '../../helpers/getComponentFromJsx';
import { logWarning } from '../../helpers/loggingHelpers';
import { ParseJsxElementsCbParams } from '../../helpers/parseJsxElements';
import { searchAndProcessComponent } from '../../helpers/searchAndProcessComponent';

import { removedProps } from './data/propMigrations';

const filterSourceFiles = (path: string) => {
  const sourceFile = fs.readFileSync(path, 'utf-8');
  const pathsForRemovedProps: string[] = [];
  const removedPropsList: string[] = [];
  Object.values(removedProps).forEach(({ path: removedPropPath, prop }) => {
    removedPropsList.push(prop);
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
  const { jsx, path } = args;
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames: Object.keys(removedProps),
  });
  const removedPropConfig = removedProps[actualComponentName ?? component];
  if (!removedPropConfig) return;
  const { prop, replacement } = removedPropConfig;

  searchAndProcessComponent({
    jsx,
    componentName: component,
    callback: (propName) => {
      if (prop === propName) {
        const title = `The ${propName} prop has been removed from the ${
          actualComponentName ?? component
        } component. Please ${replacement}.`;
        const outputMessage = `All manual migrations are output to the root of the repo in a file called:`;
        const outputPath = `${output.underline(`${args.tree.root}/cds-migrator-output.md`)}`;
        logWarning('Manual migration required!', [
          title,
          `Located at: ${output.underline(path)}`,
          outputMessage,
          outputPath,
        ]);
        generateManualMigrationOutput(`## ${title}\n  - Located at ${path}`);
      }
    },
  });
};

export default async function migration(tree: Tree) {
  await createJsxMigration({
    tree,
    callback,
    filterSourceFiles,
  });
}
