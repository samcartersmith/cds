import { NodeResponseWithMetadata } from '@cbhq/figma-api';

import { getSvgData } from '../helpers/image/getSvgData';

export function hasInvalidFillRule(node: NodeResponseWithMetadata) {
  return getSvgData(node).paths.some((item) => {
    return item.fillRule !== 'nonzero';
  });
}
