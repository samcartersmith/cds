import React, { memo } from 'react';
import { LiveProviderProps } from 'react-live';
import { Entry, EntryFields } from 'contentful';
import { CMSContent } from '@cb/cms';
import { VStack } from '@cbhq/cds-web/layout';
import { TextBody } from '@cbhq/cds-web/typography';
import Heading from '@cbhq/docusaurus-theme/src/theme/Heading';
import Playground from '@cbhq/docusaurus-theme/src/theme/Playground';

import ReactLiveScope from '../../src/theme/ReactLiveScope';
import { Divider } from '../components/Divider';
import type { MediaAssetFields } from '../misc/MediaAsset';

export type CodeExampleFields = {
  title: string;
  description?: string;
  code?: EntryFields.RichText;
  image?: Entry<MediaAssetFields>[];
};

const getCode = (code: CodeExampleFields['code']) => {
  return code?.content?.[0].content?.[0].value ?? '';
};

export const CodeExample = memo(function CodeExample({
  title,
  description,
  code,
  image,
}: CodeExampleFields) {
  return (
    <VStack gap={2}>
      <Heading as="h3">{title}</Heading>
      {description && (
        <TextBody as="p" color="foregroundMuted">
          {description}
        </TextBody>
      )}
      {code && (
        <>
          <Playground scope={ReactLiveScope as LiveProviderProps['scope']}>
            {getCode(code)}
          </Playground>
          <Divider
            spacingTop={2} // <Playground /> has spacing bottom 4 + gap 2
          />
        </>
      )}
      {image && (
        <>
          <CMSContent content={image} />
          <Divider />
        </>
      )}
    </VStack>
  );
});
