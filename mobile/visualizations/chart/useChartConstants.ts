import { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { useSpacingScale } from '../../hooks/useSpacingScale';

const chart = 320;
const chartCompact = 120;

type Props = {
  compact?: boolean;
  isChartHeightExperiment?: boolean;
};

export function useChartConstants({ compact = false, isChartHeightExperiment = false }: Props) {
  const spacing = useSpacingScale();
  return useMemo(() => {
    const chartHorizontalGutter = spacing[gutter];
    const chartWidth = Dimensions.get('screen').width - chartHorizontalGutter * 2;
    const chartHeight = compact || isChartHeightExperiment ? chartCompact : chart;
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
  }, [compact, spacing, isChartHeightExperiment]);
}
