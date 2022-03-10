import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import {
  chartCompactHeight,
  chartHeight as chartHeightToken,
} from '@cbhq/cds-common/tokens/sparkline';

import { useSpacingScale } from '../../hooks/useSpacingScale';

type Props = {
  compact?: boolean;
};

export function useSparklineInteractiveConstants({ compact = false }: Props) {
  const spacing = useSpacingScale();
  const { width: screenWidth } = useWindowDimensions();

  return useMemo(() => {
    const chartHorizontalGutter = spacing[gutter];
    const chartWidth = screenWidth - chartHorizontalGutter * 2;
    const chartHeight = compact ? chartCompactHeight : chartHeightToken;
    const chartMarkerSize = spacing[2];
    const SparklineInteractiveMinMaxLabelHeight = spacing[3];
    const SparklineInteractiveMinMaxVerticalGutter = spacing[0.5];
    const chartVerticalLineWidth = borderWidth.sparkline;
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
  }, [compact, screenWidth, spacing]);
}
