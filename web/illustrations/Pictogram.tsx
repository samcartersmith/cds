import React, { memo } from 'react';

import { PictogramProps } from '@cbhq/cds-common/types/IllustrationProps';
import { getIllustrationScaledDimension } from '@cbhq/cds-common/utils/getIllustrationScaledDimension';

import { Illustration } from './Illustration';

export const Pictogram = memo(function Pictogram({
  dimension = '48x48',
  scaleMultiplier,
  ...props
}: PictogramProps) {
  const { width, height } = getIllustrationScaledDimension(dimension, 'pictogram', scaleMultiplier);

  return <Illustration width={width} height={height} {...props} />;
});
