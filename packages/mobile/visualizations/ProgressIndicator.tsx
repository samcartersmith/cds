import React, { forwardRef, memo, useMemo } from 'react';
import { Animated, StyleSheet, StyleProp, View, ViewStyle } from 'react-native';
import { Box, BoxProps } from '../layout/Box';
import { usePalette } from '../hooks/usePalette';

export const PROGRESS_INDICATOR_WIDTH = 24;

export type ProgressIndicatorProps = {
  /** An Animated.Value or interpolated Animated.Value between 0 and 1 */
  progress?: Animated.Value | Animated.AnimatedInterpolation;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
} & BoxProps;

export const ProgressIndicator = memo(
  forwardRef<View, ProgressIndicatorProps>(function ProgressIndicator(
    { progress, dangerouslySetStyle, ...boxProps },
    ref,
  ) {
    const { line, foreground } = usePalette();
    const outerStyles = useMemo(() => [styles.dash, { backgroundColor: line }], [line]);
    const innerStyles = useMemo(
      () => [
        styles.dashOverlay,
        { backgroundColor: foreground, zIndex: 2 },
        progress && {
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [-PROGRESS_INDICATOR_WIDTH, 0],
              }),
            },
          ],
        },
      ],
      [foreground, progress],
    );

    return (
      <Box
        ref={ref}
        animated
        alignItems="center"
        justifyContent="center"
        dangerouslySetStyle={dangerouslySetStyle}
        {...boxProps}
      >
        <Animated.View style={outerStyles}>
          <Animated.View style={innerStyles} />
        </Animated.View>
      </Box>
    );
  }),
);

const styles = StyleSheet.create({
  dash: {
    height: 2,
    width: PROGRESS_INDICATOR_WIDTH,
    borderRadius: 99,
    position: 'relative',
    overflow: 'hidden',
  },
  dashOverlay: StyleSheet.absoluteFillObject,
});

ProgressIndicator.displayName = 'ProgressIndicator';
