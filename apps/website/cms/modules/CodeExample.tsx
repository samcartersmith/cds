import React, { memo } from 'react';
import { LiveProviderProps } from 'react-live';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Document } from '@contentful/rich-text-types';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { VStack } from '@cbhq/cds-web/layout';
import { TextBody } from '@cbhq/cds-web/typography';
import Heading from '@cbhq/docusaurus-theme/src/theme/Heading';
import Playground from '@cbhq/docusaurus-theme/src/theme/Playground';

import ReactLiveScope from '../../src/theme/ReactLiveScope';
import type { MediaAssetFields } from '../misc/MediaAsset';

export type CodeExampleFields = {
  title: string;
  description?: string;
  code?: Document;
  image?: Entry<MediaAssetFields>[];
  readOnly?: boolean;
};

export const CodeExample = memo(function CodeExample({
  title,
  description,
  code,
  image,
  readOnly = false,
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
        // <Playground /> has spacing bottom 3 + gap 1, offset it to have consistent spacing
        <VStack offsetBottom={4}>
          <Playground
            scope={ReactLiveScope as LiveProviderProps['scope']}
            disabled={readOnly}
            hidePreview={readOnly}
          >
            {documentToPlainTextString(code, '\n')}
          </Playground>
        </VStack>
      )}
      {image && <CMSContent content={image} />}
    </VStack>
  );
});
