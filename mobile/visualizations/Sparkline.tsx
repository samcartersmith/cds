import React, { memo } from 'react';

import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { SparklineBaseProps } from '@cbhq/cds-common/types';
import Svg, { Path } from 'react-native-svg';

import { useAccessibleForeground } from '../color/useAccessibleForeground';

export const Sparkline = memo(({ background, color, height, path, width }: SparklineBaseProps) => {
  const stroke = useAccessibleForeground({ background, color, usage: 'graphic' });
  return (
    <Svg width={width} height={height}>
      <Path
        d={path}
        stroke={stroke}
        strokeWidth={borderWidth.sparkline}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
});

Sparkline.displayName = 'Sparkline';
