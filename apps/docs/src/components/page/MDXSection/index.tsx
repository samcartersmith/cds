import React from 'react';
import { VStack } from '@cbhq/cds-web2/layout';

export function MDXSection({ children }: { children: React.ReactNode }) {
  return (
    <VStack as="section" background="bgAlternate" borderRadius={500} overflow="hidden">
      {children}
    </VStack>
  );
}
