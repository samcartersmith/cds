import { RenameValueMapShape } from './types';

/** basically find and replace an attribute or value within a component for the entire file.
 * Use with caution and require a manual check
 */
export function findReplaceInFile(content: string, renameMap: RenameValueMapShape) {
  let newContent = content;
  Object.values(renameMap).forEach((namesMap) => {
    for (const [oldName, newName] of Object.entries(namesMap)) {
      newContent = content.replaceAll(oldName, newName);
    }
  });

  return newContent;
}
