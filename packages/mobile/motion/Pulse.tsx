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
import type { PulseBaseProps, PulseRefBaseProps, PulseVariant } from '@cbhq/cds-common';
import { pulseTransitionConfig, pulseVariantOpacity } from '@cbhq/cds-common/motion/hint';

import { convertMotionConfig } from '../animation/convertMotionConfig';

export type PulseProps = PulseBaseProps;

/**
 * Please consult with the motion team in #ask-motion before using this component.
 */
export const Pulse = memo(
  forwardRef(function Pulse(
    {
      children,
      variant = 'moderate',
      disableAnimateOnMount = false,
      iterations,
      motionConfig,
    }: PulseProps,
    ref: ForwardedRef<PulseRefBaseProps>,
  ) {
    const [variantState, setVariantState] = useState(variant);
    const opacity = useRef(new Animated.Value(0)).current;

    const interpolatedOpacity = opacity.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, pulseVariantOpacity[variantState], 1],
    });

    const stopAnimation = useCallback(() => {
      opacity.stopAnimation();
      opacity.setValue(0);
    }, [opacity]);

    const playAnimation = useCallback(
      async (variantParam?: PulseVariant) => {
        if (variantParam) {
          setVariantState(variantParam);
        }

        stopAnimation();
        Animated.loop(
          Animated.timing(
            opacity,
            convertMotionConfig({
              ...pulseTransitionConfig,
              ...(motionConfig || {}),
              toValue: 1,
            }),
          ),
          { iterations: iterations === 0 ? 1 : iterations },
        ).start();
      },
      [iterations, opacity, stopAnimation, motionConfig],
    );

    useEffect(() => {
      if (!disableAnimateOnMount) {
        void playAnimation();
      }
    }, [playAnimation, disableAnimateOnMount]);

    useImperativeHandle(
      ref,
      () => ({
        play: playAnimation,
        stop: stopAnimation,
      }),
      [playAnimation, stopAnimation],
    );

    return <Animated.View style={{ opacity: interpolatedOpacity }}>{children}</Animated.View>;
  }),
);
