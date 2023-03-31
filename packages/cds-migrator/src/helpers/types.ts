import { JsxOpeningElement, JsxSelfClosingElement } from 'ts-morph';

export type RenameMap = Record<string, string>;

export type RenameValueMapShape = {
  attribute: string;
  valueMap: RenameMap;
};

export type AttributeValueRenameMapShape = Record<string, RenameValueMapShape>;

export type JsxElementType = JsxSelfClosingElement | JsxOpeningElement;
