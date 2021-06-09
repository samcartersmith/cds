import React, { memo } from 'react';

import { IllustrationSpotRectangleNames } from '@cbhq/cds-common/types/Illustration';

import { Illustration, IllustrationProps } from './Illustration';

interface SpotRectangleIllustrationProps extends Omit<IllustrationProps, 'name'> {
  name: IllustrationSpotRectangleNames;
}

export const SpotRectangleIllustration = memo(function SpotRectangleIllustration({
  name,
  testID,
}: SpotRectangleIllustrationProps) {
  return <Illustration name={name} testID={testID} />;
});
