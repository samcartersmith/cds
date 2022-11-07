import React, { memo } from 'react';
import { CellMediaType } from '@cbhq/cds-common';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { imageSize, mediaSize } from '@cbhq/cds-common/tokens/cell';

import { Fallback, FallbackProps } from '../layout/Fallback';

export type MediaFallbackProps = {
  type: CellMediaType;
} & Pick<FallbackProps, 'dangerouslySetIterations'>;

export const MediaFallback = memo(function MediaFallback({
  type,
  dangerouslySetIterations = 10,
}: MediaFallbackProps) {
  const mediaSizeScaled = useScaleConditional(mediaSize);
  const imageSizeScaled = useScaleConditional(imageSize);

  if (type === 'image') {
    return (
      <Fallback
        dangerouslySetIterations={dangerouslySetIterations}
        height={imageSizeScaled}
        width={imageSizeScaled}
        shape="squircle"
      />
    );
  }

  return (
    <Fallback
      dangerouslySetIterations={dangerouslySetIterations}
      height={mediaSizeScaled}
      width={mediaSizeScaled}
      shape="circle"
    />
  );
});
