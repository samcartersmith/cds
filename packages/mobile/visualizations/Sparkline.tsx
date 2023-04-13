import React, { memo, useId, useRef } from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';
import { borderWidth } from '@cbhq/cds-common/tokens/borderWidth';
import { SparklineBaseProps } from '@cbhq/cds-common/types';
import { generateSparklineAreaWithId } from '@cbhq/cds-common/visualizations/generateSparklineAreaWithId';
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
    const randomId = useId();
    const patternId = useRef<string>(randomId);
    const stroke = useAccessibleForeground({ background, color, usage: 'graphic' });
    const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);

    const defs = children ? (
      <Defs>
        <SparklineAreaPattern id={patternId.current} color={stroke} />
      </Defs>
    ) : null;

    return (
      <Svg width={width} height={height} fill="none">
        {defs}
        <G {...translateProps}>
          <Path
            d={path}
            stroke={stroke}
            strokeWidth={borderWidth.sparkline}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {generateSparklineAreaWithId(patternId.current, children)}
        </G>
      </Svg>
    );
  },
);

Sparkline.displayName = 'Sparkline';
