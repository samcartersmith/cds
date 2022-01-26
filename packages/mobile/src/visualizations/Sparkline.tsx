import React, { memo, useRef } from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';
import { borderWidth } from '@cbhq/cds-common/src/tokens/border';
import { SparklineBaseProps } from '@cbhq/cds-common/src/types';
import { generateSparklineAreaWithId } from '@cbhq/cds-common/src/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common/src/visualizations/getSparklineTransform';
import { generateRandomId } from '@cbhq/cds-utils';

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
    const patternId = useRef<string>(generateRandomId());
    const stroke = useAccessibleForeground({ background, color, usage: 'graphic' });
    const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);

    const defs = children ? (
      <Defs>
        <SparklineAreaPattern id={patternId.current} color={stroke} />
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
          {generateSparklineAreaWithId(patternId.current, children)}
        </G>
      </Svg>
    );
  },
);

Sparkline.displayName = 'Sparkline';
