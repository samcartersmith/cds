import React, { memo } from 'react';

import { SpotSquareProps } from '@cbhq/cds-common/types/IllustrationProps';
import { getIllustrationScaledDimension } from '@cbhq/cds-common/utils/getIllustrationScaledDimension';

import { Illustration } from './Illustration';

export const SpotSquare = memo(function SpotSquare({
  dimension = '120x120',
  scaleMultiplier,
  ...props
}: SpotSquareProps) {
  const { width, height } = getIllustrationScaledDimension(
    dimension,
    'spotSquare',
    scaleMultiplier,
  );

  return <Illustration width={width} height={height} {...props} />;
});
