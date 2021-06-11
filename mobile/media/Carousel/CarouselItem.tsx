import React, { memo, useCallback, useMemo, useState, useRef } from 'react';

import { NoopFn, SpacingScale } from '@cbhq/cds-common';
import { Animated, LayoutChangeEvent } from 'react-native';

import { Box } from '../../layout/Box';
import { CarouselItemContext } from './CarouselItemContext';
import { CarouselLayoutMap } from './types';
import { DismissParams } from './useDismissCarouselItem';

type CarouselItemProps = {
  /** Dismiss a CarouselItem. Requires an index and animated opacity from each CarouselItem. */
  dismiss: (params: DismissParams) => void;
  /** Index of CarouselItem. */
  index: number;
  /** Determines how much spacing should be between this CarouselItem and the next one. */
  spacingEnd: SpacingScale;
  /** Save the CarouselItem x position to Carousel's layoutMap. The layoutMap is used for the snapPoints of the ScrollView. */
  updateLayoutMap: (value: CarouselLayoutMap) => void;
};

export const CarouselItem: React.FC<CarouselItemProps> = memo(
  ({ children, dismiss, index, spacingEnd, updateLayoutMap }) => {
    /** All animations go from to 1 to 0 when dismissed. Width and height are interpolated from those values. */
    const animations = useRef({
      opacity: new Animated.Value(1),
      height: new Animated.Value(1),
      width: new Animated.Value(1),
    });
    const [width, setWidth] = useState<number | undefined>();
    const [height, setHeight] = useState<number | undefined>();
    const onInnerLayoutCompleted = useRef(false);

    /** Update layoutMap in Carousel with x coordinate of this item. */
    const onWrapperLayout = useCallback(
      (event: LayoutChangeEvent) => {
        updateLayoutMap({ [index]: event.nativeEvent.layout.x });
      },
      [index, updateLayoutMap]
    );

    /** Save the original width to reference in our interpolated size animations. This guarantees the content does not collapse on dismiss animation. */
    const onInnerLayout = useCallback((event: LayoutChangeEvent) => {
      if (!onInnerLayoutCompleted.current) {
        setWidth(event.nativeEvent.layout.width);
        setHeight(event.nativeEvent.layout.height);
        onInnerLayoutCompleted.current = true;
      }
    }, []);

    /** Maps the width of this component (once available) to an Animated.Value. */
    const interpolatedWidth = useMemo(() => {
      if (width === undefined) return;
      return animations.current.width.interpolate({ inputRange: [0, 1], outputRange: [0, width] });
    }, [width]);

    /** Maps the height of this component (once available) to an Animated.Value. */
    const interpolatedHeight = useMemo(() => {
      if (height === undefined) return;
      return animations.current.height.interpolate({
        inputRange: [0, 1],
        outputRange: [0, height],
      });
    }, [height]);

    /** Dismiss a CarouselItem. We pass the item's index and opacity to Carousel to manage playback because Carousel has checks to guarantee we don't play multiple animations at once. */
    const handleDismiss = useCallback(
      (callbackFn?: NoopFn) => {
        dismiss({
          index,
          ...animations.current,
          callbackFn,
        });
      },
      [dismiss, index]
    );

    const contextValue = useMemo(() => ({ dismiss: handleDismiss, index }), [handleDismiss, index]);

    return (
      <CarouselItemContext.Provider value={contextValue}>
        <Box
          animated
          onLayout={onWrapperLayout}
          opacity={animations.current.opacity}
          testID={`CarouselItemWrapper${index}`}
          width={interpolatedWidth as unknown as number}
          height={interpolatedHeight as unknown as number}
          overflow="hidden"
        >
          <Box
            flexShrink={0}
            onLayout={onInnerLayout}
            spacingEnd={spacingEnd}
            testID={`CarouselItemInner${index}`}
          >
            {children}
          </Box>
        </Box>
      </CarouselItemContext.Provider>
    );
  }
);

CarouselItem.displayName = 'CarouselItem';
