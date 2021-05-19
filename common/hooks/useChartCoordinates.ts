import { useMemo } from 'react';

import { bisector, extent } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';

import { borderWidth } from '../tokens/border';
import { ChartData, ChartDataPoint } from '../types';

export type UseChartCoordinatesParams = {
  data: ChartData;
  width: number;
  height: number;
};

export const useChartCoordinates = ({ data, width, height }: UseChartCoordinatesParams) => {
  return useMemo(() => {
    const xRange = [borderWidth.sparkline, width - borderWidth.sparkline];
    const yRange = [height - borderWidth.sparkline, borderWidth.sparkline];
    const xDomain = extent(data, item => item.date) as [Date, Date];
    const xFunction = scaleTime() // the x-axis is date
      .domain(xDomain)
      .range(xRange);

    const yDomain = extent(data, item => item.value) as [number, number];
    const yFunction = scaleLinear() // the y-axis is value
      .domain(yDomain)
      .range(yRange);

    const createSparkline = line<ChartDataPoint>()
      .x(item => xFunction(item.date))
      .y(item => yFunction(item.value));

    // Bisector goes from x coordinate to index of data array
    const bisect = bisector((item: { date: Date }) => item.date).left;
    const getMarker = (xPos: number) => {
      const date = xFunction.invert(xPos);
      const idx = bisect(data, date);
      const point = data[idx];
      if (!point) {
        return;
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
      path: createSparkline(data) ?? '',
      getMarker,
    };
  }, [data, height, width]);
};
