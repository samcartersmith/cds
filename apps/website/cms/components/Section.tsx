import React, { memo, ReactNode } from 'react';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import Heading from '@cbhq/docusaurus-theme/src/theme/Heading';

import type { SectionFields } from '../modules/TabItem';

import { Divider } from './Divider';

export type SectionProps = {
  title?: string;
  children: ReactNode;
} & Pick<SectionFields, 'gap' | 'direction'>;

export const Section = memo(function Section({
  title,
  children,
  direction = 'vertical',
  gap = 3,
}: SectionProps) {
  const Stack = direction === 'horizontal' ? HStack : VStack;

  return (
    <VStack>
      <Heading as="h2">{title}</Heading>
      <Stack gap={gap}>{children}</Stack>
      <Divider />
    </VStack>
  );
});
