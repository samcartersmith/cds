import React, { memo } from 'react';
import { Document } from '@contentful/rich-text-types';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextHeadline } from '@cbhq/cds-web/typography';

import { RichText } from '../misc/RichText';

import { MediaContentFields } from './MediaContent';

export type DoDontFields = {
  description?: Document;
  dos?: Document;
  donts?: Document;
  doDontWithMedia?: Entry<MediaContentFields>[];
};

export const DoDont = memo(function DoDont({
  description,
  dos,
  donts,
  doDontWithMedia,
}: DoDontFields) {
  return (
    <VStack gap={6}>
      <RichText content={description} />
      {(dos || donts) && (
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
      )}
      {doDontWithMedia && (
        <VStack gap={3}>
          <CMSContent content={doDontWithMedia} />
        </VStack>
      )}
    </VStack>
  );
});
