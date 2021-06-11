import { createContext } from 'react';

import { NoopFn } from '@cbhq/cds-common';

export interface CarouselItemContextValue {
  index: number;
  dismiss: NoopFn;
}

/**
 * Used internally within CarouselItem component to provide access to index and dismiss.
 * @example
 * ```
 * const MyCarouselItem = () => {
 * const { index, dismiss } = useCarouselItem()
 *  return <Card onPress={dismiss}><TextBody>{`Carousel item ${index}`}</TextBody></Card>
 * }
 *
 * const MyCarousel = () => {
 *  return (
 *    <Carousel>
 *      <MyCarouselItem />
 *      <MyCarouselItem />
 *      <MyCarouselItem />
 *    </Carousel>
 * )
 * }
 * ```
 */
export const CarouselItemContext = createContext<CarouselItemContextValue | undefined>(undefined);
