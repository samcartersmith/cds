import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';

import {
  createJsxMigration,
  logDebug,
  ParseJsxElementsCbParams,
  renameJsxAttribute,
  writeMigrationToFile,
} from '../../helpers';

import { catchAllPropMigrations } from './data/propMigrations';

const filterSourceFiles = (path: string) => {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  let hasDeprecatedProps = false;

  catchAllPropMigrations.forEach(({ oldAttribute }) => {
    if (sourceContent.includes(oldAttribute)) {
      hasDeprecatedProps = true;
    }
  });

  return hasDeprecatedProps;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;

  const sourceContent = sourceFile.getFullText();
  const deprecatedPropsInFile: string[] = [];

  catchAllPropMigrations.forEach(({ oldAttribute }) => {
    if (sourceContent.includes(oldAttribute)) {
      deprecatedPropsInFile.push(oldAttribute);
    }
  });

  deprecatedPropsInFile.forEach((attribute) => {
    const jsxHasAttribute = jsx.getAttribute(attribute);
    if (!jsxHasAttribute) {
      return;
    }
    const attributeConfig = catchAllPropMigrations.find(
      (config) => config.oldAttribute === attribute,
    );
    if (attributeConfig) {
      const { oldAttribute, newAttribute } = attributeConfig;
      renameJsxAttribute({ oldAttribute, newAttribute, jsx });
      writeMigrationToFile({ oldValue: oldAttribute, newValue: newAttribute, jsx, sourceFile });
    }
  });
};

export default async function migration(tree: Tree) {
  logDebug('Migrating deprecated dangerouslySet* props');
  await createJsxMigration({
    tree,
    callback,
    filterSourceFiles,
  });
}
