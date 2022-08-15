import React, { memo } from 'react';
import { Document } from '@contentful/rich-text-types';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextHeadline } from '@cbhq/cds-web/typography';

import { RichText } from '../components/RichText';

export type DoDontFields = {
  description?: Document;
  dos?: Document;
  donts?: Document;
};

export const DoDont = memo(function DoDont({ description, dos, donts }: DoDontFields) {
  return (
    <VStack gap={6}>
      <RichText content={description} />
      <HStack gap={4}>
        {dos && (
          <VStack width="50%">
            <TextHeadline as="p" color="positive" spacingBottom={2}>
              Do&apos;s
            </TextHeadline>
            <RichText content={dos} />
          </VStack>
        )}
        {donts && (
          <VStack width="50%">
            <TextHeadline as="p" color="negative" spacingBottom={2}>
              Don&apos;ts
            </TextHeadline>
            <RichText content={donts} />
          </VStack>
        )}
      </HStack>
    </VStack>
  );
});
