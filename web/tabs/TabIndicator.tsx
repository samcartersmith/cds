import { TabIndicatorProps } from '@cbhq/cds-common';
import React, { memo } from 'react';
import { VStack } from '../layout';

export const TabIndicator = memo((props: TabIndicatorProps) => {
  return <VStack {...props} />;
});

TabIndicator.displayName = 'TabIndicator';
