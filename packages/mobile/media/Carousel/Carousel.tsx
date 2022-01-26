import React, {
  Children,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, Platform, ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { SharedProps, SpacingScale } from '@cbhq/cds-common';
import { emptyObject } from '@cbhq/cds-utils';

import { ScrollToParams, useScrollTo } from '../../hooks/useScrollTo';

import { CarouselItem } from './CarouselItem';
import type { CarouselItemId, CarouselLayoutMap, CarouselOnReady, CarouselRef } from './types';
import { useDismissCarouselItem } from './useDismissCarouselItem';

export type CarouselProps = {
  items: React.ReactElement[];
  /** Return value from useCarousel hook. Allows access to certain internal data/methods of Carousel. */
  carouselRef?: React.MutableRefObject<CarouselRef | undefined>;
  /** Gap to insert between siblings. The last item will exclude additional spacing. */
  gap?: SpacingScale;
  /** Callback that fires when the Carousel is ready to be interacted with. */
  onReady?: CarouselOnReady;
} & Omit<ScrollViewProps, 'style'> &
  SharedProps;

export const Carousel = memo(
  forwardRef<ScrollView, CarouselProps>(
    (
      { carouselRef, items, gap = 3, testID = 'Carousel', onReady, ...otherProps },
      forwardedRef,
    ) => {
      /** A key/value object of ids to x coordinates. i.e. { 0: 0, 1: 400, 2: 800 } */
      const [layoutMap, setLayoutMap] = useState<CarouselLayoutMap>({});
      /** ScrollRef for wrapping ScrollView */
      const [scrollRef, { scrollTo, scrollToEnd }] = useScrollTo(forwardedRef);
      /** Guarantees we only fire onReady once. */
      const hasFiredOnReady = useRef(false);
      /** The number of of CarouselItems */
      const childrenLength = Children.count(items);
      /** Dismiss a CarouselItem. */
      const {
        dismiss,
        dismissedItems,
        resetDismissedItems,
        onLayout,
        onContentSizeChange,
        onScroll,
      } = useDismissCarouselItem(childrenLength, scrollTo);
      /** Array of x coordinates for snapping the wrapping ScrollView on gesture */
      const snapPoints = Object.values(layoutMap);
      /** This is fired in onLayout of CarouselItem. */
      const updateLayoutMap = useCallback((value: CarouselLayoutMap) => {
        setLayoutMap((prev) => ({ ...prev, ...value }));
      }, []);
      /** Imperatively handling scrolling Carousel to an item. LayoutMap has the index to x coordinate mapping. */
      const scrollToId = useCallback(
        (id: CarouselItemId, params: ScrollToParams | undefined = emptyObject) => {
          scrollTo({ x: layoutMap[id], ...params });
        },
        [layoutMap, scrollTo],
      );
      /** This object contains any internal data/methods of Carousel that we want to expose to consumers. */
      const publicData = useMemo(
        () => ({
          length: childrenLength,
          dismissedItems,
          resetDismissedItems,
          scrollToId,
          scrollToEnd,
        }),
        [childrenLength, dismissedItems, resetDismissedItems, scrollToId, scrollToEnd],
      );
      /** Guarantees that we have x coordinates for each CarouselItem before triggering onReady. */
      useEffect(() => {
        const isReady = !!scrollRef && childrenLength === snapPoints.length;
        if (hasFiredOnReady.current || !isReady) return;
        onReady?.(publicData);
        hasFiredOnReady.current = true;
      }, [publicData, childrenLength, onReady, scrollRef, snapPoints.length]);
      /**
       * Useful if you need access to carousel length or scrollToId outside of Carousel. The useCarousel hook exposes these values and requires the ref returned to be passed into Carousel's carouselRef prop.
       * @example
       * ```
       * const carouselRef = useCarousel()
       * const handlePress = () => carouselRef.current.scrollToId('item3');
       * <Button onPress={handlePress}>Press me</Button>
       * <Carousel carouselRef={carouselRef} />
       * ```
       */
      useImperativeHandle(carouselRef, () => publicData, [publicData]);
      /** Loop over our children and create CarouselItem component. */
      const content = useMemo(
        () =>
          Children.map(items, (child, index) => {
            const key = child.key ?? index;
            const isLast = index === childrenLength - 1;
            const isDismissed = dismissedItems.has(key);
            return isDismissed ? null : (
              <CarouselItem
                dismiss={dismiss}
                id={key}
                key={`carousel-item-${key}`}
                spacingEnd={isLast ? 0 : gap}
                updateLayoutMap={updateLayoutMap}
              >
                {child}
              </CarouselItem>
            );
          }),
        [items, childrenLength, dismiss, dismissedItems, gap, updateLayoutMap],
      );

      return (
        <Animated.ScrollView
          {...otherProps}
          contentContainerStyle={styles.scrollViewContainer}
          decelerationRate="fast"
          horizontal
          ref={scrollRef}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToOffsets={snapPoints}
          style={styles.carousel}
          testID={testID}
          onLayout={onLayout}
          onContentSizeChange={onContentSizeChange}
          onScroll={onScroll}
        >
          {content}
        </Animated.ScrollView>
      );
    },
  ),
);

const styles = StyleSheet.create({
  carousel: {
    overflow: 'visible',
  },
  scrollViewContainer: Platform.select({
    android: {
      /**
       * TODO: update so these values are not hardcoded.
       * Copied from RN
       * We do all this to give space for card shadows with an elevation of 1 to show on android
       * https://github.com/facebook/react-native/issues/25703
       */
      paddingVertical: 4,
      marginVertical: -4,
      paddingLeft: 4,
      marginLeft: -4,
      paddingRight: 2,
    },
    default: {},
  }),
});

Carousel.displayName = 'Carousel';
