import React, { memo } from 'react';
import { PaletteForeground, SharedAccessibilityProps } from '@cbhq/cds-common';
import { NavigationBaseIconProps } from '@cbhq/cds-common/types/NavigationBaseIconProps';

import { Icon } from './Icon';

export type NavigationIconProps = NavigationBaseIconProps & {
  /**
   * Color of the icon when used as a foreground.
   * @default foreground
   */ color?: PaletteForeground;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>;

/** @deprecated Will be removed in Q1 2025. Use Icon instead. */
export const NavigationIcon = memo(function NavigationIcon({
  accessibilityLabel,
  accessibilityHint,
  active = false,
  fallback = null,
  color = active ? 'primary' : 'foreground',
  name,
  size = 'm',
  testID,
  // Spacing
  spacing,
  spacingTop,
  spacingBottom,
  spacingStart,
  spacingEnd,
  spacingVertical,
  spacingHorizontal,
  ...props
}: NavigationIconProps) {
  return (
    <Icon
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      active={active}
      color={color}
      fallback={fallback}
      iconType="nav"
      name={name}
      size={size}
      spacing={spacing}
      spacingBottom={spacingBottom}
      spacingEnd={spacingEnd}
      spacingHorizontal={spacingHorizontal}
      spacingStart={spacingStart}
      spacingTop={spacingTop}
      spacingVertical={spacingVertical}
      testID={testID}
      {...props}
    />
  );
});

NavigationIcon.displayName = 'NavigationIcon';
