import { output, Tree } from '@nrwl/devkit';
import fs from 'node:fs';
import { SourceFile } from 'ts-morph';

import {
  checkHasImport,
  getTerminalHyperlink,
  JsxElementType,
  logStartTask,
  parseJsxElements,
  parseSourceFiles,
  searchAndProcessComponent,
  TransformFnType,
} from '../../helpers/index';

/*
 * If JSX Element is VStack, then get attributes.
 * If attribute "as" present and value is "ul", then flag component.
 */
function handleIdentifiedComponent(jsx: JsxElementType, sourceFile: SourceFile) {
  searchAndProcessComponent({
    jsx,
    componentName: 'VStack',
    callback: (propName, propValue) => {
      if (propName === 'as' && propValue === '"ul"') {
        const hyperlink = getTerminalHyperlink(jsx, sourceFile);
        output.warn({
          title: `${sourceFile.getBaseName()} has a VStack component that is of type "ul". It may be impacted by this change. Please verify here: ${hyperlink} (<- cmd + click)`,
        });
      }
    },
  });
}

function identifyVstackUL(args: TransformFnType) {
  const { path } = args;
  const sourceContent = fs.readFileSync(path, 'utf-8');

  if (
    !checkHasImport(sourceContent, ['@cbhq/cds-web/layout/VStack', '@cbhq/cds-web/layout/VStack'])
  ) {
    return;
  }
  // parsing all JSX elements of file with VStack import
  parseJsxElements({
    ...args,
    callback: handleIdentifiedComponent,
  });
}

export default async function flagPotentialStyleChange(tree: Tree) {
  logStartTask('Identifying code that could potential fail with Vstack A11y change');

  await parseSourceFiles(tree, identifyVstackUL);
}
