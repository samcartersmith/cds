import { Animated } from 'react-native';
import type { NoopFn } from '@cbhq/cds-common';

import { ScrollToEndFn, ScrollToFn, ScrollToParams } from '../../hooks/useScrollTo';

export type CarouselId = React.Key;
export type CarouselScrollToId = (id: CarouselId, params?: ScrollToParams | undefined) => void;

export type CarouselRef = {
  dismissedItems: Set<CarouselId>;
  length: number;
  resetDismissedItems: NoopFn;
  scrollToId: CarouselScrollToId;
  scrollTo: ScrollToFn;
  scrollToEnd: ScrollToEndFn;
  currentIndex: number;
};

export type CarouselItemAnimatedStyles = {
  opacity: Animated.Value;
  width: Animated.Value;
  height: Animated.Value | undefined;
};

export type CarouselMountedItemInfo = {
  animatedStyles: CarouselItemAnimatedStyles;
  id: CarouselId;
  index: number;
};

export type CarouselMountedItemsInfo = Record<CarouselId, CarouselMountedItemInfo>;
export type CarouselOnItemMount = (params: CarouselItemAnimatedStyles) => void;
export type CarouselOnDismissItem = (id: CarouselId) => void;
export type CarouselOnDismissLastItem = (params: {
  id: CarouselId;
  resetDismissedItems: NoopFn;
}) => void;
export type CarouselHandleDismissItem = (callbackFn?: CarouselOnDismissItem) => void;
