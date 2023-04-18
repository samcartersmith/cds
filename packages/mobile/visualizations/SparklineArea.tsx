import React, { forwardRef, memo } from 'react';
import { Path } from 'react-native-svg';
import { SparklineAreaBaseProps } from '@cbhq/cds-common';

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-mobile-sparkline.
 */
export const SparklineArea = memo(
  forwardRef<Path | null, SparklineAreaBaseProps>(
    ({ area, patternId }: SparklineAreaBaseProps, ref) => {
      return <Path ref={ref} d={area} fill={`url(#${patternId})`} />;
    },
  ),
);
