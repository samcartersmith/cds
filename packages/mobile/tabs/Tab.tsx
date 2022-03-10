import React, { FC, memo } from 'react';
import { TabProps } from '@cbhq/cds-common';

import { VStack } from '../layout';

import { TabLabel } from './TabLabel';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Tab: FC<TabProps> = memo(({ label, children, testID }) => {
  return (
    <VStack testID={testID}>
      <TabLabel>{label}</TabLabel>
      {children}
    </VStack>
  );
});

Tab.displayName = 'Tab';
