import { useCallback } from 'react';
import { curveBasis, line } from 'd3-shape';

import {
  SparklineGeneratorParams,
  useSparklinePathGenerator,
  UseSparklinePathParams,
} from './useSparklinePathGenerator';

export const useSparklinePath = (props: UseSparklinePathParams) => {
  const generator = useCallback(({ xFunction, yFunction, data }: SparklineGeneratorParams) => {
    return (
      line<number>()
        .curve(curveBasis)
        .x((_, i) => xFunction(i))
        .y((y) => yFunction(y))(data) ?? ''
    );
  }, []);

  return useSparklinePathGenerator({ generator, ...props });
};
