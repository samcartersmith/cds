import React, { memo, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import type { PulseBaseProps } from '@cbhq/cds-common';
import { pulseTransitionConfig, pulseVariantOpacity } from '@cbhq/cds-common/motion/hint';

import { convertMotionConfig } from '../animation/convertMotionConfig';

export type PulseProps = PulseBaseProps;

export const Pulse = memo(function Pulse({ children, variant = 'moderate' }: PulseProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  const interpolatedOpacity = opacity.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, pulseVariantOpacity[variant], 1],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(opacity, convertMotionConfig({ ...pulseTransitionConfig, toValue: 1 })),
    ).start();
  }, [opacity]);

  return <Animated.View style={{ opacity: interpolatedOpacity }}>{children}</Animated.View>;
});
