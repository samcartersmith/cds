import { useRef } from 'react';

import { noop } from '@cbhq/cds-utils';

import { CarouselRef } from './types';

/**
 * Useful if you need to access internal data or methods from Carousel outside of its immediate children.
 * @returns Object with internal data/methods from Carousel component.
 * @example
 * ```
 * const carouselRef = useCarousel()
 * const handlePress = () => carouselRef.current.scrollToIndex(3);
 * <Button onPress={handlePress}>Press me</Button>
 * <Carousel carouselRef={carouselRef} />
 * ```
 */
export const useCarousel = () => {
  // Includes fallback data to avoid having to do ref.current?.scrollToIndex.
  return useRef<CarouselRef>({
    length: 0,
    scrollToIndex: noop,
  });
};
