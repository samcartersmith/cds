import { borderWidth } from '../tokens/borderWidth';

export const getSparklineRange = ({
  height,
  width,
  yAxisScalingFactor = 1.0,
}: {
  height: number;
  width: number;
  yAxisScalingFactor?: number;
}) => {
  const xRange = [borderWidth[200], width - borderWidth[200]];
  const yRange = [
    Math.max(borderWidth[200] + 1, (height - borderWidth[200]) * yAxisScalingFactor),
    borderWidth[200],
  ];
  return { xRange, yRange };
};
