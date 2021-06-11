import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  Children,
  useImperativeHandle,
} from 'react';

import { SpacingScale } from '@cbhq/cds-common';
import flattenNodes from '@cbhq/cds-common/utils/flattenNodes';
import { emptyObject } from '@cbhq/cds-utils';
import { Platform, ScrollView, ScrollViewProps, StyleSheet } from 'react-native';

import { useScrollTo, ScrollToParams } from '../../hooks/useScrollTo';
import { CarouselItem } from './CarouselItem';
import { CarouselLayoutMap, CarouselRef } from './types';
import { useDismissCarouselItem } from './useDismissCarouselItem';

export interface CarouselProps extends Omit<ScrollViewProps, 'style'> {
  children?: React.ReactNode;
  /** Return value from useCarousel hook. Allows access to certain internal data/methods of Carousel. */
  carouselRef?: React.MutableRefObject<CarouselRef | undefined>;
  /** Gap to insert between siblings. The last item will exclude additional spacing. */
  gap?: SpacingScale;
  /** Callback that fires when the Carousel is ready to be interacted with. */
  onReady?: (carouselRef: CarouselRef) => void;
}

export const Carousel = memo(
  forwardRef<ScrollView, CarouselProps>(
    ({ carouselRef, children, gap = 3, onReady, ...otherProps }, forwardedRef) => {
      /** A key/value object of indexes to x coordinates. i.e. { 0: 0, 1: 400, 2: 800 } */
      const [layoutMap, setLayoutMap] = useState<CarouselLayoutMap>({});
      /** ScrollRef for wrapping ScrollView */
      const [scrollRef, scrollTo] = useScrollTo(forwardedRef);
      /** Guarantees we only fire onReady once. */
      const hasFiredOnReady = useRef(false);
      /** Flatten nodes will remove any children that are React Fragments. */
      const childrenAsNodes = useMemo(() => flattenNodes(children), [children]);
      /** The number of of CarouselItems */
      const childrenLength = childrenAsNodes.length;
      /** Dismiss a CarouselItem. */
      const { dismiss, dismissedItems } = useDismissCarouselItem(childrenLength);
      /** Array of x coordinates for snapping the wrapping ScrollView on gesture */
      const snapPoints = Object.values(layoutMap);
      /** This is fired in onLayout of CarouselItem. */
      const updateLayoutMap = useCallback((value: Record<number, number>) => {
        setLayoutMap(prev => ({ ...prev, ...value }));
      }, []);
      /** Imperatively handling scrolling Carousel to an item. LayoutMap has the index to x coordinate mapping. */
      const scrollToIndex = useCallback(
        (index: number, params: ScrollToParams | undefined = emptyObject) => {
          scrollTo({ x: layoutMap[index], ...params });
        },
        [layoutMap, scrollTo]
      );
      /** This object contains any internal data/methods of Carousel that we want to expose to consumers. */
      const publicData = useMemo(
        () => ({ length: childrenLength, scrollToIndex }),
        [childrenLength, scrollToIndex]
      );
      /** Guarantees that we have x coordinates for each CarouselItem before triggering onReady. */
      useEffect(() => {
        const isReady = !!scrollRef && childrenLength === snapPoints.length;
        if (hasFiredOnReady.current || !isReady) return;
        onReady?.(publicData);
        hasFiredOnReady.current = true;
      }, [publicData, childrenLength, onReady, scrollRef, snapPoints.length]);
      /**
       * Useful if you need access to carousel length or scrollToIndex outside of Carousel. The useCarousel hook exposes these values and requires the ref returned to be passed into Carousel's carouselRef prop.
       * @example
       * ```
       * const carouselRef = useCarousel()
       * const handlePress = () => carouselRef.current.scrollToIndex(3);
       * <Button onPress={handlePress}>Press me</Button>
       * <Carousel carouselRef={carouselRef} />
       * ```
       */
      useImperativeHandle(carouselRef, () => publicData, [publicData]);
      /** Loop over our children and create CarouselItem component. */
      const content = useMemo(
        () =>
          Children.map(childrenAsNodes, (child, index) => {
            const isLast = index === childrenLength - 1;
            const isDismissed = dismissedItems.has(index);
            return isDismissed ? null : (
              <CarouselItem
                dismiss={dismiss}
                index={index}
                key={`carousel-item-${index}`}
                spacingEnd={isLast ? 0 : gap}
                updateLayoutMap={updateLayoutMap}
              >
                {child}
              </CarouselItem>
            );
          }),
        [childrenAsNodes, childrenLength, dismiss, dismissedItems, gap, updateLayoutMap]
      );

      return (
        <ScrollView
          {...otherProps}
          contentContainerStyle={styles.scrollViewContainer}
          decelerationRate="fast"
          horizontal
          ref={scrollRef}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToOffsets={snapPoints}
          style={styles.carousel}
          testID="Carousel"
        >
          {content}
        </ScrollView>
      );
    }
  )
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
