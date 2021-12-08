import { useRef } from 'react';
import { Animated } from 'react-native';
import { durations } from '@cbhq/cds-common/tokens/motion';

export function useOpacityAnimation(
  initialValue: number | undefined = 0,
  duration: number | undefined = durations.moderate1,
): [Animated.Value, Animated.CompositeAnimation, Animated.CompositeAnimation] {
  const animation = useRef(new Animated.Value(initialValue)).current;

  const animateIn = Animated.timing(animation, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });

  const animateOut = Animated.timing(animation, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });

  return [animation, animateIn, animateOut];
}
