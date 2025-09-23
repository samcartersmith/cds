import fs from 'node:fs';

import { getTerminalHyperlink } from './getTerminalHyperlink';
import { logSuccess, logWarning } from './loggingHelpers';
import type { JsxElementType, RenameMap } from './types';

/**
 * Find and replace key -> value within `renameMap`
 * NOTE: this will make changes to the file system!
 * DANGER: this will modify ALL instances of the keys in `renameMap` within the `sourceFile`
 * Use this as a last resort when JSX transformations are not possible
 * @param renameMap - A map of key -> value pairs to find and replace
 * @param path - The absolute path of the sourceFile
 * @param jsx - (optional) The JSX element that you are migrating.
 */
export function findReplaceInFile({
  renameMap,
  path,
  jsx,
}: {
  renameMap: RenameMap;
  path: string;
  jsx?: JsxElementType;
}) {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  let newContent = sourceContent;

  for (const [oldValue, newValue] of Object.entries(renameMap)) {
    if (sourceContent.includes(oldValue)) {
      newContent = sourceContent.replaceAll(oldValue, newValue);
      logSuccess(`Successfully renamed ${oldValue} to ${newValue}`);
    }
  }

  fs.writeFileSync(path, newContent, 'utf-8');

  if (jsx) {
    const terminalHyperlink = getTerminalHyperlink(jsx, path);
    const manualCheckWarningText = `Please manually check changes made to ${terminalHyperlink} (<- cmd + click):`;
    logWarning(manualCheckWarningText, [jsx.print()]);
  } else {
    logWarning(`Please manually check changes made to ${path} (<- cmd + click)`);
  }
}
