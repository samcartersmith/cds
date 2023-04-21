import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { borderWidth } from '@cbhq/cds-common/tokens/borderWidth';
import {
  chartCompactHeight,
  chartHeight as chartHeightToken,
} from '@cbhq/cds-common/tokens/sparkline';
import { useSpacingScale } from '@cbhq/cds-mobile/hooks/useSpacingScale';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

type Props = {
  compact?: boolean;
};

export function useSparklineInteractiveConstants({ compact = false }: Props) {
  const spacing = useSpacingScale();
  const { width: screenWidth } = useWindowDimensions();
  const { gutter } = useSparklineInteractiveContext();

  return useMemo(() => {
    const chartHorizontalGutter = spacing[gutter];
    const chartWidth = screenWidth - chartHorizontalGutter * 2;
    const chartHeight = compact ? chartCompactHeight : chartHeightToken;
    const chartMarkerSize = spacing[2];
    const SparklineInteractiveMinMaxLabelHeight = spacing[3];
    const SparklineInteractiveMinMaxVerticalGutter = spacing[0.5];
    const chartVerticalLineWidth: number = borderWidth.sparkline;
    const xRange = [borderWidth.sparkline, chartWidth - borderWidth.sparkline];
    const yRange = [chartHeight - borderWidth.sparkline, borderWidth.sparkline];
    const startX = 0;
    const endX = xRange[1];

    return {
      chartHorizontalGutter,
      chartWidth,
      chartHeight,
      chartDimensionStyles: {
        height: chartHeight,
        width: chartWidth,
      },
      chartMarkerSize,
      SparklineInteractiveMinMaxLabelHeight,
      SparklineInteractiveMinMaxVerticalGutter,
      chartVerticalLineWidth,
      xRange,
      yRange,
      startX,
      endX,
    };
  }, [compact, gutter, screenWidth, spacing]);
}
