import { borderWidth } from '../tokens/border';

export const getSparklineRange = ({
  height,
  width,
  yAxisScalingFactor = 1.0,
}: {
  height: number;
  width: number;
  yAxisScalingFactor?: number;
}) => {
  const xRange = [borderWidth.sparkline, width - borderWidth.sparkline];
  const yRange = [
    (height - borderWidth.sparkline) * yAxisScalingFactor,
    borderWidth.sparkline / yAxisScalingFactor,
  ];
  return { xRange, yRange };
};
