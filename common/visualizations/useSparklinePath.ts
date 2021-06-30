/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useMemo } from 'react';

import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { curveBasis, line } from 'd3-shape';

import { getSparklineRange } from './getSparklineRange';
import { largestTriangleThreeBucket } from './largestTriangleThreeBucket';

export type UseSparklinePathParams = {
  data: number[] | string[];
  height: number;
  width: number;
};

export const useSparklinePath = ({ data, height, width }: UseSparklinePathParams) => {
  const dataList = useMemo(() => data.map(Number), [data]);
  return useMemo(() => {
    const { xRange, yRange } = getSparklineRange({ height, width });
    const downsampledData = largestTriangleThreeBucket(dataList, width / 3) as [number];
    const xDomain = [0, downsampledData.length];
    const xFunction = scaleLinear().domain(xDomain).range(xRange);
    const yDomain = extent(downsampledData) as [number, number];
    const yFunction = scaleLinear().domain(yDomain).range(yRange);
    return (
      line<number>()
        .curve(curveBasis)
        .x((_, i) => xFunction(i)!)
        .y(y => yFunction(y)!)(downsampledData) ?? ''
    );
  }, [dataList, width, height]);
};
