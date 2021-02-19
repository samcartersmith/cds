import * as React from 'react';

import { OffsetBaseProps } from '@cds/common';
import { Animated, View, ViewProps, ViewStyle } from 'react-native';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { OmitStyle, DangerouslySetStyle } from '../types';

export interface OffsetProps
  extends OffsetBaseProps,
    OmitStyle<ViewProps>,
    DangerouslySetStyle<ViewStyle> {}

export const Offset = React.memo(
  ({ animated, all, top, bottom, start, end, horizontal, vertical, ...viewProps }: OffsetProps) => {
    const spacingStyles = useSpacingStyles({
      all: all,
      bottom: bottom,
      end: end,
      horizontal: horizontal,
      start: start,
      top: top,
      vertical: vertical,
      isInverted: true,
    });

    const ViewComponent = animated ? Animated.View : View;

    return <ViewComponent style={spacingStyles} {...viewProps} />;
  }
);

Offset.displayName = 'Offset';
