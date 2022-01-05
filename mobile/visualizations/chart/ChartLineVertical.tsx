import React, { memo, useMemo } from 'react';
import { Animated as RNAnimated, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';
import { maskOpacity } from '@cbhq/cds-common/tokens/sparkline';
import { ChartLineVerticalProps } from '@cbhq/cds-common/types/InteractiveSparklineBaseProps';
import { usePalette } from '../../hooks/usePalette';

import { useChartContext } from './ChartProvider';
import { useChartConstants } from './useChartConstants';
import { useChartLineStyles } from './useChartLineStyles';

type ChartLineVerticalMobileProps = ChartLineVerticalProps & {
  showHoverDate: boolean;
};

export const ChartLineVertical = memo(({ color, showHoverDate }: ChartLineVerticalMobileProps) => {
  const { markerOpacity } = useChartContext();

  return (
    <RNAnimated.View style={[styles.wrapper, { opacity: markerOpacity }]} pointerEvents="none">
      <ChartDottedLine color={color} showHoverDate={showHoverDate} />
    </RNAnimated.View>
  );
});

const ChartDottedLine = memo(({ color, showHoverDate }: ChartLineVerticalMobileProps) => {
  const colors = usePalette();
  const { markerXPosition, compact } = useChartContext();
  const { lineProps } = useChartLineStyles();
  const { chartHeight, chartMinMaxLabelHeight, chartVerticalLineWidth, chartWidth } =
    useChartConstants({ compact });

  const dottedLineHeight = chartHeight + chartMinMaxLabelHeight * (showHoverDate ? 1 : 2);
  const lineStyles = useMemo(() => {
    return {
      width: chartVerticalLineWidth,
      height: dottedLineHeight,
      top: showHoverDate ? 0 : -chartMinMaxLabelHeight,
      zIndex: 2,
      transform: [
        {
          translateX: markerXPosition,
        },
      ],
    };
  }, [
    chartMinMaxLabelHeight,
    chartVerticalLineWidth,
    dottedLineHeight,
    markerXPosition,
    showHoverDate,
  ]);

  const maskStyles = useMemo(() => {
    return {
      ...StyleSheet.absoluteFillObject,
      height: dottedLineHeight,
      width: chartWidth,
      top: showHoverDate ? 0 : -chartMinMaxLabelHeight,
      backgroundColor: colors.background,
      opacity: maskOpacity,
      zIndex: 1,
      transform: [
        {
          translateX: markerXPosition,
        },
      ],
    };
  }, [
    chartMinMaxLabelHeight,
    chartWidth,
    colors.background,
    dottedLineHeight,
    markerXPosition,
    showHoverDate,
  ]);

  return (
    <>
      <Animated.View style={lineStyles}>
        <Svg>
          <Line {...lineProps} stroke={color} y2={dottedLineHeight} />
        </Svg>
      </Animated.View>
      <Animated.View style={maskStyles} />
    </>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
});
