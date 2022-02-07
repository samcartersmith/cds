import { TabProps } from '@cbhq/cds-common';
import React, { memo, FC } from 'react';
import { VStack } from '../layout';
import { TabLabel } from './TabLabel';

export const Tab: FC<TabProps> = memo(({ label, children, testID }) => {
  return (
    <VStack testID={testID}>
      <TabLabel>{label}</TabLabel>
      {children}
    </VStack>
  );
});

Tab.displayName = 'Tab';
