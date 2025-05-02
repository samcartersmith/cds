import React, { memo } from 'react';
import { SharedAccessibilityProps } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { NavigationBaseIconProps } from '@cbhq/cds-common2/types/NavigationBaseIconProps';

import { Icon } from './Icon';

/** @deprecated This component will be removed in a future version. Use Icon instead. */
export type NavigationIconProps = NavigationBaseIconProps & {
  /**
   * Color of the icon when used as a foreground.
   * @default foreground
   */ color?: ThemeVars.Color;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>;

/** @deprecated This component will be removed in a future version. Use Icon instead. */
export const NavigationIcon = memo(function NavigationIcon({
  accessibilityLabel,
  accessibilityHint,
  active = false,
  fallback = null,
  color = active ? 'fgPrimary' : 'fg',
  name,
  size = 'm',
  testID,
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
      testID={testID}
      {...props}
    />
  );
});

NavigationIcon.displayName = 'NavigationIcon';
