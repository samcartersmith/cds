import type { NoopFn } from '@cbhq/cds-common';
import { Animated } from 'react-native';
import { ScrollToParams, ScrollToEndFn } from '../../hooks/useScrollTo';

export type CarouselId = React.Key;
export type CarouselScrollToId = (id: CarouselId, params?: ScrollToParams | undefined) => void;

export type CarouselRef = {
  dismissedItems: Set<CarouselId>;
  length: number;
  resetDismissedItems: NoopFn;
  scrollToId: CarouselScrollToId;
  scrollToEnd: ScrollToEndFn;
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
export type CarouselHandleDismissItem = (callbackFn?: CarouselOnDismissItem) => void;
