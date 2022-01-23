import { useMemo } from 'react';

import { bisector, extent } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { area, line } from 'd3-shape';

import { ChartData, ChartDataPoint } from '../types';
import { getSparklineRange } from './getSparklineRange';

export type UseSparklineCoordinatesParams = {
  data: ChartData;
  width: number;
  height: number;
  yAxisScalingFactor?: number;
};

export const useSparklineCoordinates = ({
  data,
  width,
  height,
  yAxisScalingFactor,
}: UseSparklineCoordinatesParams) => {
  return useMemo(() => {
    const { xRange, yRange } = getSparklineRange({ height, width, yAxisScalingFactor });
    const xDomain = extent(data, (item) => item.date) as [Date, Date];
    const xFunction = scaleTime() // the x-axis is date
      .domain(xDomain)
      .range(xRange);

    const yDomain = extent(data, (item) => item.value) as [number, number];
    const yFunction = scaleLinear() // the y-axis is value
      .domain(yDomain)
      .range(yRange);

    const createSparklinePath = line<ChartDataPoint>()
      .x((item) => xFunction(item.date))
      .y((item) => yFunction(item.value));

    const createSparklineArea = area<ChartDataPoint>()
      .x((item) => xFunction(item.date))
      .y0(height)
      .y1((item) => yFunction(item.value));

    // Bisector goes from x coordinate to index of data array
    const bisect = bisector((item: { date: Date }) => item.date).left;
    const getMarker = (xPos: number) => {
      const date = xFunction.invert(xPos);
      const idx = bisect(data, date);
      const point = data[idx];
      if (!point) {
        return undefined;
      }
      return {
        x: xFunction(point.date),
        y: yFunction(point.value),
        ...point,
      };
    };

    return {
      xFunction,
      yFunction,
      path: createSparklinePath(data) ?? '',
      area: createSparklineArea(data) ?? '',
      getMarker,
    };
  }, [data, height, width, yAxisScalingFactor]);
};
