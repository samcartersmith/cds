import React, { memo } from 'react';
import { CellMediaType, SharedProps } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { imageSize, mediaSize } from '@cbhq/cds-common/tokens/cell';

import { Fallback } from '../layout/Fallback';

export type MediaFallbackProps = {
  type: CellMediaType;
} & SharedProps;

export const MediaFallback = memo(function MediaFallback({ type, testID }: MediaFallbackProps) {
  const mediaSizeScaled = useScaleConditional(mediaSize);
  const imageSizeScaled = useScaleConditional(imageSize);

  if (type === 'image') {
    return <Fallback height={imageSizeScaled} width={imageSizeScaled} shape="squircle" />;
  }

  return (
    <Fallback testID={testID} height={mediaSizeScaled} width={mediaSizeScaled} shape="circle" />
  );
});
