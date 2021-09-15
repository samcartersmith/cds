import React, { memo } from 'react';

import { SpotRectangleProps } from '@cbhq/cds-common/types/IllustrationProps';
import { getIllustrationScaledDimension } from '@cbhq/cds-common/utils/getIllustrationScaledDimension';

import { Illustration } from './Illustration';

export const SpotRectangle = memo(function SpotRectangle({
  dimension = '240x120',
  scaleMultiplier,
  ...props
}: SpotRectangleProps) {
  const { width, height } = getIllustrationScaledDimension(
    dimension,
    'spotRectangle',
    scaleMultiplier,
  );

  return <Illustration width={width} height={height} {...props} />;
});
