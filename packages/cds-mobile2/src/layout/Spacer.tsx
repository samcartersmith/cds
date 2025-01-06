import React, { memo } from 'react';
import { Animated, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { FixedValue, SharedProps } from '@cbhq/cds-common2';
import { SpacerBaseProps } from '@cbhq/cds-common2/types/SpacerBaseProps';
import { getSpacerStyle } from '@cbhq/cds-common2/utils/getSpacerStyle';

import { useTheme } from '../system';

export type SpacerProps = SpacerBaseProps &
  SharedProps &
  Omit<ViewProps, 'style'> & {
    animated?: boolean;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  };

/**
 * Spacer component is for adding spacing gap between two dom nodes. If no horizontal or vertical
 * spacing size is provided, Spacer will stretch to fill up available space left in the parent container.
 */
export const Spacer = memo(function Spacer({
  flexGrow,
  flexShrink,
  flexBasis,
  horizontal,
  vertical,
  maxHorizontal,
  maxVertical,
  minHorizontal,
  minVertical,
  animated,
  ...viewProps
}: SpacerProps) {
  const theme = useTheme();
  const Component = animated ? Animated.View : View;

  return (
    <Component
      {...viewProps}
      accessibilityRole="none"
      style={
        getSpacerStyle({
          flexGrow,
          flexShrink,
          flexBasis: flexBasis as FixedValue,
          horizontal,
          vertical,
          maxHorizontal,
          maxVertical,
          minHorizontal,
          minVertical,
          spacingScaleValues: theme.space,
        }) as ViewStyle
      }
    />
  );
});
