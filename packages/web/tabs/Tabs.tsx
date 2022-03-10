import { TabsProps } from '@cbhq/cds-common';
import React, { memo, FC } from 'react';
import { VStack } from '../layout';
import { TextDisplay1, TextBody } from '../typography';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Tabs: FC<TabsProps> = memo((props) => {
  return (
    <VStack>
      <TextDisplay1 as="h1">Tabs</TextDisplay1>
      <TextBody as="pre">{JSON.stringify(props, null, 2)}</TextBody>
    </VStack>
  );
});

Tabs.displayName = 'Tabs';
