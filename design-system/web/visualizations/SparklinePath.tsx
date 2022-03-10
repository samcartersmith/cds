import React, { forwardRef, memo } from 'react';

import { SparklinePathBaseProps } from '@cbhq/cds-common';
import { borderWidth } from '@cbhq/cds-common/tokens/border';

export type SparklinePathRef = SVGPathElement | null;

export const SparklinePath = memo(
  forwardRef<SparklinePathRef, SparklinePathBaseProps>(({ path, stroke }, forwardedRef) => {
    return (
      <path
        ref={forwardedRef}
        d={path}
        stroke={stroke}
        strokeWidth={borderWidth.sparkline}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="transparent"
      />
    );
  }),
);

SparklinePath.displayName = 'SparklinePath';
