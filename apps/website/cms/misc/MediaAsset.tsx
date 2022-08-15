import React, { memo } from 'react';
import { Asset } from 'contentful';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { VStack } from '@cbhq/cds-web/layout';
import { TextBody } from '@cbhq/cds-web/typography';

export type MediaAssetFields = {
  light: Asset;
  dark?: Asset;
};

export const MediaAsset = memo(function MediaAsset({ light, dark = light }: MediaAssetFields) {
  const source = useSpectrumConditional({ light, dark });
  const { file, description, title } = source.fields;
  return (
    <VStack gap={1}>
      <img src={file.url} alt={description ?? title} />
      {description && (
        <TextBody as="p" color="foregroundMuted">
          {description}
        </TextBody>
      )}
    </VStack>
  );
});
