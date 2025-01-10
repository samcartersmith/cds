import React, { memo } from 'react';
import { imageSize, mediaSize } from '@cbhq/cds-common2/tokens/cell';
import { type CellMediaType } from '@cbhq/cds-common2/types/CellBaseProps';
import { type SharedProps } from '@cbhq/cds-common2/types/SharedProps';

import { Fallback } from '../layout/Fallback';

export type MediaFallbackProps = {
  type: CellMediaType;
} & SharedProps;

export const MediaFallback = memo(function MediaFallback({ type, testID }: MediaFallbackProps) {
  if (type === 'image') {
    return <Fallback height={imageSize} shape="squircle" testID={testID} width={imageSize} />;
  }

  return <Fallback height={mediaSize} shape="circle" testID={testID} width={mediaSize} />;
});
