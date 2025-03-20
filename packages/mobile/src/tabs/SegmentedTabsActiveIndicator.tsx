import React from 'react';

import { TabsActiveIndicator, type TabsActiveIndicatorProps } from './Tabs';

export type SegmentedTabsActiveIndicatorProps = TabsActiveIndicatorProps;

export const SegmentedTabsActiveIndicator = ({
  borderRadius = 'roundedFull',
  ...props
}: SegmentedTabsActiveIndicatorProps) => {
  return <TabsActiveIndicator borderRadius={borderRadius} {...props} />;
};
