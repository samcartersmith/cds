import { getSvgData } from '../helpers/getSvgData';
import { NodeShape } from '../types';

export function hasEmptyPaths(item: NodeShape) {
  return getSvgData(item).paths.length === 0;
}
