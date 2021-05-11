import React, { memo } from 'react';

import { mediaSize, imageSize } from '@cbhq/cds-common/tokens/cell';

import { Fallback } from '../layout';
import { CellMediaType } from './CellMedia';

export interface MediaFallbackProps {
  type: CellMediaType;
}

export const MediaFallback = memo(function MediaFallback({ type }: MediaFallbackProps) {
  if (type === 'image') {
    return <Fallback height={imageSize} width={imageSize} shape="squircle" />;
  }

  return <Fallback height={mediaSize} width={mediaSize} shape="circle" />;
});
