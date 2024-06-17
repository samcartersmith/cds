import { SourceFile } from 'ts-morph';

export function getCallSitesForComponent({
  component,
  callSiteProjectFiles,
  packageName,
  cleanPath,
}: {
  component: string;
  callSiteProjectFiles: SourceFile[];
  packageName: string;
  cleanPath: (path: string) => string;
}): string[] {
  const filteredFiles = callSiteProjectFiles
    // check if component is imported in the callsite files
    .filter((file) => {
      // check if the file imports the component (default import or named import)
      const defaultImports = file
        .getImportDeclarations()
        .filter(
          (importDeclaration) =>
            importDeclaration.getDefaultImport()?.getText() === component &&
            importDeclaration.getModuleSpecifierValue().includes(packageName),
        );
      const namedImports = file.getImportDeclarations().filter(
        (importDeclaration) =>
          importDeclaration.getModuleSpecifierValue().includes(packageName) &&
          importDeclaration.getNamedImports().some((namedImport) => {
            return namedImport.getName() === component;
          }),
      );
      // these are helpful for debugging
      // if (namedImports.length) {
      //   const importedComponents = namedImports
      //     .map((ni) => ni.getNamedImports())
      //     .map((ni) => ni.map((n) => n.getName()));
      //   const importedComponentsSources = namedImports.map((ni) => ni.getModuleSpecifierValue());
      //   console.log({
      //     namedImports: importedComponents.map((ic, idx) => ({
      //       names: ic.join(', '),
      //       source: importedComponentsSources[idx],
      //     })),
      //     component,
      //     packageName,
      //   });
      // }
      // if (defaultImports.length) {
      //   console.log({
      //     defaultImports: defaultImports.map((di) => ({
      //       name: di.getDefaultImport()?.getText(),
      //       source: di.getModuleSpecifierValue(),
      //     })),
      //     component,
      //     packageName,
      //   });
      // }
      return defaultImports.length > 0 || namedImports.length > 0;
    });
  return filteredFiles.map((file) => cleanPath(file.getFilePath()));
}
