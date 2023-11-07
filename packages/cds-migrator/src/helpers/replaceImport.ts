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

/** Note! If you want to catch shallow imports, you'll have to pass a namedImport */
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

  declarations.forEach((declaration) => {
    const currentPath = declaration.getModuleSpecifierValue();
    // Check if the file imports from an old path
    if (currentPath.startsWith(oldPath)) {
      const namedImports = declaration.getNamedImports();
      // check if the file imports the desired namedImport from the old path. this makes this work for shallow imports
      if (namedImport) {
        if (namedImports.map((imp) => imp.getText()).includes(namedImport)) {
          // check if there's already an import from the new path
          const existingImport = declarations.find(
            (imp) => imp.getModuleSpecifierValue() === newPath,
          );
          //   if there is, add the new namedImport
          if (existingImport) {
            existingImport.addNamedImport(newNamedImport ?? namedImport);
          } else {
            // add a new import declaration with the new path
            addNewModuleImport(sourceFile, newNamedImport ?? namedImport, newPath);
          }
          //   now we need to clean up our old import statement
          // if there are multiple namedImports, remove the one we're replacing
          if (namedImports.length > 1) {
            namedImports.find((imp) => imp.getText() === namedImport)?.remove();
          }
          //   if there's only one namedImport, remove the whole import statement
          else {
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
