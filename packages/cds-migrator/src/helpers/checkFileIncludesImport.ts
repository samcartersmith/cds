import { SourceFile } from 'ts-morph';

/**
 * Check if a file includes an import statement from a given path
 * By default it uses shallow routing, but can be configured to check for deep imports
 * @param sourceFile - The ts-morph SourceFile to check
 * @param path - A path or array of paths to check
 * @param checkHasDeepImport - If true, will check if the path declaration matches for deep import
 * @returns boolean
 */
export function checkFileIncludesImport(
  sourceFile: SourceFile,
  path: string | string[],
  checkHasDeepImport?: boolean,
): boolean {
  const declarations = sourceFile.getImportDeclarations();
  return declarations.some((declaration) => {
    const importPath = declaration.getModuleSpecifierValue();
    if (Array.isArray(path)) {
      if (checkHasDeepImport) {
        return path.some((p) => importPath === p);
      }
      return path.some((p) => importPath.includes(p));
    }
    if (typeof path === 'string') {
      if (checkHasDeepImport) {
        return importPath === path;
      }
      return importPath.includes(path);
    }
    return false;
  });
}
