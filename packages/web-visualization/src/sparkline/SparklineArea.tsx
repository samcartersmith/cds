import React, { forwardRef, memo } from 'react';
import { SparklineAreaBaseProps } from '@cbhq/cds-common';

export const SparklineArea = memo(
  forwardRef<SVGPathElement | null, SparklineAreaBaseProps>(
    ({ area, patternId }: SparklineAreaBaseProps, ref) => {
      return <path ref={ref} d={area} fill={`url(#${patternId})`} />;
    },
  ),
);
