import type { NodeWithMetadata } from '../helpers/fetchIllustrationLibrary';

import { getSvgData } from '../helpers/image/getSvgData';

export function hasEmptyPaths(item: NodeWithMetadata) {
  return getSvgData(item).paths.length === 0;
}
