import { useCallback, useMemo, useRef, useState } from 'react';

import { Animated } from 'react-native';

import { convertMotionConfig } from '../../animation/convertMotionConfig';
import type { CarouselDismissItemParams, CarouselItemId } from './types';

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

export const useDismissCarouselItem = (itemsLength: number) => {
  const isAnimating = useRef(false);
  /** Array of CarouselItem indexes that have been dismissed. */
  const [dismissedItems, setDismissedItems] = useState<Set<CarouselItemId>>(() => new Set());
  /** If there is only one CarouselItem left which has yet to be dismissed. This will have additional height animation */
  const isLastDismissableItem = dismissedItems.size === itemsLength - 1;
  const resetDismissedItems = useCallback(() => {
    setDismissedItems(new Set());
  }, []);

  const dismiss = useCallback(
    ({ height, id, opacity, width, callbackFn }: CarouselDismissItemParams) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      const opacityMotion = Animated.timing(opacity, opacityConfig);
      const widthMotion = Animated.timing(width, sizeConfig);
      const heightMotion = Animated.timing(height, sizeConfig);
      Animated.parallel([opacityMotion, isLastDismissableItem ? heightMotion : widthMotion]).start(
        ({ finished }) => {
          if (finished) {
            isAnimating.current = false;
            setDismissedItems(prev => new Set(prev).add(id));
            callbackFn?.();
          }
        }
      );
    },
    [isLastDismissableItem]
  );

  return useMemo(
    () => ({ dismiss, dismissedItems, resetDismissedItems }),
    [dismiss, dismissedItems, resetDismissedItems]
  );
};
