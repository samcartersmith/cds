import React, { memo } from 'react';

import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { SparklineBaseProps } from '@cbhq/cds-common/types';
import Svg, { Path } from 'react-native-svg';

import { useAccessibleForeground } from '../color/useAccessibleForeground';
import { Fallback } from '../layout/Fallback';

type SparklineFallbackProps = Pick<SparklineBaseProps, 'height' | 'width'>;

export const Sparkline = memo(({ color, height, path, width }: SparklineBaseProps) => {
  const stroke = useAccessibleForeground(color, 'graphic');
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

export const SparklineFallback = memo((props: SparklineFallbackProps) => <Fallback {...props} />);

Sparkline.displayName = 'Sparkline';
SparklineFallback.displayName = 'SparklineFallback';
