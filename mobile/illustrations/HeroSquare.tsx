import React, { memo } from 'react';

import { illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import { HeroSquareProps } from '@cbhq/cds-common/types/IllustrationProps';

import { Illustration } from './Illustration';

export const HeroSquare = memo(function HeroSquareIllustration(props: HeroSquareProps) {
  return (
    <Illustration
      width={illustrationSizes.heroSquare.width}
      height={illustrationSizes.heroSquare.height}
      {...props}
    />
  );
});
