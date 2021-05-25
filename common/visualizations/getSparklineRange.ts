import { borderWidth } from '../tokens/border';

export const getSparklineRange = ({ height, width }: { height: number; width: number }) => {
  const xRange = [borderWidth.sparkline, width - borderWidth.sparkline];
  const yRange = [height - borderWidth.sparkline, borderWidth.sparkline];
  return { xRange, yRange };
};
