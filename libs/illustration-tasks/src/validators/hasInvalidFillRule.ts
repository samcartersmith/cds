import type { NodeWithMetadata } from '../helpers/fetchIllustrationLibrary';

import { getSvgData } from '../helpers/image/getSvgData';

export function hasInvalidFillRule(node: NodeWithMetadata) {
  return getSvgData(node).paths.some((item) => {
    return item.fillRule !== 'nonzero';
  });
}
