import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';

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
        activeBackground = 'bgInverse',
        background = 'bgSecondary',
        borderRadius = 1000,
        ...props
      }: SegmentedTabsProps,
      ref: React.ForwardedRef<View>,
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
