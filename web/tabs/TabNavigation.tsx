import { TabNavigationProps, useToggler } from '@cbhq/cds-common';
import { noop } from '@cbhq/cds-utils';
import React, { useEffect, useRef, useMemo, memo, useCallback } from 'react';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { css } from 'linaria';
import { HStack, VStack } from '../layout';
import { TabIndicator } from './TabIndicator';
import { useTabLabels } from './hooks/useTabLabels';
import { Paddle } from './Paddle';
import { useDimensions } from '../hooks/useDimensions';

const SCROLL_PADDING = 5; // How much breathing room do we want before showing the paddles
const scrollContainerClassName = css`
  overflow-y: hidden;
  overflow-x: scroll;
`;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabNavigation = memo(
  ({ tabs, value, variant = 'primary', testID, onChange = noop, ...rest }: TabNavigationProps) => {
    const scrollRef = useRef<HTMLElement>(null);
    const { observe, width } = useDimensions();
    const end = Number(scrollRef.current?.scrollWidth) - Number(scrollRef.current?.offsetWidth);
    const canScrollRight = Number(scrollRef.current?.scrollLeft) < end;
    const [leftPaddle, toggleLeftPaddle] = useToggler(false);
    const [rightPaddle, toggleRightPaddle] = useToggler(canScrollRight);
    const isDense = useScaleDensity() === 'dense';
    const isPrimary = useMemo(() => variant === 'primary', [variant]);
    const shouldOverrideScale = useMemo(() => isDense && isPrimary, [isDense, isPrimary]);
    const { tabLabels, tabIndicatorProps } = useTabLabels({ tabs, value, variant, onChange });

    const handleOnScroll = useCallback(() => {
      const scrollDistance = Number(scrollRef.current?.scrollLeft);
      const endTrigger = end - SCROLL_PADDING;
      const startTrigger = SCROLL_PADDING;

      // Hide/show the left paddle
      if (scrollDistance > startTrigger && !leftPaddle) {
        toggleLeftPaddle.toggleOn();
      }
      if (scrollDistance <= startTrigger && leftPaddle) {
        toggleLeftPaddle.toggleOff();
      }

      // Hide/show the right paddle
      if (scrollDistance < endTrigger && !rightPaddle) {
        toggleRightPaddle.toggleOn();
      }
      if (scrollDistance >= endTrigger && rightPaddle) {
        toggleRightPaddle.toggleOff();
      }
    }, [end, leftPaddle, rightPaddle, toggleLeftPaddle, toggleRightPaddle]);

    useEffect(() => {
      handleOnScroll();
    }, [handleOnScroll, width]);

    const handleScrollLeft = useCallback(() => {
      scrollRef?.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }, [scrollRef]);
    const handleScrollRight = useCallback(() => {
      scrollRef?.current?.scrollTo({ left: end, behavior: 'smooth' });
    }, [end]);

    return (
      <div ref={observe}>
        <HStack
          ref={scrollRef}
          onScroll={handleOnScroll}
          alignItems="center"
          position="relative"
          dangerouslySetClassName={scrollContainerClassName}
        >
          <Paddle show={leftPaddle} onPress={handleScrollLeft} variant={variant} />
          <VStack testID={testID} {...rest} spacing={0}>
            {shouldOverrideScale ? (
              <ScaleProvider value="large">
                <HStack role="tablist" gap={4} flexShrink={0}>
                  {tabLabels}
                </HStack>
              </ScaleProvider>
            ) : (
              <HStack role="tablist" gap={4} flexShrink={0}>
                {tabLabels}
              </HStack>
            )}
            {isPrimary && <TabIndicator {...tabIndicatorProps} />}
          </VStack>
          <Paddle
            direction="right"
            show={rightPaddle}
            onPress={handleScrollRight}
            variant={variant}
          />
        </HStack>
      </div>
    );
  },
);

TabNavigation.displayName = 'TabNavigation';
