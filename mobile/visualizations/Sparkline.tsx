import React, { memo } from 'react';

import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { SparklineBaseProps } from '@cbhq/cds-common/types';
import Svg, { Defs, G, Path } from 'react-native-svg';

import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { useAccessibleForeground } from '../color/useAccessibleForeground';
import { SparklineAreaPattern } from './SparklineAreaPattern';

export const Sparkline = memo(
  ({
    background,
    color,
    height,
    path,
    width,
    yAxisScalingFactor,
    children,
  }: SparklineBaseProps) => {
    const stroke = useAccessibleForeground({ background, color, usage: 'graphic' });
    const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);

    const defs = children ? (
      <Defs>
        <SparklineAreaPattern color={color} />
      </Defs>
    ) : null;

    return (
      <Svg width={width} height={height}>
        {defs}
        <G {...translateProps}>
          <Path
            d={path}
            stroke={stroke}
            strokeWidth={borderWidth.sparkline}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {children}
        </G>
      </Svg>
    );
  },
);

Sparkline.displayName = 'Sparkline';
