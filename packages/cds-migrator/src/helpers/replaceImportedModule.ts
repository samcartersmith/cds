import { SourceFile } from 'ts-morph';

/**
 * Replace a named imported module with a new one from a given path
 * If you want to update the path for the import use replaceImportPath
 * @param sourceFile - the source file to update
 * @param oldValue - the old module name
 * @param newValue - the new module name
 * @param path - the path to the module
 */
export const replaceImportedModule = ({
  sourceFile,
  oldValue,
  newValue,
  path,
}: {
  sourceFile: SourceFile;
  oldValue: string;
  newValue: string;
  path: string;
}) => {
  const declarations = sourceFile.getImportDeclarations();
  declarations.forEach((importPath) => {
    // find the right import statement
    if (importPath.getModuleSpecifierValue() === path) {
      const namedImports = importPath.getNamedImports();
      // remove the old import
      namedImports.forEach((namedImport) => {
        if (namedImport.getText() === oldValue) {
          namedImport.remove();
          //   replace it with the new imported module
          importPath.addNamedImport(newValue);
        }
      });
    }
  });
};
