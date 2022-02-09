import { TabProps } from '@cbhq/cds-common';
import React, { memo, FC } from 'react';
import { VStack } from '../layout';
import { TabLabel } from './TabLabel';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Tab: FC<TabProps> = memo(({ label, id, ...props }) => {
  return (
    <VStack>
      <TabLabel>{label}</TabLabel>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </VStack>
  );
});

Tab.displayName = 'Tab';
