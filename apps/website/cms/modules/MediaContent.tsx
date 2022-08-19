import React, { memo } from 'react';
import { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { HStack, VStack } from '@cbhq/cds-web/layout';

import { MediaAssetFields } from '../misc/MediaAsset';
import { TextBlock, TextBlockFields } from '../misc/TextBlock';

export type MediaContentFields = {
  layout: 'horizontal' | 'vertical';
  media?: Entry<MediaAssetFields>[];
} & TextBlockFields;

export const MediaContent = memo(function MediaContent({
  title,
  description,
  layout,
  media,
}: MediaContentFields) {
  const isHorizontal = layout === 'horizontal';
  const Stack = isHorizontal ? HStack : VStack;

  return (
    <Stack gap={4}>
      <TextBlock title={title} description={description} width={isHorizontal ? '30%' : 'auto'} />
      <VStack width={isHorizontal ? '70%' : 'auto'}>
        {media?.map((asset) => (
          // ID: miscMediaAsset
          <CMSContent key={asset.sys.id} content={asset} />
        ))}
      </VStack>
    </Stack>
  );
});
