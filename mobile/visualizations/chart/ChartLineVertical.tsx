import React, { FunctionComponent, memo, useMemo } from 'react';
import { Animated as RNAnimated, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';
import { usePalette } from '../../hooks/usePalette';

import { useChartContext } from './ChartProvider';
import { useChartConstants } from './useChartConstants';
import { useChartLineStyles } from './useChartLineStyles';

type Props = {
  isChartHeightExperiment?: boolean;
};
export const ChartLineVertical: FunctionComponent<Props> = memo(({ isChartHeightExperiment }) => {
  const { markerOpacity } = useChartContext();

  return (
    <RNAnimated.View style={[styles.wrapper, { opacity: markerOpacity }]} pointerEvents="none">
      <ChartDottedLine isChartHeightExperiment={isChartHeightExperiment} />
    </RNAnimated.View>
  );
});

const ChartDottedLine: FunctionComponent<Props> = memo(({ isChartHeightExperiment }) => {
  const colors = usePalette();
  const { markerXPosition, compact } = useChartContext();
  const { lineProps } = useChartLineStyles();
  const { chartHeight, chartMinMaxLabelHeight, chartVerticalLineWidth, chartWidth } =
    useChartConstants({ compact, isChartHeightExperiment });

  const dottedLineHeight = chartHeight + chartMinMaxLabelHeight * 2;
  const lineStyles = useMemo(() => {
    return {
      width: chartVerticalLineWidth,
      height: dottedLineHeight,
      top: -chartMinMaxLabelHeight,
      zIndex: 2,
      transform: [
        {
          translateX: markerXPosition,
        },
      ],
    };
  }, [chartMinMaxLabelHeight, chartVerticalLineWidth, dottedLineHeight, markerXPosition]);

  const maskStyles = useMemo(() => {
    return {
      ...StyleSheet.absoluteFillObject,
      height: dottedLineHeight,
      width: chartWidth,
      top: -chartMinMaxLabelHeight,
      backgroundColor: colors.background,
      opacity: 0.8,
      zIndex: 1,
      transform: [
        {
          translateX: markerXPosition,
        },
      ],
    };
  }, [chartMinMaxLabelHeight, chartWidth, colors.background, dottedLineHeight, markerXPosition]);

  return (
    <>
      <Animated.View style={lineStyles}>
        <Svg>
          <Line {...lineProps} stroke={colors.foregroundMuted} y2={dottedLineHeight} />
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
