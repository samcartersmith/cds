import React, { memo, useCallback, useMemo, useState, useRef } from 'react';

import { NoopFn, SpacingScale } from '@cbhq/cds-common';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';
import { Animated, LayoutChangeEvent } from 'react-native';

import { Box } from '../../layout/Box';
import { CarouselItemContext } from './CarouselItemContext';
import type { CarouselDismissItemInternal, CarouselItemId, CarouselUpdateLayoutMap } from './types';

type CarouselItemProps = {
  /** Dismiss a CarouselItem. Requires an index and animated opacity from each CarouselItem. */
  dismiss: CarouselDismissItemInternal;
  /** Id of CarouselItem. Set via key prop when passing in items to parent Carousel component. */
  id: CarouselItemId;
  /** Determines how much spacing should be between this CarouselItem and the next one. */
  spacingEnd: SpacingScale;
  /** Save the CarouselItem x position to Carousel's layoutMap. The layoutMap is used for the snapPoints of the ScrollView. */
  updateLayoutMap: CarouselUpdateLayoutMap;
};

export const CarouselItem: React.FC<CarouselItemProps> = memo(
  ({ children, dismiss, id, spacingEnd, updateLayoutMap }) => {
    /** All animations go from to 1 to 0 when dismissed. Width and height are interpolated from those values. */
    const animations = useRef({
      opacity: new Animated.Value(1),
      height: new Animated.Value(1),
      width: new Animated.Value(1),
    });
    const [width, setWidth] = useState<number | undefined>();
    const [height, setHeight] = useState<number | undefined>();
    const onInnerLayoutCompleted = useRef(false);
    const prevSpacingEnd = usePreviousValue(spacingEnd);

    /** Update layoutMap in Carousel with x coordinate of this item. */
    const onWrapperLayout = useCallback(
      (event: LayoutChangeEvent) => {
        updateLayoutMap({ [id]: event.nativeEvent.layout.x });
      },
      [id, updateLayoutMap]
    );

    const updateSizing = useCallback((event: LayoutChangeEvent) => {
      setWidth(event.nativeEvent.layout.width);
      setHeight(event.nativeEvent.layout.height);
    }, []);

    const onInnerLayout = useCallback(
      (event: LayoutChangeEvent) => {
        if (onInnerLayoutCompleted.current) {
          /** spacingEnd can change if items are added to the end of the carousel since the last item has a spacingEnd of 0. */
          if (prevSpacingEnd !== spacingEnd) {
            /** Unset width so we can re-adjust sizing. */
            setWidth(undefined);
            /** onInnerLayout will get triggered after we set width to undefined in the conditional above. Once unset the child can grow to the correct size and we can update wrapper to pull the latest width. */
          } else if (width === undefined) {
            updateSizing(event);
          }
        } else {
          /** Save the original width to reference in our interpolated size animations. This guarantees the content does not collapse on dismiss animation. */
          updateSizing(event);
          onInnerLayoutCompleted.current = true;
        }
      },
      [prevSpacingEnd, spacingEnd, updateSizing, width]
    );

    /** Maps the width of this component (once available) to an Animated.Value. */
    const interpolatedWidth = useMemo(() => {
      if (width === undefined) return undefined;
      return animations.current.width.interpolate({ inputRange: [0, 1], outputRange: [0, width] });
    }, [width]);

    /** Maps the height of this component (once available) to an Animated.Value. */
    const interpolatedHeight = useMemo(() => {
      if (height === undefined) return undefined;
      return animations.current.height.interpolate({
        inputRange: [0, 1],
        outputRange: [0, height],
      });
    }, [height]);

    /** Dismiss a CarouselItem. We pass the item's index and opacity to Carousel to manage playback because Carousel has checks to guarantee we don't play multiple animations at once. */
    const handleDismiss = useCallback(
      (callbackFn?: NoopFn) => {
        dismiss({
          id,
          ...animations.current,
          callbackFn,
        });
      },
      [dismiss, id]
    );

    const contextValue = useMemo(() => ({ dismiss: handleDismiss, id }), [handleDismiss, id]);

    return (
      <CarouselItemContext.Provider value={contextValue}>
        <Box
          animated
          onLayout={onWrapperLayout}
          opacity={animations.current.opacity}
          testID={`CarouselItemWrapper-${id}`}
          width={interpolatedWidth as unknown as number}
          height={interpolatedHeight as unknown as number}
        >
          <Box
            flexShrink={0}
            onLayout={onInnerLayout}
            spacingEnd={spacingEnd}
            testID={`CarouselItemInner-${id}`}
          >
            {children}
          </Box>
        </Box>
      </CarouselItemContext.Provider>
    );
  }
);

CarouselItem.displayName = 'CarouselItem';
