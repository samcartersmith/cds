import React, { memo } from 'react';

import { illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import { PictogramProps } from '@cbhq/cds-common/types/IllustrationProps';

import { Illustration } from './Illustration';

export const Pictogram = memo(function Pictogram(props: PictogramProps) {
  return (
    <Illustration
      width={illustrationSizes.pictogram.width}
      height={illustrationSizes.pictogram.height}
      {...props}
    />
  );
});
