import { getImportAlias } from './getImportAlias';
import { AttributeValueRenameMapShape, JsxElementType } from './types';

export type ParseComponentsType = {
  renameMap: AttributeValueRenameMapShape;
  jsx: JsxElementType;
};

/**
 * Get the name of a Component from a JSXElement
 * Even works for components that use import aliases!
 */
export function getComponentName({ renameMap, jsx }: ParseComponentsType) {
  // Component display name
  let componentType = jsx.getTagNameNode().getText();

  const importAlias = getImportAlias({
    componentType,
    componentNames: Object.keys(renameMap),
    jsx,
  });

  if (importAlias) {
    componentType = importAlias;
  }

  return componentType;
}
