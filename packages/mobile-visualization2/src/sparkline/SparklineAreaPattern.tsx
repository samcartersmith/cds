import React from 'react';
import { Circle, G, Pattern, Rect } from 'react-native-svg';
import { SparklineAreaPatternBaseProps } from '@cbhq/cds-common2';
import { useSparklineAreaOpacity } from '@cbhq/cds-common2/visualizations/useSparklineAreaOpacity';
import { useTheme } from '@cbhq/cds-mobile2/hooks/useTheme';

export const SparklineAreaPattern = ({ color, id }: SparklineAreaPatternBaseProps) => {
  const { colorScheme } = useTheme();
  const fillOpacity = useSparklineAreaOpacity(colorScheme);
  return (
    <Pattern height="4" id={id} patternUnits="userSpaceOnUse" width="4" x="0" y="0">
      <G>
        <Rect fill="transparent" height="4" width="4" />
        <Circle cx="1" cy="1" fill={color} fillOpacity={fillOpacity} r="1" />
      </G>
    </Pattern>
  );
};
