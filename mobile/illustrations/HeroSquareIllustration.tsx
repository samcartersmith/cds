import React, { memo } from 'react';

import { IllustrationHeroSquareNames } from '@cbhq/cds-common/types/Illustration';

import { Illustration, IllustrationProps } from './Illustration';

interface HeroSquareIllustrationProps extends Omit<IllustrationProps, 'name'> {
  name: IllustrationHeroSquareNames;
}

export const HeroSquareIllustration = memo(function HeroSquareIllustration(
  props: HeroSquareIllustrationProps
) {
  return <Illustration {...props} />;
});
