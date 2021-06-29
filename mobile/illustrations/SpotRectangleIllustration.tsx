import React, { memo } from 'react';

import { IllustrationSpotRectangleNames } from '@cbhq/cds-common/types/Illustration';

import { Illustration, IllustrationProps } from './Illustration';

interface SpotRectangleIllustrationProps extends Omit<IllustrationProps, 'name'> {
  name: IllustrationSpotRectangleNames;
}

export const SpotRectangleIllustration = memo(function SpotRectangleIllustration(
  props: SpotRectangleIllustrationProps
) {
  return <Illustration {...props} />;
});
