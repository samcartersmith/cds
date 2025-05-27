import { SourceFile } from 'ts-morph';

const addNewModuleImport = (sourceFile: SourceFile, namedImport: string, newPath: string) => {
  const declarations = sourceFile.getImportDeclarations();
  const existingImport = declarations.find((imp) => imp.getModuleSpecifierValue() === newPath);
  if (existingImport) {
    existingImport.addNamedImport(namedImport);
  } else {
    sourceFile.addImportDeclaration({
      moduleSpecifier: newPath,
      namedImports: [namedImport],
    });
  }
};

/**
 * Replace an import with a new path in a source file. If a namedImport is specified, only the import matching
 * both the oldPath and the namedImport will be replaced. This allows for selective refactoring of imports.
 * If the namedImport is also being renamed, specify the new name with newNamedImport.
 *
 * @param {SourceFile} sourceFile - The source file to refactor.
 * @param {string} oldPath - The current import path to replace.
 * @param {string} newPath - The new import path to use.
 * @param {string} [namedImport] - The specific import to replace (for shallow imports).
 * @param {string} [newNamedImport] - The new name for the named import if it is being renamed.
 */
export const replaceImport = ({
  sourceFile,
  oldPath,
  newPath,
  namedImport,
  newNamedImport,
}: {
  sourceFile: SourceFile;
  oldPath: string;
  newPath: string;
  /**
   * Will only replace a file path is desired namedImport is imported from said path
   * Makes it possible to migrate shallowly imported namedImports
   */
  namedImport?: string;
  /** If you want to rename the namedImport, pass the new name here */
  newNamedImport?: string;
}) => {
  const declarations = sourceFile.getImportDeclarations();
  const existingNewImportDeclaration = declarations.find(
    (imp) => imp.getModuleSpecifierValue() === newPath,
  );

  declarations.forEach((declaration) => {
    const currentPath = declaration.getModuleSpecifierValue();
    // Check if the file imports from an old path
    if (currentPath.startsWith(oldPath) && currentPath !== newPath) {
      const namedImports = declaration.getNamedImports();
      // check if the file imports the old namedImport from the old path. this makes this work for shallow imports
      if (namedImport) {
        const oldNamedImport = namedImports?.find((imp) => imp.getText() === namedImport);
        if (oldNamedImport) {
          // check if there's already an import declaration from the new path
          //   if there is, add the new namedImport
          if (existingNewImportDeclaration) {
            // if the new namedImport is already there, don't add it again
            const hasNewNamedImportAlready = existingNewImportDeclaration
              .getNamedImports()
              ?.find((imp) => imp.getText() === newNamedImport);
            // if the old namedImport is already there, don't add it again
            const hasOldNamedImportAlready = existingNewImportDeclaration
              .getNamedImports()
              ?.find((imp) => imp.getText() === namedImport);
            if (!hasNewNamedImportAlready && newNamedImport) {
              // add the new import to the existing import declaration
              existingNewImportDeclaration.addNamedImport(newNamedImport);
            } else if (!hasOldNamedImportAlready && namedImport) {
              // add the old import to the existing import declaration
              existingNewImportDeclaration.addNamedImport(namedImport);
            }
          } else {
            // add a new import declaration with the new path
            addNewModuleImport(sourceFile, newNamedImport ?? namedImport, newPath);
          }
          // now we need to clean up our old import statement
          // if there are multiple namedImports, remove the one we're replacing
          if (namedImports.length > 1) {
            namedImports.find((imp) => imp.getText() === namedImport)?.remove();
          }
          //   if there's only one namedImport, and the new import doesn't have the same path, remove the whole import statement
          else if (currentPath !== newPath) {
            declaration.remove();
          }
        }
        // otherwise, if you trust deep imports will catch every instance, just replace the path
      } else if (currentPath === oldPath) {
        declaration.setModuleSpecifier(newPath);
      }
    }
  });
};
