import React, { memo } from 'react';
import { CellMediaType } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { imageSize, mediaSize } from '@cbhq/cds-common/tokens/cell';

import { Fallback } from '../layout/Fallback';

export type MediaFallbackProps = {
  type: CellMediaType;
};

export const MediaFallback = memo(function MediaFallback({ type }: MediaFallbackProps) {
  const mediaSizeScaled = useScaleConditional(mediaSize);
  const imageSizeScaled = useScaleConditional(imageSize);

  if (type === 'image') {
    return <Fallback height={imageSizeScaled} width={imageSizeScaled} shape="squircle" />;
  }

  return <Fallback height={mediaSizeScaled} width={mediaSizeScaled} shape="circle" />;
});
