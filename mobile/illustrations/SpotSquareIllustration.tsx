import React, { memo } from 'react';

import { IllustrationSpotSquareNames } from '@cbhq/cds-common/types/Illustration';

import { Illustration, IllustrationProps } from './Illustration';

interface SpotSquareIllustrationProps extends Omit<IllustrationProps, 'name'> {
  name: IllustrationSpotSquareNames;
}

export const SpotSquareIllustration = memo(function SpotSquareIllustration(
  props: SpotSquareIllustrationProps
) {
  return <Illustration {...props} />;
});
