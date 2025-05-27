import { checkHasImportAlias } from './checkHasImportAlias';
import { getComponentName } from './getComponentName';
import { getImportAliasRealModuleName } from './getImportAliasRealModuleName';
import { JsxElementType } from './types';

/**
 * This abstracts a lot of the logic you need when parsing JSX and looking for components included in your rename map
 * It will also catch components that use import aliases
 * @param jsx - The JSX element you are parsing
 * @param componentNames - List of component display names you want to migrate. We use this to see if the component has been imported with an alias
 * @returns { component: string, actualComponentName?: string }
 */
export function getComponentFromJsx({
  jsx,
  componentNames,
}: {
  jsx: JsxElementType;
  componentNames: string[];
}): {
  component: string;
  actualComponentName?: string;
} {
  const hasImportAlias = checkHasImportAlias(jsx);
  const component = getComponentName(jsx);
  let actualComponentName: string | undefined;

  if (hasImportAlias) {
    actualComponentName = getImportAliasRealModuleName({
      componentType: component,
      componentNames,
      jsx,
    });
  }

  return {
    component,
    actualComponentName,
  };
}
