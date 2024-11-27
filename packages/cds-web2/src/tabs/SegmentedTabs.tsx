import React, { forwardRef, memo } from 'react';

import { SegmentedTab } from './SegmentedTab';
import { SegmentedTabsActiveIndicator } from './SegmentedTabsActiveIndicator';
import { type TabsProps, Tabs } from './Tabs';

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
        activeBackground = 'backgroundInverse',
        background = 'backgroundSecondary',
        borderRadius = 'roundedFull',
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
