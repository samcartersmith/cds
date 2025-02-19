import React, { memo, useRef } from 'react';
import { SparklineBaseProps } from '@cbhq/cds-common2/types';
import { getAccessibleColor } from '@cbhq/cds-common2/utils/getAccessibleColor';
import { generateSparklineAreaWithId } from '@cbhq/cds-common2/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common2/visualizations/getSparklineTransform';
import { generateRandomId } from '@cbhq/cds-utils';
import { useTheme } from '@cbhq/cds-web2/hooks/useTheme';

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
    const theme = useTheme();
    const patternId = useRef<string>(generateRandomId());
    const stroke =
      color !== 'auto'
        ? color
        : getAccessibleColor({
            background: background ?? theme.color.bg,
            foreground: 'auto',
            usage: 'graphic',
          });
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
