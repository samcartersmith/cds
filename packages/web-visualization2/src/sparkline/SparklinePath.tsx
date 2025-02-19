import React, { forwardRef, memo } from 'react';
import { SparklinePathBaseProps } from '@cbhq/cds-common2';
import { borderWidth } from '@cbhq/cds-common2/tokens/sparkline';

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
        strokeWidth={borderWidth}
      />
    );
  }),
);

SparklinePath.displayName = 'SparklinePath';
