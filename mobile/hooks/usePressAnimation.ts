import { useRef } from 'react';

import { Animated, GestureResponderEvent } from 'react-native';

export function usePressAnimation(
  factor = 0.02
): [
  (event: GestureResponderEvent) => void,
  (event: GestureResponderEvent) => void,
  Animated.Value
] {
  const value = useRef(new Animated.Value(1)).current;

  const down = () => {
    Animated.spring(value, {
      toValue: 1 - factor,
      useNativeDriver: true,
    }).start();
  };

  const up = () => {
    Animated.spring(value, {
      friction: 3,
      tension: 5,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return [down, up, value];
}
