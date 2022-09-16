import React, { memo, useMemo } from 'react';
import { Animated as RNAnimated, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';
import { maskOpacity } from '@cbhq/cds-common/tokens/sparkline';
import { SparklineInteractiveLineVerticalProps } from '@cbhq/cds-common/types/SparklineInteractiveBaseProps';

import { usePalette } from '../../hooks/usePalette';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';
import { useSparklineInteractiveLineStyles } from './useSparklineInteractiveLineStyles';

type SparklineInteractiveLineVerticalMobileProps = SparklineInteractiveLineVerticalProps & {
  showHoverDate: boolean;
};

export const SparklineInteractiveLineVertical = memo(
  ({ color, showHoverDate }: SparklineInteractiveLineVerticalMobileProps) => {
    const { markerOpacity } = useSparklineInteractiveContext();

    return (
      <RNAnimated.View style={[styles.wrapper, { opacity: markerOpacity }]} pointerEvents="none">
        <SparklineInteractiveDottedLine color={color} showHoverDate={showHoverDate} />
      </RNAnimated.View>
    );
  },
);

const SparklineInteractiveDottedLine = memo(
  ({ color, showHoverDate }: SparklineInteractiveLineVerticalMobileProps) => {
    const colors = usePalette();
    const { markerXPosition, compact } = useSparklineInteractiveContext();
    const { lineProps } = useSparklineInteractiveLineStyles();
    const {
      chartHeight,
      SparklineInteractiveMinMaxLabelHeight,
      chartVerticalLineWidth,
      chartWidth,
    } = useSparklineInteractiveConstants({ compact });

    const dottedLineHeight =
      chartHeight + SparklineInteractiveMinMaxLabelHeight * (showHoverDate ? 1 : 2);

    const lineStyles = useMemo(() => {
      return {
        width: chartVerticalLineWidth,
        height: dottedLineHeight,
        top: showHoverDate ? 0 : -SparklineInteractiveMinMaxLabelHeight,
        zIndex: 2,
      };
    }, [
      SparklineInteractiveMinMaxLabelHeight,
      chartVerticalLineWidth,
      dottedLineHeight,
      showHoverDate,
    ]);

    const animatedTranslateX = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: markerXPosition.value,
        },
      ],
    }));

    const dottedLinePositionStyles = useMemo(
      () => [lineStyles, animatedTranslateX],
      [lineStyles, animatedTranslateX],
    );

    const maskStyles = useMemo(() => {
      return {
        ...StyleSheet.absoluteFillObject,
        height: dottedLineHeight,
        width: chartWidth,
        top: showHoverDate ? 0 : -SparklineInteractiveMinMaxLabelHeight,
        backgroundColor: colors.background,
        opacity: maskOpacity,
        zIndex: 1,
      };
    }, [
      SparklineInteractiveMinMaxLabelHeight,
      chartWidth,
      colors.background,
      dottedLineHeight,
      showHoverDate,
    ]);

    const maskPositionStyles = useMemo(
      () => [maskStyles, animatedTranslateX],
      [maskStyles, animatedTranslateX],
    );

    return (
      <>
        <Animated.View style={dottedLinePositionStyles}>
          <Svg>
            <Line {...lineProps} stroke={color} y2={dottedLineHeight} />
          </Svg>
        </Animated.View>
        <Animated.View style={maskPositionStyles} />
      </>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
});
