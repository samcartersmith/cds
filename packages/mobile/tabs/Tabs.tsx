import React, { FC, memo } from 'react';
import { TabsProps } from '@cbhq/cds-common';

import { VStack } from '../layout';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Tabs: FC<TabsProps> = memo(({ children, testID }) => {
  return <VStack testID={testID}>{children}</VStack>;
});

Tabs.displayName = 'Tabs';
