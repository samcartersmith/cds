import { output } from '@nrwl/devkit';
import { SourceFile } from 'ts-morph';

import { JsxElementType } from './types';

/** getTerminalHyperlink returns a hyperlink url to the jsx element
 *
 * Use with output.success, output.warn, or output.error to show in the CLI.
 *
 * @param jsx Element you'd like to refer to
 * @param sourceFile File where the element is found
 * @returns Hyperlink text to point to the element
 */
export function getTerminalHyperlink(jsx: JsxElementType, sourceFile: SourceFile) {
  const lineNumber = jsx.getStartLineNumber(false);
  const colPos = jsx.getStartLinePos(false);
  return output.underline(`${sourceFile.getFilePath()}:${lineNumber}:${colPos}`);
}
