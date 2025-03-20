import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';

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
        activeBackground = 'backgroundInverse',
        background = 'secondary',
        borderRadius = 'roundedFull',
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
