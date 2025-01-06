import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { Animated } from 'react-native';
import type { ShakeBaseProps, ShakeRefBaseProps } from '@cbhq/cds-common2';
import { shakeTransitionConfig, shakeTranslateX } from '@cbhq/cds-common2/motion/hint';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { Haptics } from '../utils/haptics';

/**
 * Please consult with the motion team in #ask-motion before using this component.
 */
export const Shake = memo(
  forwardRef(function Shake(
    { children, disableAnimateOnMount = false }: ShakeBaseProps,
    ref: ForwardedRef<ShakeRefBaseProps>,
  ) {
    const translateX = useRef(new Animated.Value(0)).current;

    const interpolatedX = translateX.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      outputRange: shakeTranslateX,
    });

    const playAnimation = useCallback(async () => {
      void Haptics.warningNotification();
      Animated.timing(
        translateX,
        convertMotionConfig({ ...shakeTransitionConfig, toValue: 9 }),
      ).start(({ finished }) => {
        // reset value so it can be animated again
        if (finished) {
          translateX.setValue(0);
        }
      });
    }, [translateX]);

    useEffect(() => {
      if (!disableAnimateOnMount) {
        void playAnimation();
      }
    }, [playAnimation, disableAnimateOnMount]);

    useImperativeHandle(
      ref,
      () => ({
        play: playAnimation,
      }),
      [playAnimation],
    );

    return (
      <Animated.View style={{ transform: [{ translateX: interpolatedX }] }}>
        {children}
      </Animated.View>
    );
  }),
);
