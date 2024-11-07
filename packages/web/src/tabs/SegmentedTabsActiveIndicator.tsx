import React from 'react';

import { type TabsActiveIndicatorProps, TabsActiveIndicator } from './Tabs';

export type SegmentedTabsActiveIndicatorProps = TabsActiveIndicatorProps;

export const SegmentedTabsActiveIndicator = ({
  borderRadius = 'roundedFull',
  ...props
}: SegmentedTabsActiveIndicatorProps) => {
  return <TabsActiveIndicator borderRadius={borderRadius} {...props} />;
};
