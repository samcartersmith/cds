import React, { forwardRef, memo } from 'react';
import { SparklinePathBaseProps } from '@cbhq/cds-common';
import { borderWidth } from '@cbhq/cds-web/tokens';

export type SparklinePathRef = SVGPathElement | null;

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
