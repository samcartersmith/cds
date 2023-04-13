import React, { memo } from 'react';
import { HeroSquare } from '@cbhq/cds-web/illustrations';
import { VStack } from '@cbhq/cds-web/layout';
import { TextHeadline } from '@cbhq/cds-web/typography';

export const AdopterComponentsEmptyState = memo(() => {
  return (
    <VStack spacing={4} maxWidth="40%" alignItems="center" gap={2}>
      <HeroSquare name="docError" />
      <TextHeadline as="h1" align="center">
        There are no components for this segment
      </TextHeadline>
    </VStack>
  );
});

AdopterComponentsEmptyState.displayName = 'AdopterComponentsEmptyState';
