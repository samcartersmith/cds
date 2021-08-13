import React, { memo } from 'react';

import { illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import { SpotSquareProps } from '@cbhq/cds-common/types/IllustrationProps';

import { Illustration } from './Illustration';

export const SpotSquare = memo(function SpotSquare({
  dimension = '120x120',
  ...props
}: SpotSquareProps) {
  const { width, height } = illustrationSizes.spotSquare[dimension];
  return <Illustration width={width} height={height} {...props} />;
});
