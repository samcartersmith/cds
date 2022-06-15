import React, { memo, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import type { ColorSurgeBaseProps, MotionBaseSpec } from '@cbhq/cds-common';
import { colorSurgeEnterConfig, colorSurgeExitConfig } from '@cbhq/cds-common/motion/hint';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { Box } from '../layout';

export type ColorSurgeTypes = ColorSurgeBaseProps;

export const ColorSurge = memo(function ColorSurge({ background = 'primary' }: ColorSurgeTypes) {
  const opacity = useRef(new Animated.Value(colorSurgeEnterConfig.fromValue as number)).current;

  useEffect(() => {
    Animated.sequence([
      /**
       * Casting to workaround value type mismatch, string value is not allowed for mobile
       * TODO: fix value mismatch and remove casting
       */
      Animated.timing(opacity, convertMotionConfig(colorSurgeEnterConfig as MotionBaseSpec)),
      Animated.timing(opacity, convertMotionConfig(colorSurgeExitConfig as MotionBaseSpec)),
    ]).start();
  }, [opacity]);

  return <Box animated background={background} pin="all" dangerouslySetStyle={{ opacity }} />;
});
