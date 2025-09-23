/**
 * checkHasImport looks for specific import paths in source content.
 *
 * @param sourceContent Content of JSX file
 * @param importPaths array of import paths to search for
 * @returns boolean --> true if import path is found in the source content of that file
 */

export function checkHasImport(sourceContent: string, importPaths: string[]) {
  return importPaths.some(
    (importPath) => sourceContent.includes(importPath) || sourceContent.includes(importPath),
  );
}
