import React, { memo, useRef } from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';
import { borderWidth } from '@cbhq/cds-common2/tokens/sparkline';
import { SparklineBaseProps } from '@cbhq/cds-common2/types';
import { getAccessibleColor } from '@cbhq/cds-common2/utils/getAccessibleColor';
import { generateSparklineAreaWithId } from '@cbhq/cds-common2/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common2/visualizations/getSparklineTransform';
import { useTheme } from '@cbhq/cds-mobile2/hooks/useTheme';
import { generateRandomId } from '@cbhq/cds-utils';

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
            strokeWidth={borderWidth}
          />
          {generateSparklineAreaWithId(patternId.current, children)}
        </G>
      </Svg>
    );
  },
);

Sparkline.displayName = 'Sparkline';
