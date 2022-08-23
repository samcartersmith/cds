import React, { memo } from 'react';
import { Asset } from 'contentful';
import { DimensionValue } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { VStack } from '@cbhq/cds-web/layout';
import { RemoteImage } from '@cbhq/cds-web/media';
import { TextBody } from '@cbhq/cds-web/typography';

export type MediaAssetFields = {
  light: Asset;
  dark?: Asset;
  width?: DimensionValue;
  height?: DimensionValue;
};

export const MediaAsset = memo(function MediaAsset({
  light,
  dark = light,
  width = '100%',
  height,
}: MediaAssetFields) {
  const source = useSpectrumConditional({ light, dark });
  const { file, description, title } = source.fields;
  return (
    <VStack gap={1}>
      <RemoteImage source={file.url} alt={description ?? title} width={width} height={height} />
      {description && (
        <TextBody as="p" color="foregroundMuted">
          {description}
        </TextBody>
      )}
    </VStack>
  );
});
