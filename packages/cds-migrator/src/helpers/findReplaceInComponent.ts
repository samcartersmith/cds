import { output, Tree } from '@nrwl/devkit';
import fs from 'node:fs';
import { Project } from 'ts-morph';

import { findReplaceInFile } from './findReplaceInFile';
import { parseJsxElements } from './parseJsxElements';
import {
  AttributeValueRenameMapShape,
  JsxElementType,
  RenameMap,
  RenameValueMapShape,
} from './types';
import { writeMigrationToFile } from './writeMigrationToFile';

type ComponentType = Extract<keyof AttributeValueRenameMapShape, string>;

export type FindReplaceCallbackParams = {
  attribute: RenameValueMapShape['attribute'];
  updateMap: RenameValueMapShape['valueMap'];
  jsx: JsxElementType;
};
export type FindReplaceCallbackReturnType = Partial<RenameMap> &
  Partial<
    Record<
      'details',
      {
        attributeToUpdate?: string;
        stringLiteral?: string;
        jsxExpressionIdentifier?: string;
      }
    >
  >;

type FindReplaceInComponent = {
  project: Project;
  callback: (args: FindReplaceCallbackParams) => FindReplaceCallbackReturnType;
  component: ComponentType;
  renameMap: AttributeValueRenameMapShape;
  path: string;
  tree: Tree;
  /**
   * By default this function uses ts-morph to migrate values within the renameMap,
   * however it can't find the migration it will manually find/replace text that matches.
   * This option requires you to manually check all migrations and will print locations to console
   */
  disableManualFindReplace?: boolean;
};

/**
 * Find/Replace a Component name, attribute, or value
 * Note: this will make changes to the file system
 */
export function findReplaceInComponent({
  component,
  renameMap,
  callback,
  project,
  path,
  tree,
  disableManualFindReplace,
}: FindReplaceInComponent) {
  let newContent: string | undefined;

  const sourceContent = fs.readFileSync(path, 'utf-8');
  const sourceFile = project.createSourceFile(path, sourceContent);

  const renameJsxElements = (jsx: JsxElementType) => {
    // Logging constants
    const lineNumber = jsx.getStartLineNumber(false);
    const colPos = jsx.getStartLinePos(false);
    const terminalHyperlink = output.underline(
      `${sourceFile.getFilePath()}:${lineNumber}:${colPos}`,
    );
    const manualCheckWarningText = `Please manually check changes made to ${terminalHyperlink} (<- cmd + click):`;

    function isComponentTypeWithRename(val?: string): val is ComponentType {
      if (val) return val in renameMap;
      return false;
    }

    const updateMap = renameMap[component];

    if (isComponentTypeWithRename(component)) {
      const { oldValue, newValue } = callback({
        attribute: updateMap.attribute,
        updateMap: updateMap.valueMap,
        jsx,
      });

      if (oldValue && newValue) {
        newContent = writeMigrationToFile({ oldValue, newValue, jsx, sourceFile });
      } else if (!disableManualFindReplace) {
        const warning = {
          title: manualCheckWarningText,
          bodyLines: [jsx.print()],
        };
        output.warn(warning);
        newContent = findReplaceInFile(sourceContent, updateMap);
      }
    }
  };

  parseJsxElements({ path, project, callback: renameJsxElements });

  if (newContent) {
    tree.write(path.replace(`${tree.root}/`, ''), newContent);
  }
}
