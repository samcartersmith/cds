import React, {
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import { Animated, ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { SpacingScale, SharedProps } from '@cbhq/cds-common';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { emptyObject } from '@cbhq/cds-utils';
import { useSpacingValue } from '../../hooks/useSpacingValue';
import { VStack } from '../../layout/VStack';
import { useScrollTo, ScrollToParams } from '../../hooks/useScrollTo';
import { useScrollOffset } from '../../hooks/useScrollOffset';
import {
  ProgressIndicator,
  PROGRESS_INDICATOR_WIDTH,
} from '../../visualizations/ProgressIndicator';
import { CarouselItem } from './CarouselItem';
import { CarouselControlsWrapper } from './CarouselControlsWrapper';
import type {
  CarouselId,
  CarouselRef,
  CarouselOnDismissItem,
  CarouselItemAnimatedStyles,
  CarouselMountedItemsInfo,
} from './types';

export type { CarouselId, CarouselRef };

export type CarouselProps = {
  showProgress?: boolean;
  showDismiss?: boolean;
  items: React.ReactElement[];
  /** Return value from useCarousel hook. Allows access to certain internal data/methods of Carousel. */
  carouselRef?: React.MutableRefObject<CarouselRef | undefined>;
  /** Gap to insert between siblings. The last item will exclude additional spacing. */
  gap?: SpacingScale;
  onDismissItem?: CarouselOnDismissItem;
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

      const getDismissHandler = useCallback(
        (id: CarouselId) => {
          return () => {
            setDismissedItems((prev) => new Set(prev).add(id));
            onDismissItem?.(id);
          };
        },
        [onDismissItem],
      );

      const getOnMountHandler = useCallback((id: CarouselId, index: number) => {
        return (animatedStyles: CarouselItemAnimatedStyles) => {
          setMountedItemsInfo((prev) => ({
            ...prev,
            [id]: { animatedStyles, id, index },
          }));
        };
      }, []);

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
          scrollToEnd,
        }),
        [childrenLength, dismissedItems, resetDismissedItems, scrollToId, scrollToEnd],
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
              onDismiss={getDismissHandler(id)}
              onMount={getOnMountHandler(id, index)}
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
        getDismissHandler,
        getOnMountHandler,
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
