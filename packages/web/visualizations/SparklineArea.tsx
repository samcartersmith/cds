import React, { forwardRef, memo } from 'react';
import { SparklineAreaBaseProps } from '@cbhq/cds-common';

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-web-sparkline.
 */
export const SparklineArea = memo(
  forwardRef<SVGPathElement | null, SparklineAreaBaseProps>(
    ({ area, patternId }: SparklineAreaBaseProps, ref) => {
      return <path ref={ref} d={area} fill={`url(#${patternId})`} />;
    },
  ),
);
