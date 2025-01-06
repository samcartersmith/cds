import React, { memo } from 'react';
import { CellMediaType, SharedProps } from '@cbhq/cds-common2';
import { imageSize, mediaSize } from '@cbhq/cds-common2/tokens/cell';

import { Fallback } from '../layout/Fallback';

export type MediaFallbackProps = {
  type: CellMediaType;
} & SharedProps;

export const MediaFallback = memo(function MediaFallback({ type, testID }: MediaFallbackProps) {
  if (type === 'image') {
    return <Fallback height={imageSize} shape="squircle" width={imageSize} />;
  }

  return <Fallback height={mediaSize} shape="circle" testID={testID} width={mediaSize} />;
});
