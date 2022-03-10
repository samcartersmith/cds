import React, { memo, forwardRef } from 'react';
import { Path } from 'react-native-svg';
import { TextInput } from 'react-native';
import { SparklineAreaBaseProps } from '@cbhq/cds-common';

export const SparklineArea = memo(
  forwardRef<TextInput | null, SparklineAreaBaseProps>(
    ({ area, patternId }: SparklineAreaBaseProps, ref) => {
      return <Path ref={ref} d={area} fill={`url(#${patternId})`} />;
    },
  ),
);
