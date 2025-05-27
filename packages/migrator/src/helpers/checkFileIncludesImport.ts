import { SourceFile } from 'ts-morph';

/**
 * Check if a file includes an import statement from a given path
 * @param sourceFile - The ts-morph SourceFile to check
 * @param path - A path or array of paths to check
 * @returns boolean
 */
export function checkFileIncludesImport(sourceFile: SourceFile, path: string | string[]): boolean {
  let hasImport = false;
  const declarations = sourceFile.getImportDeclarations();
  declarations.forEach((declaration) => {
    const importPath = declaration.getModuleSpecifierValue();
    if (Array.isArray(path) && path.some((p) => importPath.startsWith(p))) {
      hasImport = true;
    }
    if (typeof path === 'string' && importPath.startsWith(path)) {
      hasImport = true;
    }
  });
  return hasImport;
}
