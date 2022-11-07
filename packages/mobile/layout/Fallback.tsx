// Simplified version of https://github.com/tomzaku/react-native-shimmer-placeholder/blob/master/lib/ShimmerPlaceholder.js
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { FallbackBaseProps } from '@cbhq/cds-common';
import { useFallbackShape, UseFallbackShapeOptions } from '@cbhq/cds-common/hooks/useFallbackShape';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';

import { LinearGradient } from '../gradients/LinearGradient';
import { fallbackShimmer } from '../styles/fallbackShimmer';

import { Box, BoxProps } from './Box';

export type FallbackProps = {
  /**
   * By default, Fallback will iterate 10 times
   * and then it will stop the animation. We do
   * this for performance reasons.
   *
   * If your Fallback loader takes more than 10s,
   * then you are use this. However, please use this
   * sparingly. Its best to fix the slow operation
   * before proceeding with this approach
   * @default 10
   */
  dangerouslySetIterations?: number;
} & FallbackBaseProps &
  Omit<BoxProps, 'borderRadius' | 'height' | 'width'>;

export const Fallback = memo(function Fallback({
  height,
  shape = 'rectangle',
  width: baseWidth,
  disableRandomRectWidth,
  rectWidthVariant,
  dangerouslySetIterations = 10,
  ...props
}: FallbackProps) {
  const fallbackShapeOptions = useMemo(
    (): UseFallbackShapeOptions => ({
      disableRandomRectWidth,
      rectWidthVariant,
    }),
    [disableRandomRectWidth, rectWidthVariant],
  );

  const { width, borderRadius } = useFallbackShape(shape, baseWidth, fallbackShapeOptions);

  const spectrum = useSpectrum();
  const shimmerColor = spectrum === 'light' ? fallbackShimmer.light : fallbackShimmer.dark;
  const shimmerPosition = useRef(new Animated.Value(-1));

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.timing(shimmerPosition.current, {
        toValue: 1,
        duration: 1300,
        useNativeDriver: true,
        // Disable interaction otherwise all `InteractionManager` listeners
        // will hang indefinitely since Fallbacks will be rendered offscreen.
        isInteraction: false,
      }),
      {
        iterations: dangerouslySetIterations,
      },
    );

    const animateShimmer = () => {
      shimmerAnimation.start();
    };

    animateShimmer();

    return () => shimmerAnimation.stop();
  }, [dangerouslySetIterations]);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      width,
      height,
      overflow: 'hidden',
      backgroundColor: shimmerColor[0],
      borderRadius,
    }),
    [width, height, shimmerColor, borderRadius],
  );

  const outputRange = useMemo(
    () => (typeof width === 'number' ? [-width, width] : [-400, 400]),
    [width],
  );

  return (
    <Box width={width} {...props}>
      <View style={containerStyle}>
        <Animated.View
          style={[
            styles.child,
            {
              transform: [
                {
                  translateX: shimmerPosition.current.interpolate({
                    inputRange: [-1, 1],
                    outputRange,
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            style={styles.child}
            colors={shimmerColor}
            start={gradStart}
            end={gradEnd}
            stops={gradLocations}
          />
        </Animated.View>
      </View>
    </Box>
  );
});

const gradStart = { x: -1, y: 0.5 };
const gradEnd = { x: 2, y: 0.5 };
const gradLocations = [0.3, 0.5, 0.7];

const styles = StyleSheet.create({
  child: {
    flex: 1,
  },
});
