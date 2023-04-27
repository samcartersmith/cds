import { output, Tree } from '@nrwl/devkit';
import fs from 'node:fs';

import {
  checkHasImport,
  createJsxMigration,
  generateManualMigrationOutput,
  getTerminalHyperlink,
  logNote,
  ParseJsxElementsCbParams,
  searchAndProcessComponent,
} from '../../helpers/index';

/*
 * If JSX Element is VStack, then get attributes.
 * If attribute "as" present and value is "ul", then flag component.
 */
function callback(args: ParseJsxElementsCbParams) {
  const { jsx, sourceFile, path } = args;

  searchAndProcessComponent({
    jsx,
    componentName: 'VStack',
    callback: (propName, propValue) => {
      if (propName === 'as' && propValue === 'ul') {
        const hyperlink = getTerminalHyperlink(jsx, path);
        output.warn({
          title: `${sourceFile.getBaseName()} has a VStack component that is of type "ul". It may be impacted by this change. Please verify here: ${hyperlink} (<- cmd + click)`,
        });

        // write output to file for easy parsing
        generateManualMigrationOutput(
          `* VStack "ul" component detected. Manually verify style changes here: ${path}" `,
        );
      }
    },
  });
}

const filterSourceFiles = (path: string) => {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  if (
    checkHasImport(sourceContent, ['@cbhq/cds-web/layout/VStack', '@cbhq/cds-web/alpha/VStack'])
  ) {
    return true;
  }
  return false;
};

export default async function migrations(tree: Tree) {
  logNote('Identifying code that could potential fail with Vstack A11y change');
  await createJsxMigration({
    tree,
    filterSourceFiles,
    callback,
  });
}
