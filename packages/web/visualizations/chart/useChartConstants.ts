import { useMemo } from 'react';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import {
  chartCompactHeight,
  chartHeight as chartHeightToken,
} from '@cbhq/cds-common/tokens/sparkline';

import { useChartContext } from './ChartProvider';

export function useChartConstants() {
  const { width: chartWidth, compact } = useChartContext();

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
