import { SyntaxKind } from 'ts-morph';

import { JsxElementType } from './types';

/**
 * Given JSX this will check import declarations to see if the component is imported as an alias
 * If you want to get an import alias' real module name, use getImportAliasRealModuleName
 * @param jsx - The JSX element to check
 * @returns boolean
 */
export function checkHasImportAlias(jsx: JsxElementType): boolean {
  const declarations = jsx
    .getFirstDescendantByKind(SyntaxKind.Identifier)
    ?.getSymbol()
    ?.getDeclarations();

  /** If declaration.compilerNode.propertyName is present, it has an import alias */
  return declarations
    ? declarations.some((declaration) => declaration.compilerNode?.propertyName?.escapedText)
    : false;
}
