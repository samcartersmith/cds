import React from 'react';
import type { Props } from '@theme/DocRoot/Layout/Main';
import { HStack } from '@cbhq/cds-web2/layout';

export default function DocRootLayoutMain({ children }: Props): JSX.Element {
  return (
    <HStack alignItems="flex-start" as="main" gap={5}>
      {children}
    </HStack>
  );
}
