import React, { memo } from 'react';

import { illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import { SpotRectangleProps } from '@cbhq/cds-common/types/IllustrationProps';

import { Illustration } from './Illustration';

export const SpotSquare = memo(function SpotSquare(props: SpotRectangleProps) {
  return (
    <Illustration
      width={illustrationSizes.spotSquare.width}
      height={illustrationSizes.spotSquare.height}
      {...props}
    />
  );
});
