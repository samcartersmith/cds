import React from 'react';
import { Circle, G, Pattern, Rect } from 'react-native-svg';
import { SparklineAreaPatternBaseProps } from '@cbhq/cds-common';
import { useSparklineAreaOpacity } from '@cbhq/cds-common/visualizations/useSparklineAreaOpacity';

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-mobile-visualization.
 */
export const SparklineAreaPattern = ({ color, id }: SparklineAreaPatternBaseProps) => {
  const fillOpacity = useSparklineAreaOpacity();
  return (
    <Pattern height="4" id={id} patternUnits="userSpaceOnUse" width="4" x="0" y="0">
      <G>
        <Rect fill="transparent" height="4" width="4" />
        <Circle cx="1" cy="1" fill={color} fillOpacity={fillOpacity} r="1" />
      </G>
    </Pattern>
  );
};
