import React, { memo } from 'react';

import { illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import { SpotRectangleProps } from '@cbhq/cds-common/types/IllustrationProps';

import { Illustration } from './Illustration';

export const SpotRectangle = memo(function SpotRectangle(props: SpotRectangleProps) {
  return (
    <Illustration
      width={illustrationSizes.spotRectangle.width}
      height={illustrationSizes.spotRectangle.height}
      {...props}
    />
  );
});
