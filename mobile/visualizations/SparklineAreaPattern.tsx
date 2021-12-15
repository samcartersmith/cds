import { Circle, G, Pattern, Rect } from 'react-native-svg';
import React from 'react';
import { SparklineAreaPatternBaseProps } from '@cbhq/cds-common';

export const SparklineAreaPattern = ({ color, id }: SparklineAreaPatternBaseProps) => {
  return (
    <Pattern id={id} x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <G>
        <Rect fill="transparent" height="4" width="4" />
        <Circle cx="1" cy="1" r="1" fill={color} fillOpacity={0.2} />
      </G>
    </Pattern>
  );
};
