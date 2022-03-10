// Simplified version of https://github.com/tomzaku/react-native-shimmer-placeholder/blob/master/lib/ShimmerPlaceholder.js
import React, { memo, useEffect, useMemo, useRef } from 'react';

import { FallbackBaseProps } from '@cbhq/cds-common';
import { useFallbackShape } from '@cbhq/cds-common/hooks/useFallbackShape';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Box, BoxProps } from './Box';
import { fallbackShimmer } from '../styles/fallbackShimmer';

export type FallbackProps = FallbackBaseProps & Omit<BoxProps, 'borderRadius' | 'height' | 'width'>;

export const Fallback = memo(function Fallback({
  height,
  shape = 'rectangle',
  width: baseWidth,
  ...props
}: FallbackProps) {
  const { width, borderRadius } = useFallbackShape(shape, baseWidth);

  const spectrum = useSpectrum();
  const shimmerColor = spectrum === 'light' ? fallbackShimmer.light : fallbackShimmer.dark;
  const shimmerPosition = useRef(new Animated.Value(-1));
  const shimmerAnimation = useRef<Animated.CompositeAnimation>();
  const loopCount = useRef(0);

  useEffect(() => {
    const animateShimmer = () => {
      shimmerAnimation.current = Animated.timing(shimmerPosition.current, {
        toValue: 1,
        duration: 1300,
        useNativeDriver: true,
        // Disable interaction otherwise all `InteractionManager` listeners
        // will hang indefinitely since Fallbacks will be rendered offscreen.
        isInteraction: false,
      });

      shimmerAnimation.current.start(({ finished }) => {
        if (finished) {
          shimmerPosition.current.setValue(-1);

          // We also want to avoid playing the animation forever
          // in the background, so stop once we loop 10 times.
          if (loopCount.current < 10) {
            animateShimmer();
            loopCount.current += 1;
          }
        }
      });
    };

    animateShimmer();

    return () => shimmerAnimation.current?.stop();
  }, []);

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
            locations={gradLocations}
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
