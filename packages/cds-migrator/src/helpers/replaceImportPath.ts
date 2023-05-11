import { SourceFile } from 'ts-morph';

export const replaceImportPath = ({
  sourceFile,
  oldPath,
  newPath,
}: {
  sourceFile: SourceFile;
  oldPath: string;
  newPath: string;
}) => {
  // Check if the file contains any of the import statements
  const declarations = sourceFile.getImportDeclarations();

  declarations.forEach((importPath) => {
    const currentPath = importPath.getModuleSpecifierValue();

    if (oldPath === currentPath) {
      importPath.setModuleSpecifier(newPath);
    }
  });
};
