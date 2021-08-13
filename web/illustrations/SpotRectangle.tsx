import React, { memo } from 'react';

import { illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import { SpotRectangleProps } from '@cbhq/cds-common/types/IllustrationProps';

import { Illustration } from './Illustration';

export const SpotRectangle = memo(function SpotRectangle({
  dimension = '240x120',
  ...props
}: SpotRectangleProps) {
  const { width, height } = illustrationSizes.spotRectangle[dimension];

  return <Illustration width={width} height={height} {...props} />;
});
