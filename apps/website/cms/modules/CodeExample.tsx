import React, { memo } from 'react';
import { Document } from '@contentful/rich-text-types';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { VStack } from '@cbhq/cds-web/layout';
import { TextBody } from '@cbhq/cds-web/typography';
import Heading from '@cbhq/docusaurus-theme/src/theme/Heading';

import { CodePlayground } from '../misc/CodePlayground';
import type { MediaAssetFields } from '../misc/MediaAsset';
import type { RichTextProps } from '../misc/RichText';

export type CodeExampleFields = {
  title: string;
  richTextDescription?: Entry<RichTextProps>[];
  description?: string;
  code?: Document;
  image?: Entry<MediaAssetFields>[];
  readOnly?: boolean;
  editorStartsExpanded?: boolean;
};

export const CodeExample = memo(function CodeExample({
  title,
  richTextDescription,
  description,
  code,
  image,
  readOnly = false,
  editorStartsExpanded = false,
}: CodeExampleFields) {
  return (
    <VStack gap={2}>
      <Heading as="h3">{title}</Heading>
      {richTextDescription && <CMSContent content={richTextDescription} />}
      {description && (
        <TextBody as="p" color="foregroundMuted">
          {description}
        </TextBody>
      )}
      {image && <CMSContent content={image} />}
      {code && (
        <CodePlayground
          code={code}
          readOnly={readOnly}
          editorStartsExpanded={editorStartsExpanded}
        />
      )}
    </VStack>
  );
});
