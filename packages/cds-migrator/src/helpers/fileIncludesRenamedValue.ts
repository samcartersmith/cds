import { AttributeValueRenameMapShape } from './types';

export function fileIncludesRenamedValue(
  sourceContent: string,
  renameMap: AttributeValueRenameMapShape,
) {
  const renamedValues = Object.keys(Object.values(renameMap).map((val) => val.valueMap));
  return renamedValues.some((val) => sourceContent.includes(val));
}
