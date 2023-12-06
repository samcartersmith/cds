import React, { forwardRef, memo } from 'react';
import { Path } from 'react-native-svg';
import { SparklineAreaBaseProps } from '@cbhq/cds-common';

/**
 * @deprecated this component will be removed from CDS in v6.0.0. It has been moved to cds-mobile-visualization.
 */
export const SparklineArea = memo(
  forwardRef<Path | null, SparklineAreaBaseProps>(
    ({ area, patternId }: SparklineAreaBaseProps, ref) => {
      return <Path ref={ref} d={area} fill={`url(#${patternId})`} />;
    },
  ),
);
