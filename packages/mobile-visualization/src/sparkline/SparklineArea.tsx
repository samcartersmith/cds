import React, { forwardRef, memo } from 'react';
import { Path } from 'react-native-svg';
import { SparklineAreaBaseProps } from '@cbhq/cds-common';

export const SparklineArea = memo(
  forwardRef<Path | null, SparklineAreaBaseProps>(
    ({ area, patternId }: SparklineAreaBaseProps, ref) => {
      return <Path ref={ref} d={area} fill={`url(#${patternId})`} />;
    },
  ),
);
