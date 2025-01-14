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
  ColorSurgeBaseProps,
  ColorSurgeRefBaseProps,
  MotionBaseSpec,
} from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { colorSurgeEnterConfig, colorSurgeExitConfig } from '@cbhq/cds-common2/motion/hint';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { Box } from '../layout';

export type ColorSurgeTypes = ColorSurgeBaseProps;

/**
 * Please consult with the motion team in #ask-motion before using this component.
 */
export const ColorSurge = memo(
  forwardRef(function ColorSurge(
    { background = 'backgroundPrimary', disableAnimateOnMount = false }: ColorSurgeTypes,
    ref: ForwardedRef<ColorSurgeRefBaseProps>,
  ) {
    const [backgroundState, setBackgroundState] = useState<ThemeVars.Color>(background);
    const opacity = useRef(new Animated.Value(colorSurgeEnterConfig.fromValue as number)).current;

    const playAnimation = useCallback(
      async (backgroundParam?: ThemeVars.Color) => {
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
