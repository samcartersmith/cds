import React from 'react';
import { Circle, G, Pattern, Rect } from 'react-native-svg';
import { SparklineAreaPatternBaseProps } from '@cbhq/cds-common';
import { useSparklineAreaOpacity } from '@cbhq/cds-common/visualizations/useSparklineAreaOpacity';

export const SparklineAreaPattern = ({ color, id }: SparklineAreaPatternBaseProps) => {
  const fillOpacity = useSparklineAreaOpacity();
  return (
    <Pattern id={id} x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <G>
        <Rect fill="transparent" height="4" width="4" />
        <Circle cx="1" cy="1" r="1" fill={color} fillOpacity={fillOpacity} />
      </G>
    </Pattern>
  );
};
