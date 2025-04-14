import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { usePreviousValue } from '@cbhq/cds-common2/hooks/usePreviousValue';
import { animateRotateConfig } from '@cbhq/cds-common2/motion/animatedCaret';
import type { AnimatedCaretBaseProps } from '@cbhq/cds-common2/types/AnimatedCaretBaseProp';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { Icon, IconProps } from '../icons';
import { HStack } from '../layout';

export type AnimatedCaretProps = AnimatedCaretBaseProps & Partial<Omit<IconProps, 'name'>>;

export const useAnimatedCaretAnimation = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  const animate = useCallback(
    (rotate: number) => {
      Animated.timing(
        rotateValue,
        convertMotionConfig({ ...animateRotateConfig, toValue: rotate }),
      ).start();
    },
    [rotateValue],
  );

  const interpolatedRotateValue = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return useMemo(
    () => ({
      animatedStyles: { transform: [{ rotate: interpolatedRotateValue }] },
      animate,
    }),
    [interpolatedRotateValue, animate],
  );
};

export const AnimatedCaret = memo(function AnimatedCaret({
  rotate,
  size = 's',
  color = 'fgMuted',
  style,
  ...props
}: AnimatedCaretProps) {
  const { animatedStyles, animate } = useAnimatedCaretAnimation();
  const previousRotate = usePreviousValue(rotate);

  useEffect(() => {
    if (rotate !== previousRotate) {
      animate(rotate);
    }
  }, [rotate, previousRotate, animate]);

  return (
    // HStack to limit rotate boundary
    <HStack>
      <Icon
        animated
        color={color}
        name="caretUp"
        size={size}
        style={[style, animatedStyles]}
        {...props}
      />
    </HStack>
  );
});
