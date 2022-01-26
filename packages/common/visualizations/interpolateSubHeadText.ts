import { ChartSubHead } from '../types/ChartHeaderBaseProps';

export const interpolateSubHeadText = (subHead: ChartSubHead) => {
  if (subHead.priceChange && subHead.percent) {
    return `${subHead.priceChange} (${subHead.percent})`;
  }
  if (subHead.priceChange) {
    return subHead.priceChange;
  }
  return '';
};
