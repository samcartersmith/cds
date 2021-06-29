import React, { memo } from 'react';

import { IllustrationPictogramNames } from '@cbhq/cds-common/types/Illustration';

import { Illustration, IllustrationProps } from './Illustration';

interface PictogramIllustrationProps extends Omit<IllustrationProps, 'name'> {
  name: IllustrationPictogramNames;
}

export const PictogramIllustration = memo(function PictogramIllustration(
  props: PictogramIllustrationProps
) {
  return <Illustration {...props} />;
});
