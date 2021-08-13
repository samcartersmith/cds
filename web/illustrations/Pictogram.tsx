import React, { memo } from 'react';

import { illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import { PictogramProps } from '@cbhq/cds-common/types/IllustrationProps';

import { Illustration } from './Illustration';

export const Pictogram = memo(function Pictogram({
  dimension = '48x48',
  ...props
}: PictogramProps) {
  const { width, height } = illustrationSizes.pictogram[dimension];

  return <Illustration width={width} height={height} {...props} />;
});
