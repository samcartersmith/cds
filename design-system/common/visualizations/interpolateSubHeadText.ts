import { SparklineInteractiveSubHead } from '../types/SparklineInteractiveHeaderBaseProps';

export const interpolateSubHeadText = (subHead: SparklineInteractiveSubHead) => {
  if (subHead.priceChange && subHead.percent) {
    return `${subHead.priceChange} (${subHead.percent})`;
  }
  if (subHead.priceChange) {
    return subHead.priceChange;
  }
  return '';
};
