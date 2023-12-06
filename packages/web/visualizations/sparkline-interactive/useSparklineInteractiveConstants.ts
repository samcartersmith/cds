import { useMemo } from 'react';
// eslint-disable-next-line no-restricted-imports
import { borderWidth } from '@cbhq/cds-common/tokens/borderWidth';
import {
  chartCompactHeight,
  chartHeight as chartHeightToken,
} from '@cbhq/cds-common/tokens/sparkline';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

/**
 * @deprecated this component will be removed from CDS in v6.0.0. It has been moved to cds-web-sparkline.
 */
export function useSparklineInteractiveConstants() {
  const { width: chartWidth, compact } = useSparklineInteractiveContext();

  return useMemo(() => {
    const chartHeight = compact ? chartCompactHeight : chartHeightToken;
    const xRange = [borderWidth.sparkline, chartWidth - borderWidth.sparkline];
    const yRange = [chartHeight - borderWidth.sparkline, borderWidth.sparkline];
    const startX = 0;
    const endX = xRange[1];

    return {
      chartWidth,
      chartHeight,
      chartDimensionStyles: {
        height: chartHeight,
        width: chartWidth,
      },
      xRange,
      yRange,
      startX,
      endX,
    };
  }, [chartWidth, compact]);
}
