import React, { forwardRef, memo, useMemo } from 'react';

import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { SparklineBaseProps } from '@cbhq/cds-common/types';
import { TextInput } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { useAccessibleForegroundGradient } from '../color/useAccessibleForegroundGradient';

export const SparklineGradient = memo(
  forwardRef<TextInput | null, SparklineBaseProps>(({ color, path, height, width }, ref) => {
    const gradient = useAccessibleForegroundGradient(color);
    const linearGradient = useMemo(() => {
      return (
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {gradient.map((item, i) => (
              <Stop
                key={`${i}_${item}`}
                offset={`${(i * 100) / gradient.length - 1}%`}
                stopColor={item}
              />
            ))}
          </LinearGradient>
        </Defs>
      );
    }, [gradient]);

    return (
      <Svg width={width} height={height}>
        {linearGradient}
        <Path
          ref={ref}
          d={path}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={borderWidth.sparkline}
          stroke="url(#gradient)"
        />
      </Svg>
    );
  })
);

SparklineGradient.displayName = 'SparklineGradient';
