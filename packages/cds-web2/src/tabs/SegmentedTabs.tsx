import React, { forwardRef, memo } from 'react';

import { SegmentedTab } from './SegmentedTab';
import { SegmentedTabsActiveIndicator } from './SegmentedTabsActiveIndicator';
import { Tabs, type TabsProps } from './Tabs';

export type SegmentedTabsProps = Partial<
  Pick<TabsProps, 'TabComponent' | 'TabsActiveIndicatorComponent'>
> &
  Omit<TabsProps, 'TabComponent' | 'TabsActiveIndicatorComponent'>;

export const SegmentedTabs = memo(
  forwardRef(
    (
      {
        TabComponent = SegmentedTab,
        TabsActiveIndicatorComponent = SegmentedTabsActiveIndicator,
        activeBackground = 'bgInverse',
        background = 'bgSecondary',
        borderRadius = 1000,
        ...props
      }: SegmentedTabsProps,
      ref: React.ForwardedRef<HTMLElement>,
    ) => (
      <Tabs
        ref={ref}
        TabComponent={TabComponent}
        TabsActiveIndicatorComponent={TabsActiveIndicatorComponent}
        activeBackground={activeBackground}
        background={background}
        borderRadius={borderRadius}
        {...props}
      />
    ),
  ),
);

SegmentedTabs.displayName = 'SegmentedTabs';
