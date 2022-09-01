import React, { memo, ReactNode } from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import Heading from '@cbhq/docusaurus-theme/src/theme/Heading';

import { Divider } from './Divider';

export type SectionProps = {
  title: string;
  children: ReactNode;
  hideDivider?: boolean;
};

export const Section = memo(function Section({
  title,
  children,
  hideDivider = false,
}: SectionProps) {
  return (
    <VStack>
      <Heading as="h2">{title}</Heading>
      {children}
      {!hideDivider && <Divider />}
    </VStack>
  );
});
