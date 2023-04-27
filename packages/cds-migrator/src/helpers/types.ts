import { JsxOpeningElement, JsxSelfClosingElement } from 'ts-morph';

export type RenameMap = Record<string, string>;

export type RenameValueMapShape = {
  attribute: string;
  valueMap: RenameMap;
};

export type RenameAttributeMapShape = {
  oldAttribute: string;
  newAttribute: string;
};

export type AttributeValueRenameMapShape = Record<string, RenameValueMapShape>;
export type AttributeRenameMapShape = Record<string, RenameAttributeMapShape>;

export type JsxElementType = JsxSelfClosingElement | JsxOpeningElement;

// Makes all properties visible when hovering over the type
export type Expand<T extends Record<string, unknown>> = { [P in keyof T]: T[P] };

export type ComponentType = Extract<keyof AttributeValueRenameMapShape, string>;

export type FindReplaceCallbackParams = {
  attribute: RenameValueMapShape['attribute'];
  updateMap: RenameValueMapShape['valueMap'];
  jsx: JsxElementType;
};
export type FindReplaceCallbackReturnType = Partial<RenameMap> &
  Partial<
    Record<
      'details',
      {
        attributeToUpdate?: string;
        stringLiteral?: string;
        jsxExpressionIdentifier?: string;
      }
    >
  >;

export type PropToAttributeValue = {
  oldAttribute: string;
  newAttribute: string;
  value: string;
};
export type PropToAttributeValueMigrationShape = Record<string, PropToAttributeValue>;
