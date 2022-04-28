import React from 'react';
import { HStack, Spacer } from '@cbhq/cds-web/layout';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

import type { ParsedProp } from '../scripts/docgenParser';

export function ParentType({ name, description }: ParsedProp) {
  return (
    <HStack gap={1} alignItems="center">
      <TextLabel1 as="p">{name}</TextLabel1>
      <Spacer />
      <TextLabel2 as="p" color="foregroundMuted">
        {description}
      </TextLabel2>
    </HStack>
  );
}
