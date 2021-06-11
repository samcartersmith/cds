import { ScrollToParams } from '../../hooks/useScrollTo';

export type CarouselLayoutMap = Record<number, number>;
export type CarouselScrollToIndex = (index: number, params?: ScrollToParams | undefined) => void;
export type CarouselRef = { length: number; scrollToIndex: CarouselScrollToIndex };
