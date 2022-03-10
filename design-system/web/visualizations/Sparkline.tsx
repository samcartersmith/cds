import React, { memo, useRef } from 'react';

import { SparklineBaseProps } from '@cbhq/cds-common/types';

import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { generateSparklineAreaWithId } from '@cbhq/cds-common/visualizations/generateSparklineAreaWithId';
import { generateRandomId } from '@cbhq/cds-utils';
import { useAccessibleForeground } from '../color/useAccessibleForeground';
import { SparklinePath } from './SparklinePath';
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
