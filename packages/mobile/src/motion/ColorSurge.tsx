import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Animated } from 'react-native';
import type {
  ColorSurgeBackground,
  ColorSurgeBaseProps,
  ColorSurgeRefBaseProps,
  MotionBaseSpec,
} from '@cbhq/cds-common';
import { colorSurgeEnterConfig, colorSurgeExitConfig } from '@cbhq/cds-common/motion/hint';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { Box } from '../layout';

export type ColorSurgeTypes = ColorSurgeBaseProps;

/**
 * Please consult with the motion team in #ask-motion before using this component.
 */
export const ColorSurge = memo(
  forwardRef(function ColorSurge(
    { background = 'primary', disableAnimateOnMount = false }: ColorSurgeTypes,
    ref: ForwardedRef<ColorSurgeRefBaseProps>,
  ) {
    const [backgroundState, setBackgroundState] = useState<ColorSurgeBackground>(background);
    const opacity = useRef(new Animated.Value(colorSurgeEnterConfig.fromValue as number)).current;

    const playAnimation = useCallback(
      async (backgroundParam?: ColorSurgeBackground) => {
        if (backgroundParam) {
          setBackgroundState(backgroundParam);
        }
        Animated.sequence([
          /**
           * Casting to workaround value type mismatch, string value is not allowed for mobile
           * TODO: fix value mismatch and remove casting
           */
          Animated.timing(opacity, convertMotionConfig(colorSurgeEnterConfig as MotionBaseSpec)),
          Animated.timing(opacity, convertMotionConfig(colorSurgeExitConfig as MotionBaseSpec)),
        ]).start();
      },
      [opacity],
    );

    useImperativeHandle(
      ref,
      () => ({
        play: playAnimation,
      }),
      [playAnimation],
    );

    useEffect(() => {
      if (!disableAnimateOnMount) {
        void playAnimation();
      }
    }, [playAnimation, disableAnimateOnMount]);

    return <Box animated background={backgroundState} pin="all" style={{ opacity }} />;
  }),
);
