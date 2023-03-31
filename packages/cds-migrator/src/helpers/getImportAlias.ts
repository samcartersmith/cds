import { SyntaxKind } from 'ts-morph';

import { JsxElementType } from './types';

export function getImportAlias({
  componentType,
  componentNames,
  jsx,
}: {
  componentType: string;
  /** List of "real" component names, unaliased */
  componentNames: string[];
  jsx: JsxElementType;
}): string | undefined {
  /** Import alias edge case i.e. import { HeroSquare as HeroSquareAlias } from '@cbhq/cds-web/illustrations' */
  if (!(componentType in componentNames)) {
    const declarations = jsx
      .getFirstDescendantByKind(SyntaxKind.Identifier)
      ?.getSymbol()
      ?.getDeclarations();
    if (declarations) {
      declarations.forEach((declaration) => {
        /** If declaration.compilerNode.propertyName is present, it has an import alias */
        const realModuleName = declaration.compilerNode?.propertyName?.escapedText;
        if (realModuleName && realModuleName in componentNames) {
          return realModuleName;
        }
        return undefined;
      });
    }
  }
  return undefined;
}
