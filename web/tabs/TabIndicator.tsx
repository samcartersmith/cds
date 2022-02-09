import { TabIndicatorProps } from '@cbhq/cds-common';
import React, { memo } from 'react';
import { VStack } from '../layout';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabIndicator = memo((props: TabIndicatorProps) => {
  return <VStack {...props} />;
});

TabIndicator.displayName = 'TabIndicator';
