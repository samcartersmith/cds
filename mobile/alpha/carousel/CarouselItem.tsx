import React, { memo, useCallback, useMemo, useRef, createContext, useState } from 'react';

import { SpacingScale } from '@cbhq/cds-common';
import { Animated, View } from 'react-native';
import { animateOpacityConfig, animateSizeConfig } from '@cbhq/cds-common/animation/carousel';

import { IconButton } from '../../buttons/IconButton';
import { Box } from '../../layout/Box';
import { CarouselControlsWrapper } from './CarouselControlsWrapper';
import { convertMotionConfig } from '../../animation/convertMotionConfig';
import type {
  CarouselId,
  CarouselItemAnimatedStyles,
  CarouselOnDismissItem,
  CarouselHandleDismissItem,
  CarouselOnItemMount,
} from './types';

const FADE_DISTANCE = 48;
const opacityConfig = convertMotionConfig(animateOpacityConfig);
const sizeConfig = convertMotionConfig(animateSizeConfig);

export type CarouselItemContextValue = {
  id: CarouselId;
  dismiss: CarouselHandleDismissItem;
};

/**
 * Used internally within CarouselItem component to provide access to id and dismiss.
 */
export const CarouselItemContext = createContext<CarouselItemContextValue | undefined>(undefined);

type CarouselItemProps = {
  /** Id of CarouselItem. Set via key prop when passing in items to parent Carousel component. */
  id: CarouselId;
  /** Index of the CarouselItem. This changes based on dismissedItems. */
  index: number;
  /** Determines how much spacing should be between this CarouselItem and the next one. */
  spacingEnd: SpacingScale;
  /** Show the dismiss IconButton in each CarouselItem.  */
  showDismiss?: boolean;
  /** x position of the Carousel scroll view. Used to interpolate opacity of dimiss button when showDismiss is true. */
  xOffset: Animated.Value;
  totalItems: number;
  width: number;
  progressOpacity?: Animated.Value;
  onDismiss?: CarouselOnDismissItem;
  onMount: CarouselOnItemMount;
};

export const CarouselItem: React.FC<CarouselItemProps> = memo(
  ({
    children,
    id,
    index,
    spacingEnd,
    showDismiss,
    xOffset,
    totalItems,
    width,
    progressOpacity,
    onDismiss,
    onMount,
  }) => {
    const snapPoint = width * index;
    const isOnlyItem = totalItems === 1;
    const isFirstItem = index === 0;
    const isLastItem = index === totalItems - 1;
    const innerBox = useRef<View>(null);
    const isAnimating = useRef<boolean>(false);
    const hasMounted = useRef<boolean>(false);
    const [animatedStyles, setAnimatedStyles] = useState<CarouselItemAnimatedStyles>({
      opacity: new Animated.Value(1),
      width: new Animated.Value(width),
      height: undefined,
    });

    const onWrapperLayout = useCallback(() => {
      if (hasMounted.current) return;
      onMount(animatedStyles);
      hasMounted.current = true;
    }, [animatedStyles, onMount]);

    const dismissButtonStyles = useMemo(() => {
      return {
        opacity: xOffset.interpolate({
          inputRange: [snapPoint - FADE_DISTANCE, snapPoint, snapPoint + FADE_DISTANCE],
          outputRange: [isFirstItem ? 1 : 0, 1, isLastItem ? 1 : 0],
        }),
      };
    }, [isFirstItem, isLastItem, snapPoint, xOffset]);

    /** Dismiss a CarouselItem. We pass the item's index and opacity to Carousel to manage playback because Carousel has checks to guarantee we don't play multiple animations at once. */
    const handleDismiss = useCallback(
      (callbackFn?: CarouselOnDismissItem) => {
        innerBox.current?.measureInWindow((_x, _y, innerWidth, innerHeight) => {
          const stylesToAnimate = {
            opacity: new Animated.Value(1),
            height: new Animated.Value(innerHeight),
            width: new Animated.Value(innerWidth),
          } as const;
          setAnimatedStyles(stylesToAnimate);
          if (isAnimating.current) return;
          isAnimating.current = true;
          const opacityMotion = Animated.timing(stylesToAnimate.opacity, opacityConfig);
          const widthMotion = Animated.timing(stylesToAnimate.width, sizeConfig);
          const heightMotion = Animated.timing(stylesToAnimate.height, sizeConfig);
          const animations = [opacityMotion, isOnlyItem ? heightMotion : widthMotion];
          if (progressOpacity) {
            const progressExitAnimation = Animated.timing(progressOpacity, opacityConfig);
            if (totalItems === 2) {
              animations.push(progressExitAnimation);
            }
          }
          onMount(stylesToAnimate);
          Animated.parallel(animations).start(() => {
            isAnimating.current = false;
            callbackFn?.(id);
            onDismiss?.(id);
            onMount(stylesToAnimate);
          });
        });
      },
      [isOnlyItem, progressOpacity, totalItems, id, onDismiss, onMount],
    );

    const handleDismissPress = useCallback(() => {
      handleDismiss();
    }, [handleDismiss]);

    const contextValue: CarouselItemContextValue = useMemo(
      () => ({ dismiss: handleDismiss, id }),
      [handleDismiss, id],
    );

    return (
      <CarouselItemContext.Provider value={contextValue}>
        <Box
          onLayout={onWrapperLayout}
          animated
          testID={`CarouselItemWrapper-${id}`}
          dangerouslySetStyle={animatedStyles}
        >
          <Box
            animated
            ref={innerBox}
            position="relative"
            flexShrink={0}
            spacingEnd={spacingEnd}
            testID={`CarouselItemInner-${id}`}
            width={width}
          >
            {showDismiss ? (
              <CarouselControlsWrapper
                animated
                justifyContent="flex-end"
                spacingEnd={0.5}
                dangerouslySetStyle={dismissButtonStyles}
              >
                <IconButton transparent name="close" onPress={handleDismissPress} />
              </CarouselControlsWrapper>
            ) : null}
            {children}
          </Box>
        </Box>
      </CarouselItemContext.Provider>
    );
  },
);

CarouselItem.displayName = 'CarouselItem';
