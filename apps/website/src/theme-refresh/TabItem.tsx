import React from 'react';
import type { Props } from '@theme/TabItem';
import { VStack } from '@cbhq/cds-web/layout';

export default function TabItem({ children, hidden }: Props): JSX.Element {
  return (
    <VStack gap={3} role="tabpanel" {...{ hidden }} display={hidden ? 'none' : undefined}>
      {children}
    </VStack>
  );
}
