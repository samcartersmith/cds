import { getSvgData } from '../helpers/getSvgData';
import { NodeShape } from '../types';

export function hasInvalidFillRule(node: NodeShape) {
  return getSvgData(node).paths.some((item) => {
    return item.fillRule !== 'nonzero';
  });
}
