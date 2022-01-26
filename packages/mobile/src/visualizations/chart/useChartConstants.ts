import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { borderWidth } from '@cbhq/cds-common/src/tokens/border';
import { gutter } from '@cbhq/cds-common/src/tokens/sizing';
import {
  chartCompactHeight,
  chartHeight as chartHeightToken,
} from '@cbhq/cds-common/src/tokens/sparkline';

import { useSpacingScale } from '../../hooks/useSpacingScale';

type Props = {
  compact?: boolean;
};

export function useChartConstants({ compact = false }: Props) {
  const spacing = useSpacingScale();
  const { width: screenWidth } = useWindowDimensions();

  return useMemo(() => {
    const chartHorizontalGutter = spacing[gutter];
    const chartWidth = screenWidth - chartHorizontalGutter * 2;
    const chartHeight = compact ? chartCompactHeight : chartHeightToken;
    const chartMarkerSize = spacing[2];
    const chartMinMaxLabelHeight = spacing[3];
    const chartMinMaxVerticalGutter = spacing[0.5];
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
      chartMinMaxLabelHeight,
      chartMinMaxVerticalGutter,
      chartVerticalLineWidth,
      xRange,
      yRange,
      startX,
      endX,
    };
  }, [compact, screenWidth, spacing]);
}
