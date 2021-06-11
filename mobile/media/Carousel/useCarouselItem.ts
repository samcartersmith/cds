import { useContext } from 'react';

import { noop } from '@cbhq/cds-utils';

import { CarouselItemContext, CarouselItemContextValue } from './CarouselItemContext';

/** Access the index and dismiss function for a CarouselItem. */
export const useCarouselItem = (): CarouselItemContextValue => {
  const context = useContext(CarouselItemContext);
  if (context === undefined) {
    console.error('useCarouselItem: Cannot use `useCarouselItem` outside of Carousel component.');
    return { index: -1, dismiss: noop };
  }
  return context;
};
