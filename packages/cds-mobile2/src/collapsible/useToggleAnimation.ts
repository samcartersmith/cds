import { useEffect } from 'react';
import { Animated } from 'react-native';
import { usePreviousValue } from '@cbhq/cds-common2/hooks/usePreviousValue';

type ToggleAnimation = {
  animateIn: Animated.CompositeAnimation;
  animateOut: Animated.CompositeAnimation;
  on: boolean;
};

export const useToggleAnimation = ({ on, animateIn, animateOut }: ToggleAnimation) => {
  const previousOn = usePreviousValue(on);

  useEffect(() => {
    if (!previousOn && on) {
      animateIn.start();
    }
    // prevent animating on default collapsed items
    if (previousOn && !on) {
      animateOut.start();
    }
  }, [animateIn, animateOut, on, previousOn]);
};
