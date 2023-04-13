import React, { memo, useId, useRef } from 'react';
import { SparklineBaseProps } from '@cbhq/cds-common/types';
import { generateSparklineAreaWithId } from '@cbhq/cds-common/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';

import { useAccessibleForeground } from '../color/useAccessibleForeground';

import { SparklineAreaPattern } from './SparklineAreaPattern';
import { SparklinePath } from './SparklinePath';

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
      <defs>
        <SparklineAreaPattern id={patternId.current} color={stroke} />
      </defs>
    ) : null;

    return (
      <svg width={width} height={height}>
        {defs}
        <g {...translateProps}>
          <SparklinePath path={path} stroke={stroke} />
          {generateSparklineAreaWithId(patternId.current, children)}
        </g>
      </svg>
    );
  },
);

Sparkline.displayName = 'Sparkline';
