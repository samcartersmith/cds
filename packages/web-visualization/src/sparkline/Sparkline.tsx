import React, { memo, useRef } from 'react';
import { SparklineBaseProps } from '@cbhq/cds-common/types';
import { generateSparklineAreaWithId } from '@cbhq/cds-common/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { generateRandomId } from '@cbhq/cds-utils';
import { useAccessibleForeground } from '@cbhq/cds-web/color/useAccessibleForeground';

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
    const patternId = useRef<string>(generateRandomId());
    const stroke = useAccessibleForeground({ background, color, usage: 'graphic' });
    const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);

    const defs = children ? (
      <defs>
        <SparklineAreaPattern color={stroke} id={patternId.current} />
      </defs>
    ) : null;

    return (
      <svg height={height} width={width}>
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
