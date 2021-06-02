import React, { memo } from 'react';

import { CellMediaType } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { mediaSize, imageSize } from '@cbhq/cds-common/tokens/cell';

import { Fallback } from '../layout/Fallback';

export interface MediaFallbackProps {
  type: CellMediaType;
}

export const MediaFallback = memo(function MediaFallback({ type }: MediaFallbackProps) {
  const size = useScaleConditional(mediaSize);

  if (type === 'image') {
    return <Fallback height={imageSize} width={imageSize} shape="squircle" />;
  }

  return <Fallback height={size} width={size} shape="circle" />;
});
