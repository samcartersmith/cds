import React, { memo } from 'react';
import { HeroSquare } from '@cbhq/cds-web/illustrations';
import { VStack } from '@cbhq/cds-web/layout';
import { TextHeadline } from '@cbhq/cds-web/typography';

export const AdopterComponentsEmptyState = memo(() => {
  return (
    <VStack alignItems="center" gap={2} maxWidth="40%" spacing={4}>
      <HeroSquare name="docError" />
      <TextHeadline align="center" as="h1">
        There are no components for this segment
      </TextHeadline>
    </VStack>
  );
});

AdopterComponentsEmptyState.displayName = 'AdopterComponentsEmptyState';
