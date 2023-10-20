import React, { forwardRef, memo } from 'react';
import { SparklinePathBaseProps } from '@cbhq/cds-common';

import { borderWidth } from '../tokens';

export type SparklinePathRef = SVGPathElement | null;

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-web-sparkline.
 */
export const SparklinePath = memo(
  forwardRef<SparklinePathRef, SparklinePathBaseProps>(({ path, stroke }, forwardedRef) => {
    return (
      <path
        ref={forwardedRef}
        d={path}
        fill="transparent"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={borderWidth.sparkline}
      />
    );
  }),
);

SparklinePath.displayName = 'SparklinePath';
