import React, { memo } from 'react';

import { HeroSquareProps } from '@cbhq/cds-common/types/IllustrationProps';
import { getIllustrationScaledDimension } from '@cbhq/cds-common/utils/getIllustrationScaledDimension';

import { Illustration } from './Illustration';

export const HeroSquare = memo(function HeroSquareIllustration({
  dimension = '240x240',
  scaleMultiplier,
  ...props
}: HeroSquareProps) {
  const { width, height } = getIllustrationScaledDimension(
    dimension,
    'heroSquare',
    scaleMultiplier,
  );

  return <Illustration width={width} height={height} {...props} />;
});
