import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { SharedProps, SpacingScale } from '@cbhq/cds-common';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { emptyObject } from '@cbhq/cds-utils';

import { useScrollOffset } from '../../hooks/useScrollOffset';
import { ScrollToParams, useScrollTo } from '../../hooks/useScrollTo';
import { useSpacingValue } from '../../hooks/useSpacingValue';
import { VStack } from '../../layout/VStack';
import {
  PROGRESS_INDICATOR_WIDTH,
  ProgressIndicator,
} from '../../visualizations/ProgressIndicator';

import { CarouselControlsWrapper } from './CarouselControlsWrapper';
import { CarouselItem } from './CarouselItem';
import type {
  CarouselId,
  CarouselItemAnimatedStyles,
  CarouselMountedItemsInfo,
  CarouselOnDismissItem,
  CarouselOnDismissLastItem,
  CarouselRef,
} from './types';

export type { CarouselId, CarouselRef };

export type CarouselProps = {
  /** Determines whether progress indicators are shown in top left of Carousel. */
  showProgress?: boolean;
  /** Determines where dismiss IconButton is shown in each Carousel slide. */
  showDismiss?: boolean;
  /** An array of React.Elements to use as child for each Carousel slide. A unique key, not based on index must be provided. */
  items: React.ReactElement[];
  /** Return value from useCarousel hook. Allows access to certain internal data/methods of Carousel. */
  carouselRef?: React.MutableRefObject<CarouselRef | undefined>;
  /** Gap to insert between siblings. The last item will exclude additional spacing. */
  gap?: SpacingScale;
  /** Optional callback function which will run after a Carousel item is dismissed. */
  onDismissItem?: CarouselOnDismissItem;
  /** Optional callback function which will run after the last item is dismissed and Carousel height is collapsed. */
  onDismissLastItem?: CarouselOnDismissLastItem;
  /** The width of each Carousel item. */
  itemWidth?: number;
} & Omit<ScrollViewProps, 'style'> &
  SharedProps;

