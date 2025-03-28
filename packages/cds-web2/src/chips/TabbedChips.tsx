import React, { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import { css } from '@linaria/core';
import { useTabsContext } from '@cbhq/cds-common2/tabs/TabsContext';
import { TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import type { TabbedChipsBaseProps } from '@cbhq/cds-common2/types';

import { useDimensions } from '../hooks/useDimensions';
import { HStack } from '../layout';
import { Paddle, Tabs } from '../tabs';

import { Chip } from './Chip';

const scrollPadding = 5;

const scrollContainerStyles = css`
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabComponent = ({ label = '', id, ...tabProps }: TabValue) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = activeTab?.id === id;
  const handleClick = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);
  return (
    <Chip inverted={isActive} onClick={handleClick} width="max-content" {...tabProps}>
      {label}
    </Chip>
  );
};

const TabsActiveIndicatorComponent = () => {
  return null;
};

export const TabbedChips = memo(
  forwardRef(function TabbedChips(
    {
      tabs,
      value,
      onChange,
      Component = TabComponent,
      paddleStyle,
      width: widthProp = '100%',
      ...props
    }: TabbedChipsBaseProps,
    ref: React.ForwardedRef<HTMLElement | null>,
  ) {
    const activeTab = useMemo(() => tabs.find((tab) => tab.id === value), [tabs, value]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const end = Number(scrollRef.current?.scrollWidth) - Number(scrollRef.current?.offsetWidth);
    const canScrollRight = Number(scrollRef.current?.scrollLeft) < end;
    const [showLeftPaddle, setShowLeftPaddle] = useState(false);
    const [showRightPaddle, setShowRightPaddle] = useState(canScrollRight);
    const handleChange = useCallback(
      (tabValue: TabValue | null) => {
        if (tabValue) onChange?.(tabValue.id);
      },
      [onChange],
    );

    const handleOnScroll = useCallback(() => {
      const scrollDistance = Number(scrollRef.current?.scrollLeft);
      const endTrigger = end - scrollPadding;
      const startTrigger = scrollPadding;

      // Hide/show the left paddle
      if (scrollDistance > startTrigger) setShowLeftPaddle(true);
      else if (scrollDistance <= startTrigger) setShowLeftPaddle(false);

      // Hide/show the right paddle
      if (scrollDistance < endTrigger) setShowRightPaddle(true);
      else if (scrollDistance >= endTrigger) setShowRightPaddle(false);
    }, [end]);

    if (canScrollRight && !showRightPaddle) {
      const scrollLeft = Number(scrollRef.current?.scrollLeft);
      const endTrigger = end - scrollPadding;
      if (scrollLeft < endTrigger) {
        setShowRightPaddle(true);
      }
    }

    const { observe } = useDimensions({ onResize: handleOnScroll });

    const handleScrollLeft = useCallback(() => {
      scrollRef?.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }, [scrollRef]);
    const handleScrollRight = useCallback(() => {
      scrollRef?.current?.scrollTo({ left: end, behavior: 'smooth' });
    }, [end]);

    return (
      <HStack ref={observe} alignItems="center" position="relative" width={widthProp}>
        <Paddle
          accessibilityLabel="Previous"
          background="bg"
          direction="left"
          onClick={handleScrollLeft}
          paddleStyle={paddleStyle}
          show={showLeftPaddle}
          variant="secondary"
        />
        <HStack
          ref={scrollRef}
          alignItems="center"
          className={scrollContainerStyles}
          onScroll={handleOnScroll}
          // TODO: this overflow styling is necessary for the Paddle feature but cuts off child Chips' focus ring
          overflow="auto"
        >
          <Tabs
            ref={ref}
            TabComponent={Component}
            TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
            activeTab={activeTab || null}
            gap={1}
            onChange={handleChange}
            role="radiogroup"
            tabs={tabs}
            {...props}
          />
        </HStack>
        <Paddle
          accessibilityLabel="Next"
          background="bg"
          direction="right"
          onClick={handleScrollRight}
          paddleStyle={paddleStyle}
          show={showRightPaddle}
          variant="secondary"
        />
      </HStack>
    );
  }),
);
