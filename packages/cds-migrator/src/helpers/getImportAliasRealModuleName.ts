import { SyntaxKind } from 'ts-morph';

import { checkHasImportAlias } from './checkHasImportAlias';
import { JsxElementType } from './types';

/**
 * Gets the actual module name for an import alias
 * @example import { Button as MyButton } from '@cbhq/cds-web/buttons';
 * Will extract Button from the import statement
 * @param componentType - display name of JSX element
 * @param List of "real" component names, unaliased
 * @param jsx - The JSX element to get the name of
 * @returns the real module name for an import alias
 */
export function getImportAliasRealModuleName({
  componentType,
  componentNames,
  jsx,
}: {
  /** @param componentType - display name of JSX element */
  componentType: string;
  /** @param List of "real" component names, unaliased */
  componentNames: string[];
  /** @param jsx - The JSX element to get the name of */
  jsx: JsxElementType;
}): string | undefined {
  if (!(componentType in componentNames)) {
    const declaration = jsx
      .getFirstDescendantByKind(SyntaxKind.Identifier)
      ?.getSymbol()
      ?.getDeclarations()[0];

    if (checkHasImportAlias(jsx) && declaration) {
      /** If declaration.compilerNode.propertyName is present, it has an import alias */
      const realModuleName = declaration.compilerNode?.propertyName?.escapedText;
      if (realModuleName && componentNames.includes(realModuleName)) {
        return realModuleName;
      }
      return undefined;
    }
  }
  return undefined;
}
