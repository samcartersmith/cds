import React from 'react';

import { type TabsActiveIndicatorProps, TabsActiveIndicator } from './Tabs';

export type SegmentedTabsActiveIndicatorProps = TabsActiveIndicatorProps;

export const SegmentedTabsActiveIndicator = ({
  borderRadius = 1000,
  ...props
}: SegmentedTabsActiveIndicatorProps) => {
  return <TabsActiveIndicator borderRadius={borderRadius} {...props} />;
};
