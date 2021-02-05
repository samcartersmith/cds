import * as React from 'react';

import { UseSpacingStylesProps } from '@cds/common';
import { Animated, View, ViewProps } from 'react-native';

import { useSpacingStyles } from '../hooks/useSpacingStyles';

export interface OffsetProps extends Omit<UseSpacingStylesProps, 'isInverted'> {
  readonly animated?: boolean;
}

export const Offset: React.FC<OffsetProps & Omit<ViewProps, 'style'>> = ({
  animated,
  all,
  top,
  bottom,
  start,
  end,
  horizontal,
  vertical,
  ...viewProps
}) => {
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
};
