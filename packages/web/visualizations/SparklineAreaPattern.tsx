import React from 'react';
import { SparklineAreaPatternBaseProps } from '@cbhq/cds-common';
import { useSparklineAreaOpacity } from '@cbhq/cds-common/visualizations/useSparklineAreaOpacity';

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-web-sparkline.
 */
export const SparklineAreaPattern = ({ color, id }: SparklineAreaPatternBaseProps) => {
  const fillOpacity = useSparklineAreaOpacity();
  return (
    <pattern id={id} x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <g>
        <rect fill="transparent" height="4" width="4" />
        <circle cx="1" cy="1" r="1" fill={color} fillOpacity={fillOpacity} />
      </g>
    </pattern>
  );
};