export const Carousel = memo(
  forwardRef<ScrollView, CarouselProps>(
    (
      {
        carouselRef,
        items,
        gap = 0,
        testID = 'Carousel',
        onDismissItem,
        onDismissLastItem,
        showProgress = false,
        showDismiss = false,
        itemWidth: itemWidthProp,
        ...otherProps
      },
      forwardedRef,
    ) => {
      const { width: screenWidth } = useSafeAreaFrame();
      const itemWidth = itemWidthProp ?? screenWidth;
      const [scrollRef, { scrollTo, scrollToEnd }] = useScrollTo(forwardedRef);
      const { onScroll, xOffset } = useScrollOffset();
      const [dismissedItems, setDismissedItems] = useState<Set<CarouselId>>(new Set());
      const indicatorsOpacity = useRef(new Animated.Value(1));
      const [mountedItemsInfo, setMountedItemsInfo] = useState<CarouselMountedItemsInfo>({});

      const resetDismissedItems = useCallback(() => {
        setDismissedItems(new Set());
      }, []);

      const visibleItems = useMemo(
        () =>
          items
            .filter((item) => item.key && !dismissedItems.has(item.key))
            .map((item, index) => ({ id: item.key ?? index, index, children: item }))
            .reduce(
              (prev, { index, id = index, children }) => {
                const snapPoint = index * itemWidth;
                return [
                  ...prev,
                  {
                    id,
                    index,
                    snapPoint,
                    progress: xOffset.interpolate({
                      inputRange: [snapPoint - itemWidth, snapPoint, snapPoint + itemWidth],
                      outputRange: [0, 1, 1],
                      extrapolate: 'clamp',
                    }),
                    children,
                  },
                ];
              },
              [] as {
                id: CarouselId;
                snapPoint: number;
                progress: Animated.AnimatedInterpolation;
                index: number;
                children: React.ReactElement;
              }[],
            ),
        [items, itemWidth, dismissedItems, xOffset],
      );

      /** The number of of CarouselItems */
      const childrenLength = visibleItems.length;

      const getDismissItemHandler = useCallback(
        function getDismissItemHandler(id: CarouselId) {
          return function handleDismissItem() {
            setDismissedItems((prev) => new Set(prev).add(id));
            onDismissItem?.(id);

            // if you dismiss the last item you have to scroll to the new end position on Android.
            // The ScrollView does not automatically do this
            if (id === visibleItems[visibleItems.length - 1].id) {
              scrollToEnd();
            }
          };
        },
        [onDismissItem, scrollToEnd, visibleItems],
      );

      const getOnDismissLastItemHandler = useCallback(
        function getOnDismissLastItemHandler(id: CarouselId) {
          return function handleOnDismissLastItem() {
            onDismissLastItem?.({ id, resetDismissedItems });
          };
        },
        [onDismissLastItem, resetDismissedItems],
      );

      const getOnMountItemHandler = useCallback(function getOnMountItemHandler(
        id: CarouselId,
        index: number,
      ) {
        return function handleOnMountItem(animatedStyles: CarouselItemAnimatedStyles) {
          setMountedItemsInfo((prev) => ({
            ...prev,
            [id]: { animatedStyles, id, index },
          }));
        };
      },
      []);

      /** Imperatively handling scrolling Carousel to an item. LayoutMap has the index to x coordinate mapping. */
      const scrollToId = useCallback(
        (id: CarouselId, params: ScrollToParams | undefined = emptyObject) => {
          const snapPoint = visibleItems.find((item) => item.id === id)?.snapPoint;
          if (snapPoint) {
            scrollTo({ x: snapPoint, ...params });
          }
        },
        [visibleItems, scrollTo],
      );

      /** This object contains any internal data/methods of Carousel that we want to expose to consumers. */
      const publicData: CarouselRef = useMemo(
        () => ({
          length: childrenLength,
          dismissedItems,
          resetDismissedItems,
          scrollToId,
          scrollTo,
          scrollToEnd,
        }),
        [childrenLength, dismissedItems, resetDismissedItems, scrollToId, scrollTo, scrollToEnd],
      );

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
      const content = useMemo(() => {
        return visibleItems.map(({ index, id, children }) => {
          const isLastItem = index === visibleItems.length - 1;
          return (
            <CarouselItem
              id={id}
              index={index}
              key={`carousel-item-${id}`}
              spacingEnd={isLastItem ? 0 : gap}
              showDismiss={showDismiss}
              xOffset={xOffset}
              totalItems={visibleItems.length}
              width={itemWidth}
              progressOpacity={indicatorsOpacity.current}
              onDismiss={getDismissItemHandler(id)}
              onDismissLastItem={getOnDismissLastItemHandler(id)}
              onMount={getOnMountItemHandler(id, index)}
            >
              {children}
            </CarouselItem>
          );
        });
      }, [
        visibleItems,
        gap,
        showDismiss,
        xOffset,
        itemWidth,
        getDismissItemHandler,
        getOnMountItemHandler,
        getOnDismissLastItemHandler,
      ]);

      const progressSpacingEnd = useSpacingValue(0.5);
      const progressIndicators = useMemo(() => {
        return visibleItems.map(({ id, progress }) => {
          const info = mountedItemsInfo[id];
          if (info) {
            const { animatedStyles } = info;
            return (
              <ProgressIndicator
                key={`progress-indicator-${id}`}
                progress={progress}
                dangerouslySetStyle={{
                  opacity: animatedStyles.opacity,
                  width: animatedStyles.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, PROGRESS_INDICATOR_WIDTH + progressSpacingEnd],
                  }),
                }}
              />
            );
          }
          return null;
        });
      }, [visibleItems, mountedItemsInfo, progressSpacingEnd]);

      const progressHeight = useSpacingValue(gutter);

      return (
        <VStack>
          {showProgress && (
            <CarouselControlsWrapper
              pointerEvents="none"
              animated
              height={progressHeight}
              alignItems="flex-end"
              opacity={indicatorsOpacity.current}
            >
              {progressIndicators}
            </CarouselControlsWrapper>
          )}
          <Animated.ScrollView
            decelerationRate="fast"
            horizontal
            ref={scrollRef}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={itemWidth}
            style={styles.carousel}
            testID={testID}
            onScroll={onScroll}
            overScrollMode="always"
            {...otherProps}
          >
            {content}
          </Animated.ScrollView>
        </VStack>
      );
    },
  ),
);

const styles = StyleSheet.create({
  carousel: {
    overflow: 'visible',
  },
});

Carousel.displayName = 'Carousel';
