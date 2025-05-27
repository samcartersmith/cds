import React, { memo } from 'react';
import { ThemeVars } from '@cbhq/cds-common/core/theme';
import type {
  IconSize,
  NavigationIconName,
  PaddingProps,
  SharedAccessibilityProps,
  SharedProps,
} from '@cbhq/cds-common/types';

import { Icon } from './Icon';

export type NavigationBaseIconProps = PaddingProps &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> & {
    /** Size for a given icon.
     * @default m
     */
    size?: IconSize;
    /** Name of the icon, as defined in Figma. */
    name: NavigationIconName;
    /**
     * A boolean flag indicating whether or not a border should be shown around an icon.
     * This border will match color prop. Border is only allowed for sizes m and above.
     * @default false
     */
    bordered?: boolean;
    /**
     * Fallback element to render if unable to find an icon with matching name
     * @default null
     * */
    fallback?: null | React.ReactNode;
    /**
     * Toggles the active and inactive state of the navigation icon
     * @default false
     */
    active?: boolean;
    /**
     * Color of the icon when used as a foreground.
     * @default foreground
     */
    color?: ThemeVars.Color;
  };

export type NavigationIconProps = NavigationBaseIconProps;

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
