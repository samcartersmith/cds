import { useCallback, useMemo, useRef, useState } from 'react';

import type { NoopFn } from '@cbhq/cds-common';
import { Animated } from 'react-native';

import { convertMotionConfig } from '../../animation/convertMotionConfig';

const opacityConfig = convertMotionConfig({
  toValue: 0,
  duration: 'fast1',
  curve: 'exitFunctional',
  useNativeDriver: false,
});

/** Height and Width config */
const sizeConfig = convertMotionConfig({
  toValue: 0,
  delay: 50,
  duration: 'slow1',
  curve: 'global',
  useNativeDriver: false,
});

export type DismissParams = {
  index: number;
  opacity: Animated.Value;
  width: Animated.Value;
  height: Animated.Value;
  callbackFn?: NoopFn;
};

export const useDismissCarouselItem = (itemsLength: number) => {
  const isAnimating = useRef(false);
  /** Array of CarouselItem indexes that have been dismissed. */
  const [dismissedItems, setDismissedItems] = useState<Set<number>>(() => new Set());
  /** If there is only one CarouselItem left which has yet to be dismissed. This will have additional height animation */
  const isLastDismissableItem = dismissedItems.size === itemsLength - 1;

  const dismiss = useCallback(
    ({ height, index, opacity, width, callbackFn }: DismissParams) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      const opacityMotion = Animated.timing(opacity, opacityConfig);
      const widthMotion = Animated.timing(width, sizeConfig);
      const heightMotion = Animated.timing(height, sizeConfig);
      Animated.parallel([opacityMotion, isLastDismissableItem ? heightMotion : widthMotion]).start(
        ({ finished }) => {
          if (finished) {
            isAnimating.current = false;
            setDismissedItems(prev => new Set(prev).add(index));
            callbackFn?.();
          }
        }
      );
    },
    [isLastDismissableItem]
  );

  return useMemo(() => ({ dismiss, dismissedItems }), [dismiss, dismissedItems]);
};
