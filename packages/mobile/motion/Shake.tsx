import React, { memo, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { shakeTransitionConfig, shakeTranslateX } from '@cbhq/cds-common/motion/hint';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { Haptics } from '../utils/haptics';

export const Shake = memo(function Shake({ children }) {
  const translateX = useRef(new Animated.Value(0)).current;

  const interpolatedX = translateX.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
    outputRange: shakeTranslateX,
  });

  useEffect(() => {
    void Haptics.warningNotification();
    Animated.timing(
      translateX,
      convertMotionConfig({ ...shakeTransitionConfig, toValue: 4 }),
    ).start();
  }, [translateX]);

  return (
    <Animated.View style={{ transform: [{ translateX: interpolatedX }] }}>{children}</Animated.View>
  );
});
