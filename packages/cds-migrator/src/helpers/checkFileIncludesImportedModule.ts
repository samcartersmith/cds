import { SourceFile } from 'ts-morph';

/**
 * Check if a file includes a given imported module
 * If you want to update the path for the import use replaceImportPath
 * @param sourceFile - the source file to update
 * @param module - the imported module you are trying to find
 * @param path - the path to the module
 */
export const checkFileIncludesImportedModule = ({
  sourceFile,
  module,
  path,
}: {
  sourceFile: SourceFile;
  module: string;
  path: string;
}): boolean => {
  const importPath = sourceFile
    .getImportDeclarations()
    .find((declaration) => declaration.getModuleSpecifierValue() === path);
  return importPath
    ? importPath.getNamedImports().some((namedImport) => namedImport.getText() === module)
    : false;
};
