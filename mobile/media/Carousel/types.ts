import type { NoopFn } from '@cbhq/cds-common';
import { Animated } from 'react-native';

import { ScrollToParams, ScrollToEndFn } from '../../hooks/useScrollTo';

export type CarouselItemId = React.Key;
export type CarouselLayoutMap = Record<CarouselItemId, number>;
export type CarouselScrollToId = (id: CarouselItemId, params?: ScrollToParams | undefined) => void;
export type CarouselRef = {
  dismissedItems: Set<CarouselItemId>;
  length: number;
  resetDismissedItems: NoopFn;
  scrollToId: CarouselScrollToId;
  scrollToEnd: ScrollToEndFn;
};
export type CarouselOnReady = (carouselRef: CarouselRef) => void;
export type CarouselDismissItemParams = {
  id: CarouselItemId;
  opacity: Animated.Value;
  width: Animated.Value;
  height: Animated.Value;
  callbackFn?: NoopFn;
};
export type CarouselDismissItemInternal = (params: CarouselDismissItemParams) => void;
export type CarouselDismissItem = (callbackFn?: NoopFn | undefined) => void;
export interface CarouselItemContextValue {
  id: CarouselItemId;
  dismiss: CarouselDismissItem;
}

export type CarouselUpdateLayoutMap = (value: CarouselLayoutMap) => void;
