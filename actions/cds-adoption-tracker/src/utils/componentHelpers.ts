import { type JsxAttributeLike, type SourceFile, SyntaxKind } from 'ts-morph';

import { type ComponentImportStat } from '../types';

export function getExternalComponentImportStats(
  sourceFile: SourceFile,
  packageJsonDependencies: Set<unknown>,
  cdsVersions: Record<string, string>,
): ComponentImportStat[] {
  const sourceFileText = sourceFile.getText();
  const importStats: ComponentImportStat[] = [];
  const importDeclarations = sourceFile.getImportDeclarations();

  for (const importDecl of importDeclarations) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    const packageName = moduleSpecifier.startsWith('@')
      ? moduleSpecifier.split('/').slice(0, 2).join('/')
      : moduleSpecifier.split('/')[0];

    // only return imports from external packages
    if (!packageJsonDependencies.has(packageName)) {
      continue;
    }

    const defaultImport = importDecl.getDefaultImport();
    const version = cdsVersions[packageName]?.replace('^', '');

    // get default import
    if (defaultImport && sourceFileText.includes('<' + defaultImport.getText())) {
      importStats.push({
        name: defaultImport.getText(),
        importPath: packageName,
        version,
      });
    }

    // get named imports
    const namedImports = importDecl.getNamedImports();
    for (const namedImport of namedImports) {
      const name = namedImport.getName();
      const alias = namedImport.getAliasNode()?.getText();
      if (sourceFileText.includes('<' + name)) {
        importStats.push({
          name,
          importPath: packageName,
          version,
        });
      } else if (alias && sourceFileText.includes('<' + alias)) {
        importStats.push({
          name,
          alias,
          importPath: packageName,
          version,
        });
      }
    }
  }
  return importStats;
}

export function isPresentationalComponent(
  importStat: ComponentImportStat,
  sourceFile: SourceFile,
): boolean {
  const attributes: Array<{ name: string; value: string }> = [];

  // ignore internal dependencies
  if (
    importStat.importPath.startsWith('@cbhq/') ||
    importStat.importPath.startsWith('@coinbase/')
  ) {
    return false;
  }

  // Find all JSX elements with the given name
  sourceFile.forEachDescendant((node) => {
    let attributesLike: JsxAttributeLike[] = [];
    if (node.getKind() === SyntaxKind.JsxElement) {
      const jsxElement = node.asKind(SyntaxKind.JsxElement);
      const openingElement = jsxElement?.getOpeningElement();

      if (
        openingElement?.getTagNameNode().getText() === importStat.name ||
        openingElement?.getTagNameNode().getText() === importStat.alias
      ) {
        attributesLike = openingElement?.getAttributes() ?? [];
      }
    } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
      const jsxElement = node.asKind(SyntaxKind.JsxSelfClosingElement);
      if (
        jsxElement?.getTagNameNode().getText() === importStat.name ||
        jsxElement?.getTagNameNode().getText() === importStat.alias
      ) {
        attributesLike = jsxElement?.getAttributes() ?? [];
      }
    }

    for (const attribute of attributesLike) {
      if (attribute.getKind() === SyntaxKind.JsxAttribute) {
        const jsxAttribute = attribute.asKindOrThrow(SyntaxKind.JsxAttribute);
        const name = jsxAttribute.getNameNode().getText();
        const initializer = jsxAttribute.getInitializer();
        const value = initializer ? initializer.getText() : '';

        attributes.push({ name, value });
      }
    }
  });
  return attributes.length > 0;
}

const illustrationComponents = [
  'HeroSquare',
  'SpotSquare',
  'Pictogram',
  'SpotRectangle',
  'SpotIcon',
];

/**
 * Returns the `name` prop values for CDS illustration components.
 * If the import is not an illustration component, returns an empty array.
 */
export function getIllustrationNames(
  importStat: ComponentImportStat,
  sourceFile: SourceFile,
): string[] {
  if (!illustrationComponents.includes(importStat.name)) {
    return [];
  }

  const names: string[] = [];

  sourceFile.forEachDescendant((node) => {
    let attributesLike: JsxAttributeLike[] = [];

    if (node.getKind() === SyntaxKind.JsxElement) {
      const jsxElement = node.asKind(SyntaxKind.JsxElement);
      const openingElement = jsxElement?.getOpeningElement();

      if (
        openingElement?.getTagNameNode().getText() === importStat.name ||
        openingElement?.getTagNameNode().getText() === importStat.alias
      ) {
        attributesLike = openingElement?.getAttributes() ?? [];
      }
    } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
      const jsxElement = node.asKind(SyntaxKind.JsxSelfClosingElement);

      if (
        jsxElement?.getTagNameNode().getText() === importStat.name ||
        jsxElement?.getTagNameNode().getText() === importStat.alias
      ) {
        attributesLike = jsxElement?.getAttributes() ?? [];
      }
    }

    for (const attribute of attributesLike) {
      if (attribute.getKind() === SyntaxKind.JsxAttribute) {
        const jsxAttribute = attribute.asKindOrThrow(SyntaxKind.JsxAttribute);

        if (jsxAttribute.getNameNode().getText() === 'name') {
          const initializer = jsxAttribute.getInitializer();
          if (initializer) {
            const value = initializer.getText().replace(/['"{}]/g, '');
            if (value) {
              names.push(value);
            }
          }
        }
      }
    }
  });

  return names;
}
