import React, { memo, useId, useRef } from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';
import { borderWidth } from '@cbhq/cds-common/tokens/borderWidth';
import { SparklineBaseProps } from '@cbhq/cds-common/types';
import { generateSparklineAreaWithId } from '@cbhq/cds-common/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';

import { useAccessibleForeground } from '../color/useAccessibleForeground';

import { SparklineAreaPattern } from './SparklineAreaPattern';

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-mobile-visualization.
 */
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
        <SparklineAreaPattern color={stroke} id={patternId.current} />
      </Defs>
    ) : null;

    return (
      <Svg fill="none" height={height} width={width}>
        {defs}
        <G {...translateProps}>
          <Path
            d={path}
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={borderWidth.sparkline}
          />
          {generateSparklineAreaWithId(patternId.current, children)}
        </G>
      </Svg>
    );
  },
);

Sparkline.displayName = 'Sparkline';
