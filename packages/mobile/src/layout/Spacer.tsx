import React, { memo } from 'react';
import { Animated, View, ViewProps, ViewStyle } from 'react-native';
import { SharedProps } from '@cbhq/cds-common';
import { SpacerBaseProps } from '@cbhq/cds-common/src/types/SpacerBaseProps';
import { getSpacerStyle } from '@cbhq/cds-common/src/utils/getSpacerStyle';

import { useSpacingScale } from '../hooks/useSpacingScale';
import type { DangerouslySetStyle, OmitStyle } from '../types';

export type SpacerProps = SpacerBaseProps &
  SharedProps &
  OmitStyle<ViewProps> &
  DangerouslySetStyle<ViewStyle>;

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
  const spacing = useSpacingScale();
  const Component = animated ? Animated.View : View;

  return (
    <Component
      {...viewProps}
      accessibilityRole="none"
      style={getSpacerStyle({
        flexGrow,
        flexShrink,
        flexBasis,
        horizontal,
        vertical,
        maxHorizontal,
        maxVertical,
        minHorizontal,
        minVertical,
        spacingScaleValues: spacing,
      })}
    />
  );
});
