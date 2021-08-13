import React, { memo } from 'react';

import { illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import { HeroSquareProps } from '@cbhq/cds-common/types/IllustrationProps';

import { Illustration } from './Illustration';

export const HeroSquare = memo(function HeroSquareIllustration({
  dimension = '240x240',
  ...props
}: HeroSquareProps) {
  const { width, height } = illustrationSizes.heroSquare[dimension];

  return <Illustration width={width} height={height} {...props} />;
});
