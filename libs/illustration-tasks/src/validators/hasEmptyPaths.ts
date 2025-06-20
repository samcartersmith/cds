import { NodeResponseWithMetadata } from '@cbhq/figma-api';

import { getSvgData } from '../helpers/image/getSvgData';

export function hasEmptyPaths(item: NodeResponseWithMetadata) {
  return getSvgData(item).paths.length === 0;
}
